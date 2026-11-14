import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

/**
 * Prefix every translation key with the plugin id, e.g.
 * { "plugin.name": "..." } -> { "all-in-one-accessibility.plugin.name": "..." }
 */
const prefixPluginTranslations = (trad, pluginId) =>
  Object.keys(trad).reduce((acc, key) => {
    acc[`${pluginId}.${key}`] = trad[key];
    return acc;
  }, {});

export default {
  /**
   * App/Plugin Registration on Strapi Admin Panel
   */
  register(app) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: 'All in One Accessibility',
      },
      // The widget itself is never loaded in the admin panel: it runs on the website
      Component: async () => {
        const { App } = await import('./pages/App');
        return App;
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: 'All in One Accessibility',
    });
  },

  async registerTrads({ locales }) {
    return Promise.all(
      locales.map((locale) =>
        import(`./translations/${locale}.json`)
          .then(({ default: data }) => ({
            data: prefixPluginTranslations(data, PLUGIN_ID),
            locale,
          }))
          .catch(() => ({ data: {}, locale })),
      ),
    );
  },
};
