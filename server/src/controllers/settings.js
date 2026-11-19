/**
 * Admin route handlers. Every answer is JSON with HTTP 200, errors included
 * ({error: "..."}), like the reference router.
 */
import { normalizeDomain, isValidDomain } from '../services/skynet';
import { PLUGIN_NAME } from '../pluginName';

/** A string body field ('' when missing or not text) */
const field = (body, name) => {
  const value = body && body[name];
  return typeof value === 'string' ? value : '';
};

export default ({ strapi }) => {
  const skynet = () => strapi.plugin(PLUGIN_NAME).service('skynet');

  /** The configured website, normalized; '' when none is configured */
  const configuredDomain = () => normalizeDomain(strapi.plugin(PLUGIN_NAME).config('websiteUrl') || '');

  /** The website to use: the configured one always wins over what the page sent */
  const websiteFor = (ctx) => configuredDomain() || field(ctx.request.body, 'url');

  return {
    /**
     * The configured website (the page falls back to its own hostname when empty), and the
     * signed-in admin's first name, last name and email for the "Upgrade to Paid Plan" links.
     */
    async getConfig(ctx) {
      const websiteUrl = configuredDomain();
      const user = ctx.state.user || {};
      const text = (value) => (typeof value === 'string' ? value.trim() : '');
      ctx.body = {
        websiteUrl,
        valid: websiteUrl === '' || isValidDomain(websiteUrl),
        admin: { firstname: text(user.firstname), lastname: text(user.lastname), email: text(user.email) },
      };
    },

    async fetchWidgetSettings(ctx) {
      ctx.body = await skynet().fetchWidgetSettings({ url: websiteFor(ctx) });
    },

    /**
     * Name and email come from the signed-in Strapi admin, not from the request.
     * no_required_eu comes from the page (ipapi.co in the admin's browser).
     */
    async registerDomain(ctx) {
      const user = ctx.state.user || {};
      const name = [user.firstname, user.lastname].filter(Boolean).join(' ') || user.username || '';
      ctx.body = await skynet().registerDomain({
        url: websiteFor(ctx),
        username: name,
        email: typeof user.email === 'string' ? user.email : '',
        no_required_eu: field(ctx.request.body, 'no_required_eu'),
      });
    },

    async getDashboardLink(ctx) {
      ctx.body = await skynet().getDashboardLink({ url: websiteFor(ctx) });
    },

    async fetchScanDetails(ctx) {
      ctx.body = await skynet().getScanDetails({ url: websiteFor(ctx) });
    },
  };
};
