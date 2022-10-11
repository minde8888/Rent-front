import { ErrorMessage, useField } from 'formik';
import { useEffect } from 'react';
import { HTMLProps } from 'react';

interface PropsType extends HTMLProps<HTMLSelectElement> {
    name: string;
}

export const SelectField = ({ label, ...props }: PropsType) => {
    const [field, meta, getFieldProps] = useField(props);
    /* eslint-disable */
    useEffect(() => {
        getFieldProps.setValue(props.value);
    }, [props.value]);
    /* eslint-disable */
    return (
        <>
            <select {...field} {...props} />
            <ErrorMessage component="div" name={field.name} className="alert alert-danger" />
        </>
    );
};
