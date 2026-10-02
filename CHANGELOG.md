# Changelog

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
