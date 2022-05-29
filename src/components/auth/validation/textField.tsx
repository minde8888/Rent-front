import { ErrorMessage, useField } from 'formik';

interface PropsType {
    [x: string]: any;
    name: string;
}

export const TextField = ({ label, ...props }: PropsType) => {
    const [field, meta] = useField(props);
    return (
        <div className="mb-2">
            <label htmlFor={field.name}></label>
            <input
                className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid'}`}
                {...field} {...props}
                autoComplete="off" placeholder={label}
            />
            <ErrorMessage component="div" name={field.name} className="alert alert-danger" />
        </div>
    )
}