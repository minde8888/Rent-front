import React, { ChangeEvent, useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useAppDispatch } from '../../../../hooks/redux.hooks';
import { CatValues } from '../../../../models/product.model';
import { deleteProductCategoryById, updateProductCategory } from '../../../../redux/slice/productsSlice';
import { deleteCategory, updateCategory } from '../../../../services/category.services/category.services';
import AddRemoveInputField from './addRemoveInputField/addRemoveInputField';
import style from './editCategory.module.scss';

interface Props {
    categories: CatValues[];
    productsId: string;
    onCancel: () => void;
}

const EditCategory = ({ categories, onCancel, productsId }: Props): JSX.Element | null => {

    const [category, setCategory] = useState<CatValues[]>(categories);
    const [isLoaded, setIsLoaded] = useState<boolean>(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setCategory(categories);
    }, [categories]);

    const handleInput = (e: ChangeEvent, index: number) => {
        if (e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            setCategory((state) => state.map((val, i) => (i !== index ? val : { ...val, categoriesName: value })));
        }
    };
    /* eslint-disable */
    const removeCategory = useCallback(
        (id: string) => {
            setCategory((state) => state.filter((c) => !id.includes(c.categoriesId)));
            deleteCategory(id);
            dispatch(deleteProductCategoryById({ id: id, productsId: productsId }));
        },
        [categories]
    );
    /* eslint-disable */
    const saveCategories = async (productsId: string) => {
        const stringCat = category.map((e) => e.categoriesName);
        const stringCatId = category.map((e) => e.categoriesId);
        const obj = {
            categoriesUpdateId: stringCatId.toString(),
            categoriesName: stringCat.toString(),
            imageName: ''
        };

        dispatch(updateProductCategory({ category, productsId: productsId }));
        const response = await updateCategory(obj);
        setIsLoaded(false)
        if (response.status === 200) {
            setIsLoaded(true)
        }
    };

    return (
        <div className={style.container}>
            <h2>Add/Edit Category</h2>
            <button data-testid="test-close-id" className={style.closeModal} onClick={onCancel} type="button">
                ❌
            </button>
            {category.map((el, index) => (
                <div key={index} className={style.category}>
                    <input data-testid="test-inputs-id" className={style.inp} type="text" value={el.categoriesName} onChange={(e) => handleInput(e, index)} pattern="^([A-Z][a-z]+)\s([A-Z][a-z]+)$" />
                    <button data-testid="test-removeCategory-id" className={style.button} onClick={() => removeCategory(el.categoriesId)} type="button">
                        ❌
                    </button>
                </div>
            ))}
            <AddRemoveInputField productsId={productsId} categories={categories} />
            <button disabled={isLoaded} className={style.saveBtn} onClick={() => saveCategories(productsId)} type="button">
                Save
            </button >
        </div>
    );
};

export default EditCategory;
