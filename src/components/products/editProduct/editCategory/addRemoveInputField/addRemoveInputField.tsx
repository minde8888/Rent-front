import { useCallback, useState } from 'react';
import { useAppDispatch } from '../../../../../hooks/redux.hooks';
import { CatValues } from '../../../../../models/product.model';
import { addProductCategory } from '../../../../../redux/slice/productsSlice';
import { addNewCategory } from '../../../../../services/category.services/category.services';
import Preloader from '../../../../preloader/preloader.component';
import style from './addRemoveInputField.module.scss';

interface Props {
    productsId: string;
    categories: CatValues[];
}

interface stateProps {
    category: string;
}

const AddRemoveInputField = ({ productsId, categories }: Props): JSX.Element => {
    const [inputFields, setInputFields] = useState<stateProps[]>([]);
    const [isLoaded, setIsLoaded] = useState<boolean>(true);
    const dispatch = useAppDispatch();

    const addInputField = () => {
        setInputFields([
            ...inputFields,
            {
                category: ''
            }
        ]);
    };

    const removeInputFields = (index: number) => {
        const rows = [...inputFields];
        rows.splice(index, 1);
        setInputFields(rows);
    };

    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const list = [...inputFields];
        list[index].category = value;
        setInputFields(list);
    };

    const addCategory = useCallback(
        async (index: number) => {
            const categoriesDto = {
                categoriesName: inputFields[index].category,
                description: '',
                imageName: '',
                productsId: productsId
            };
            setIsLoaded(false);
            const data = await addNewCategory(categoriesDto);
            setIsLoaded(true);
            dispatch(addProductCategory({ ...data, productsId: productsId }));
            removeInputFields(index);
        },
        [categories, inputFields]
    );

    return (
        <>
            {isLoaded ? (
                <div className={style.addContainer}>
                    {inputFields.map((data, index) => {
                        const { category } = data;
                        return (
                            <div className={style.addCategory} key={index}>
                                <input autoComplete="false" onChange={(event) => handleChange(index, event)} value={category} type="text" />
                                {inputFields.length > 0 && (
                                    <>
                                        <button className={style.addButton} onClick={() => addCategory(index)} type="button">
                                            &#10004;
                                        </button>
                                        <button onClick={() => removeInputFields(index)} type="button">
                                            ❌
                                        </button>
                                    </>
                                )}
                            </div>
                        );
                    })}
                    <div className={style.addNew}>
                        <button className={style.addNewButton} onClick={addInputField}>
                            Add New
                        </button>
                    </div>
                </div>
            ) : (
                <Preloader />
            )}
        </>
    );
};

export default AddRemoveInputField;
