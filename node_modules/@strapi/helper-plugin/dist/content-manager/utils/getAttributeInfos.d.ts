import type { Schema } from '@strapi/types';
declare const getType: (schema: Schema.Schema, attrName: string) => "string" | "boolean" | "time" | "text" | "biginteger" | "blocks" | "component" | "datetime" | "date" | "decimal" | "dynamiczone" | "email" | "enumeration" | "float" | "integer" | "json" | "media" | "password" | "relation" | "richtext" | "timestamp" | "uid" | "";
declare const getOtherInfos: (schema: Schema.Schema, arr: string[]) => any;
export { getOtherInfos, getType };
//# sourceMappingURL=getAttributeInfos.d.ts.map