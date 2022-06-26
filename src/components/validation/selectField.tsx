import { useField } from 'formik';

interface PropsType {
    [x: string]: any;
    name: string;
}

export const SelectField = ({ label, ...props }: PropsType) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="alert alert-danger">{meta.error}</div>
            ) : null}
        </>
    );
};

