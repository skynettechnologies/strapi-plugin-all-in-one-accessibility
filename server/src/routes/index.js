/**
 * Admin routes, served at /strapi-plugin-all-in-one-accessibility/... to signed-in Strapi admins only.
 * They replace the reference POST /route?action=<name> router. The admin panel sends the
 * admin JWT in the Authorization header (no cookies), so no CSRF token is needed.
 */
const admin = (method, path, handler) => ({
  method,
  path,
  handler: `settings.${handler}`,
  config: { policies: ['admin::isAuthenticatedAdmin'] },
});

export default {
  admin: {
    type: 'admin',
    routes: [
      admin('GET', '/config', 'getConfig'),
      admin('POST', '/widget-settings', 'fetchWidgetSettings'), // reference action fetchWidgetSettings
      admin('POST', '/register', 'registerDomain'), // reference action registerDomain
      admin('POST', '/dashboard-link', 'getDashboardLink'), // reference action getDashboardLink
      admin('POST', '/scan-details', 'fetchScanDetails'), // reference action fetchScanDetails
    ],
  },
};
