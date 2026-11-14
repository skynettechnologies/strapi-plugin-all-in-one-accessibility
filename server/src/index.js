/**
 * All in One Accessibility - Strapi server entry.
 * Admin-only routes that call the Skynet Technologies APIs for the settings page.
 */
import config from './config';
import routes from './routes';
import controllers from './controllers';
import services from './services';

export default {
  register() {},
  bootstrap() {},
  destroy() {},
  config,
  routes,
  controllers,
  services,
  contentTypes: {},
  policies: {},
  middlewares: {},
};
