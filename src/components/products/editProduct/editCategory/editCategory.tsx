import { Field, FieldArray, Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { array, object, string } from 'yup';
import { CatValues } from '../../../../models/product.model';
import { TextField } from '../../../validation/textField';
// import Modal from 'react-modal';

export interface FormValues {
    categories: CatValues[];
}

interface Props extends FormValues {
    onCancel: () => void;
}

// const initialValues: FormValues = {
//     categories: [
//         {
//             $id: '',
//             categoriesId: '',
//             categoriesName: '',
//             description: '',
//             imageName: ''
//         }
//     ]
// };
// interface Props extends FormValues {
//     onSubmit: (values: FormValues) => Promise<void>;
//     isSubmitting: boolean;
//     setIsSubmitting: Dispatch<SetStateAction<boolean>>;
// }
// const renderFieldArray = (props: FormikProps<FormValues>) => (arrayHelpers: any) => {
//     return props.values.categories?.map((x, index) => {
//         return (
//             <div key={index}>
//                 <input name={`categories.${index}.categoriesName`} value={`categories.${index}.categoriesName`} onChange={props.handleChange} />
//             </div>
//         );
//     });
// };
// const handleOnSubmit = (values: any, actions: { setSubmitting: (arg0: boolean) => void; resetForm: () => void }) => {
//     console.log(values);
// };

const EditCategory = ({ categories, onCancel }: Props) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const requiredValidator = (value?: string) =>
  !value ? "Required" : undefined;
    //     console.log(categories);
    // const [initialValues, setInitialValues] = useState< CatValues[]>(categories);

    return (
        // <Formik initialValues={{ categories }} onSubmit={handleOnSubmit}>
        //     {(props) => (
        //         <form onSubmit={props.handleSubmit}>
        //             <FieldArray name="costs" render={renderFieldArray(props)} />
        //         </form>
        //     )}
        // </Formik>
        // <div className="">
        //     <button onClick={onCancel} type="button">
        //         ❌
        //     </button>
        //     <button className="" type="button">
        //         ✅
        //     </button>
        // </div>
    );
};

export default EditCategory;
