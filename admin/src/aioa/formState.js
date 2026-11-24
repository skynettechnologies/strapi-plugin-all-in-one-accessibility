/**
 * Settings <-> form state, and the parameters for widget-setting-update-platform.
 * Ported from the reference assets/js/settings-form.js (settingsFrom, fill, collect)
 * and assets/js/paid-features.js (fill, collect). Pure functions, no DOM.
 */
import { DEFAULT_COLOR, ICON_SIZES, OFFSET_MAX, POSITIONS, SIZE_MAX, SIZE_MIN } from './constants';
import { ICON_TYPES } from './icons';
import { isOn, isSet, isValidLink, parseHex, positionValue, wholeNumber, withScheme } from './utils';

const POSITION_VALUES = POSITIONS.filter(Boolean).map((p) => p[0]);
const ICON_SIZE_VALUES = ICON_SIZES.map((s) => s[0]);
const ICON_TYPE_VALUES = ICON_TYPES.map((t) => t.value);

/** Value when it is one of the options, otherwise the fallback (like checkRadio ignoring unknown values) */
const oneOf = (value, options, fallback) => (options.includes(value) ? value : fallback);

export const X_RIGHT = 'cust-pos-to-the-right';
export const X_LEFT = 'cust-pos-to-the-left';
export const Y_BOTTOM = 'cust-pos-to-the-lower';
export const Y_TOP = 'cust-pos-to-the-upper';

export const LINKS = [
  {
    name: 'statement_link',
    title: 'Enter custom accessibility statement link',
    placeholder: 'https://www.yourwebsite.com/accessibility-statement',
  },
  {
    name: 'report_problem_link',
    title: 'Enter custom report a problem link',
    placeholder: 'https://www.yourwebsite.com/report-a-problem',
  },
];

export const SWITCHES = [
  { name: 'widget_leave_page', label: 'Enable External Link Navigation On Widget' },
  { name: 'is_sound_disabled', label: 'Disable Open Close sound on Widget' },
];

/* ======================================================================= */
/* Appearance Design                                                       */
/* ======================================================================= */

export const appearanceDefaults = () => ({
  colorText: DEFAULT_COLOR,
  color: DEFAULT_COLOR,
  colorError: false,
  widgetSize: '0',
  position: 'bottom_right',
  customPosition: false,
  x: '0',
  xDir: X_RIGHT,
  y: '0',
  yDir: Y_BOTTOM,
  xError: false,
  yError: false,
  sizeError: false,
  iconType: 'aioa-icon-type-1',
  iconSize: 'aioa-default-icon',
  customSize: false,
  sizeCustom: '',
});

/** API settings -> Appearance Design form (reference: settingsFrom + fill) */
export const appearanceFrom = (result) => {
  const r = result || {};
  const color = parseHex(r.widget_color_code || '#' + DEFAULT_COLOR) || DEFAULT_COLOR;

  const right = wholeNumber(r.widget_position_right, 0);
  const left = wholeNumber(r.widget_position_left, 0);
  const bottom = wholeNumber(r.widget_position_bottom, 0);
  const top = wholeNumber(r.widget_position_top, 0);

  // Exact horizontal offset: right wins over left. Vertical: bottom wins over top.
  let x = 0;
  let xDir = X_RIGHT;
  if (right > 0) x = right;
  else if (left > 0) {
    x = left;
    xDir = X_LEFT;
  }
  let y = 0;
  let yDir = Y_BOTTOM;
  if (bottom > 0) y = bottom;
  else if (top > 0) {
    y = top;
    yDir = Y_TOP;
  }

  return {
    colorText: color,
    color,
    colorError: false,
    widgetSize: oneOf(String(r.widget_size || 0), ['0', '1'], '0'),
    position: oneOf(positionValue(r.widget_position) || 'bottom_right', POSITION_VALUES, 'bottom_right'),
    customPosition: Number(r.is_widget_custom_position) === 1,
    x: String(x),
    xDir,
    y: String(y),
    yDir,
    xError: false,
    yError: false,
    sizeError: false,
    iconType: oneOf(r.widget_icon_type || 'aioa-icon-type-1', ICON_TYPE_VALUES, 'aioa-icon-type-1'),
    iconSize: oneOf(r.widget_icon_size || 'aioa-default-icon', ICON_SIZE_VALUES, 'aioa-default-icon'),
    customSize: Number(r.is_widget_custom_size) === 1,
    sizeCustom: String(wholeNumber(r.widget_icon_size_custom, '') || ''),
  };
};

/** Exact icon size rule: a whole number from SIZE_MIN to SIZE_MAX */
export const isValidIconSize = (value) => {
  const size = wholeNumber(value, null);
  return size !== null && size >= SIZE_MIN && size <= SIZE_MAX;
};

/** Exact position rule: "0" is a value, an empty field is not */
export const isFilled = (value) => String(value ?? '').trim() !== '';

export const SIZE_MESSAGE = `Enter an exact icon size from ${SIZE_MIN} to ${SIZE_MAX} px.`;

export const POSITION_FIELD_MESSAGE = `Enter a horizontal and a vertical position from 0 to ${OFFSET_MAX} px.`;

/**
 * Check the Appearance Design form before saving (reference: AIOA.form.validate).
 * Every check runs, so every invalid field is marked at the same time.
 * @returns {{marks, problems}}
 *   marks     error flags to apply to the form (only for the checks that ran)
 *   problems  in page order: {focus, tab, name, title, text} (title / text: the toast when it is the only problem)
 */
export const validateAppearance = (form) => {
  const marks = {};
  const problems = [];

  marks.colorError = !parseHex(form.colorText);
  if (marks.colorError) {
    problems.push({
      focus: 'colorcode',
      tab: 'appearance',
      name: 'Widget color',
      title: 'Invalid color',
      text: 'Enter a valid hex color code, for example FF5733.',
    });
  }

  // Exact position: an empty field is never saved as 0
  if (form.customPosition) {
    marks.xError = !isFilled(form.x);
    marks.yError = !isFilled(form.y);
    if (marks.xError || marks.yError) {
      problems.push({
        focus: marks.xError ? 'custom_position_x_value' : 'custom_position_y_value',
        tab: 'appearance',
        name: 'Widget position',
        title: 'Position missing',
        text: `Enter the exact position (0 - ${OFFSET_MAX} px), or turn off "Set an exact position in pixels".`,
      });
    }
  }

  // Exact icon size: a whole number from SIZE_MIN to SIZE_MAX px
  if (form.customSize) {
    marks.sizeError = !isValidIconSize(form.sizeCustom);
    if (marks.sizeError) {
      problems.push({
        focus: 'widget_icon_size_custom',
        tab: 'appearance',
        name: 'Icon size for desktop',
        title: 'Invalid icon size',
        text: SIZE_MESSAGE,
      });
    }
  }

  return { marks, problems };
};

/** Save parameters of the Appearance Design form (after validateAppearance found no problems) */
export const appearanceParams = (form, domain) => {
  const hex = parseHex(form.colorText);

  // Whole pixels only
  const sizeCustom = String(wholeNumber(form.sizeCustom, ''));

  // Exact offsets: only the chosen direction of each axis is sent
  // (empty only while the exact position is off: then 0, as before)
  const x = wholeNumber(form.x, 0);
  const y = wholeNumber(form.y, 0);

  return {
    u: domain,
    widget_position: form.position,
    is_widget_custom_position: form.customPosition ? 1 : 0,
    is_widget_custom_size: form.customSize ? 1 : 0,
    widget_color_code: '#' + hex,
    widget_icon_type: form.iconType,
    widget_icon_size: form.iconSize,
    widget_size: form.widgetSize,
    widget_icon_size_custom: sizeCustom,
    widget_position_right: form.xDir === X_RIGHT ? x : null,
    widget_position_left: form.xDir === X_LEFT ? x : null,
    widget_position_top: form.yDir === Y_TOP ? y : null,
    widget_position_bottom: form.yDir === Y_BOTTOM ? y : null,
  };
};

/* ======================================================================= */
/* Paid Features                                                           */
/* ======================================================================= */

const axisValue = (value) => String(Math.min(Math.max(wholeNumber(value, 0), 0), OFFSET_MAX));
const n = (value) => wholeNumber(value, 0);

export const paidDefaults = () => ({
  statement_link: '',
  report_problem_link: '',
  errors: { statement_link: '', report_problem_link: '' },
  widget_leave_page: false,
  is_sound_disabled: false,
  is_mobile_position: false,
  customMobile: false,
  positionMobile: 'bottom_right',
  mx: '0',
  mxDir: 'right',
  my: '0',
  myDir: 'bottom',
  mxError: false,
  myError: false,
});

/** API settings -> Paid Features form (reference: AIOA.paid.fill) */
export const paidFrom = (result) => {
  const r = result || {};
  const paid = paidDefaults();

  LINKS.forEach(({ name }) => {
    paid[name] = typeof r[name] === 'string' ? r[name] : '';
  });
  SWITCHES.forEach(({ name }) => {
    paid[name] = isOn(r[name]);
  });

  paid.is_mobile_position = isOn(r.is_mobile_position);
  paid.customMobile = isOn(r.is_widget_custom_position_mobile);
  paid.positionMobile = oneOf(positionValue(r.widget_position_mobile), POSITION_VALUES, 'bottom_right');

  // Horizontal: center offset first, then right wins over left
  if (isSet(r.widget_position_horizontal_center_offset_mobile)) {
    paid.mxDir = 'center';
    paid.mx = axisValue(r.widget_position_horizontal_center_offset_mobile);
  } else if (n(r.widget_position_left_mobile) > 0 && !(n(r.widget_position_right_mobile) > 0)) {
    paid.mxDir = 'left';
    paid.mx = axisValue(r.widget_position_left_mobile);
  } else {
    paid.mxDir = 'right';
    paid.mx = axisValue(r.widget_position_right_mobile);
  }

  // Vertical: bottom wins over top
  if (n(r.widget_position_top_mobile) > 0 && !(n(r.widget_position_bottom_mobile) > 0)) {
    paid.myDir = 'top';
    paid.my = axisValue(r.widget_position_top_mobile);
  } else {
    paid.myDir = 'bottom';
    paid.my = axisValue(r.widget_position_bottom_mobile);
  }

  return paid;
};

/** Add the scheme if needed and work out the error of one link ('' when valid) */
export const checkLink = (name, value) => {
  const link = LINKS.find((l) => l.name === name);
  const fixed = withScheme(value);
  const error = isValidLink(fixed)
    ? ''
    : 'Enter a full link that starts with https://, for example ' + link.placeholder;
  return { value: fixed, error };
};

const LINK_NAMES = {
  statement_link: 'Accessibility statement link',
  report_problem_link: 'Report a problem link',
};

/**
 * Check the Paid Features form before saving, paid plans only (reference: AIOA.paid.validate).
 * Every invalid field is marked at the same time; the links also get https:// when it is missing.
 * @returns {{paid, problems}}  paid: the form with fixed links and error marks; problems: in page order
 */
export const validatePaid = (form) => {
  const paid = { ...form, errors: { ...form.errors } };
  const problems = [];

  // Exact mobile position: an empty field is never saved as 0
  paid.mxError = false;
  paid.myError = false;
  if (paid.is_mobile_position && paid.customMobile) {
    paid.mxError = !isFilled(paid.mx);
    paid.myError = !isFilled(paid.my);
    if (paid.mxError || paid.myError) {
      problems.push({
        focus: paid.mxError ? 'mobile_x_value' : 'mobile_y_value',
        tab: 'paid',
        name: 'Widget position for mobile (Paid Features)',
        title: 'Mobile position missing',
        text: `Enter the exact mobile position (0 - ${OFFSET_MAX} px) on the Paid Features tab.`,
      });
    }
  }

  LINKS.forEach(({ name }) => {
    const { value, error } = checkLink(name, paid[name]);
    paid[name] = value;
    paid.errors[name] = error;
    if (error) {
      problems.push({
        focus: name,
        tab: 'paid',
        name: LINK_NAMES[name] + ' (Paid Features)',
        title: 'Invalid link',
        text: 'Check the links on the Paid Features tab.',
      });
    }
  });

  return { paid, problems };
};

/** Save parameters of the Paid Features form (after validatePaid found no problems) */
export const paidParams = (paid) => {
  const offset = (dir, value, want) => (dir === want ? n(value) : '');
  return {
    statement_link: paid.statement_link,
    report_problem_link: paid.report_problem_link,
    widget_leave_page: paid.widget_leave_page ? 1 : 0,
    is_sound_disabled: paid.is_sound_disabled ? 1 : 0,
    is_mobile_position: paid.is_mobile_position ? 1 : 0,
    is_widget_custom_position_mobile: paid.customMobile ? 1 : 0,
    widget_position_mobile: paid.positionMobile,
    widget_position_right_mobile: offset(paid.mxDir, paid.mx, 'right'),
    widget_position_left_mobile: offset(paid.mxDir, paid.mx, 'left'),
    widget_position_horizontal_center_offset_mobile: offset(paid.mxDir, paid.mx, 'center'),
    widget_position_bottom_mobile: offset(paid.myDir, paid.my, 'bottom'),
    widget_position_top_mobile: offset(paid.myDir, paid.my, 'top'),
    widget_position_vertical_center_offset_mobile: '', // no vertical center option: always cleared
  };
};

/** "A", "A and B", "A, B and C" */
const joinNames = (names) =>
  names.length > 1 ? names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1] : names[0];

/**
 * The toast for the problems (reference: AIOA.form report): a single problem's own toast, or
 * "Check the fields marked in red" listing them all.
 */
export const problemsToast = (problems) =>
  problems.length === 1
    ? { title: problems[0].title, message: problems[0].text }
    : {
        title: 'Check the fields marked in red',
        message: joinNames(problems.map((p) => p.name)) + ' need a fix before you can save.',
      };
      