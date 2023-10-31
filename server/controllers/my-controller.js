'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('all-in-one-accessibility')
      .service('myService')
      .getWelcomeMessage();
  },
  findContentTypes(ctx) {
    ctx.body = strapi.plugin('all-in-one-accessibility').service('myService').getContentTypes();
}
});
