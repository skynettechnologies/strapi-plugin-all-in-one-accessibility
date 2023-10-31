module.exports = [
  {
    method: 'GET',
    path: '/findContentTypes',
    handler: 'myController.findContentTypes',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/getsettings',
    handler: 'settings.getSettings',
    config: {
      policies: [],
      auth:false,
    },
  },
  {
    method: "POST",
    path: "/createsettings",
    handler: "settings.createSettings",
    config: {
      policies: [],
    },
  },
  {
    method: "DELETE",
    path: "/deletesettings/:id",
    handler: "settings.deleteSettings",
    config: {
      policies: [],
    },
  },
  {
    method: "PUT",
    path: "/updatesettings/:id",
    handler: "settings.updateSettings",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/addscript",
    handler: "settings.addScript",
    config: {
      policies: [],
    },
  },
];
