/**
 * All in One Accessibility settings page.
 *
 * Ported from the reference page: views/layout.ejs and assets/js/app.js (load + register once),
 * plan.js (banner, tabs for the plan), tabs.js, save.js, dashboard.js and score.js.
 *
 *   1. The website is websiteUrl from the plugin config, otherwise the admin page's hostname
 *      (a domain or localhost, never an IP address).
 *   2. widget-settings loads it. It never registers anything.
 *   3. A website that is not registered yet: ipapi.co once (EU check), then registerDomain once.
 *      After a website was sent for registration it is not sent again for 10 minutes
 *      (localStorage "aioa-registered:<website>"), not on Try again and not after a reload.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Page, useNotification } from '@strapi/strapi/admin';

import { aioaStyles } from './styles';
import { AppearanceTab } from './AppearanceTab';
import { PaidFeaturesTab } from './PaidFeaturesTab';
import { ScoreTab } from './ScoreTab';
import { Header, PaidBanner, SaveBar, SiteLine, Tabs, UpgradeBanner } from './Chrome';
import { Spinner } from './Shared';
import { iconSrc } from './icons';
import { useIsDarkTheme } from './useIsDarkTheme';
import { checkResult, errorText, fetchNoRequiredEu, RouteError, saveSettings, useAioaApi } from './useAioaApi';
import {
  appearanceDefaults,
  appearanceFrom,
  checkLink,
  appearanceParams,
  paidParams,
  problemsToast,
  validateAppearance,
  validatePaid,
  paidDefaults,
  paidFrom,
} from './formState';
import { REGISTER_AGAIN_AFTER, STORAGE_REGISTERED, STORAGE_TAB, TAB_ORDER, TABS, UPGRADE_URL } from './constants';
import { DOMAIN_RE, normalizeDomain, storage, upgradeUrl } from './utils';

const NO_DOMAIN_MESSAGE =
  'No valid website domain was found. Set websiteUrl for strapi-plugin-all-in-one-accessibility in config/plugins.js (or the AIOA_WEBSITE_URL environment variable) to your website domain, or open the admin panel on your website domain or on localhost (not an IP address).';

/** Focus an element once React has shown it */
const focusLater = (id) => setTimeout(() => document.getElementById(id)?.focus(), 0);

export const SettingsPage = () => {
  const { toggleNotification } = useNotification();
  const isDark = useIsDarkTheme();
  const api = useAioaApi();

  const [view, setView] = useState('load'); // load | error | settings
  const [error, setError] = useState({ title: '', message: '', retry: true });
  const [domain, setDomain] = useState(null); // null until resolved; '' = none found
  const [admin, setAdmin] = useState({}); // signed-in admin's first / last name and email (Upgrade links)
  const [isPaid, setIsPaid] = useState(false);
  const [form, setForm] = useState(appearanceDefaults);
  const [paid, setPaid] = useState(paidDefaults);
  const [dirty, setDirty] = useState(false);
  const [tab, setTab] = useState('appearance');
  const [saving, setSaving] = useState(false);
  const [score, setScore] = useState({ view: 'idle' });
  const [dashboardBusy, setDashboardBusy] = useState(false);

  const startedRef = useRef(false); // the page is loaded once (also under React StrictMode)
  const registerSentRef = useRef(false); // registerDomain was requested on this page
  const euRequestRef = useRef(null); // the one ipapi.co request of this page
  const scoreLoadedRef = useRef(false); // the score is shown or loading
  const dashboardRef = useRef({ request: null, link: '', failure: null });

  /* ---------- Toasts (Strapi notifications) ---------- */

  const toast = useCallback(
    (type, title, message, action) =>
      toggleNotification({
        type: type === 'error' ? 'danger' : 'success',
        title,
        message: message || undefined,
        ...(action ? { link: { url: action.href, label: action.label, target: '_blank' }, timeout: 15000 } : {}),
      }),
    [toggleNotification],
  );

  /* ---------- Error view ---------- */

  const showError = useCallback((message, title, retry = true) => {
    setError({ title: title || "We couldn't load your widget settings", message, retry });
    setView('error');
  }, []);

  /* ---------- Dashboard link (paid plans, once per page load) ---------- */

  const loadDashboard = useCallback(
    (website) => {
      const state = dashboardRef.current;
      if (state.request) return;
      state.request = api.route('getDashboardLink', { url: website }).then((result) => {
        const value = result && result.link;
        // Only ever open an https link
        if (!value || !/^https:\/\//i.test(value)) {
          throw new Error((result && result.error) || 'Unable to load the dashboard link.');
        }
        state.link = value;
        return value;
      });
      state.request.catch((err) => {
        state.failure = err;
      });
    },
    [api],
  );

  /** Point a tab at the link; when the browser blocked the tab, offer the link in a notification */
  const openIn = useCallback(
    (win, url) => {
      if (win && !win.closed) {
        win.opener = null;
        win.location.href = url;
      } else {
        toast('success', 'Your dashboard link is ready', 'Your browser blocked the new tab.', {
          href: url,
          label: 'Open dashboard',
        });
      }
    },
    [toast],
  );

  const dashboardError = useCallback(
    (err) => {
      const reason = err instanceof RouteError ? errorText(err) : (err && err.message) || '';
      toast('error', 'Could not open the dashboard', (reason ? reason + ' ' : '') + 'Reload the page to try again.');
    },
    [toast],
  );

  const openDashboard = useCallback(() => {
    const state = dashboardRef.current;
    if (state.link) {
      openIn(window.open('', '_blank'), state.link);
      return;
    }
    if (state.failure || !state.request) {
      dashboardError(state.failure);
      return;
    }

    // Still loading: open the tab now (inside the click, so popup blockers allow it)
    // and point it at the link when the request that is already running finishes
    const win = window.open('', '_blank');
    if (win) {
      try {
        win.document.title = 'Opening dashboard…';
        win.document.body.style.cssText =
          'font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:90vh;color:#420083';
        win.document.body.textContent = 'Opening your All in One Accessibility dashboard…';
      } catch {
        /* the new tab is not scriptable, the link still works */
      }
    }
    setDashboardBusy(true);
    state.request
      .then((url) => openIn(win, url))
      .catch((err) => {
        if (win && !win.closed) win.close();
        dashboardError(err);
      })
      .finally(() => setDashboardBusy(false));
  }, [dashboardError, openIn]);

  /* ---------- Registration (at most once) ---------- */

  const registerWebsite = useCallback(
    (website) => {
      const sentAt = Number(storage.get(STORAGE_REGISTERED + website)) || 0;
      const recently = sentAt > 0 && Date.now() - sentAt < REGISTER_AGAIN_AFTER;
      if (registerSentRef.current || recently) {
        const err = new Error(
          'Your website was just registered, and its settings are not ready yet. Please try again in a moment.',
        );
        err.pending = true;
        return Promise.reject(err);
      }
      registerSentRef.current = true;
      storage.set(STORAGE_REGISTERED + website, String(Date.now()));

      if (!euRequestRef.current) {
        euRequestRef.current = fetchNoRequiredEu();
      }
      // The admin's name and email are added by the server from the signed-in Strapi user
      return euRequestRef.current
        .then((noRequiredEu) => api.route('registerDomain', { url: website, no_required_eu: String(noRequiredEu) }))
        .then(checkResult);
    },
    [api],
  );

  /* ---------- Settings ---------- */

  /** Order the tabs for the plan, then open the remembered (or first) tab */
  const openTabForPlan = useCallback((paidPlan) => {
    const order = paidPlan ? TAB_ORDER.paid : TAB_ORDER.free;
    const stored = storage.get(STORAGE_TAB);
    setTab(TABS[stored] ? stored : order[0]);
  }, []);

  const applyResult = useCallback(
    (result, website) => {
      storage.remove(STORAGE_REGISTERED + website); // registered: nothing left to wait for

      const paidPlan = parseInt(result.is_free_widget, 10) !== 1;
      setForm(appearanceFrom(result));
      setPaid(paidFrom(result));
      setIsPaid(paidPlan);
      openTabForPlan(paidPlan);
      setDirty(false);
      setView('settings');

      // Paid plan: load the Dashboard link now, so the button opens it without waiting
      if (paidPlan) loadDashboard(website);
    },
    [loadDashboard, openTabForPlan],
  );

  const loadSettings = useCallback(
    (website) => {
      if (!website) {
        showError(NO_DOMAIN_MESSAGE, 'A valid domain is required', false);
        return;
      }
      setView('load');
      api
        .route('fetchWidgetSettings', { url: website })
        .then(checkResult)
        .then((result) => (result.not_registered ? registerWebsite(website) : result))
        .then((result) => applyResult(result, website))
        .catch((err) => {
          if (err.pending) {
            showError(err.message, 'Your widget is being set up');
          } else {
            showError(errorText(err));
          }
        });
    },
    [api, applyResult, registerWebsite, showError],
  );

  /** Which website? websiteUrl from the plugin config, otherwise this page's hostname */
  const start = useCallback(() => {
    setView('load');
    api
      .getConfig()
      .then((config) => {
        const configured = normalizeDomain(config.websiteUrl || '');
        // An invalid configured website never falls back to the hostname
        const candidate = configured || normalizeDomain(window.location.hostname);
        const website = DOMAIN_RE.test(candidate) ? candidate : '';
        setAdmin(config.admin || {});
        setDomain(website);
        loadSettings(website);
      })
      .catch((err) => showError(errorText(err)));
  }, [api, loadSettings, showError]);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    start();
  }, [start]);

  const retry = () => (domain === null ? start() : loadSettings(domain));

  /* ---------- Accessibility Score (paid plans, first time the tab opens) ---------- */

  const loadScore = useCallback(
    (force) => {
      if (!isPaid || !domain || (scoreLoadedRef.current && !force)) return;
      scoreLoadedRef.current = true;
      setScore({ view: 'loading' });
      api
        .route('fetchScanDetails', { url: domain })
        .then(checkResult)
        .then((result) => {
          if (result.no_scan) {
            setScore({ view: 'empty' }); // not scanned yet, or the scan is still running
          } else {
            setScore({ view: 'card', data: result });
          }
        })
        .catch((err) => {
          scoreLoadedRef.current = false; // try again the next time the tab opens
          setScore({ view: 'error', error: errorText(err) });
        });
    },
    [api, domain, isPaid],
  );

  useEffect(() => {
    if (view === 'settings' && tab === 'score') loadScore(false);
  }, [view, tab, loadScore]);

  /* ---------- Tabs ---------- */

  const selectTab = useCallback((name, focus) => {
    setTab(name);
    storage.set(STORAGE_TAB, name);
    if (focus) focusLater(`tab-${name}`);
  }, []);

  /* ---------- Form changes ---------- */

  const updateForm = useCallback((patch, markDirty = true) => {
    setForm((prev) => ({ ...prev, ...patch }));
    if (markDirty) setDirty(true);
  }, []);

  const updatePaid = useCallback((patch) => {
    setPaid((prev) => ({ ...prev, ...patch }));
    setDirty(true);
  }, []);

  const onLinkBlur = useCallback((name) => {
    setPaid((prev) => {
      const { value, error: linkError } = checkLink(name, prev[name]);
      return { ...prev, [name]: value, errors: { ...prev.errors, [name]: linkError } };
    });
  }, []);

  /* ---------- Save ---------- */

  const onSave = async () => {
    if (saving) return;

    // Check every field first, so every problem is marked in red at the same time
    // (reference: AIOA.form.validate / report). Appearance Design comes first.
    const appearance = validateAppearance(form);
    updateForm(appearance.marks, false);
    const problems = [...appearance.problems];

    // Paid Features: paid plans only
    let checkedPaid = paid;
    if (isPaid) {
      const result = validatePaid(paid);
      checkedPaid = result.paid;
      setPaid(result.paid);
      problems.push(...result.problems);
    }

    if (problems.length) {
      // Go to the first problem (its tab and field); one toast for all of them
      const first = problems[0];
      if (tab !== first.tab) selectTab(first.tab);
      focusLater(first.focus);
      const { title, message } = problemsToast(problems);
      toast('error', title, message);
      return;
    }

    const params = { ...appearanceParams(form, domain), ...(isPaid ? paidParams(checkedPaid) : {}) };

    setSaving(true);
    try {
      await saveSettings(params);
      setDirty(false);
      toast(
        'success',
        'Settings saved successfully!',
        'It may take a few seconds for changes to appear on your website.',
      );
    } catch (err) {
      console.error('[All in One Accessibility] Save failed:', err);
      toast('error', 'Something went wrong.', 'Your settings were not saved. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  /* ---------- Render ---------- */

  const order = isPaid ? TAB_ORDER.paid : TAB_ORDER.free;
  const showSave = tab === 'appearance' || (tab === 'paid' && isPaid);
  const preview = iconSrc(form.iconType);
  // "Upgrade to Paid Plan": the trial form gets the website, email and name
  const upgradeHref = upgradeUrl(UPGRADE_URL, { website: domain, ...admin });

  return (
    <div className={`aioa-plugin${isDark ? ' aioa-dark' : ''}`} style={{ '--widget-color': '#' + form.color }}>
      <Page.Title>All in One Accessibility</Page.Title>
      <style>{aioaStyles}</style>

      <div className="aioa-page">
        <Header />

        <main>
          {view === 'load' && (
            <div id="load" className="aioa-loading" role="status">
              <Spinner />
              <span>Loading your widget settings…</span>
            </div>
          )}

          {view === 'error' && (
            <section id="error_block" className="aioa-card aioa-error-card">
              <h2 id="error-title">{error.title}</h2>
              <p id="error-message">{error.message}</p>
              {error.retry && (
                <button type="button" className="aioa-btn aioa-btn-primary" id="retry-btn" onClick={retry}>
                  Try again
                </button>
              )}
            </section>
          )}

          {view === 'settings' && (
            <div id="settings_block">
              {isPaid ? (
                <PaidBanner onDashboard={openDashboard} busy={dashboardBusy} />
              ) : (
                <UpgradeBanner upgradeHref={upgradeHref} />
              )}
              <SiteLine domain={domain} />

              <Tabs order={order} current={tab} locked={!isPaid} onSelect={selectTab} />

              <form
                id="widget-form"
                name="widget-form"
                className="aioa-form"
                noValidate
                onSubmit={(e) => e.preventDefault()}
              >
                <div
                  className="aioa-tabpanel"
                  role="tabpanel"
                  id="panel-appearance"
                  aria-labelledby="tab-appearance"
                  tabIndex={0}
                  hidden={tab !== 'appearance'}
                >
                  <AppearanceTab form={form} update={updateForm} />
                </div>

                <div
                  className="aioa-tabpanel"
                  role="tabpanel"
                  id="panel-paid"
                  aria-labelledby="tab-paid"
                  tabIndex={0}
                  hidden={tab !== 'paid'}
                >
                  <PaidFeaturesTab
                    locked={!isPaid}
                    paid={paid}
                    update={updatePaid}
                    onLinkBlur={onLinkBlur}
                    preview={preview}
                    upgradeHref={upgradeHref}
                  />
                </div>

                <div
                  className="aioa-tabpanel"
                  role="tabpanel"
                  id="panel-score"
                  aria-labelledby="tab-score"
                  tabIndex={0}
                  hidden={tab !== 'score'}
                >
                  <ScoreTab locked={!isPaid} score={score} onRetry={() => loadScore(true)} upgradeHref={upgradeHref} />
                </div>

                {/* Save bar: Appearance Design, and Paid Features on a paid plan */}
                <div id="save-area" hidden={!showSave}>
                  <SaveBar dirty={dirty} saving={saving} onSave={onSave} />
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
