import { useCallback, useEffect, useState } from 'react';
import { Page, useFetchClient, useNotification } from '@strapi/strapi/admin';

import { aioaStyles } from './aioaStyles';
import { fetchWidgetSettings, saveWidgetSettings, UPGRADE_URL } from '../utils/aioaApi';

import aioaicontype1 from '../../../assets/images/aioa-icon-type-1.svg';
import aioaicontype2 from '../../../assets/images/aioa-icon-type-2.svg';
import aioaicontype3 from '../../../assets/images/aioa-icon-type-3.svg';
import aioaicontype4 from '../../../assets/images/aioa-icon-type-4.svg';
import aioaicontype5 from '../../../assets/images/aioa-icon-type-5.svg';
import aioaicontype6 from '../../../assets/images/aioa-icon-type-6.svg';
import aioaicontype7 from '../../../assets/images/aioa-icon-type-7.svg';
import aioaicontype8 from '../../../assets/images/aioa-icon-type-8.svg';
import aioaicontype9 from '../../../assets/images/aioa-icon-type-9.svg';
import aioaicontype10 from '../../../assets/images/aioa-icon-type-10.svg';
import aioaicontype11 from '../../../assets/images/aioa-icon-type-11.svg';
import aioaicontype12 from '../../../assets/images/aioa-icon-type-12.svg';
import aioaicontype13 from '../../../assets/images/aioa-icon-type-13.svg';
import aioaicontype14 from '../../../assets/images/aioa-icon-type-14.svg';
import aioaicontype15 from '../../../assets/images/aioa-icon-type-15.svg';
import aioaicontype16 from '../../../assets/images/aioa-icon-type-16.svg';
import aioaicontype17 from '../../../assets/images/aioa-icon-type-17.svg';
import aioaicontype18 from '../../../assets/images/aioa-icon-type-18.svg';
import aioaicontype19 from '../../../assets/images/aioa-icon-type-19.svg';
import aioaicontype20 from '../../../assets/images/aioa-icon-type-20.svg';
import aioaicontype21 from '../../../assets/images/aioa-icon-type-21.svg';
import aioaicontype22 from '../../../assets/images/aioa-icon-type-22.svg';
import aioaicontype23 from '../../../assets/images/aioa-icon-type-23.svg';
import aioaicontype24 from '../../../assets/images/aioa-icon-type-24.svg';
import aioaicontype25 from '../../../assets/images/aioa-icon-type-25.svg';
import aioaicontype26 from '../../../assets/images/aioa-icon-type-26.svg';
import aioaicontype27 from '../../../assets/images/aioa-icon-type-27.svg';
import aioaicontype28 from '../../../assets/images/aioa-icon-type-28.svg';
import aioaicontype29 from '../../../assets/images/aioa-icon-type-29.svg';
import allinoneaccessibilitylogo from '../../../assets/images/all-in-one-accessibility-logo.svg';

/* ------------------------------------------------------------------ */
/* Options (values must match the Skynet API / reference exactly)      */
/* ------------------------------------------------------------------ */

const ICON_IMAGES = [
  aioaicontype1, aioaicontype2, aioaicontype3, aioaicontype4, aioaicontype5, aioaicontype6,
  aioaicontype7, aioaicontype8, aioaicontype9, aioaicontype10, aioaicontype11, aioaicontype12,
  aioaicontype13, aioaicontype14, aioaicontype15, aioaicontype16, aioaicontype17, aioaicontype18,
  aioaicontype19, aioaicontype20, aioaicontype21, aioaicontype22, aioaicontype23, aioaicontype24,
  aioaicontype25, aioaicontype26, aioaicontype27, aioaicontype28, aioaicontype29,
];

const ICON_TYPES = ICON_IMAGES.map((src, i) => ({
  value: `aioa-icon-type-${i + 1}`,
  label: `Type ${i + 1}`,
  src,
}));

const iconSrcFor = (type) =>
  (ICON_TYPES.find((t) => t.value === type) || ICON_TYPES[0]).src;

// Note: "middel" is the spelling the API expects.
const POSITIONS = [
  { value: 'top_left', label: 'Top left' },
  { value: 'top_center', label: 'Top Center' },
  { value: 'top_right', label: 'Top Right' },
  { value: 'middel_left', label: 'Middle left' },
  { value: 'middel_right', label: 'Middle Right' },
  { value: 'bottom_left', label: 'Bottom left' },
  { value: 'bottom_center', label: 'Bottom Center' },
  { value: 'bottom_right', label: 'Bottom Right' },
];

const ICON_SIZES = [
  { value: 'aioa-big-icon', label: 'Big', px: 75 },
  { value: 'aioa-medium-icon', label: 'Medium', px: 65 },
  { value: 'aioa-default-icon', label: 'Default', px: 55 },
  { value: 'aioa-small-icon', label: 'Small', px: 45 },
  { value: 'aioa-extra-small-icon', label: 'Extra Small', px: 35 },
];

const WIDGET_SIZES = [
  { value: '0', label: 'Regular Size', id: 'edit-widget-size-regularsize' },
  { value: '1', label: 'Oversize', id: 'edit-widget-size-oversize' },
];

const X_RIGHT = 'cust-pos-to-the-right';
const X_LEFT = 'cust-pos-to-the-left';
const Y_BOTTOM = 'cust-pos-to-the-lower';
const Y_TOP = 'cust-pos-to-the-upper';

const DEFAULTS = {
  widget_color_code: '#420083',
  widget_position: 'bottom_right',
  widget_size: '0',
  widget_icon_type: 'aioa-icon-type-1',
  widget_icon_size: 'aioa-default-icon',
  widget_icon_size_custom: '',
  is_widget_custom_position: false,
  is_widget_custom_size: false,
  custom_position_x: 0,
  custom_position_x_dir: X_RIGHT,
  custom_position_y: 0,
  custom_position_y_dir: Y_BOTTOM,
};

const POSITION_MIN = 0;
const POSITION_MAX = 250;
const SIZE_MIN = 20;
const SIZE_MAX = 150;
const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

const toInt = (v) => {
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? 0 : n;
};

const clamp = (v, min, max) => Math.min(Math.max(toInt(v), min), max);

/**
 * Map the API response to form state (reference: populateSettings()).
 */
const settingsFromApi = (data) => {
  const right = toInt(data.widget_position_right);
  const left = toInt(data.widget_position_left);
  const bottom = toInt(data.widget_position_bottom);
  const top = toInt(data.widget_position_top);

  let x = 0;
  let xDir = X_RIGHT;
  if (right > 0) {
    x = right;
  } else if (left > 0) {
    x = left;
    xDir = X_LEFT;
  }

  let y = 0;
  let yDir = Y_BOTTOM;
  if (bottom > 0) {
    y = bottom;
  } else if (top > 0) {
    y = top;
    yDir = Y_TOP;
  }

  return {
    widget_color_code: data.widget_color_code || DEFAULTS.widget_color_code,
    widget_position: data.widget_position || DEFAULTS.widget_position,
    widget_size:
      data.widget_size !== undefined && data.widget_size !== null && data.widget_size !== ''
        ? String(data.widget_size)
        : DEFAULTS.widget_size,
    widget_icon_type: data.widget_icon_type || DEFAULTS.widget_icon_type,
    widget_icon_size: data.widget_icon_size || DEFAULTS.widget_icon_size,
    widget_icon_size_custom:
      data.widget_icon_size_custom !== undefined && data.widget_icon_size_custom !== null
        ? String(data.widget_icon_size_custom)
        : '',
    is_widget_custom_position: toInt(data.is_widget_custom_position) === 1,
    is_widget_custom_size: toInt(data.is_widget_custom_size) === 1,
    custom_position_x: x,
    custom_position_x_dir: xDir,
    custom_position_y: y,
    custom_position_y_dir: yDir,
  };
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

const HomePage = () => {
  const { get } = useFetchClient();
  const { toggleNotification } = useNotification();

  const [settings, setSettings] = useState(DEFAULTS);
  const [isFreeWidget, setIsFreeWidget] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState('');

  const update = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const updatePosition = (key) => (e) => {
    // Reference: oninput="this.value = Math.min(Math.max(this.value, 0), 250)"
    const raw = e.target.value;
    setSettings((prev) => ({
      ...prev,
      [key]: raw === '' ? '' : clamp(raw, POSITION_MIN, POSITION_MAX),
    }));
  };

  /**
   * Current admin user, used when registering the site for the first time.
   */
  const getUser = useCallback(async () => {
    const url = window.location.hostname;
    try {
      const { data } = await get('/admin/users/me');
      const me = data?.data || {};
      const fullName = [me.firstname, me.lastname].filter(Boolean).join(' ');
      return { url, username: fullName || me.username || url, email: me.email || '' };
    } catch {
      return { url, username: url, email: '' };
    }
  }, [get]);

  const loadSettings = useCallback(async () => {
    setLoadError('');
    try {
      const user = await getUser();
      const data = await fetchWidgetSettings(user);
      if (data) {
        setSettings(settingsFromApi(data));
        // Reference: toggleFreePlanBlock() - 1 = free plan (show banner), 0 = paid (hide).
        setIsFreeWidget(toInt(data.is_free_widget) === 1);
      } else {
        setLoadError(
          'Your website could not be registered yet. Default settings are shown; please try again in a moment.'
        );
      }
    } catch (error) {
      console.error('[All in One Accessibility] Failed to load settings:', error);
      setLoadError(
        'Could not reach the All in One Accessibility service. Check your connection and Content Security Policy, then reload this page.'
      );
    }
  }, [getUser]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await loadSettings();
      if (!cancelled) setIsLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [loadSettings]);

  const notifyError = (message) => toggleNotification({ type: 'danger', message });

  /**
   * Save settings (reference: $("#submit").click handler).
   */
  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return;

    const color = String(settings.widget_color_code || '').trim();
    if (color && !HEX_PATTERN.test(color)) {
      notifyError('Please enter a valid hex color code, for example: FF5733');
      return;
    }

    const customSize = settings.widget_icon_size_custom;
    if (settings.is_widget_custom_size) {
      const size = toInt(customSize);
      if (customSize === '' || size < SIZE_MIN) {
        notifyError(`Please enter an exact icon size of at least ${SIZE_MIN}px.`);
        return;
      }
      if (size > SIZE_MAX) {
        notifyError(`Please enter an exact icon size of at most ${SIZE_MAX}px.`);
        return;
      }
    }

    const x = toInt(settings.custom_position_x);
    const y = toInt(settings.custom_position_y);

    const params = {
      u: window.location.hostname,
      widget_position: settings.widget_position,
      is_widget_custom_position: settings.is_widget_custom_position ? 1 : 0,
      is_widget_custom_size: settings.is_widget_custom_size ? 1 : 0,
      widget_color_code: color,
      widget_icon_type: settings.widget_icon_type,
      widget_icon_size: settings.widget_icon_size,
      widget_size: settings.widget_size,
      widget_icon_size_custom: customSize,
      widget_position_right: settings.custom_position_x_dir === X_RIGHT ? x : null,
      widget_position_left: settings.custom_position_x_dir === X_LEFT ? x : null,
      widget_position_top: settings.custom_position_y_dir === Y_TOP ? y : null,
      widget_position_bottom: settings.custom_position_y_dir === Y_BOTTOM ? y : null,
    };

    setIsSaving(true);
    try {
      await saveWidgetSettings(params);
      toggleNotification({ type: 'success', message: 'Settings saved successfully!' });
      // Reference reloads the page here; re-fetching keeps the form in sync without a reload.
      await loadSettings();
    } catch (error) {
      console.error('[All in One Accessibility] Failed to save settings:', error);
      notifyError('Something went wrong while saving. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Page.Title>All in One Accessibility</Page.Title>
        <Page.Loading />
      </>
    );
  }

  const previewIcon = iconSrcFor(settings.widget_icon_type);

  return (
    <div className="aioa-plugin">
      <Page.Title>All in One Accessibility</Page.Title>
      <style>{aioaStyles}</style>

      <div className="set-width">
        <div className="all-in-one-accessibility-wrap">
          <div className="accessibility-settings">
            <div className="aioa-logo">
              <img src={allinoneaccessibilitylogo} alt="All in One Accessibility - Skynet Technologies" />
            </div>

            <div className="all-one-accessibility-form">
              {isFreeWidget && (
                <div id="free_plan_upgrade_block">
                  <svg className="aioa-bold-watermark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                    <path d="M12 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm7 7.5c0 .8-.6 1.5-1.5 1.5H15v3.2l2.4 6.4a1.2 1.2 0 0 1-2.2.9L13 15.5h-2L8.8 20.5a1.2 1.2 0 0 1-2.2-.9L9 13.2V10H6.5A1.5 1.5 0 0 1 5 8.5V8a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1.5z" />
                  </svg>
                  <div className="aioa-bold-inner">
                    <span className="aioa-bold-eyebrow">Free Plan Active</span>
                    <div className="aioa-bold-top">
                      <div className="aioa-bold-left">
                        <div className="aioa-bold-stat">With 24 Features</div>
                        <p className="aioa-bold-sub">
                          Upgrade to unlock <strong>90+ Premium Accessibility Features</strong> and make your
                          website even more inclusive.
                        </p>
                      </div>
                      <a href={UPGRADE_URL} target="_blank" rel="noopener noreferrer" className="aioa-bold-btn">
                        Upgrade to Paid Plan
                        <span className="visually-hidden"> (opens in a new tab)</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                    </div>
                    <span className="aioa-bold-trial">10 days free trial &middot; Cancel anytime</span>
                    <div className="aioa-bold-divider" />
                    <p className="aioa-bold-note" id="upgrade_html_notes">
                      <b>NOTE:</b> All in One Accessibility is dedicated to enhancing accessibility specifically for
                      websites and online stores.
                    </p>
                  </div>
                </div>
              )}

              {loadError && (
                <div className="form-text mb-3" role="alert" style={{ color: '#b02a37' }}>
                  {loadError}
                </div>
              )}

              <form id="widget-form" name="widget-form" onSubmit={onSubmit} noValidate>
                {/* Hex color code */}
                <div className="mb-3 row" id="colorcode_html">
                  <label htmlFor="colorcode" className="col-sm-3 col-form-label">
                    Hex color code:
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      name="colorcode"
                      className="form-control"
                      id="colorcode"
                      aria-describedby="colorcode-help"
                      value={settings.widget_color_code}
                      onChange={update('widget_color_code')}
                    />
                    <div className="form-text" id="colorcode-help">
                      You can customize the ADA Widget color. For example: FF5733
                    </div>
                  </div>
                </div>

                {/* Custom position */}
                <div className="icon-custom-position-wrapper aioa-section">
                  <label className="custom-switcher">
                    <span className="custom-switcher_right">
                      <input
                        type="checkbox"
                        role="switch"
                        id="custom-position-switcher"
                        className="custom-switcher_inp_2"
                        checked={settings.is_widget_custom_position}
                        onChange={update('is_widget_custom_position')}
                      />
                      <span className="custom-switcher_body" title="Toggle to override the selected position" />
                      <span className="custom-switcher_label">Enable precise accessibility widget icon position:</span>
                    </span>
                  </label>

                  {settings.is_widget_custom_position && (
                    <div className="custom-position-controls">
                      <div className="row">
                        <div className="col-auto">
                          <div className="input-group mb-3">
                            <input
                              type="number"
                              min={POSITION_MIN}
                              max={POSITION_MAX}
                              className="form-control"
                              id="custom_position_x_value"
                              aria-label="Horizontal offset in pixels"
                              aria-describedby="pos-value-input_1"
                              value={settings.custom_position_x}
                              onChange={updatePosition('custom_position_x')}
                            />
                            <span className="input-group-text" id="pos-value-input_1">PX</span>
                          </div>
                        </div>
                        <div className="col-auto">
                          <select
                            className="form-select"
                            id="custom_position_x_direction"
                            aria-label="Horizontal direction"
                            value={settings.custom_position_x_dir}
                            onChange={update('custom_position_x_dir')}
                          >
                            <option value={X_RIGHT}>To the right</option>
                            <option value={X_LEFT}>To the left</option>
                          </select>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-auto">
                          <div className="input-group mb-3">
                            <input
                              type="number"
                              min={POSITION_MIN}
                              max={POSITION_MAX}
                              className="form-control"
                              id="custom_position_y_value"
                              aria-label="Vertical offset in pixels"
                              aria-describedby="pos-value-input_2"
                              value={settings.custom_position_y}
                              onChange={updatePosition('custom_position_y')}
                            />
                            <span className="input-group-text" id="pos-value-input_2">PX</span>
                          </div>
                        </div>
                        <div className="col-auto">
                          <select
                            className="form-select"
                            id="custom_position_y_direction"
                            aria-label="Vertical direction"
                            value={settings.custom_position_y_dir}
                            onChange={update('custom_position_y_dir')}
                          >
                            <option value={Y_BOTTOM}>To the bottom</option>
                            <option value={Y_TOP}>To the top</option>
                          </select>
                        </div>
                      </div>
                      <div className="description">
                        {POSITION_MIN} - {POSITION_MAX}px are permitted values
                      </div>
                    </div>
                  )}
                </div>

                {/* Preset position */}
                {!settings.is_widget_custom_position && (
                  <fieldset className="mb-3 widget-position" id="position_html" style={{ border: 0, padding: 0, margin: '0 0 1rem' }}>
                    <legend className="col-form-label">
                      Where would you like to place the accessibility icon on your site?
                    </legend>
                    <div className="three-col">
                      {POSITIONS.map((p) => {
                        const id = `edit-position-${p.value.replace(/_/g, '-')}`;
                        return (
                          <div className="form-item mb-2" key={p.value}>
                            <input
                              type="radio"
                              id={id}
                              name="position"
                              value={p.value}
                              className="form-radio"
                              checked={settings.widget_position === p.value}
                              onChange={update('widget_position')}
                            />
                            <label htmlFor={id} className="option">{p.label}</label>
                          </div>
                        );
                      })}
                    </div>
                  </fieldset>
                )}

                {/* Widget size */}
                <fieldset className="mb-3" style={{ border: 0, padding: 0, margin: '0 0 1rem' }}>
                  <legend className="col-form-label">Select Widget Size:</legend>
                  {WIDGET_SIZES.map((s) => (
                    <div className="form-item mb-2" key={s.value}>
                      <input
                        type="radio"
                        id={s.id}
                        name="widget_size"
                        value={s.value}
                        className="form-radio"
                        aria-describedby="edit-widget-size--description"
                        checked={settings.widget_size === s.value}
                        onChange={update('widget_size')}
                      />
                      <label htmlFor={s.id} className="option">{s.label}</label>
                    </div>
                  ))}
                  <div className="description" id="edit-widget-size--description">
                    It only works on desktop view.
                  </div>
                </fieldset>

                {/* Icon type */}
                <fieldset className="icon-type-wrapper mb-3" id="select_icon_type" style={{ border: 0, padding: 0, margin: '0 0 1rem' }}>
                  <legend className="col-form-label">Select icon type:</legend>
                  <div className="row">
                    {ICON_TYPES.map((t, i) => (
                      <div className="col-auto mb-30" key={t.value}>
                        <div className="form-item" style={{ position: 'relative' }}>
                          <input
                            type="radio"
                            id={`edit-type-${i + 1}`}
                            name="aioa_icon_type"
                            value={t.value}
                            className="form-radio"
                            checked={settings.widget_icon_type === t.value}
                            onChange={update('widget_icon_type')}
                          />
                          <label htmlFor={`edit-type-${i + 1}`} className="option">
                            <img src={t.src} width="65" height="65" alt="" />
                            <span className="visually-hidden">{t.label}</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </fieldset>

                {/* Custom icon size */}
                <div className="icon-custom-size-wrapper aioa-section">
                  <label className="custom-switcher">
                    <span className="custom-switcher_right">
                      <input
                        type="checkbox"
                        role="switch"
                        id="custom-size-switcher"
                        className="custom-switcher_inp_2"
                        checked={settings.is_widget_custom_size}
                        onChange={update('is_widget_custom_size')}
                      />
                      <span className="custom-switcher_body" title="Toggle to override the selected size" />
                      <span className="custom-switcher_label">Enable icon custom size:</span>
                    </span>
                  </label>

                  {settings.is_widget_custom_size && (
                    <div className="custom-size-controls">
                      <label htmlFor="widget_icon_size_custom" className="col-form-label">
                        Select exact icon size:
                      </label>
                      <div className="input-group mb-2">
                        <input
                          type="number"
                          className="form-control"
                          id="widget_icon_size_custom"
                          name="widget_icon_size_custom"
                          min={SIZE_MIN}
                          max={SIZE_MAX}
                          aria-describedby="size-value-input_1 size-value-help"
                          value={settings.widget_icon_size_custom}
                          onChange={update('widget_icon_size_custom')}
                        />
                        <span className="input-group-text" id="size-value-input_1">PX</span>
                      </div>
                      <div className="description" id="size-value-help">
                        {SIZE_MIN} - {SIZE_MAX}px are permitted values
                      </div>
                    </div>
                  )}
                </div>

                {/* Preset icon size */}
                {!settings.is_widget_custom_size && (
                  <fieldset className="icon-size-wrapper widget-icon mb-3" id="select_icon_size" style={{ border: 0, padding: 0, margin: '0 0 1rem' }}>
                    <legend className="col-form-label">Select icon size for Desktop:</legend>
                    <div className="row">
                      {ICON_SIZES.map((s) => {
                        const id = `edit-size-${s.value.replace(/^aioa-|-icon$/g, '')}`;
                        return (
                          <div className="col-auto mb-30" key={s.value}>
                            <div className="form-item" style={{ position: 'relative' }}>
                              <input
                                type="radio"
                                id={id}
                                name="aioa_icon_size"
                                value={s.value}
                                className="form-radio"
                                checked={settings.widget_icon_size === s.value}
                                onChange={update('widget_icon_size')}
                              />
                              <label htmlFor={id} className="option">
                                <img src={previewIcon} width={s.px} height={s.px} alt="" />
                                <span className="visually-hidden">{s.label}</span>
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </fieldset>
                )}

                <div className="save-changes-btn">
                  <button type="submit" id="submit" className="btn btn-primary" disabled={isSaving} aria-busy={isSaving}>
                    {isSaving ? 'Saving…' : 'Save Changes'}
                  </button>
                </div>
                <div className="mt-3" id="save-changes-success">
                  <div className="form-text">
                    It may take a few seconds for changes to appear on your website. If you don&apos;t see the changes,
                    try clearing your browser cache or checking in a private browsing window.
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HomePage };
