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
 
module.exports={
    async getSettings(ctx){
        try{
            return await strapi.plugin("all-in-one-accessibility").service("settings").getSettings(ctx.query);
        }
        catch(err){
            ctx.trow(500,err);
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
};