import type { MessageDescriptor, PrimitiveType } from 'react-intl';
export type FieldSchema = {
    minLength?: number | string;
    maxLength?: number | string;
    max?: number | string;
    min?: number | string;
};
export interface UseFieldHintProps {
    description?: MessageDescriptor & {
        values?: Record<string, PrimitiveType>;
    };
    fieldSchema?: FieldSchema;
    type?: string;
}
/**
 * @description
 * A hook for generating the hint for a field
 */
declare const useFieldHint: ({ description, fieldSchema, type }: UseFieldHintProps) => {
    hint: string | import("react/jsx-runtime").JSX.Element | (string | import("react/jsx-runtime").JSX.Element)[];
};
export { useFieldHint };
//# sourceMappingURL=useFieldHint.d.ts.map