/**
 * All in One Accessibility - fixed values used by the settings page.
 * Ported from the reference app/config.js (AIOA_* constants).
 */

// Default widget color (hex without "#") and "Reset" color
export const DEFAULT_COLOR = '420083';

// Saving is done by the browser, straight to the Skynet API (reference: assets/js/save.js)
export const API_UPDATE_URL = 'https://ada.skynettechnologies.us/api/widget-setting-update-platform';

// EU check, called by the browser once, only right before a new website is registered
export const GEO_API_URL = 'https://ipapi.co/json';
export const GEO_TIMEOUT = 8000; // ms

// "Upgrade to Paid Plan" (banner and paid tab locks)
export const UPGRADE_URL = 'https://ada.skynettechnologies.us/trial-subscription';

// Number of icon types (aioa-icon-type-1 ... 29)
export const ICON_TYPE_COUNT = 29;

// Widget positions as a 3 x 3 grid: [API value, label, horizontal 0/.5/1, vertical 0/.5/1].
// null is the center cell with the preview. Older saves may hold "middel_left" / "middel_right";
// they load as the same cell (positionValue in utils.js) and are saved as "middle_*".
export const POSITIONS = [
  ['top_left', 'Top left', 0, 0],
  ['top_center', 'Top center', 0.5, 0],
  ['top_right', 'Top right', 1, 0],
  ['middle_left', 'Middle left', 0, 0.5],
  null,
  ['middle_right', 'Middle right', 1, 0.5],
  ['bottom_left', 'Bottom left', 0, 1],
  ['bottom_center', 'Bottom center', 0.5, 1],
  ['bottom_right', 'Bottom right', 1, 1],
];

// Icon sizes for desktop: [API value, label, preview diameter in px]
export const ICON_SIZES = [
  ['aioa-big-icon', 'Big', 84],
  ['aioa-medium-icon', 'Medium', 74],
  ['aioa-default-icon', 'Default', 64],
  ['aioa-small-icon', 'Small', 54],
  ['aioa-extra-small-icon', 'Extra small', 44],
];

// Widget size: [value, element id, label, css modifier, feature tiles in the outline]
export const WIDGET_SIZES = [
  ['0', 'edit-widget-size-regularsize', 'Regular Size', 'is-regular', 6],
  ['1', 'edit-widget-size-oversize', 'Oversize', 'is-over', 9],
];

// Preset colors: [hex, name]
export const PRESET_COLORS = [
  ['420083', 'Purple (default)'],
  ['1D4ED8', 'Blue'],
  ['0E7490', 'Teal'],
  ['15803D', 'Green'],
  ['B91C1C', 'Red'],
  ['C2410C', 'Orange'],
  ['BE185D', 'Pink'],
  ['111827', 'Charcoal'],
];

// Ranges enforced by the page
export const OFFSET_MAX = 500;
export const SIZE_MIN = 24;
export const SIZE_MAX = 150;

// Tab order per plan (reference: ORDER in assets/js/tabs.js)
export const TABS = {
  appearance: { label: 'Appearance Design', locked: false },
  paid: { label: 'Paid Features', locked: true },
  score: { label: 'Accessibility Score', locked: true },
};
export const TAB_ORDER = {
  paid: ['score', 'paid', 'appearance'],
  free: ['appearance', 'paid', 'score'],
};

// Browser storage keys
export const STORAGE_TAB = 'aioa-tab-picked';
export const STORAGE_REGISTERED = 'aioa-registered:';
export const REGISTER_AGAIN_AFTER = 10 * 60 * 1000; // ms

// Highest score the card shows: 100 is shown as 99 (the server's summary is capped the same way)
export const SCORE_MAX = 99;

// Score levels shown by the card (the server decides the level)
export const SCORE_LEVELS = ['compliant', 'semi', 'not'];

// Accessibility figure: header logo and banner watermark (SVG path, 69 x 69 view box)
export const LOGO_PATH =
  'M34.38,0A34.394,34.394,0,1,1,10.072,10.073,34.394,34.394,0,0,1,34.38,0Zm-.218,41.511-5,13.839a2.752,2.752,0,0,1-1.443,1.583A2.8,2.8,0,0,1,24,55.59a2.832,2.832,0,0,1-.1-2.149l3.491-9.667a14.235,14.235,0,0,0,.654-2.239,23.446,23.446,0,0,0,.3-2.361c.134-1.416.229-2.949.3-4.421s.125-2.9.163-4.08c.05-1.472-.346-1.567-1.527-1.846l-.25-.056-10.073-1.9a2.8,2.8,0,1,1,1.018-5.484L28.8,23.421c.431.039.85.09,1.293.14a32.187,32.187,0,0,0,4.017.3,45.275,45.275,0,0,0,5-.353c.5-.056.979-.118,1.455-.163l10.212-1.914a2.764,2.764,0,0,1,2.848,4.281v.034a2.8,2.8,0,0,1-1.8,1.169l-9.782,1.836c-.325.073-.615.125-.875.163-1.018.174-1.522.263-1.461,1.712.045,1.058.174,2.323.341,3.643.2,1.55.453,3.2.722,4.7a22.945,22.945,0,0,0,.559,2.546c.224.76.441,1.538.778,2.474l3.409,9.457a2.8,2.8,0,1,1-5.253,1.909l-5.02-13.814-.559-1.024-.559,1Zm.218-29.949a4.942,4.942,0,1,1-3.487,1.446,4.942,4.942,0,0,1,3.487-1.446ZM54.722,14.04a28.774,28.774,0,1,0,8.393,20.341A28.774,28.774,0,0,0,54.722,14.04Z';