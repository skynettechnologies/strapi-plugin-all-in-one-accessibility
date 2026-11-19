/**
 * Small shared pieces of the settings page.
 */
import { useEffect, useRef } from 'react';

import { LOGO_PATH, POSITIONS } from './constants';
import { slug, wholeNumber } from './utils';

/** Spinner shown in busy buttons and while loading */
export const Spinner = () => <span className="aioa-spinner" aria-hidden="true" />;

/** Lock icon (paid tabs on the free plan) */
export const LockIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    aria-hidden="true"
    {...props}
  >
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

/** Accessibility figure in the brand circle */
export const Logo = () => (
  <svg className="aioa-logo" viewBox="0 0 81.296 81.296" aria-hidden="true" focusable="false">
    <circle className="aioa-logo-circle" cx="40.648" cy="40.648" r="40.648" />
    <path fill="#fff" transform="translate(6.249 6.244)" d={LOGO_PATH} />
  </svg>
);

const BLOCKED_KEYS = ['.', ',', 'e', 'E', '+', '-'];

/**
 * Whole numbers only (reference: AIOA.util.wholeNumberField): ".", ",", "e", "+" and "-"
 * can't be typed, a pasted "0.500" becomes 0, and with max the value is kept in 0 - max.
 */
export const NumberField = ({ value, onChange, max, ...rest }) => {
  const normalize = (raw) => {
    let number = wholeNumber(raw, null);
    if (number === null) return raw; // empty
    if (max !== undefined) number = Math.min(Math.max(number, 0), max);
    return String(number);
  };
  return (
    <input
      type="number"
      step="1"
      inputMode="numeric"
      min={max !== undefined ? 0 : rest.min}
      max={max}
      value={value}
      onKeyDown={(e) => {
        if (!e.ctrlKey && !e.metaKey && BLOCKED_KEYS.includes(e.key)) e.preventDefault();
      }}
      onChange={(e) => onChange(normalize(e.target.value))}
      {...rest}
    />
  );
};

/** Sets the inert property (React may not pass it through on every version) */
export const useInert = (locked) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.inert = !!locked;
  }, [locked]);
  return ref;
};

/** Free plan overlay over a paid tab (reference: views/partials/lock.ejs) */
export const LockOverlay = ({ lockId, center, upgradeHref }) => (
  <div className={`aioa-lock${center ? ' is-center' : ''}`}>
    <div className="aioa-lock-card" role="group" aria-labelledby={`${lockId}-text`}>
      <span className="aioa-lock-icon" aria-hidden="true">
        <LockIcon />
      </span>
      <p className="aioa-lock-text" id={`${lockId}-text`}>
        Try a 10-day free trial to view all 90+ features.
      </p>
      <a href={upgradeHref} target="_blank" rel="noopener noreferrer" className="aioa-btn aioa-btn-primary">
        Upgrade to Paid Plan
        <span className="visually-hidden">(opens in a new tab)</span>
      </a>
    </div>
  </div>
);

/**
 * 3 x 3 grid of preset positions; the center cell is a mini website whose icon moves to
 * the selected spot (reference: settings/position.ejs and paid/mobile-position.ejs).
 */
export const PositionGrid = ({ hidden, id, name, idPrefix, legend, previewLabel, phone, value, onChange, iconSrc }) => {
  const selected = POSITIONS.find((p) => p && p[0] === value) || POSITIONS[8];
  return (
    <fieldset className="aioa-fieldset widget-position" id={id} hidden={hidden}>
      <legend className="visually-hidden">{legend}</legend>
      <div className="aioa-pos-grid">
        {POSITIONS.map((pos) =>
          pos === null ? (
            <div className="aioa-pos-center" aria-hidden="true" key="center">
              <span className="aioa-mini-label">{previewLabel}</span>
              <span className="aioa-mini-widget" style={{ '--gx': selected[2], '--gy': selected[3] }}>
                <img src={iconSrc} alt="" />
              </span>
            </div>
          ) : (
            <div className="aioa-pos-option" key={pos[0]}>
              <input
                type="radio"
                className="aioa-radio"
                id={`${idPrefix}-${slug(pos[0])}`}
                name={name}
                value={pos[0]}
                checked={value === pos[0]}
                onChange={() => onChange(pos[0])}
              />
              <label htmlFor={`${idPrefix}-${slug(pos[0])}`} className="aioa-pos-label">
                <span
                  className={`aioa-glyph${phone ? ' is-phone' : ''}`}
                  style={{ '--gx': pos[2], '--gy': pos[3] }}
                  aria-hidden="true"
                >
                  <i />
                </span>
                {pos[1]}
              </label>
            </div>
          ),
        )}
      </div>
    </fieldset>
  );
};
