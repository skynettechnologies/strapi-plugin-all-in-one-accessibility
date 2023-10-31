'use strict';

module.exports = ({ strapi }) => ({
  getContentTypes() {
    return strapi.contentTypes;
  },
  getWelcomeMessage() {
    return 'Welcome to Strapi 🚀';
  },
});
