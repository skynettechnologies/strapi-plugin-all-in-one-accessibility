// 'use strict';

/**
 *  controller
 */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('plugin::all-in-one-accessibility.settings');

// 'use strict';

// module.exports={

//     async getall(ctx){
//         try{
//             return await strapi.plugin("all-in-one-accessibility").service("settings").getall(ctx.query);
//         }
//         catch(err){
//             ctx.trow(500,err);
//         }
//     },

//     async createReminder(ctx) {
//       try {
//         ctx.body = await strapi
//           .plugin("all-in-one-accessibility").service("settings")
//           .createReminder(ctx.request.body);
//       } catch (err) {
//         ctx.throw(500, err);
//       }
//     },

//     async updateReminder(ctx) {
//       try {
//         ctx.body = await strapi
//           .plugin("all-in-one-accessibility").service("settings")
//           .updateReminder(ctx.params.id, ctx.request.body);
//       } catch (err) {
//         ctx.throw(500, err);
//       }
//     },
// };

'use strict';

const controller = ({ strapi }) => ({
  async getSettings(ctx) {
    try {
      return await strapi.plugin("all-in-one-accessibility").service("settings").getSettings(ctx.query);
    }
    catch (err) {
      ctx.trow(500, err);
    }
  },
  async deleteSettings(ctx) {
    try {
      return await strapi
        .plugin("all-in-one-accessibility").service("settings")
        .deleteSettings(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async createSettings(ctx) {
    try {
      ctx.body = await strapi
        .plugin("all-in-one-accessibility").service("settings")
        .createSettings(ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async updateSettings(ctx) {
    try {
      return await strapi
        .plugin("all-in-one-accessibility").service("settings")
        .updateSettings(ctx.params.id, ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async addScript() {
    try {
      // Trigger the custom script when the plugin is installed
      return await strapi
        .plugin("all-in-one-accessibility").service("settings")
        .addScript()
    } catch (err) {
      console.error('Error triggering the script:', err);
    }
  },
  getScript: async (ctx) => {
    strapi.db.query('plugin::all-in-one-accessibility.settings')
    const q = strapi.entityService.findMany("plugin::all-in-one-accessibility.settings",);

    const settings = await q;
    console.log("settings: ", settings);
    var hexaColorCode = "420083", licensekey = "", IconPosition = "bottom_right", IconType = "aioa-icon-type-1", IconSize = "aioa-default-icon";

    if (settings.length > 0) {
      if (Object.keys(settings[0]).length !== 0) {

        // console.log("License Key", settings[0]["License_Key"]);
        console.log("Color Code", settings[0]["Color_Code"]);
        console.log("Icon Position", settings[0]["Icon_Position"]);
        console.log("Icon Type", settings[0]["Icon_Type"]);
        console.log("Icon Size", settings[0]["Icon_Size"]);

        hexaColorCode = settings[0]["Color_Code"];
        // licensekey = settings[0]["License_Key"];
        licensekey = "";
        IconPosition = settings[0]["Icon_Position"];
        IconType = settings[0]["Icon_Type"];
        IconSize = settings[0]["Icon_Size"];

      }
    }
    // const { hexaColorCode, licensekey, IconPosition, IconType, IconSize } = ctx.query;

    // Construct the script URL with the parameters
    const scriptUrl = `https://www.skynettechnologies.com/accessibility/js/all-in-one-accessibility-js-widget-minify.js?colorcode=${hexaColorCode}&token=${licensekey}&position=${IconPosition}.${IconType}.${IconSize}`;

    // Respond with the script code
    ctx.type = 'application/javascript';
    ctx.body = `document.write('<script src="${scriptUrl}"></script>');`;
  },
});

module.exports = controller;

/*
module.exports = {
  async getSettings(ctx) {
    try {
      return await strapi.plugin("all-in-one-accessibility").service("settings").getSettings(ctx.query);
    }
    catch (err) {
      ctx.trow(500, err);
    }
  },
  async deleteSettings(ctx) {
    try {
      return await strapi
        .plugin("all-in-one-accessibility").service("settings")
        .deleteSettings(ctx.params.id);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async createSettings(ctx) {
    try {
      ctx.body = await strapi
        .plugin("all-in-one-accessibility").service("settings")
        .createSettings(ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },

  async updateSettings(ctx) {
    try {
      return await strapi
        .plugin("all-in-one-accessibility").service("settings")
        .updateSettings(ctx.params.id, ctx.request.body);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async addScript() {
    try {
      // Trigger the custom script when the plugin is installed
      return await strapi
        .plugin("all-in-one-accessibility").service("settings")
        .addScript()
    } catch (err) {
      console.error('Error triggering the script:', err);
    }
  },
  getScript: async (ctx) => {
    strapi.db.query('plugin::all-in-one-accessibility.settings')
    const q = strapi.entityService.findMany("plugin::all-in-one-accessibility.settings",);

    const settings = await q;
    console.log("settings: ", settings);
    var hexaColorCode = "420083", licensekey = "", IconPosition = "bottom_right", IconType = "aioa-icon-type-1", IconSize = "aioa-default-icon";

    if (settings.length > 0) {
      if (Object.keys(settings[0]).length !== 0) {

        console.log("License Key", settings[0]["License_Key"]);
        console.log("Color Code", settings[0]["Color_Code"]);
        console.log("Icon Position", settings[0]["Icon_Position"]);
        console.log("Icon Type", settings[0]["Icon_Type"]);
        console.log("Icon Size", settings[0]["Icon_Size"]);

        hexaColorCode = settings[0]["Color_Code"];
        licensekey = settings[0]["License_Key"];
        IconPosition = settings[0]["Icon_Position"];
        IconType = settings[0]["Icon_Type"];
        IconSize = settings[0]["Icon_Size"];

      }
    }
    // const { hexaColorCode, licensekey, IconPosition, IconType, IconSize } = ctx.query;

    // Construct the script URL with the parameters
    const scriptUrl = `https://www.skynettechnologies.com/accessibility/js/all-in-one-accessibility-js-widget-minify.js?colorcode=${hexaColorCode}&token=${licensekey}&position=${IconPosition}.${IconType}.${IconSize}`;

    // Respond with the script code
    ctx.type = 'application/javascript';
    ctx.body = `document.write('<script src="${scriptUrl}"></script>');`;
  },
};*/