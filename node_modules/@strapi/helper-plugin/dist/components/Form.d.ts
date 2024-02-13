import { FormikFormProps } from 'formik';
export type FormProps = Omit<FormikFormProps, 'noValidate'>;
/**
 * @deprecated Use Formik form directly instead.
 */
declare const Form: ({ ...props }: FormProps) => import("react/jsx-runtime").JSX.Element;
export { Form };
//# sourceMappingURL=Form.d.ts.map