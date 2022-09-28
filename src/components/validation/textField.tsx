import { ErrorMessage, useField } from 'formik';

interface PropsType {
    [x: string]: string | undefined;
    name: string;
}

export const TextField = ({ label, ...props }: PropsType) => {
    const [field] = useField(props);
    console.log(field);

    return (
        <>
            <label htmlFor={field.name}>{}</label>
            <input {...field} {...props} autoComplete="off" placeholder={label} />
            <ErrorMessage component="div" name={field.name} className="alert alert-danger" />
        </>
    );
};
