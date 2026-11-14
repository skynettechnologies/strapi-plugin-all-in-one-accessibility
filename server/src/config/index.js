/**
 * Plugin configuration (config/plugins.js in the Strapi project):
 *
 *   'strapi-plugin-all-in-one-accessibility': {
 *     enabled: true,
 *     config: { websiteUrl: 'www.example.com' },
 *   },
 *
 * websiteUrl  The website the widget runs on. Strapi is usually headless, so the admin
 *             panel's own hostname is often not the website. When empty, the admin page
 *             falls back to its hostname (a domain or localhost, never an IP address).
 *             Can also be set with the AIOA_WEBSITE_URL environment variable.
 */
export default {
  default: ({ env }) => ({
    websiteUrl: env('AIOA_WEBSITE_URL', ''),
  }),
  validator(config) {
    if (config.websiteUrl !== undefined && config.websiteUrl !== null && typeof config.websiteUrl !== 'string') {
      throw new Error(
        'strapi-plugin-all-in-one-accessibility: "websiteUrl" must be a string, for example "www.example.com".',
      );
    }
  },
};
