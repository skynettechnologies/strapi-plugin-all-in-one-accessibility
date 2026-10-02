/**
 * Skynet Technologies API calls.
 * Ported from the reference implementation (functions.php / route.php / index.php).
 */
const API_BASE = 'https://ada.skynettechnologies.us/api';
export const UPGRADE_URL = 'https://ada.skynettechnologies.us/trial-subscription';

const postForm = async (endpoint, fields) => {
  const body = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    // Matches jQuery's serialisation of null/undefined as an empty string.
    body.append(key, value === null || value === undefined ? '' : String(value));
  });
  const response = await fetch(`${API_BASE}/${endpoint}`, { method: 'POST', body });
  if (!response.ok) {
    throw new Error(`${endpoint} failed with HTTP ${response.status}`);
  }
  return response.json();
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Register this website as a free widget (reference: SkynetWidget::getWidgetInfo).
 */
export const registerWebsite = ({ url, username, email }) =>
  postForm('add-user-domain', {
    name: username || url,
    email: email || '',
    company_name: '',
    website: btoa(url),
    package_type: 'free-widget',
    start_date: new Date().toISOString(),
    end_date: '',
    price: '',
    discount_price: '0',
    platform: 'strapi',
    api_key: '',
    is_trial_period: '',
    is_free_widget: '1',
    bill_address: '',
    country: '',
    state: '',
    city: '',
    post_code: '',
    transaction_id: '',
    subscr_id: '',
    payment_source: '',
  });

const hasData = (res) => res && res.Data && Object.keys(res.Data).length > 0;

/**
 * Fetch widget settings; if the site is unknown, register it and retry once
 * (reference: SkynetWidget::fetchWidgetSettings, which retried without a limit).
 */
export const fetchWidgetSettings = async (user) => {
  let res = await postForm('widget-settings', { website_url: user.url });
  if (hasData(res)) return res.Data;

  await registerWebsite(user);
  await wait(1000);
  res = await postForm('widget-settings', { website_url: user.url });
  return hasData(res) ? res.Data : null;
};

/**
 * Save widget settings (reference: #submit click handler).
 */
export const saveWidgetSettings = (params) =>
  postForm('widget-setting-update-platform', params);
