'use strict';

module.exports = async ({ strapi }) => {
  // bootstrap phase
  console.log("strapi : ",strapi);
 // console.log("homepage.content :",homepage.content);
 await strapi.plugin("all-in-one-accessibility").service("settings").addScript();

};
