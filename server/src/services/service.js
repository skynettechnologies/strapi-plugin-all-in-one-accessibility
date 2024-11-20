const service = ({ strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },
  getContentTypes() {
    return strapi.contentTypes;
  },
});

export default service;
