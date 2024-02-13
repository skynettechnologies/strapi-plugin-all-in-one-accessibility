import * as React from 'react';
import { AnySchema } from 'yup';
import type { TranslationMessage } from '../types';
/**
 * @TODO: Custom field types should be defined and exported from the registry:
 * packages/core/admin/admin/src/core/apis/CustomFields.js
 */
interface CustomFieldComponents {
    Input: () => Promise<{
        default?: React.ComponentType;
    }>;
}
type CustomFieldType = 'biginteger' | 'boolean' | 'date' | 'datetime' | 'decimal' | 'email' | 'enumeration' | 'float' | 'integer' | 'json' | 'password' | 'richtext' | 'string' | 'text' | 'time' | 'uid';
type CustomFieldOptionInput = 'text' | 'checkbox' | 'checkbox-with-number-field' | 'select-default-boolean' | 'date' | 'select' | 'number' | 'boolean-radio-group' | 'select-date' | 'text-area-enum' | 'select-number' | 'radio-group';
type CustomFieldOptionName = 'min' | 'minLength' | 'max' | 'maxLength' | 'required' | 'regex' | 'enum' | 'unique' | 'private' | 'default';
interface CustomFieldOption {
    intlLabel: TranslationMessage;
    description: TranslationMessage;
    name: CustomFieldOptionName;
    type: CustomFieldOptionInput;
    defaultValue?: string | number | boolean | Date;
}
interface CustomFieldOptionSection {
    sectionTitle: TranslationMessage | null;
    items: CustomFieldOption[];
}
interface CustomFieldOptions {
    base?: (CustomFieldOptionSection | CustomFieldOption)[];
    advanced?: (CustomFieldOptionSection | CustomFieldOption)[];
    validator?: () => Record<string, AnySchema>;
}
interface CustomField {
    name: string;
    pluginId?: string;
    type: CustomFieldType;
    intlLabel: TranslationMessage;
    intlDescription: TranslationMessage;
    icon?: React.ComponentType;
    components: CustomFieldComponents;
    options?: CustomFieldOptions;
}
type CustomFieldUID = `plugin::${string}.${string}` | `global::${string}`;
interface CustomFieldsContextValue {
    get: (uid: string) => CustomField | undefined;
    getAll: () => Record<string, CustomField>;
}
declare const CustomFieldsContext: React.Context<CustomFieldsContextValue>;
interface CustomFieldsProviderProps {
    children: React.ReactNode;
    customFields: CustomFieldsContextValue;
}
declare const CustomFieldsProvider: ({ children, customFields }: CustomFieldsProviderProps) => import("react/jsx-runtime").JSX.Element;
declare const useCustomFields: () => CustomFieldsContextValue;
export { CustomFieldsContext, CustomFieldsProvider, useCustomFields };
export type { CustomFieldsProviderProps, CustomField, CustomFieldComponents, CustomFieldOptionSection, CustomFieldOption, CustomFieldOptions, CustomFieldUID, };
//# sourceMappingURL=CustomFields.d.ts.map