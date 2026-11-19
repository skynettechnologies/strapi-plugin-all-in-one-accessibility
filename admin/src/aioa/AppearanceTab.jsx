/**
 * Appearance Design tab (reference: views/partials/settings/*.ejs + assets/js/settings-form.js)
 *   Widget color, Widget size, Widget position, Icon type, Icon size for desktop.
 *
 * form    Appearance Design state (formState.js)
 * update  (patch) => void, marks the form as unsaved
 */
import { DEFAULT_COLOR, ICON_SIZES, OFFSET_MAX, PRESET_COLORS, SIZE_MAX, SIZE_MIN, WIDGET_SIZES } from './constants';
import { ICON_TYPES, iconSrc } from './icons';
import { isValidIconSize, SIZE_MESSAGE, X_LEFT, X_RIGHT, Y_BOTTOM, Y_TOP } from './formState';
import { NumberField, PositionGrid } from './Shared';
import { parseHex, slug } from './utils';

/** Color state for a value in any hex format; invalid values fall back to the default color */
const colorPatch = (value, keepText) => {
  const hex = parseHex(value) || DEFAULT_COLOR;
  return keepText ? { color: hex, colorError: false } : { color: hex, colorText: hex, colorError: false };
};

const ColorSection = ({ form, update, preview }) => (
  <section className="aioa-card" aria-labelledby="color-title">
    <div className="aioa-card-head">
      <div>
        <h2 id="color-title">Widget color</h2>
        <p className="aioa-desc">Pick a color or enter a hex code.</p>
      </div>
      {/* Live preview: the widget button in the chosen color and icon type */}
      <div className="aioa-live" aria-hidden="true">
        <span className="aioa-live-icon">
          <img src={preview} alt="" />
        </span>
        <span className="aioa-live-text">
          Live
          <br />
          preview
        </span>
      </div>
    </div>

    <div className="aioa-color-row">
      <input
        type="color"
        className="aioa-swatch"
        id="colorpicker"
        value={'#' + form.color.toLowerCase()}
        aria-label="Open color picker"
        onChange={(e) => update(colorPatch(e.target.value))}
      />
      <div className={`aioa-affix aioa-hex${form.colorError ? ' is-invalid' : ''}`} data-for="colorcode">
        <span className="aioa-affix-text" aria-hidden="true">
          #
        </span>
        <input
          type="text"
          name="colorcode"
          id="colorcode"
          value={form.colorText}
          maxLength={7}
          spellCheck={false}
          autoComplete="off"
          aria-label="Hex color code"
          aria-describedby="colorcode-hint colorcode-error"
          aria-invalid={form.colorError ? 'true' : 'false'}
          onChange={(e) => {
            // Only 0-9 A-F; the color is applied at 6 digits
            const clean = e.target.value
              .replace(/[^0-9a-f]/gi, '')
              .slice(0, 6)
              .toUpperCase();
            update(clean.length === 6 ? { colorText: clean, ...colorPatch(clean, true) } : { colorText: clean });
          }}
          onBlur={(e) => {
            const hex = parseHex(e.target.value);
            update(hex ? colorPatch(hex) : { colorError: true }, false);
          }}
        />
      </div>
      <button type="button" className="aioa-btn" id="color-reset" onClick={() => update(colorPatch(DEFAULT_COLOR))}>
        Reset
      </button>
    </div>
    <p className="aioa-hint" id="colorcode-hint">
      For example: FF5733
    </p>
    <p className="aioa-error" id="colorcode-error" hidden={!form.colorError}>
      Enter a valid hex color code, for example FF5733.
    </p>

    <div className="aioa-presets" role="group" aria-label="Preset colors">
      {PRESET_COLORS.map(([hex, name]) => (
        <button
          type="button"
          key={hex}
          className="aioa-preset"
          style={{ '--c': '#' + hex }}
          aria-pressed={form.color === hex ? 'true' : 'false'}
          aria-label={`${name} #${hex}`}
          title={name}
          onClick={() => update(colorPatch(hex))}
        />
      ))}
    </div>
  </section>
);

const WidgetSizeSection = ({ form, update }) => (
  <section className="aioa-card" aria-labelledby="widget-size-title">
    <h2 id="widget-size-title">Widget size</h2>
    <p className="aioa-desc">Size of the panel that opens on your website.</p>
    <fieldset className="aioa-fieldset">
      <legend className="visually-hidden">Select widget size</legend>
      <div className="aioa-size-options">
        {WIDGET_SIZES.map(([value, id, label, mod, tiles]) => (
          <label className="aioa-choice aioa-size-choice" htmlFor={id} key={value}>
            {/* Outline of the open widget panel: header, feature tiles */}
            <span className={`aioa-panel ${mod}`} aria-hidden="true">
              <span className="aioa-panel-head" />
              <span className="aioa-panel-grid">
                {Array.from({ length: tiles }, (_, i) => (
                  <i key={i} />
                ))}
              </span>
            </span>
            <span className="aioa-choice-text">
              <input
                type="radio"
                id={id}
                name="widget_size"
                value={value}
                checked={form.widgetSize === value}
                onChange={() => update({ widgetSize: value })}
                aria-describedby={value === '1' ? 'widget-size-note' : undefined}
              />
              {label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
    <p className="aioa-hint" id="widget-size-note">
      Oversize only works on desktop view.
    </p>
  </section>
);

/**
 * Once the "Position missing" message shows, the red marks follow what is typed:
 * both fields are checked again on every change (reference: AIOA.util.requiredFields).
 */
const recheck = (form, change) => {
  if (!form.xError && !form.yError) return {};
  const next = { ...form, ...change };
  return { xError: String(next.x).trim() === '', yError: String(next.y).trim() === '' };
};

const PositionSection = ({ form, update, preview }) => (
  <section className="aioa-card" aria-labelledby="position-title">
    <h2 id="position-title">Widget position</h2>
    <p className="aioa-desc">Where the accessibility icon appears on your website.</p>

    <label className="aioa-check">
      <input
        type="checkbox"
        id="custom-position-switcher"
        aria-controls="custom-position-controls position_html"
        checked={form.customPosition}
        onChange={(e) =>
          update(e.target.checked ? { customPosition: true } : { customPosition: false, xError: false, yError: false })
        }
      />
      Set an exact position in pixels
    </label>

    <PositionGrid
      hidden={form.customPosition}
      id="position_html"
      name="position"
      idPrefix="edit-position"
      legend="Widget icon position"
      previewLabel="Your website"
      value={form.position}
      onChange={(position) => update({ position })}
      iconSrc={preview}
    />

    <div className="aioa-subpanel custom-position-controls" id="custom-position-controls" hidden={!form.customPosition}>
      <div className="aioa-offset-row">
        <label className="aioa-label" htmlFor="custom_position_x_value">
          Horizontal
        </label>
        <div className={`aioa-affix${form.xError ? ' is-invalid' : ''}`} data-for="custom_position_x_value">
          <NumberField
            id="custom_position_x_value"
            max={OFFSET_MAX}
            value={form.x}
            onChange={(x) => update({ x, ...recheck(form, { x }) })}
            aria-invalid={form.xError ? 'true' : 'false'}
            aria-describedby="pos-range-hint pos-error"
          />
          <span className="aioa-affix-text" aria-hidden="true">
            px
          </span>
        </div>
        <select
          className="aioa-select"
          id="custom_position_x_dir"
          aria-label="Horizontal direction"
          value={form.xDir}
          onChange={(e) => update({ xDir: e.target.value })}
        >
          <option value={X_RIGHT}>To the right</option>
          <option value={X_LEFT}>To the left</option>
        </select>
      </div>
      <div className="aioa-offset-row">
        <label className="aioa-label" htmlFor="custom_position_y_value">
          Vertical
        </label>
        <div className={`aioa-affix${form.yError ? ' is-invalid' : ''}`} data-for="custom_position_y_value">
          <NumberField
            id="custom_position_y_value"
            max={OFFSET_MAX}
            value={form.y}
            onChange={(y) => update({ y, ...recheck(form, { y }) })}
            aria-invalid={form.yError ? 'true' : 'false'}
            aria-describedby="pos-range-hint pos-error"
          />
          <span className="aioa-affix-text" aria-hidden="true">
            px
          </span>
        </div>
        <select
          className="aioa-select"
          id="custom_position_y_dir"
          aria-label="Vertical direction"
          value={form.yDir}
          onChange={(e) => update({ yDir: e.target.value })}
        >
          <option value={Y_BOTTOM}>To the bottom</option>
          <option value={Y_TOP}>To the top</option>
        </select>
      </div>
      <p className="aioa-hint" id="pos-range-hint">
        0 - {OFFSET_MAX}px are permitted values
      </p>
      <p className="aioa-error" id="pos-error" hidden={!form.xError && !form.yError}>
        Enter a horizontal and a vertical position from 0 to 250 px.
      </p>
    </div>
  </section>
);

const IconTypeSection = ({ form, update }) => (
  <section className="aioa-card" aria-labelledby="icon-type-title">
    <h2 id="icon-type-title">Icon type</h2>
    <p className="aioa-desc">The icon visitors click to open the widget.</p>
    <fieldset className="aioa-fieldset">
      <legend className="visually-hidden">Select icon type</legend>
      <div className="aioa-icon-grid">
        {ICON_TYPES.map((type) => (
          <div className="aioa-icon-option" key={type.value}>
            <input
              type="radio"
              className="aioa-radio"
              id={`edit-type-${type.n}`}
              name="aioa_icon_type"
              value={type.value}
              checked={form.iconType === type.value}
              onChange={() => update({ iconType: type.value })}
            />
            <label htmlFor={`edit-type-${type.n}`} className="aioa-icon-label">
              <span className="aioa-icon">
                <img src={type.src} alt="" width="32" height="32" loading="lazy" />
              </span>
              <span className="visually-hidden">Type {type.n}</span>
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  </section>
);

const IconSizeSection = ({ form, update, preview }) => (
  <section className="aioa-card" aria-labelledby="icon-size-title">
    <h2 id="icon-size-title">Icon size for desktop</h2>
    <p className="aioa-desc">Pick a preset size or set an exact size in pixels.</p>

    <label className="aioa-check">
      <input
        type="checkbox"
        id="custom-size-switcher"
        aria-controls="custom-size-controls select_icon_size"
        checked={form.customSize}
        onChange={(e) => update(e.target.checked ? { customSize: true } : { customSize: false, sizeError: false })}
      />
      Set an exact size in pixels
    </label>

    <fieldset className="aioa-fieldset widget-icon" id="select_icon_size" hidden={form.customSize}>
      <legend className="visually-hidden">Select icon size for desktop</legend>
      <div className="aioa-size-row">
        {ICON_SIZES.map(([value, label, diameter]) => (
          <div className="aioa-icon-option" key={value}>
            <input
              type="radio"
              className="aioa-radio"
              id={`edit-size-${slug(value)}`}
              name="aioa_icon_size"
              value={value}
              checked={form.iconSize === value}
              onChange={() => update({ iconSize: value })}
            />
            <label htmlFor={`edit-size-${slug(value)}`} className="aioa-icon-label">
              <span className="aioa-icon" style={{ '--d': `${diameter}px` }}>
                <img src={preview} alt="" />
              </span>
              <span className="aioa-icon-caption">{label}</span>
            </label>
          </div>
        ))}
      </div>
    </fieldset>

    <div className="aioa-subpanel custom-size-controls" id="custom-size-controls" hidden={!form.customSize}>
      <label className="aioa-label" htmlFor="widget_icon_size_custom">
        Exact icon size
      </label>
      <div
        className={`aioa-affix aioa-size-input${form.sizeError ? ' is-invalid' : ''}`}
        data-for="widget_icon_size_custom"
      >
        <NumberField
          id="widget_icon_size_custom"
          name="widget_icon_size_custom"
          min={SIZE_MIN}
          value={form.sizeCustom}
          // Once the message shows, the red mark follows what is typed (reference: requiredFields)
          onChange={(sizeCustom) =>
            update(form.sizeError ? { sizeCustom, sizeError: !isValidIconSize(sizeCustom) } : { sizeCustom })
          }
          aria-invalid={form.sizeError ? 'true' : 'false'}
          aria-describedby="size-range-hint size-error"
        />
        <span className="aioa-affix-text" aria-hidden="true">
          px
        </span>
      </div>
      <p className="aioa-hint" id="size-range-hint">
        {SIZE_MIN} - {SIZE_MAX}px are permitted values
      </p>
      <p className="aioa-error" id="size-error" hidden={!form.sizeError}>
        {form.sizeError ? SIZE_MESSAGE : ''}
      </p>
    </div>
  </section>
);

export const AppearanceTab = ({ form, update }) => {
  const preview = iconSrc(form.iconType);
  return (
    <>
      <div className="aioa-columns">
        <ColorSection form={form} update={update} preview={preview} />
        <WidgetSizeSection form={form} update={update} />
      </div>
      <PositionSection form={form} update={update} preview={preview} />
      <IconTypeSection form={form} update={update} />
      <IconSizeSection form={form} update={update} preview={preview} />
    </>
  );
};
