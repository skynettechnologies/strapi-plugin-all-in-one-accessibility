/**
 * Styles for the All in One Accessibility settings page.
 *
 * Generated from the reference assets/css/*.css (tokens, base, components, banners,
 * settings, tabs, paid, score, responsive), with every selector scoped under
 * .aioa-plugin so nothing leaks into the Strapi admin. Changes from the reference:
 *   - :root -> .aioa-plugin, [data-theme="dark"] -> .aioa-plugin.aioa-dark
 *     (dark mode follows Strapi's theme, so the prefers-color-scheme block is dropped)
 *   - body keeps a transparent background (Strapi draws the page background)
 *   - toast and theme-toggle rules are dropped (Strapi notifications / Strapi theme are used)
 */
export const aioaStyles = `
/* ---- tokens.css ---- */
.aioa-plugin { --brand: #420083; --widget-color: #420083; --bg: #f4f4f6; --surface: #ffffff; --surface-2: #f7f7f9; --border: #dcdce2; --border-strong: #b9b9c3; --text: #1f1f24; --muted: #5f5f6b; --link: #420083; --accent: #420083; --accent-soft: #f3eefa; --focus: #6d28d9; --btn-primary: #420083; --btn-primary-hover: #33006a; --success: #15803d; --success-soft: #e8f5ec; --warning: #b45309; --warning-soft: #fdf3e2; --danger: #b42318; --radius: 10px; --radius-sm: 7px; --control-h: 42px; --shadow: 0 1px 2px rgba(0, 0, 0, .05); --check-white: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 12.5l4.5 4.5L19 7.5'/%3E%3C/svg%3E"); color-scheme: light; }
.aioa-plugin.aioa-dark { --bg: #141417; --surface: #1d1d21; --surface-2: #26262b; --border: #34343b; --border-strong: #4c4c55; --text: #ececf1; --muted: #a3a3ae; --link: #c4a8ff; --accent: #a78bfa; --accent-soft: rgba(167, 139, 250, .12); --focus: #c4a8ff; --btn-primary: #6d28d9; --btn-primary-hover: #5b21b6; --success: #4ade80; --success-soft: rgba(74, 222, 128, .12); --warning: #fbbf24; --warning-soft: rgba(251, 191, 36, .12); --danger: #f87171; --shadow: none; color-scheme: dark; }

/* ---- base.css ---- */
.aioa-plugin, .aioa-plugin *, .aioa-plugin *::before, .aioa-plugin *::after { box-sizing: border-box; }
.aioa-plugin [hidden] { display: none !important; }
.aioa-plugin { font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 15px; line-height: 1.5; color: var(--text); background: transparent; -webkit-font-smoothing: antialiased; }
.aioa-plugin h1, .aioa-plugin h2, .aioa-plugin h3, .aioa-plugin p { margin: 0; }
.aioa-plugin a { color: var(--link); }
.aioa-plugin button, .aioa-plugin input, .aioa-plugin select { font: inherit; color: inherit; }
.aioa-plugin :focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
.aioa-plugin .visually-hidden { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.aioa-plugin .aioa-page { max-width: 900px; margin: 0 auto; padding: 24px 20px 44px; }
.aioa-plugin .aioa-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 22px; padding-bottom: 18px; border-bottom: 1px solid var(--border); }
.aioa-plugin .aioa-brand { display: flex; align-items: center; gap: 12px; min-width: 0; }
.aioa-plugin .aioa-logo { width: 48px; height: 48px; flex-shrink: 0; }
.aioa-plugin .aioa-logo-circle { fill: var(--brand); }
.aioa-plugin .aioa-brand h1 { font-size: 22px; font-weight: 800; letter-spacing: -.01em; line-height: 1.2; }
.aioa-plugin .aioa-brand h1 sup { font-size: .55em; font-weight: 700; }
.aioa-plugin .aioa-brand p { font-size: 13.5px; color: var(--muted); }

/* ---- components.css ---- */
.aioa-plugin .aioa-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: var(--control-h); padding: 0 18px; border-radius: var(--radius-sm); border: 1px solid var(--border-strong); background: var(--surface); color: var(--text); font-weight: 600; text-decoration: none; white-space: nowrap; cursor: pointer; }
.aioa-plugin .aioa-btn:hover { background: var(--surface-2); }
.aioa-plugin .aioa-btn-primary { border-color: var(--btn-primary); background: var(--btn-primary); color: #fff; }
.aioa-plugin .aioa-btn-primary:hover { border-color: var(--btn-primary-hover); background: var(--btn-primary-hover); }
.aioa-plugin .aioa-btn[disabled] { opacity: .7; cursor: progress; }
.aioa-plugin .aioa-btn-icon { width: var(--control-h); padding: 0; }
.aioa-plugin .aioa-btn-icon svg { width: 20px; height: 20px; }
.aioa-plugin .aioa-spinner { width: 18px; height: 18px; flex-shrink: 0; border-radius: 50%; border: 2px solid currentColor; border-right-color: transparent; animation: aioa-spin .7s linear infinite; }
@keyframes aioa-spin { to { transform: rotate(360deg); } }
.aioa-plugin .aioa-card { min-width: 0; padding: 22px; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow); }
.aioa-plugin .aioa-card h2 { font-size: 17px; font-weight: 700; }
.aioa-plugin .aioa-desc { margin: 2px 0 18px; font-size: 14px; color: var(--muted); }
.aioa-plugin .aioa-fieldset { min-width: 0; margin: 0; padding: 0; border: 0; }
.aioa-plugin .aioa-label { font-weight: 600; }
.aioa-plugin .aioa-hint { margin-top: 7px; font-size: 13.5px; color: var(--muted); }
.aioa-plugin .aioa-error { margin-top: 7px; font-size: 13.5px; color: var(--danger); }
.aioa-plugin .aioa-select { width: 100%; height: var(--control-h); padding: 0 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-strong); background: var(--surface); color: var(--text); }
.aioa-plugin .aioa-select:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
.aioa-plugin .aioa-affix { display: flex; height: var(--control-h); overflow: hidden; border-radius: var(--radius-sm); border: 1px solid var(--border-strong); background: var(--surface); }
.aioa-plugin .aioa-affix:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
.aioa-plugin .aioa-affix.is-invalid { border-color: var(--danger); }
.aioa-plugin .aioa-affix input { flex: 1; min-width: 0; padding: 0 12px; border: 0; background: transparent; outline: none; }
.aioa-plugin .aioa-affix-text { display: grid; place-items: center; padding: 0 12px; background: var(--surface-2); color: var(--muted); }
.aioa-plugin .aioa-affix-text:first-child { border-right: 1px solid var(--border); }
.aioa-plugin .aioa-affix-text:last-child { border-left: 1px solid var(--border); }
.aioa-plugin input[type="checkbox"], .aioa-plugin input[type="radio"] { width: 18px; height: 18px; margin: 0; flex-shrink: 0; accent-color: var(--accent); }
.aioa-plugin .aioa-check { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 16px; cursor: pointer; }
.aioa-plugin .aioa-loading { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 88px 0; color: var(--muted); }
.aioa-plugin .aioa-error-card { display: grid; justify-items: center; gap: 9px; padding: 44px 22px; text-align: center; }
.aioa-plugin .aioa-error-card p { color: var(--muted); }

/* ---- banners.css ---- */
.aioa-plugin .aioa-notice { display: flex; align-items: center; flex-wrap: wrap; gap: 14px 24px; padding: 20px 22px; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow); }
.aioa-plugin .aioa-notice-body { flex: 1; min-width: 240px; }
.aioa-plugin .aioa-notice h2 { margin: 7px 0 3px; font-size: 18px; font-weight: 700; }
.aioa-plugin .aioa-notice-body p:last-child { color: var(--muted); }
.aioa-plugin .aioa-notice-action { display: flex; flex-direction: column; align-items: center; gap: 5px; }
.aioa-plugin .aioa-tag { display: inline-block; padding: 2px 9px; border-radius: 5px; font-size: 12.5px; font-weight: 600; background: var(--accent-soft); color: var(--accent); }
.aioa-plugin .aioa-tag.is-success { background: var(--success-soft); color: var(--success); }
.aioa-plugin .aioa-upgrade { position: relative; overflow: hidden; isolation: isolate; padding: 23px 26px 18px; border-radius: var(--radius); color: #fff; background: #420083; }
.aioa-plugin .aioa-upgrade-watermark { position: absolute; right: -35px; top: -27px; z-index: -1; width: 205px; height: 205px; opacity: .08; pointer-events: none; }
.aioa-plugin .aioa-upgrade-head { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 18px 24px; }
.aioa-plugin .aioa-upgrade-intro { flex: 1; min-width: 240px; }
.aioa-plugin .aioa-upgrade-intro > p:not(.aioa-upgrade-tag) { color: #e6dbff; }
.aioa-plugin .aioa-upgrade-intro strong { color: #fff; }
.aioa-plugin .aioa-upgrade h2 { margin: 10px 0 3px; font-size: 23px; font-weight: 700; }
.aioa-plugin .aioa-upgrade-tag { display: inline-flex; align-items: center; gap: 7px; padding: 2px 9px; border-radius: 5px; font-size: 12.5px; font-weight: 600; background: rgba(255, 255, 255, .14); color: #f0e8ff; }
.aioa-plugin .aioa-upgrade-tag i { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; }
.aioa-plugin .aioa-upgrade-points { display: flex; flex-wrap: wrap; gap: 5px 20px; margin: 12px 0 0; padding: 0; list-style: none; font-weight: 600; }
.aioa-plugin .aioa-upgrade-points li { display: flex; align-items: center; gap: 7px; }
.aioa-plugin .aioa-upgrade-points li::before { content: ""; width: 18px; height: 18px; flex-shrink: 0; border-radius: 50%; background: rgba(255, 255, 255, .2) var(--check-white) center / 11px no-repeat; }
.aioa-plugin .aioa-upgrade-cta { display: flex; flex-direction: column; align-items: center; gap: 7px; }
.aioa-plugin .aioa-upgrade-cta small { font-size: 12.5px; color: #dccbff; }
.aioa-plugin .aioa-btn-white { display: inline-flex; align-items: center; justify-content: center; gap: 9px; min-height: 44px; padding: 0 20px; border-radius: var(--radius-sm); background: #fff; color: #420083; font-weight: 700; text-decoration: none; white-space: nowrap; }
.aioa-plugin .aioa-btn-white:hover { background: #f3eefa; }
.aioa-plugin .aioa-btn-white svg { width: 17px; height: 17px; }
.aioa-plugin .aioa-upgrade-note { margin-top: 16px; padding-top: 13px; border-top: 1px solid rgba(255, 255, 255, .16); font-size: 13.5px; color: #d3c1f3; }
.aioa-plugin .aioa-upgrade-note b { color: #fff; }
.aioa-plugin .aioa-site { display: flex; align-items: flex-start; gap: 9px; margin: 14px 2px 0; color: var(--muted); }
.aioa-plugin .aioa-site strong { color: var(--text); font-weight: 600; word-break: break-all; }
.aioa-plugin .aioa-site-dot { width: 9px; height: 9px; flex-shrink: 0; margin-top: 7px; border-radius: 50%; background: var(--success); }
.aioa-plugin #site-text { min-width: 0; }

/* ---- settings.css ---- */
.aioa-plugin .aioa-form { display: grid; gap: 18px; margin-top: 18px; }
.aioa-plugin .aioa-columns { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); gap: 18px; }
.aioa-plugin .aioa-radio { position: absolute; width: 1px; height: 1px; margin: 0; opacity: 0; pointer-events: none; }
.aioa-plugin .aioa-choice { display: flex; align-items: center; gap: 10px; padding: 12px 14px; cursor: pointer; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); }
.aioa-plugin .aioa-choice:hover { border-color: var(--border-strong); }
.aioa-plugin .aioa-choice:has(input:checked) { border-color: var(--accent); background: var(--accent-soft); }
.aioa-plugin .aioa-card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.aioa-plugin .aioa-live { display: flex; align-items: center; gap: 9px; flex-shrink: 0; padding: 5px 14px 5px 5px; border: 1px solid var(--border); border-radius: 999px; background: var(--surface-2); }
.aioa-plugin .aioa-live-icon { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 50%; background: var(--widget-color); }
.aioa-plugin .aioa-live-icon img { width: 28px; height: 28px; object-fit: contain; }
.aioa-plugin .aioa-live-text { font-size: 11.5px; font-weight: 600; line-height: 1.2; letter-spacing: .04em; text-transform: uppercase; color: var(--muted); }
.aioa-plugin .aioa-color-row { display: flex; align-items: center; gap: 10px; }
.aioa-plugin .aioa-swatch { width: var(--control-h); height: var(--control-h); flex-shrink: 0; padding: 3px; cursor: pointer; border: 1px solid var(--border-strong); border-radius: var(--radius-sm); background: var(--surface); }
.aioa-plugin .aioa-swatch::-webkit-color-swatch-wrapper { padding: 0; }
.aioa-plugin .aioa-swatch::-webkit-color-swatch { border: 0; border-radius: 4px; }
.aioa-plugin .aioa-swatch::-moz-color-swatch { border: 0; border-radius: 4px; }
.aioa-plugin .aioa-hex { flex: 1; min-width: 0; max-width: 220px; }
.aioa-plugin .aioa-hex input { text-transform: uppercase; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
.aioa-plugin .aioa-presets { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }
.aioa-plugin .aioa-preset { width: 28px; height: 28px; padding: 0; border: 0; border-radius: 50%; cursor: pointer; background: var(--c); box-shadow: inset 0 0 0 1px rgba(128, 128, 128, .35); }
.aioa-plugin .aioa-preset[aria-pressed="true"] { box-shadow: 0 0 0 2px var(--surface), 0 0 0 4px var(--c); }
.aioa-plugin .aioa-size-options { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.aioa-plugin .aioa-size-choice { flex-direction: column; align-items: stretch; gap: 12px; padding: 14px; }
.aioa-plugin .aioa-choice-text { display: flex; align-items: center; gap: 9px; font-weight: 600; }
.aioa-plugin .aioa-panel { align-self: center; display: flex; flex-direction: column; gap: 5px; height: 90px; padding-bottom: 5px; overflow: hidden; border: 1px solid var(--border-strong); border-radius: 5px; background: var(--surface); }
.aioa-plugin .aioa-panel.is-regular { width: 58px; }
.aioa-plugin .aioa-panel.is-over { width: 84px; }
.aioa-plugin .aioa-panel-head { flex-shrink: 0; height: 12px; background: var(--widget-color); }
.aioa-plugin .aioa-panel-grid { display: grid; gap: 3px; padding: 0 5px; }
.aioa-plugin .is-regular .aioa-panel-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.aioa-plugin .is-over .aioa-panel-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.aioa-plugin .aioa-panel-grid i { aspect-ratio: 1.2; border-radius: 2px; border: 1px solid var(--border); background: var(--surface-2); }
.aioa-plugin .aioa-pos-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.aioa-plugin .aioa-pos-option { position: relative; min-width: 0; }
.aioa-plugin .aioa-pos-label { display: flex; align-items: center; gap: 12px; height: 100%; min-height: 60px; padding: 9px 14px; cursor: pointer; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--surface); font-weight: 600; }
.aioa-plugin .aioa-pos-label:hover { border-color: var(--border-strong); }
.aioa-plugin .aioa-radio:checked + .aioa-pos-label { border-color: var(--accent); background: var(--accent-soft); color: var(--accent); }
.aioa-plugin .aioa-radio:focus-visible + .aioa-pos-label { outline: 2px solid var(--focus); outline-offset: 2px; }
.aioa-plugin .aioa-glyph { position: relative; flex-shrink: 0; width: 28px; height: 20px; border: 1.5px solid currentColor; border-radius: 5px; opacity: .5; }
.aioa-plugin .aioa-glyph i { position: absolute; width: 7px; height: 7px; border-radius: 50%; background: currentColor; left: calc(2px + var(--gx) * (100% - 11px)); top: calc(2px + var(--gy) * (100% - 11px)); }
.aioa-plugin .aioa-radio:checked + .aioa-pos-label .aioa-glyph { opacity: 1; }
.aioa-plugin .aioa-pos-center { position: relative; overflow: hidden; min-height: 60px; color: var(--muted); border: 1px solid var(--border-strong); border-radius: var(--radius-sm); background: var(--surface-2); }
.aioa-plugin .aioa-mini-label { position: absolute; top: 0; left: 0; right: 0; height: 15px; overflow: hidden; white-space: nowrap; background: var(--border); font-size: 10.5px; line-height: 15px; text-align: center; }
.aioa-plugin .aioa-mini-widget { position: absolute; z-index: 1; display: grid; place-items: center; width: 24px; height: 24px; border-radius: 50%; background: var(--widget-color); box-shadow: 0 2px 4px rgba(0, 0, 0, .3); left: calc(6px + var(--gx) * (100% - 36px)); top: calc(19px + var(--gy) * (100% - 47px)); transition: left .3s ease, top .3s ease; }
.aioa-plugin .aioa-mini-widget img { display: block; width: 16px; height: 16px; object-fit: contain; }
.aioa-plugin .aioa-subpanel { display: grid; gap: 12px; padding: 16px; border-radius: var(--radius-sm); background: var(--surface-2); border: 1px solid var(--border); }
.aioa-plugin .aioa-subpanel .aioa-hint { margin-top: 0; }
.aioa-plugin .aioa-offset-row { display: grid; grid-template-columns: 105px 140px minmax(0, 175px); align-items: center; gap: 10px; }
.aioa-plugin .aioa-size-input { max-width: 170px; }
.aioa-plugin .aioa-icon-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(64px, 1fr)); gap: 12px; }
.aioa-plugin .aioa-icon-option { position: relative; }
.aioa-plugin .aioa-icon-label { display: grid; justify-items: center; gap: 7px; cursor: pointer; }
.aioa-plugin .aioa-icon { position: relative; display: grid; place-items: center; width: 60px; aspect-ratio: 1; border-radius: 50%; background: var(--widget-color); }
.aioa-plugin .aioa-icon img { width: 62%; height: 62%; object-fit: contain; pointer-events: none; }
.aioa-plugin .aioa-radio:checked + .aioa-icon-label .aioa-icon { box-shadow: 0 0 0 3px var(--surface), 0 0 0 5px var(--accent); }
.aioa-plugin .aioa-radio:checked + .aioa-icon-label .aioa-icon::after { content: ""; position: absolute; top: -6px; right: -6px; width: 21px; height: 21px; border-radius: 50%; background: var(--btn-primary) var(--check-white) center / 12px no-repeat; box-shadow: 0 0 0 2px var(--surface); }
.aioa-plugin .aioa-radio:focus-visible + .aioa-icon-label .aioa-icon { outline: 2px solid var(--focus); outline-offset: 7px; }
.aioa-plugin .aioa-icon-caption { font-size: 13.5px; color: var(--muted); }
.aioa-plugin .aioa-radio:checked + .aioa-icon-label .aioa-icon-caption { color: var(--text); font-weight: 600; }
.aioa-plugin .aioa-size-row { --scale: 1; display: flex; flex-wrap: wrap; align-items: flex-end; gap: 14px 22px; }
.aioa-plugin .aioa-size-row .aioa-icon { width: calc(var(--d) * var(--scale)); }
.aioa-plugin .aioa-savebar { position: sticky; bottom: 14px; z-index: 10; display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 12px 14px 12px 20px; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--border); box-shadow: 0 4px 16px rgba(0, 0, 0, .08); }
.aioa-plugin .aioa-save-state { display: flex; align-items: center; gap: 9px; font-weight: 500; color: var(--muted); }
.aioa-plugin .aioa-save-state i { width: 9px; height: 9px; flex-shrink: 0; border-radius: 50%; background: var(--success); }
.aioa-plugin .aioa-savebar.is-dirty .aioa-save-state { color: var(--text); }
.aioa-plugin .aioa-savebar.is-dirty .aioa-save-state i { background: #d97706; }
.aioa-plugin .aioa-after-note { font-size: 13.5px; color: var(--muted); text-align: center; }

/* ---- tabs.css ---- */
.aioa-plugin .aioa-tabs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 5px; margin-top: 22px; padding: 5px; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow); }
.aioa-plugin .aioa-tab { display: flex; align-items: center; justify-content: center; gap: 9px; min-width: 0; min-height: var(--control-h); padding: 6px 12px; border: 0; border-radius: var(--radius-sm); background: none; color: var(--muted); font-weight: 600; text-align: center; cursor: pointer; }
.aioa-plugin .aioa-tab:hover { background: var(--surface-2); color: var(--text); }
.aioa-plugin .aioa-tab[aria-selected="true"] { background: var(--btn-primary); color: #fff; }
.aioa-plugin .aioa-tab-lock { display: inline-grid; place-items: center; width: 20px; height: 20px; flex-shrink: 0; border-radius: 50%; background: var(--warning-soft); color: var(--warning); }
.aioa-plugin .aioa-tab-lock svg { width: 12px; height: 12px; }
.aioa-plugin .aioa-tab[aria-selected="true"] .aioa-tab-lock { background: rgba(255, 255, 255, .2); color: #fff; }
.aioa-plugin .aioa-tabpanel, .aioa-plugin .aioa-stack { display: grid; gap: 18px; min-width: 0; }
.aioa-plugin .aioa-tabpanel:focus-visible { outline-offset: 6px; border-radius: var(--radius); }
.aioa-plugin #save-area { display: contents; }
.aioa-plugin .aioa-lockable { position: relative; }
.aioa-plugin .aioa-lockable.is-locked .aioa-lock-content { filter: blur(5px); opacity: .6; pointer-events: none; user-select: none; }
.aioa-plugin .aioa-lock { position: absolute; inset: 0; z-index: 5; padding: 64px 16px 16px; }
.aioa-plugin .aioa-lock.is-center { display: grid; place-items: center; padding: 16px; }
.aioa-plugin .aioa-lock-card { position: sticky; top: 96px; display: grid; justify-items: center; gap: 14px; max-width: 520px; margin: 0 auto; padding: 28px 28px 26px; text-align: center; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--border); box-shadow: 0 16px 40px rgba(0, 0, 0, .14); }
.aioa-plugin .aioa-lock-icon { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 50%; background: var(--accent-soft); color: var(--accent); }
.aioa-plugin .aioa-lock-icon svg { width: 20px; height: 20px; }
.aioa-plugin .aioa-lock-text { font-size: 19px; font-weight: 700; line-height: 1.35; }

/* ---- paid.css ---- */
.aioa-plugin .aioa-feature-title { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; font-size: 17px; font-weight: 700; }
.aioa-plugin .aioa-feature-title label { cursor: pointer; }
.aioa-plugin .aioa-feature-icon { display: grid; place-items: center; width: 32px; height: 32px; flex-shrink: 0; border-radius: var(--radius-sm); background: var(--btn-primary); color: #fff; }
.aioa-plugin .aioa-feature-icon svg { width: 18px; height: 18px; }
.aioa-plugin .aioa-affix-icon { display: grid; place-items: center; padding-left: 13px; color: var(--muted); }
.aioa-plugin .aioa-affix-icon svg { width: 18px; height: 18px; }
.aioa-plugin .aioa-link-input input { padding-left: 10px; }
.aioa-plugin .aioa-pair { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
.aioa-plugin .aioa-toggle-card { display: flex; align-items: center; gap: 14px; padding: 18px 22px; font-weight: 600; cursor: pointer; }
.aioa-plugin .aioa-toggle-card:hover { border-color: var(--border-strong); }
.aioa-plugin input[type="checkbox"].aioa-switch { -webkit-appearance: none; appearance: none; position: relative; width: 42px; height: 24px; margin: 0; flex-shrink: 0; border-radius: 999px; background: var(--border-strong); cursor: pointer; transition: background-color .15s ease; }
.aioa-plugin .aioa-switch::before { content: ""; position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; box-shadow: 0 1px 2px rgba(0, 0, 0, .3); transition: transform .15s ease; }
.aioa-plugin input[type="checkbox"].aioa-switch:checked { background: var(--btn-primary); }
.aioa-plugin .aioa-switch:checked::before { transform: translateX(18px); }
@media (forced-colors: active) {
  .aioa-plugin input[type="checkbox"].aioa-switch { border: 1px solid CanvasText; }
  .aioa-plugin .aioa-switch::before { background: CanvasText; }
  .aioa-plugin input[type="checkbox"].aioa-switch:checked { background: Highlight; }
}
.aioa-plugin .aioa-switch-head { display: flex; align-items: center; gap: 14px; }
.aioa-plugin .aioa-switch-head h2 label { cursor: pointer; }
.aioa-plugin #mobile-position-body { margin-top: 18px; }
.aioa-plugin .aioa-glyph.is-phone { width: 16px; height: 24px; border-radius: 4px; }

/* ---- score.css ---- */
.aioa-plugin .aioa-score { --level: var(--success); }
.aioa-plugin .aioa-score[data-level="semi"] { --level: var(--warning); }
.aioa-plugin .aioa-score[data-level="not"] { --level: var(--danger); }
.aioa-plugin .aioa-score-head h2 { font-size: 18px; }
.aioa-plugin .aioa-score-status { margin-top: 2px; font-weight: 700; color: var(--level); }
.aioa-plugin .aioa-score-body { display: flex; align-items: center; gap: 28px; margin-top: 18px; }
.aioa-plugin .aioa-donut { position: relative; width: 124px; height: 124px; flex-shrink: 0; }
.aioa-plugin .aioa-donut svg { display: block; width: 100%; height: 100%; transform: rotate(-90deg); }
.aioa-plugin .aioa-donut circle { fill: none; stroke-width: 13; }
.aioa-plugin .aioa-donut-track { stroke: var(--border); }
.aioa-plugin .aioa-donut-bar { stroke: var(--level); stroke-dasharray: var(--p) 100; transition: stroke-dasharray .6s ease; }
.aioa-plugin .aioa-donut-value { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 1px; }
.aioa-plugin .aioa-donut-value b { font-size: 30px; font-weight: 800; line-height: 1; }
.aioa-plugin .aioa-donut-value small { margin-top: 8px; font-size: 14px; font-weight: 700; }
.aioa-plugin .aioa-score-stats { flex: 1; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.aioa-plugin .aioa-stat { min-width: 0; padding: 2px 18px; border-left: 1px solid var(--border); }
.aioa-plugin .aioa-stat:first-child { padding-left: 0; border-left: 0; }
.aioa-plugin .aioa-stat-value { font-size: 26px; font-weight: 800; line-height: 1.15; }
.aioa-plugin .aioa-stat-label { margin-top: 3px; font-size: 13.5px; font-weight: 600; line-height: 1.3; }
.aioa-plugin .aioa-stat-count { margin-top: 6px; font-size: 13.5px; color: var(--muted); }
.aioa-plugin .aioa-score-foot { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 6px 16px; margin-top: 18px; padding-top: 14px; border-top: 1px solid var(--border); font-size: 13.5px; color: var(--muted); }
.aioa-plugin .aioa-score-foot a { font-weight: 600; }

/* ---- responsive.css ---- */
@media (max-width: 720px) {
  .aioa-plugin .aioa-columns, .aioa-plugin .aioa-pair { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .aioa-plugin .aioa-page { padding: 16px 16px 36px; }
  .aioa-plugin .aioa-logo { width: 42px; height: 42px; }
  .aioa-plugin .aioa-brand h1 { font-size: 18px; }
  .aioa-plugin .aioa-card { padding: 18px; }
  .aioa-plugin .aioa-notice { padding: 18px; }
  .aioa-plugin .aioa-notice-action { width: 100%; }
  .aioa-plugin .aioa-notice-action .aioa-btn { width: 100%; }
  .aioa-plugin .aioa-upgrade { padding: 18px 18px 16px; }
  .aioa-plugin .aioa-upgrade h2 { font-size: 21px; }
  .aioa-plugin .aioa-upgrade-cta, .aioa-plugin .aioa-btn-white { width: 100%; }
  .aioa-plugin .aioa-pos-label { flex-direction: column; justify-content: center; gap: 5px; padding: 9px 4px; font-size: 13px; text-align: center; }
  .aioa-plugin .aioa-live { padding: 4px; }
  .aioa-plugin .aioa-live-text { display: none; }
  .aioa-plugin .aioa-offset-row { grid-template-columns: 1fr 1fr; }
  .aioa-plugin .aioa-offset-row .aioa-label { grid-column: 1 / -1; }
  .aioa-plugin .aioa-icon-grid { grid-template-columns: repeat(auto-fill, minmax(52px, 1fr)); gap: 10px; }
  .aioa-plugin .aioa-icon-grid .aioa-icon { width: 48px; }
  .aioa-plugin .aioa-size-row { --scale: .7; gap: 12px 10px; }
  .aioa-plugin .aioa-size-row .aioa-icon-caption { font-size: 12.5px; }
  .aioa-plugin .aioa-tabs { gap: 4px; padding: 4px; }
  .aioa-plugin .aioa-tab { position: relative; min-height: 54px; padding: 8px 6px; font-size: 13px; line-height: 1.25; }
  .aioa-plugin .aioa-tab-lock { position: absolute; top: 4px; right: 4px; width: 18px; height: 18px; }
  .aioa-plugin .aioa-feature-title { font-size: 16px; }
  .aioa-plugin .aioa-toggle-card { padding: 16px 18px; }
  .aioa-plugin .aioa-lock { padding: 40px 10px 10px; }
  .aioa-plugin .aioa-lock-card { padding: 22px 18px; }
  .aioa-plugin .aioa-lock-text { font-size: 17px; }
  .aioa-plugin .aioa-score-body { flex-direction: column; gap: 20px; }
  .aioa-plugin .aioa-score-stats { width: 100%; }
  .aioa-plugin .aioa-stat { padding: 0 10px; }
  .aioa-plugin .aioa-stat-value { font-size: 20px; }
  .aioa-plugin .aioa-stat-label, .aioa-plugin .aioa-stat-count { font-size: 12.5px; }
}
@media (max-width: 420px) {
  .aioa-plugin .aioa-size-row { justify-content: space-between; column-gap: 6px; }
}
@media (prefers-reduced-motion: reduce) {
  .aioa-plugin, .aioa-plugin *, .aioa-plugin *::before, .aioa-plugin *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
`;