export default [
    {
        method: "GET",
        path: "/",
        handler: "controller.index",
        config: {
            policies: [],
            auth: false,
        },
    },
    {
        method: 'GET',
        path: '/getsettings',
        handler: 'settings.getSettings',
        config: {
            policies: [],
            auth: false,
        },
    },
    {
        method: "POST",
        path: "/createsettings",
        handler: "settings.createSettings",
        config: {
            policies: [],
            auth: false,
        },
    },
    {
        method: "DELETE",
        path: "/deletesettings/:id",
        handler: "settings.deleteSettings",
        config: {
            policies: [],
            auth: false,
        },
    },
    {
        method: "PUT",
        path: "/updatesettings/:id",
        handler: "settings.updateSettings",
        config: {
            policies: [],
            auth: false,
        },
    },
    {
        method: "POST",
        path: "/addscript",
        handler: "settings.addScript",
        config: {
            policies: [],
            auth: false,
        },
    },
    {
        method: "GET",
        path: "/getScript",
        handler: "settings.getScript",
        config: {
            policies: [],
            auth: false,
        },
    },
];