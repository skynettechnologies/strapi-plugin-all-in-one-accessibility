/**
 * TODO: this entire component needs to be refactored to use Attribute as a passed base
 * to then understand the type and value types of what attribute we're rendering with
 * what input and make the types all play nicely. At least now we have an idea of what
 * everything is!
 */
import * as React from 'react';
import type { TranslationMessage } from '../types';
import type { Attribute } from '@strapi/types';
interface InputOption {
    metadatas: {
        intlLabel: TranslationMessage;
        disabled: boolean;
        hidden: boolean;
    };
    key: string;
    value: string;
}
interface CustomInputProps<TAttribute extends Attribute.Any> extends Omit<GenericInputProps<TAttribute>, 'customInputs'> {
    ref?: React.Ref<HTMLElement>;
    hint?: string | React.JSX.Element | (string | React.JSX.Element)[];
}
export interface GenericInputProps<TAttribute extends Attribute.Any = Attribute.Any> {
    attribute?: TAttribute;
    autoComplete?: string;
    customInputs?: Record<string, React.ComponentType<CustomInputProps<TAttribute>>>;
    description?: TranslationMessage;
    disabled?: boolean;
    error?: string | TranslationMessage;
    intlLabel: TranslationMessage;
    labelAction?: React.ReactNode;
    name: string;
    onChange: (payload: {
        target: {
            name: string;
            value: Attribute.GetValue<TAttribute>;
            type?: string;
        };
    }, shouldSetInitialValue?: boolean) => void;
    options?: InputOption[];
    placeholder?: TranslationMessage;
    required?: boolean;
    step?: number;
    type: string;
    value?: Attribute.GetValue<TAttribute>;
    isNullable?: boolean;
}
/**
 * we've memoized this component because we use a context to store all the data in our form in the content-manager.
 * This then causes _every_ component to re-render because there are no selects incurring performance issues
 * in content-types as the content-type gets more complicated.
 */
declare const MemoizedGenericInput: React.MemoExoticComponent<({ autoComplete, customInputs, description, disabled, intlLabel, labelAction, error, name, onChange, options, placeholder, required, step, type, value: defaultValue, isNullable, attribute, ...rest }: GenericInputProps) => import("react/jsx-runtime").JSX.Element>;
export { MemoizedGenericInput as GenericInput };
//# sourceMappingURL=GenericInput.d.ts.map