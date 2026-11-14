/**
 * Paid Features tab (reference: views/partials/paid-features.ejs, paid/*.ejs, assets/js/paid-features.js)
 *   Widget position for mobile, custom statement / report links, two switches.
 * Free plan: the content is blurred and inert, with the upgrade card on top.
 *
 * paid     Paid Features state (formState.js)
 * update   (patch) => void, marks the form as unsaved
 * onLinkBlur(name)  adds https:// and shows the error of one link
 */
import { OFFSET_MAX } from './constants';
import { LINKS, SWITCHES } from './formState';
import { LockOverlay, NumberField, PositionGrid, useInert } from './Shared';

const LINK_ICONS = {
  statement_link: (
    <>
      <path d="M9 7h8M9 12h8M9 17h8" />
      <circle cx="5.5" cy="7" r=".6" fill="currentColor" />
      <circle cx="5.5" cy="12" r=".6" fill="currentColor" />
      <circle cx="5.5" cy="17" r=".6" fill="currentColor" />
    </>
  ),
  report_problem_link: (
    <>
      <path d="M12 4l9 16H3z" />
      <path d="M12 10v4M12 17v.5" />
    </>
  ),
};

/** While the message shows, both mobile fields are checked again on every change */
const recheck = (paid, change) => {
  if (!paid.mxError && !paid.myError) return {};
  const next = { ...paid, ...change };
  return { mxError: String(next.mx).trim() === '', myError: String(next.my).trim() === '' };
};

const MobilePosition = ({ paid, update, preview }) => (
  <section className="aioa-card" aria-labelledby="mobile-position-title">
    <div className="aioa-switch-head">
      <input
        type="checkbox"
        role="switch"
        className="aioa-switch"
        id="is_mobile_position"
        name="is_mobile_position"
        value="1"
        aria-controls="mobile-position-body"
        checked={paid.is_mobile_position}
        onChange={(e) =>
          update({
            is_mobile_position: e.target.checked,
            ...(e.target.checked ? {} : { mxError: false, myError: false }),
          })
        }
      />
      <h2 id="mobile-position-title">
        <label htmlFor="is_mobile_position">Widget position for mobile</label>
      </h2>
    </div>

    <div id="mobile-position-body" hidden={!paid.is_mobile_position}>
      <label className="aioa-check">
        <input
          type="checkbox"
          id="custom-position-mobile-switcher"
          aria-controls="mobile-custom mobile-preset"
          checked={paid.customMobile}
          onChange={(e) =>
            update({ customMobile: e.target.checked, ...(e.target.checked ? {} : { mxError: false, myError: false }) })
          }
        />
        Set an exact position in pixels
      </label>

      <PositionGrid
        hidden={paid.customMobile}
        id="mobile-preset"
        name="position_mobile"
        idPrefix="mobile-position"
        legend="Widget icon position on mobile"
        previewLabel="Mobile view"
        phone
        value={paid.positionMobile}
        onChange={(positionMobile) => update({ positionMobile })}
        iconSrc={preview}
      />

      <div className="aioa-subpanel" id="mobile-custom" hidden={!paid.customMobile}>
        <div className="aioa-offset-row">
          <label className="aioa-label" htmlFor="mobile_x_value">
            Horizontal
          </label>
          <div className={`aioa-affix${paid.mxError ? ' is-invalid' : ''}`} data-for="mobile_x_value">
            <NumberField
              id="mobile_x_value"
              max={OFFSET_MAX}
              value={paid.mx}
              onChange={(mx) => update({ mx, ...recheck(paid, { mx }) })}
              aria-invalid={paid.mxError ? 'true' : 'false'}
              aria-describedby="mobile-range-hint mobile-pos-error"
            />
            <span className="aioa-affix-text" aria-hidden="true">
              px
            </span>
          </div>
          <select
            className="aioa-select"
            id="mobile_x_dir"
            aria-label="Horizontal direction (mobile)"
            value={paid.mxDir}
            onChange={(e) => update({ mxDir: e.target.value })}
          >
            <option value="left">To the left</option>
            <option value="right">To the right</option>
            <option value="center">Center</option>
          </select>
        </div>
        <div className="aioa-offset-row">
          <label className="aioa-label" htmlFor="mobile_y_value">
            Vertical
          </label>
          <div className={`aioa-affix${paid.myError ? ' is-invalid' : ''}`} data-for="mobile_y_value">
            <NumberField
              id="mobile_y_value"
              max={OFFSET_MAX}
              value={paid.my}
              onChange={(my) => update({ my, ...recheck(paid, { my }) })}
              aria-invalid={paid.myError ? 'true' : 'false'}
              aria-describedby="mobile-range-hint mobile-pos-error"
            />
            <span className="aioa-affix-text" aria-hidden="true">
              px
            </span>
          </div>
          <select
            className="aioa-select"
            id="mobile_y_dir"
            aria-label="Vertical direction (mobile)"
            value={paid.myDir}
            onChange={(e) => update({ myDir: e.target.value })}
          >
            <option value="top">To the top</option>
            <option value="bottom">To the bottom</option>
          </select>
        </div>
        <p className="aioa-hint" id="mobile-range-hint">
          0 - {OFFSET_MAX}px are permitted values
        </p>
        <p className="aioa-error" id="mobile-pos-error" hidden={!paid.mxError && !paid.myError}>
          Enter a horizontal and a vertical position from 0 to 250 px.
        </p>
      </div>
    </div>
  </section>
);

const LinkField = ({ link, paid, update, onLinkBlur }) => {
  const error = paid.errors[link.name];
  return (
    <section className="aioa-card" aria-labelledby={`${link.name}-title`}>
      <h2 className="aioa-feature-title" id={`${link.name}-title`}>
        <span className="aioa-feature-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {LINK_ICONS[link.name]}
          </svg>
        </span>
        <label htmlFor={link.name}>{link.title}</label>
      </h2>
      <div className={`aioa-affix aioa-link-input${error ? ' is-invalid' : ''}`} data-for={link.name}>
        <span className="aioa-affix-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
            <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
          </svg>
        </span>
        <input
          type="url"
          id={link.name}
          name={link.name}
          inputMode="url"
          autoComplete="off"
          spellCheck={false}
          placeholder={link.placeholder}
          aria-describedby={`${link.name}-error`}
          aria-invalid={error ? 'true' : 'false'}
          value={paid[link.name]}
          onChange={(e) => update({ [link.name]: e.target.value, errors: { ...paid.errors, [link.name]: '' } })}
          onBlur={() => onLinkBlur(link.name)}
        />
      </div>
      <p className="aioa-error" id={`${link.name}-error`} hidden={!error}>
        {error}
      </p>
    </section>
  );
};

export const PaidFeaturesTab = ({ locked, paid, update, onLinkBlur, preview }) => {
  const contentRef = useInert(locked);
  return (
    <div className={`aioa-lockable${locked ? ' is-locked' : ''}`}>
      <div className="aioa-lock-content aioa-stack" ref={contentRef}>
        <MobilePosition paid={paid} update={update} preview={preview} />
        {LINKS.map((link) => (
          <LinkField key={link.name} link={link} paid={paid} update={update} onLinkBlur={onLinkBlur} />
        ))}
        <div className="aioa-pair">
          {SWITCHES.map((toggle) => (
            <label className="aioa-card aioa-toggle-card" htmlFor={toggle.name} key={toggle.name}>
              <input
                type="checkbox"
                role="switch"
                className="aioa-switch"
                id={toggle.name}
                name={toggle.name}
                value="1"
                checked={paid[toggle.name]}
                onChange={(e) => update({ [toggle.name]: e.target.checked })}
              />
              <span>{toggle.label}</span>
            </label>
          ))}
        </div>
      </div>
      {locked && <LockOverlay lockId="paid-lock" />}
    </div>
  );
};
