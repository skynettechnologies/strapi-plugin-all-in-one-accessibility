// export default [
//   {
//     method: 'GET',
//     path: '/',
//     // name of the controller file & the method.
//     handler: 'controller.index',
//     config: {
//       policies: [],
//     },
//   },
//   {
//     method: 'GET',
//     path: '/',
//     handler: 'myController.index',
//     config: {
//       auth: false,
//       policies: [],
//     },
//   },
//   {
//     method: 'GET',
//     path: '/getsettings',
//     handler: 'settings.getSettings',
//     config: {
//       policies: [],
//       auth:false,
//     },
//   },
//   {
//     method: "POST",
//     path: "/createsettings",
//     handler: "settings.createSettings",
//     config: {
//       policies: [],
//     },
//   },
//   {
//     method: "DELETE",
//     path: "/deletesettings/:id",
//     handler: "settings.deleteSettings",
//     config: {
//       policies: [],
//     },
//   },
//   {
//     method: "PUT",
//     path: "/updatesettings/:id",
//     handler: "settings.updateSettings",
//     config: {
//       policies: [],
//     },
//   },
//   {
//     method: "POST",
//     path: "/addscript",
//     handler: "settings.addScript",
//     config: {
//       policies: [],
//     },
//   },
//   {
//     method: "GET",
//     path: "/getScript",
//     handler: "settings.getScript",
//     config: {
//       policies: [],
//     },
//   },
// ];


import contentApi from "./content-api.js";
import admin from "./admin";
/**
 * Set Routes for Plugin
 */
export default {
  "content-api": {
    type: "content-api",
    routes: [...contentApi],
  },
  admin: {
    type: "admin",
    routes: [...admin],
  },
};