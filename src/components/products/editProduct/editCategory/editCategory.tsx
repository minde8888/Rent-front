import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import { CatValues } from '../../../../models/product.model';
import { deleteCategory } from '../../../../services/category.services/category.services';
import AddRemoveInputField from '../editAllProducts/addRemoveInputField';
import style from './editCategory.module.scss'

interface Props {
    categories: CatValues[];
    productsId: string;
    onCancel: () => void;
}

const EditCategory = ({ categories, onCancel, productsId }: Props) => {
    const [category, setCategory] = useState(categories);

    const handleInput = (e: ChangeEvent, index: number) => {
        if (e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            setCategory((state) => state.map((val, i) => (i !== index ? val : { ...val, categoriesName: value })));
        }
    };

    const removeCategory = (id: string) => {
        setCategory((state) => state.filter((c) => !id.includes(c.categoriesId)));
        deleteCategory(id);
    };

    const saveCategories = () => {
        console.log(category); //update categories product controller
    };

    return (
        <div className={style.container}>
            <button className={style.closeModal} onClick={onCancel} type="button">
                ❌
            </button>
            {category.map((el, index) => (
                <div key={index} className={style.category}>
                    <input
                        type="text"
                        value={el.categoriesName}
                        onChange={(e) => handleInput(e, index)}
                        pattern="^([A-Z][a-z]+)\s([A-Z][a-z]+)$"
                    />
                    <button onClick={() => removeCategory(el.categoriesId)} type="button">
                        ❌
                    </button>
                </div>
            ))}
            <AddRemoveInputField productsId={productsId} />
            <button onClick={saveCategories} type="button">
                save
            </button>
        </div>
    );
};

export default EditCategory;

