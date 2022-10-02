import { useState } from "react";
import { useAppDispatch } from "../../../../hooks/redux.hooks";
import { addProductCategory } from "../../../../redux/slice/productsSlice";
import { addNewCategory } from "../../../../services/category.services/category.services";
import style from "./addRemoveInputField.module.scss"

interface Props {
    productsId: string;
}

interface stateProps {
    category: string;
}

const AddRemoveInputField = ({ productsId }: Props): JSX.Element => {

    const [inputFields, setInputFields] = useState<stateProps[]>([]);
    const dispatch = useAppDispatch();

    const addInputField = () => {
        setInputFields([...inputFields, {
            category: '',
        }])
    }

    const removeInputFields = (index: number) => {
        const rows = [...inputFields];
        rows.splice(index, 1);
        setInputFields(rows);
    }

    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const list = [...inputFields];
        list[index].category = value;
        setInputFields(list);
    }

    const addCategory = async (index: number) => {
        const categoriesDto = {
            categoriesName: inputFields[index].category,
            description: null,
            imageName: null,
            productsId: productsId,
        }
        const res = await addNewCategory(categoriesDto)
        console.log(res.status);

        dispatch(addProductCategory({ ...categoriesDto, $id: '', categoriesId: null, }))
    }

    return (
        <div className={style.addContainer}>
            {
                inputFields.map((data, index) => {
                    const { category } = data;
                    return (
                        <div className={style.addCategory} key={index}>
                            <input autoComplete="false" onChange={(event) => handleChange(index, event)} value={category} type="text" />
                            {(inputFields.length > 0) ? <>
                                <button className={style.addButton} onClick={() => addCategory(index)} type="button">&#10004;</button>
                                <button onClick={() => removeInputFields(index)} type="button">❌</button>
                            </> : ''}
                        </div>
                    )
                })
            }
            <div className={style.addNew}>
                <button className={style.addNewButton} onClick={addInputField}>Add New</button>
            </div>

        </div>
    )
}

export default AddRemoveInputField




