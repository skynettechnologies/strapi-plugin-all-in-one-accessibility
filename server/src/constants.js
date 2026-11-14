/**
 * All in One Accessibility - server-side constants.
 * Ported from the reference app/config.js (AIOA_* constants).
 */

// Base URL of the API that stores widget registrations and settings
export const AIOA_API_BASE = 'https://ada.skynettechnologies.us/api/';

// Platform sent to the API when a free widget is registered
export const AIOA_PLATFORM = 'Strapi';

// User-Agent of the server's API calls: the API firewall rejects requests without one (HTTP 406)
export const AIOA_USER_AGENT = 'AIOA-Settings/1.0';

// Settings endpoint the widget itself reads; it returns the widget position for mobile
export const AIOA_WIDGET_SETTINGS_API = 'https://freeada.skynettechnologies.com/api/widget-settings';

// Plan details of a website: "manage_domain" (dashboard sign-in link) and "alt_count"
// (Alt Text Remediated image counts). POST "domain" (plain).
export const AIOA_CHECK_WEBSITE_API = 'https://ada.skynettechnologies.us/check-website';

// Seconds before a Skynet API call gives up
export const AIOA_HTTP_TIMEOUT = 30;

// Scan results of a domain. No trailing slash: ".../details/" answers with a 301 redirect.
export const AIOA_SCAN_API = 'https://skynetaccessibilityscan.com/api/ada-scanner/domain/details';

// Language of the scan texts
export const AIOA_SCAN_LANG = 'en';

// Score label by minimum score (checked from the top)
export const AIOA_SCORE_LEVELS = [
  [85, 'compliant', 'Compliant'],
  [50, 'semi', 'Semi Compliant'],
  [0, 'not', 'Not Compliant'],
];
