import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

const WIDGET_SCRIPT_ID = 'aioa-accessibility-loader';
const WIDGET_SCRIPT_SRC =
  'https://www.skynettechnologies.com/accessibilitynode/js/accessibility-loader.js?colorcode=#420083&token=&position=bottom_right.aioa-icon-type-1.aioa-default-icon';

/**
 * Load the accessibility widget in the admin panel once, no matter how many
 * times the plugin page is opened.
 */
const injectWidgetScript = () => {
  if (typeof document === 'undefined' || document.getElementById(WIDGET_SCRIPT_ID)) {
    return;
  }
  const script = document.createElement('script');
  script.id = WIDGET_SCRIPT_ID;
  script.src = WIDGET_SCRIPT_SRC;
  script.async = true;
  document.body.appendChild(script);
};

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
      Component: async () => {
        injectWidgetScript();
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
          .catch(() => ({ data: {}, locale }))
      )
    );
  },
};
