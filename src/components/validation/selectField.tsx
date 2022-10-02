import { useField } from 'formik';
import { HTMLProps } from 'react';

interface PropsType extends HTMLProps<HTMLSelectElement> {
    name: string;
}

export const SelectField = ({ label, ...props }: PropsType) => {
    const [field, meta, getFieldProps] = useField(props);

    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? <div className="alert alert-danger">{meta.error}</div> : null}
        </>
    );
};