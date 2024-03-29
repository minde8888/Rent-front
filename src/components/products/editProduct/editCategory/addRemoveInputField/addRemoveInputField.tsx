import { useCallback, useState } from 'react';
import { useAppDispatch } from '../../../../../hooks/redux.hook';
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
    /* eslint-disable */
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
    /* eslint-disable */

    return (
        <>
            {isLoaded ? (
                <div className={style.addContainer}>
                    {inputFields.map((data, index) => {
                        const { category } = data;
                        return (
                            <div className={style.addCategory} key={index}>
                                <input className={style.inp} autoComplete="false" onChange={(event) => handleChange(index, event)} value={category} type="text" data-testid="test-input-id" />
                                {inputFields.length > 0 && (
                                    <div className={style.buttons}>
                                        <button className={style.addButton} onClick={() => addCategory(index)} type="button" data-testid="test-addNew-id">
                                            &#10004;
                                        </button>
                                        <button className={style.removeButton} onClick={() => removeInputFields(index)} type="button" data-testid="test-remove-id">
                                            ❌
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    <div className={style.addNew}>
                        <button className={style.addNewButton} onClick={addInputField} type="button" data-testid="test-addField-id">
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
