import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import { CatValues } from '../../../../models/product.model';
import ValidityInput from '../../../validation/validityInput/validityInput';

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
    const [category, setCategory] = useState(categories);

    const handleInput = (e: ChangeEvent, index: number) => {
        if (e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            setCategory((state) => state.map((val, i) => (i !== index ? val : { ...val, categoriesName: value })));
        }
    };

    const removeCategory = (id: string) => {
        setCategory((state) => state.filter((c) => !id.includes(c.categoriesId)));
    };

    const saveCategories = () => {
        console.log(category);
    };

    return (
        <>
            <button onClick={onCancel} type="button">
                ❌
            </button>
            {category.map((el, index) => (
                <div key={index} className="month">
                    <ValidityInput>
                        <input
                            type="text"
                            value={el.categoriesName}
                            onChange={(e) => handleInput(e, index)}
                            pattern="^([A-Z][a-z]+)\s([A-Z][a-z]+)$"
                        // disabled={manual ? false : true}
                        />
                    </ValidityInput>
                    <button onClick={() => removeCategory(el.categoriesId)} type="button">
                        ❌
                    </button>
                </div>
            ))}
            <button onClick={saveCategories} type="button">
                save
            </button>
        </>
    );
};

export default EditCategory;

{/* <PasswordInput
    type="password"
    onChange={this.changeHandler}
    value={this.state.value}
/> */}
