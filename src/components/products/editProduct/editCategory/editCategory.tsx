import { Field, FieldArray, Form, Formik, FormikProps } from 'formik';
import React from 'react';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { array, object, string } from 'yup';
import { CatValues } from '../../../../models/product.model';
import { TextField } from '../../../validation/textField';
// import Modal from 'react-modal';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

export interface FormValues {
    categories: CatValues[];
}

const initialValues: FormValues = {
    categories: [
        {
            $id: '',
            categoriesId: '',
            categoriesName: '',
            description: '',
            imageName: ''
        }
    ]
};
// interface Props extends FormValues {
//     onSubmit: (values: FormValues) => Promise<void>;
//     isSubmitting: boolean;
//     setIsSubmitting: Dispatch<SetStateAction<boolean>>;
// }
const renderFieldArray = (props: FormikProps<FormValues>) => (arrayHelpers: any) => {
    return props.values.categories?.map((x, index) => {
        return (
            <div key={index}>
                <input name={`categories.${index}.categoriesName`} value={`categories.${index}.categoriesName`} onChange={props.handleChange} />
            </div>
        );
    });
};

const EditCategory = ({ categories }: FormValues) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    console.log(categories);

    return (
        <div className="App">
            <button onClick={() => setIsOpen(true)}>Open Modal</button>
            {/* <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)}>
                <button onClick={() => setIsOpen(false)}>Close Modal</button>
            </Modal> */}
        </div>
    );
};

export default EditCategory;
