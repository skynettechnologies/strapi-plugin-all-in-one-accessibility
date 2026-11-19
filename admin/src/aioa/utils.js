/**
 * Helpers ported from the reference assets/js/core.js (AIOA.util, AIOA.storage)
 * and assets/js/paid-features.js / score.js.
 */

// Website host: a domain name or "localhost", never an IP address (same rule as the server)
export const DOMAIN_RE = /^(?:localhost|(?=.{3,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63})$/;

/** "https://www.Example.com/shop" -> "www.example.com" */
export const normalizeDomain = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/^[a-z][a-z0-9+.-]*:\/\//, '') // scheme
    .replace(/[/?#].*$/, '') // path, query, hash
    .replace(/:\d+$/, '') // port
    .replace(/^\.+|\.+$/g, '');

/** "#abc" / "aabbcc" -> "AABBCC", or null when the value is not a hex color */
export const parseHex = (value) => {
  let hex = String(value || '')
    .trim()
    .replace(/^#/, '');
  if (/^[0-9a-f]{3}$/i.test(hex)) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }
  return /^[0-9a-f]{6}$/i.test(hex) ? hex.toUpperCase() : null;
};

/** Older saves use "middel_left" / "middel_right"; the grid uses "middle_*" */
export const positionValue = (value) => String(value || '').replace(/^middel_/, 'middle_');

/** Whole number from a field or API value ("40", 40.7, "0.500" -> 40, 40, 0); fallback when empty or not a number */
export const wholeNumber = (value, fallback) => {
  if (value === null || value === undefined || String(value).trim() === '') {
    return fallback;
  }
  const number = Math.trunc(Number(value));
  return Number.isFinite(number) ? number : fallback;
};

export const isOn = (value) => Number(value) === 1;
export const isSet = (value) => value !== null && value !== undefined && value !== '';
export const num = (value) => Number(value) || 0;

/** localStorage that never throws (storage may be blocked) */
export const storage = {
  get(key) {
    try {
      return window.localStorage.getItem(key) || '';
    } catch {
      return '';
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* storage blocked */
    }
  },
  remove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* storage blocked */
    }
  },
};

/** "www.example.com/page" -> "https://www.example.com/page" (links typed without a scheme) */
export const withScheme = (value) => {
  const text = String(value || '').trim();
  if (text && !/^[a-z][a-z0-9+.-]*:/i.test(text) && /^[^\s/]+\.[^\s/]+/.test(text)) {
    return 'https://' + text;
  }
  return text;
};

/** Empty, or an http(s) link to a real domain */
export const isValidLink = (value) => {
  if (!value) return true;
  try {
    const url = new URL(value);
    return (url.protocol === 'https:' || url.protocol === 'http:') && url.hostname.includes('.');
  } catch {
    return false;
  }
};

/** 96.15 -> "96.15%", 100 -> "100%" */
export const percent = (value) => Math.round((Number(value) || 0) * 100) / 100 + '%';

/** "2026-06-27 05:24:30" (UTC) -> "Jun 27, 2026" */
export const formatDate = (value) => {
  const date = new Date(String(value).replace(' ', 'T') + 'Z');
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
};

/** Element id slug: "top_left" -> "top-left", "aioa-extra-small-icon" -> "extra-small" */
export const slug = (value) => value.replaceAll('aioa-', '').replaceAll('-icon', '').replaceAll('_', '-');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * "Upgrade to Paid Plan" link with what the trial form can fill in (reference: upgradeLinks in
 * assets/js/plan.js), for example
 *   …/trial-subscription?website=example.com&email=dev@example.com&first_name=Jane&last_name=Doe
 * email only when valid; first_name / last_name are the Strapi admin's first and last name.
 * Empty values are left out; with nothing to add, the plain link is returned.
 */
export const upgradeUrl = (base, { website, email, firstname, lastname } = {}) => {
  const text = (value) => String(value || '').trim();
  const mail = text(email);
  const query = [
    ['website', text(website)],
    ['email', EMAIL_RE.test(mail) ? mail : ''],
    ['first_name', text(firstname)],
    ['last_name', text(lastname)],
  ]
    .filter((pair) => pair[1] !== '')
    .map((pair) => pair[0] + '=' + encodeURIComponent(pair[1]).replace(/%40/g, '@'))
    .join('&');
  return query ? base + (base.includes('?') ? '&' : '?') + query : base;
};
