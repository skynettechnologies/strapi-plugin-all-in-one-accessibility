# Changelog

## 1.1.1

Synced with the latest All in One Accessibility reference.

### Added

- Save checks every field before it stops: color, exact position, exact icon size and, on a paid
  plan, the Paid Features fields are all marked in red at the same time. The page goes to the first
  problem (Appearance Design first) and shows one toast: the problem's own, or "Check the fields
  marked in red" listing them all.
- Exact icon size: empty or outside 20 - 150 px shows "Enter an exact icon size from 20 to 150 px."
  in red under the field.
- "Upgrade to Paid Plan" links (banner and the paid tab locks) carry the website, the signed-in
  admin's email (only a valid one) and first / last name, so the trial form is filled in.

### Changed

- Registration sends the widget icon defaults for a new website: icon type 1, Medium icon size on
  desktop and mobile (`aioa_icon_type`, `aioa_icon_size`, `aioa_icon_size_mb`).
- The `/config` admin route also returns the signed-in admin's first name, last name and email
  (used only for the "Upgrade to Paid Plan" links).
- Save validation now checks the exact position before the exact icon size, as in the reference.

## 1.1.0

Rebuilt the settings page from the new All in One Accessibility reference (README Version 26.10.27).

### Added

- Plugin server part (`server/src`) with five admin-only routes (`admin::isAuthenticatedAdmin`):
  config, widget settings, registration, dashboard link and scan details. Skynet calls now run on
  the Strapi server with the required `User-Agent`, and the dashboard sign-in link's `api_key`
  never reaches the browser.
- `websiteUrl` plugin option (or `AIOA_WEBSITE_URL`) for headless setups where the admin panel is
  not on the website's domain.
- Three tabs: Appearance Design, Paid Features and Accessibility Score. The order follows the plan,
  and the paid tabs are locked and blurred on the free plan. The last picked tab is remembered.
- Paid plan banner with a Dashboard button that opens the signed-in dashboard.
- Paid Features: widget position for mobile (presets or exact offsets, including Center),
  custom accessibility statement and report-a-problem links, External Link Navigation and
  open/close sound switches.
- Accessibility Score: score ring, violations and alt text remediated, pages scanned, last scan
  date and PDF report, or "Scanning in progress".
- Widget color picker with presets, Reset and a live preview; widget size outlines; a 3 x 3
  position grid with a mini website preview; icon size previews at their real size.
- Unsaved changes indicator in a sticky save bar.
- Exact position (desktop and mobile): both values are required while it is on. An empty field is
  never saved as 0: "Position missing" / "Mobile position missing", the field turns red and gets
  the focus.

### Changed

- Registration: the settings load first and never register anything. A new website is registered
  once, after an EU check (ipapi.co), with the signed-in Strapi admin's name and email and
  platform "Strapi". It is never sent twice within 10 minutes.
- Middle positions are saved as `middle_left` / `middle_right`. Older `middel_*` values still load.
- Colors are saved as uppercase `#RRGGBB`. Offsets and sizes accept whole pixels only.
- Accessibility Score: Alt Text Remediated comes from `check-website`'s `alt_count` (asked only when
  the scanner has results): fixed = decorative + update alt text + other images, total = fixed +
  missing alt tag; 0 / 0 when there are no counts. The score shows 0 - 99 (100 is shown as 99).
- The accessibility widget is no longer loaded inside the Strapi admin panel.
- README rebuilt from the Free master README template (v26.10.27).
- Built and tested against Strapi 5.62.0 (`devDependencies`). Supported Strapi versions are unchanged (`peerDependencies` `^5.55.1`).

### Removed

- `admin/src/pages/aioaStyles.js` (replaced by `admin/src/aioa/styles.js`) and the dark logo file
  (the header logo is now inline SVG).

## 1.0.36

Synced the settings page with the latest All in One Accessibility reference implementation.

### Added

- Free Plan upgrade banner, shown only when the API reports `is_free_widget = 1`.
- "It only works on desktop view." hint for widget size, and the post-save note about cache delays.
- Hex colour validation and custom icon size validation (20–150px) at save time.
- Native Strapi notifications for success/error and a loading state while settings load.

### Fixed

- Menu link pointed to `plugins/<component source>` instead of `plugins/all-in-one-accessibility`.
- Translations never loaded (`registerTrads` passed an object to `getTranslation`).
- Vertical custom offset always saved as `top` (Y direction read from the X select).
- Custom position direction selects were frozen (value/option mismatch, no `onChange`).
- Middle positions sent `middle_left/right`; the API expects `middel_left/right`.
- Custom size input clamped on every keystroke, so values like 35 could not be typed.
- Pressing Enter in a field reloaded the admin page.
- Icon type / size pickers were hidden until the site was registered.
- Accessibility widget script was appended again on every visit to the plugin page.
- `jsconfig.json` used the classic JSX runtime although the build uses the automatic one.

### Changed

- Simplified API flow to match the reference: fetch settings → register if unknown → retry once
  (the `get-autologin-link` call was removed).
- Registration uses the logged-in admin's name and email.
- Styles ship with the plugin, scoped to the settings page; the remote global stylesheet
  (which also restyled the Strapi admin) is no longer loaded.
- Removed `react-bootstrap`, `bootstrap` and `prop-types`; removed build tools from `peerDependencies`.
- Replaced ~1,400 lines of duplicated markup/switch statements with data-driven rendering.