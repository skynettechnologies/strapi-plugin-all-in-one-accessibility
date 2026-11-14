/**
 * Header, plan banners, site line, tabs and save bar
 * (reference: views/partials/header, upgrade-banner, paid-banner, site-strip, tabs, settings/save-bar).
 */
import { LOGO_PATH, TABS, UPGRADE_URL } from './constants';
import { LockIcon, Logo, Spinner } from './Shared';

export const Header = () => (
  <header className="aioa-header">
    <div className="aioa-brand">
      <Logo />
      <div>
        <h1>
          All in One Accessibility<sup>&reg;</sup>
        </h1>
        <p>Powered by Skynet Technologies</p>
      </div>
    </div>
  </header>
);

/** Free plan: purple "Upgrade to Paid Plan" banner */
export const UpgradeBanner = () => (
  <section id="free_plan_upgrade_block" className="aioa-upgrade" aria-labelledby="upgrade-title">
    <svg className="aioa-upgrade-watermark" viewBox="0 0 69 69" fill="#fff" aria-hidden="true" focusable="false">
      <path d={LOGO_PATH} />
    </svg>
    <div className="aioa-upgrade-head">
      <div className="aioa-upgrade-intro">
        <p className="aioa-upgrade-tag">
          <i aria-hidden="true" />
          Free plan active
        </p>
        <h2 id="upgrade-title">With 24 Features</h2>
        <p>
          Upgrade to unlock <strong>90+ Premium Accessibility Features</strong> and make your website even more
          inclusive.
        </p>
        <ul className="aioa-upgrade-points">
          <li>190+ Supported languages</li>
          <li>12 Accessibility Profiles</li>
        </ul>
      </div>
      <div className="aioa-upgrade-cta">
        <a href={UPGRADE_URL} target="_blank" rel="noopener noreferrer" className="aioa-btn-white">
          Upgrade to Paid Plan
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
          <span className="visually-hidden">(opens in a new tab)</span>
        </a>
        <small>10-day free trial &middot; Cancel anytime</small>
      </div>
    </div>
    <p className="aioa-upgrade-note">
      <b>NOTE:</b> Currently, All in One Accessibility is dedicated to enhancing accessibility specifically for websites
      and online stores.
    </p>
  </section>
);

/** Paid plan notice with the "Dashboard" button */
export const PaidBanner = ({ onDashboard, busy }) => (
  <section id="paid_plan_block" className="aioa-notice" aria-labelledby="paid-title">
    <div className="aioa-notice-body">
      <p className="aioa-tag is-success">Paid plan active</p>
      <h2 id="paid-title">All pro features are unlocked</h2>
      <p>Manage features, accessibility reports and widget analytics from your dashboard.</p>
    </div>
    <div className="aioa-notice-action">
      <button
        type="button"
        className="aioa-btn aioa-btn-primary"
        onClick={onDashboard}
        disabled={busy}
        aria-busy={busy || undefined}
      >
        {busy ? (
          <>
            <Spinner />
            <span>Opening…</span>
          </>
        ) : (
          <>
            Dashboard
            <span className="visually-hidden">(opens in a new tab)</span>
          </>
        )}
      </button>
    </div>
  </section>
);

/** "Widget installed on <domain>" */
export const SiteLine = ({ domain }) => (
  <p className="aioa-site">
    <span className="aioa-site-dot" aria-hidden="true" />
    <span id="site-text">
      Widget installed on <strong>{domain}</strong>
    </span>
  </p>
);

/**
 * ARIA tabs: click, or Left / Right (wrapping), Home and End on the tab row.
 * order: tab names in the order shown; locked: show the lock badge on paid tabs
 */
export const Tabs = ({ order, current, locked, onSelect }) => {
  const onKeyDown = (e, index) => {
    const target = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: order.length - 1 }[e.key];
    if (target === undefined) return;
    e.preventDefault();
    onSelect(order[(target + order.length) % order.length], true);
  };
  return (
    <div className="aioa-tabs" role="tablist" aria-label="Settings">
      {order.map((name, index) => (
        <button
          type="button"
          role="tab"
          key={name}
          className="aioa-tab"
          id={`tab-${name}`}
          data-tab={name}
          aria-controls={`panel-${name}`}
          aria-selected={current === name ? 'true' : 'false'}
          tabIndex={current === name ? 0 : -1}
          onClick={() => onSelect(name)}
          onKeyDown={(e) => onKeyDown(e, index)}
        >
          <span className="aioa-tab-label">{TABS[name].label}</span>
          {TABS[name].locked && locked && (
            <span className="aioa-tab-lock">
              <LockIcon />
              <span className="visually-hidden">(paid plan)</span>
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export const SaveBar = ({ dirty, saving, onSave }) => (
  <>
    <div className={`aioa-savebar${dirty ? ' is-dirty' : ''}`} id="savebar">
      <p className="aioa-save-state">
        <i aria-hidden="true" />
        <span id="save-state-text">{dirty ? 'You have unsaved changes' : 'All changes saved'}</span>
      </p>
      <button
        type="button"
        id="submit"
        className="aioa-btn aioa-btn-primary"
        onClick={onSave}
        disabled={saving}
        aria-busy={saving || undefined}
      >
        {saving ? (
          <>
            <Spinner />
            <span>Saving…</span>
          </>
        ) : (
          'Save Changes'
        )}
      </button>
    </div>
    <p className="aioa-after-note">
      It may take a few seconds for changes to appear on your website. If you don't see them, clear your browser cache
      or check in a private window.
    </p>
  </>
);