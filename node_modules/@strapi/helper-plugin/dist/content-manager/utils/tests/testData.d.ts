import type { Schema } from '@strapi/types';
declare const testData: {
    contentType: Schema.ContentType;
    components: Record<string, Schema.Component>;
    modifiedData: {
        createdAt: string;
        dz: ({
            __component: string;
            id: number;
            name: string;
            password: string;
            subcomponotrepeatable?: undefined;
            subrepeatable?: undefined;
        } | {
            id: number;
            name: string;
            password: string;
            subcomponotrepeatable: null;
            subrepeatable: never[];
            __component: string;
        } | {
            id: number;
            name: string;
            password: string;
            subcomponotrepeatable: {
                id: number;
                name: string;
                password: string;
            };
            subrepeatable: {
                id: number;
                name: string;
                password: string;
            }[];
            __component: string;
        } | {
            id: number;
            name: null;
            password: null;
            subcomponotrepeatable: null;
            subrepeatable: never[];
            __component: string;
        })[];
        id: number;
        name: string;
        notrepeatable: {
            id: number;
            name: string;
            password: string;
            subcomponotrepeatable: {
                id: number;
                name: string;
                password: string;
            };
            subrepeatable: {
                id: number;
                name: string;
                password: string;
            }[];
        };
        password: string;
        repeatable: ({
            id: number;
            name: string;
            password: string;
            subrepeatable: {
                id: number;
                name: string;
                password: string;
            }[];
            subcomponotrepeatable: {
                id: number;
                name: string;
                password: string;
            };
        } | {
            id: number;
            name: string;
            password: string;
            subrepeatable: never[];
            subcomponotrepeatable: null;
        })[];
        updatedAt: string;
    };
    expectedModifiedData: {
        createdAt: string;
        dz: ({
            __component: string;
            id: number;
            name: string;
            subcomponotrepeatable?: undefined;
            subrepeatable?: undefined;
        } | {
            id: number;
            name: string;
            subcomponotrepeatable: null;
            subrepeatable: never[];
            __component: string;
        } | {
            id: number;
            name: string;
            subcomponotrepeatable: {
                id: number;
                name: string;
            };
            subrepeatable: {
                id: number;
                name: string;
            }[];
            __component: string;
        } | {
            id: number;
            name: null;
            subcomponotrepeatable: null;
            subrepeatable: never[];
            __component: string;
        })[];
        id: number;
        name: string;
        notrepeatable: {
            id: number;
            name: string;
            subcomponotrepeatable: {
                id: number;
                name: string;
            };
            subrepeatable: {
                id: number;
                name: string;
            }[];
        };
        repeatable: ({
            id: number;
            name: string;
            subrepeatable: {
                id: number;
                name: string;
            }[];
            subcomponotrepeatable: {
                id: number;
                name: string;
            };
        } | {
            id: number;
            name: string;
            subrepeatable: never[];
            subcomponotrepeatable: null;
        })[];
        updatedAt: string;
    };
    expectedNoFieldsModifiedData: {
        dz: ({
            __component: string;
            name: string;
            password: string;
            subcomponotrepeatable?: undefined;
            subrepeatable?: undefined;
        } | {
            name: string;
            password: string;
            subcomponotrepeatable: null;
            subrepeatable: never[];
            __component: string;
        } | {
            name: string;
            password: string;
            subcomponotrepeatable: {
                name: string;
                password: string;
            };
            subrepeatable: {
                name: string;
                password: string;
            }[];
            __component: string;
        } | {
            name: null;
            password: null;
            subcomponotrepeatable: null;
            subrepeatable: never[];
            __component: string;
        })[];
        name: string;
        createdAt: string;
        updatedAt: string;
        notrepeatable: {
            name: string;
            password: string;
            subcomponotrepeatable: {
                name: string;
                password: string;
            };
            subrepeatable: {
                name: string;
                password: string;
            }[];
        };
        password: string;
        repeatable: ({
            name: string;
            password: string;
            subrepeatable: {
                name: string;
                password: string;
            }[];
            subcomponotrepeatable: {
                name: string;
                password: string;
            };
        } | {
            name: string;
            password: string;
            subrepeatable: never[];
            subcomponotrepeatable: null;
        })[];
    };
};
declare const permissions: ({
    id: number;
    action: string;
    subject: string;
    properties: {
        fields: string[];
    };
    conditions: string[];
} | {
    id: number;
    action: string;
    subject: null;
    properties: {
        fields: null;
    };
    conditions: never[];
})[];
export { permissions, testData };
//# sourceMappingURL=testData.d.ts.map