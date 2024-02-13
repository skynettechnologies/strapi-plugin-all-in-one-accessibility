import { TextInputProps } from '@strapi/design-system';
import { TranslationMessage } from '../types';
interface NotAllowedInputProps extends Pick<TextInputProps, 'labelAction' | 'name'> {
    description?: TranslationMessage;
    error?: string;
    intlLabel?: TranslationMessage;
}
declare const NotAllowedInput: ({ description, error, intlLabel, labelAction, name, }: NotAllowedInputProps) => import("react/jsx-runtime").JSX.Element;
export { NotAllowedInput };
//# sourceMappingURL=NotAllowedInput.d.ts.map