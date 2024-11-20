// import { getTranslation } from './utils/getTranslation';
// import { pluginId } from './pluginId';
// import { Initializer } from './components/Initializer';
// import { PluginIcon } from './components/PluginIcon';

// export default {
//   register(app) {
//     app.addMenuLink({
//       to: `plugins/${PluginIcon}`,
//       icon: PluginIcon,
//       intlLabel: {
//         id: `${pluginId}.plugin.name`,
//         defaultMessage: "All in One Accessibility",
//       },
//       name: "All in One Accessibility",
//       Component: async () => {
//         const { App } = await import('./pages/App');

//         return App;
//       },
//     });

//     app.registerPlugin({
//       id: pluginId,
//       initializer: Initializer,
//       isReady: false,
//       name: "All in One Accessibility",
//     });
//   },

//   async registerTrads(app) {
//     const { locales } = app;

//     const importedTranslations = await Promise.all(
//       locales.map((locale) => {
//         return import(`./translations/${locale}.json`)
//           .then(({ default: data }) => {
//             return {
//               data: getTranslation(data),
//               locale,
//             };
//           })
//           .catch(() => {
//             return {
//               data: {},
//               locale,
//             };
//           });
//       })
//     );

//     return importedTranslations;
//   },
// };

import { getTranslation } from './utils/getTranslation';
import { pluginId } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

export default {
  register(app) {
    // Add the menu link
    app.addMenuLink({
      to: `plugins/${PluginIcon}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "All in One Accessibility",
      },
      name: "All in One Accessibility",
      Component: async () => {
        // Inject the script when the plugin component is loaded
        const script = document.createElement('script');
        script.src = "https://www.skynettechnologies.com/accessibilitynode/js/accessibility-loader.js?colorcode=#420083&token=&position=bottom_right.aioa-icon-type-1.aioa-default-icon"; // Replace with your script URL
        script.async = true;
        document.body.appendChild(script);

        const { App } = await import('./pages/App');

        return App;
      },
    });

    // Register the plugin
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name: "All in One Accessibility",
    });
  },

  async registerTrads(app) {
    const { locales } = app;

    const importedTranslations = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: getTranslation(data),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return importedTranslations;
  },
};
