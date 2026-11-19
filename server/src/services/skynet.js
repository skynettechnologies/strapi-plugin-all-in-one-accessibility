/**
 * All in One Accessibility - API service (server side).
 * Ported from the reference app/skynet-widget.js.
 *
 * Loading never registers: fetchWidgetSettings answers {not_registered: true} for a new
 * website. The page then calls registerDomain once, with the EU flag (no_required_eu, from
 * ipapi.co in the browser) and the signed-in Strapi admin's name and email.
 *
 * Saving the widget settings is done by the browser directly (widget-setting-update-platform).
 * Uses Node's built-in fetch.
 */
import * as config from '../constants';

// Widget position for mobile (Paid Features): missing from widget-settings, see withMobileFields()
const MOBILE_FIELDS = [
  'is_mobile_position',
  'is_widget_custom_position_mobile',
  'widget_position_mobile',
  'widget_position_top_mobile',
  'widget_position_bottom_mobile',
  'widget_position_left_mobile',
  'widget_position_right_mobile',
  'widget_position_vertical_center_offset_mobile',
  'widget_position_horizontal_center_offset_mobile',
];

// Website host: a domain name such as "example.com", or "localhost". Same rule as the admin page.
const DOMAIN_RE = /^(?:localhost|(?=.{3,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63})$/;

// An email address the registration accepts (the same cases as PHP's FILTER_VALIDATE_EMAIL)
const EMAIL_RE =
  /^(?=.{1,254}$)(?=[^@]{1,64}@)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+(?![0-9]+$)[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/;

const INVALID_DOMAIN = 'A valid domain is required, for example example.com or localhost.';

/* ======================================================================= */
/* Validation helpers                                                      */
/* ======================================================================= */

/** Normalize user input such as "https://www.Example.com/shop" to "www.example.com". */
export function normalizeDomain(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/^[a-z][a-z0-9+.-]*:\/\//, '') // scheme
    .replace(/[/?#].*$/, '') // path, query, hash
    .replace(/:\d+$/, '') // port
    .replace(/^\.+|\.+$/g, '');
}

export function isValidDomain(domain) {
  return DOMAIN_RE.test(domain);
}

export function isValidEmail(email) {
  return EMAIL_RE.test(email);
}

/* ======================================================================= */
/* Actions                                                                 */
/* ======================================================================= */

/**
 * Load the widget settings of a domain. Never registers anything.
 * @returns settings | {not_registered: true} | {error}
 */
async function fetchWidgetSettings(req) {
  const url = normalizeDomain(req.url);
  if (!isValidDomain(url)) {
    return { error: INVALID_DOMAIN };
  }

  const data = await getSettingsData(url);
  if (data === false) {
    return { error: 'Unable to load widget settings. Please try again.' };
  }
  if (data === null) {
    return { not_registered: true };
  }
  return data;
}

/**
 * Register the free widget for a domain (add-user-domain), then wait for its settings.
 * widget-settings is checked again first, so a website that is already registered is never
 * registered twice, and nothing is registered when the API can't be reached.
 * @returns settings | {error, pending: true} | {error}
 */
async function registerDomain(req) {
  const url = normalizeDomain(req.url);
  if (!isValidDomain(url)) {
    return { error: INVALID_DOMAIN };
  }

  let data = await getSettingsData(url);

  // API not reachable: never register a website that may already be registered
  if (data === false) {
    return { error: 'Unable to load widget settings. Please try again.' };
  }

  if (data === null) {
    const noRequiredEu = req.no_required_eu === '0' ? '0' : '1';
    await register(url, req.username ?? '', req.email ?? '', noRequiredEu);
    data = await waitForSettings(url);
  }

  // Registered, but the settings did not appear yet: the page waits instead of registering again
  if (data === null) {
    return {
      error: 'Your website was registered, but its settings are not ready yet. Please try again in a moment.',
      pending: true,
    };
  }
  return data;
}

/**
 * Dashboard sign-in link of a paid plan: "manage_domain" from check-website.
 * Only the link is passed on; api_key and the rest stay on the server. Never log it.
 * @returns {link} | {error}
 */
async function getDashboardLink(req) {
  const url = normalizeDomain(req.url);
  if (!isValidDomain(url)) {
    return { error: INVALID_DOMAIN };
  }

  const res = await post(config.AIOA_CHECK_WEBSITE_API, { domain: url });
  if (res === null) {
    return { error: 'Unable to load the dashboard link right now.' };
  }

  const link = toStr(res.manage_domain);
  if (!/^https:\/\//i.test(link)) {
    return { error: 'No dashboard link was found for ' + url + '.' };
  }
  return { link };
}

/**
 * Accessibility Score tab: the scan results of a domain, trimmed to what the score card shows,
 * with Alt Text Remediated from check-website's alt_count (asked only when there are scan results).
 *
 * No finished results yet (the page shows "Scanning in progress"):
 *   not scanned yet  {"Data": [], "status": 404, "msg": "..."}
 *   scan running     {"Data": {...partial...}, "status": 201, "msg": "..."}
 * @returns score summary | {no_scan: true, in_progress, message} | {error}
 */
async function getScanDetails(req) {
  const url = normalizeDomain(req.url);
  if (!isValidDomain(url)) {
    return { error: 'Enter a valid domain, for example example.com or localhost' };
  }

  const res = await post(config.AIOA_SCAN_API, { lang_code: config.AIOA_SCAN_LANG, website: base64(url) });
  if (res === null) {
    return { error: 'Unable to load the accessibility score right now. Please try again.' };
  }

  const data = res.Data;
  const inProgress = toInt(res.status) === 201;
  if (inProgress || isEmpty(data) || typeof data !== 'object') {
    return { no_scan: true, in_progress: inProgress, message: toStr(res.msg) };
  }
  // Alt Text Remediated comes from check-website (alt_count)
  const site = await post(config.AIOA_CHECK_WEBSITE_API, { domain: url });

  return scoreSummary(Array.isArray(data) ? {} : data, site ? site.alt_count : null);
}

/* ======================================================================= */
/* Internal                                                                */
/* ======================================================================= */

/**
 * Register the free widget for a domain (add-user-domain).
 *   name            the admin's name, or the website when there is none
 *   email           the admin's email, or no-reply@<website> (without "www.")
 *   no_required_eu  '0' the admin is in the EU, '1' not in the EU
 *   aioa_icon_type, aioa_icon_size, aioa_icon_size_mb
 *                   the widget icon defaults for a new website: icon type 1, Medium size on desktop and mobile
 */
function register(url, name, email, noRequiredEu) {
  name = String(name).trim();
  email = String(email).trim();

  return apiPost('add-user-domain', {
    name: name !== '' ? name : url,
    email: isValidEmail(email) ? email : 'no-reply@' + url.replace(/^www\./, ''),
    company_name: '',
    website: base64(url),
    package_type: 'free-widget',
    start_date: new Date().toISOString().slice(0, 19) + '+0000', // UTC, e.g. 2026-11-02T09:30:00+0000
    end_date: '',
    price: '',
    discount_price: '0',
    platform: config.AIOA_PLATFORM,
    api_key: '',
    is_trial_period: '',
    is_free_widget: '1',
    no_required_eu: noRequiredEu,
    bill_address: '',
    country: '',
    state: '',
    city: '',
    post_code: '',
    transaction_id: '',
    subscr_id: '',
    payment_source: '',
    // Widget icon defaults for a new website: icon type 1, Medium size on desktop and mobile
    aioa_icon_type: 'aioa-icon-type-1',
    aioa_icon_size: 'aioa-medium-icon',
    aioa_icon_size_mb: 'aioa-medium-icon',
  });
}

/** Settings of a registered domain, null when not registered, false when the API failed. */
async function getSettingsData(url) {
  const res = await apiPost('widget-settings', { website_url: url });
  if (res === null) {
    return false;
  }
  const data = res.Data;
  if (isEmpty(data) || typeof data !== 'object' || Array.isArray(data)) {
    return null;
  }
  return withMobileFields(url, data);
}

/**
 * Add the widget position for mobile to the settings of a paid plan. widget-settings leaves
 * these fields out; the widget's own settings endpoint returns them. Fields widget-settings
 * already sent win. When the call fails the settings are returned as they are.
 */
async function withMobileFields(url, data) {
  // Same rule as the page: anything but is_free_widget = 1 is a paid plan
  if (toInt(data.is_free_widget) === 1) {
    return data;
  }

  const res = await post(config.AIOA_WIDGET_SETTINGS_API, { website_url: url });
  const widget = res ? res.Data : null;
  if (!isObject(widget)) {
    return data;
  }

  for (const field of MOBILE_FIELDS) {
    if (!Object.hasOwn(data, field) && Object.hasOwn(widget, field)) {
      data[field] = widget[field];
    }
  }
  return data;
}

/** Poll for the settings of a domain that was just registered (the API needs a moment to sync). */
async function waitForSettings(url, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = await getSettingsData(url);
    if (data && typeof data === 'object') {
      return data;
    }
  }
  return null;
}

/**
 * Score card values from the scanner's "Data":
 *   score       success_percentage, rounded, 0 - 99 (100 is shown as 99), labeled with AIOA_SCORE_LEVELS
 *   violations  fixed / total violations (summary)
 *   alt_text    images from check-website's alt_count (see altText())
 *   pages       scanned / selected pages
 * A check's total is its fixed plus its still open (total_error) violations.
 */
function scoreSummary(data, altCount) {
  // Up to 99, never 100: a scanner score of 100 is shown as 99
  const score = Math.max(0, Math.min(99, phpRound(toFloat(data.success_percentage))));

  let level = config.AIOA_SCORE_LEVELS[config.AIOA_SCORE_LEVELS.length - 1];
  for (const candidate of config.AIOA_SCORE_LEVELS) {
    if (score >= candidate[0]) {
      level = candidate;
      break;
    }
  }

  const groups = isObject(data.acessibility_voilation) ? data.acessibility_voilation : {}; // API spelling
  const checks = [...asList(groups.voilation_remediated), ...asList(groups.require_manual_action)];

  let fixed = 0;
  let total = 0;
  for (const check of checks) {
    if (!isObject(check)) continue;
    const checkFixed = toInt(check.total_fixed);
    fixed += checkFixed;
    total += checkFixed + toInt(check.total_error);
  }

  // The summary wins when the API sends it
  const summary = data.summary;
  if (isObject(summary) && summary.total_violations != null && summary.total_fixed != null) {
    fixed = toInt(summary.total_fixed);
    total = toInt(summary.total_violations);
  }

  const reportUrl = toStr(data.pdf_report_url);

  return {
    domain: toStr(data.domain),
    score,
    level: level[1],
    status: level[2],
    violations: ratio(fixed, total),
    alt_text: altText(altCount),
    pages: {
      scanned: toInt(data.total_scan_pages),
      total: toInt(data.total_selected_pages ?? data.total_pages ?? 0),
    },
    last_scan: toStr(data.last_scan),
    report_url: /^https:\/\//i.test(reportUrl) ? reportUrl : '',
  };
}

/**
 * Alt Text Remediated from check-website's alt_count. Only images with a missing alt tag
 * still need work:
 *   fixed  total_decorative_images + total_update_alt_text + total_other_images
 *   total  fixed + total_missing_alt_tag
 * No alt_count (check-website failed or sent none): 0 / 0.
 */
function altText(altCount) {
  const count = isObject(altCount) ? altCount : {};
  const images = (key) => Math.max(0, toInt(count[key]));

  const fixed = images('total_decorative_images') + images('total_update_alt_text') + images('total_other_images');
  return ratio(fixed, fixed + images('total_missing_alt_tag'));
}

/** {fixed: 38, total: 44, percentage: 86.36} */
function ratio(fixed, total) {
  return { fixed, total, percentage: total > 0 ? phpRound((fixed / total) * 100, 2) : 0 };
}

/** POST form fields to a Skynet API endpoint (relative to AIOA_API_BASE). */
function apiPost(endpoint, fields) {
  return post(config.AIOA_API_BASE + endpoint, fields);
}

/**
 * POST form fields to a URL and decode the JSON answer (also for 4xx answers with a JSON body).
 * null on a network / JSON error. Redirects are not followed; TLS certificates are verified.
 */
async function post(url, fields) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        // The API firewall rejects requests without a User-Agent (HTTP 406)
        'User-Agent': config.AIOA_USER_AGENT,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(fields).toString(),
      redirect: 'manual',
      signal: AbortSignal.timeout(config.AIOA_HTTP_TIMEOUT * 1000),
    });
    const decoded = JSON.parse(await response.text());
    return isObject(decoded) ? decoded : null;
  } catch {
    return null; // network error, timeout or not JSON
  }
}

/* ---------- Small conversions (API values may be numbers, numeric strings or null) ---------- */

function toFloat(value) {
  if (typeof value === 'boolean') return value ? 1 : 0;
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  if (typeof value === 'string') {
    const match = /^\s*[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/.exec(value);
    return match ? parseFloat(match[0]) : 0;
  }
  return 0;
}

function toInt(value) {
  const number = toFloat(value);
  return Number.isFinite(number) ? Math.trunc(number) : 0;
}

function toStr(value) {
  if (value === null || value === undefined || value === false || typeof value === 'object') return '';
  return value === true ? '1' : String(value);
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function asList(value) {
  return Array.isArray(value) ? value : [];
}

/** Empty like PHP's empty(): missing, null, false, 0, "", "0", [] or {} */
function isEmpty(value) {
  if (value === null || value === undefined || value === false || value === 0 || value === '' || value === '0') {
    return true;
  }
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/** Round half away from zero, like PHP's round() */
function phpRound(value, precision = 0) {
  const factor = 10 ** precision;
  const shifted = Number((Math.abs(value) * factor).toPrecision(15));
  const result = Math.floor(shifted + 0.5) / factor;
  return value < 0 ? -result : result;
}

function base64(value) {
  return Buffer.from(value, 'utf8').toString('base64');
}

export default () => ({
  fetchWidgetSettings,
  registerDomain,
  getDashboardLink,
  getScanDetails,
});
