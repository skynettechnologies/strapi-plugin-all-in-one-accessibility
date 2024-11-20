const controller = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('all-in-one-accessibility')
      // the name of the service file & the method.
      .service('service')
      .getWelcomeMessage();
  },
  findContentTypes(ctx) {
    ctx.body = strapi.plugin('all-in-one-accessibility').service('service').getContentTypes();
  }
});

export default controller;
