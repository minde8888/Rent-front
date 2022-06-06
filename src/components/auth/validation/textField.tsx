import { ErrorMessage, useField } from 'formik';

interface PropsType {
    [x: string]: string | undefined;
    name: string;
}

export const TextField = ({ label, ...props }: PropsType) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={field.name}></label>
            <input
                className={`${meta.touched && meta.error && 'is-invalid'}`}
                {...field} {...props}
                autoComplete="off" placeholder={label}
            />
            <ErrorMessage component="div" name={field.name} className="alert alert-danger" />
        </div>
    )
}