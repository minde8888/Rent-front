import { TextArea } from '../../validation/textArea';
import { SelectField } from '../../validation/selectField';
import { TextField } from '../../validation/textField';
import style from './addProduct.module.scss';

interface Props {
    productName: string;
    quantityPerUnit?: string;
    unitPrice?: string;
    unitsInStock?: string;
    warehousePlace?: string;
    productCode?: string;
}

const ProductDescription = ({ productName, quantityPerUnit, unitPrice, unitsInStock, warehousePlace, productCode }: Props) => {

    const cat = ['Roles.user', 'Roles.customer'];
    const CategoryOptions = cat.map((r, key) => (
        <option value={r} key={key}>
            {r}
        </option>
    ));

    return (
        <>
            <h3>Product</h3>
            <div className={style.items}>
                <TextField label="Product Name" className={style.profileInput} name="productName" type="text" value={productName} />
                <TextArea className={style.profileTextArea} label="Product description" name="productDescription" rows="20" />
                <div className={style.numberItems}>
                    <div className={style.profileInputNumber}>
                        <TextField label="Product code" className={style.numberItem} id="productCode" name="productCode" placeholder="productCode" value={productCode} />
                    </div>
                    <div className={style.profileInputNumber}>
                        <TextField label="Quantity Per Unit" className={style.numberItem} id="quantityPerUnit" name="quantityPerUnit" placeholder="quantityPerUnit" value={quantityPerUnit} />
                    </div>
                    <div className={style.profileInputNumber}>
                        <TextField label="Unit Price" className={style.numberItem} id="unitPrice" name="unitPrice" placeholder="unitPrice" value={unitPrice} />
                    </div>
                    <div className={style.profileInputNumber}>
                        <TextField label="Units In Stock" className={style.numberItem} id="unitsInStock" name="unitsInStock" placeholder="unitsInStock" value={unitsInStock} />
                    </div>
                </div>
                <TextField label="Warehouse Place" className={style.profileInput} id="warehousePlace" name="warehousePlace" placeholder="warehousePlace" value={warehousePlace} />
                <SelectField name="categories" as="select" value={'categories'}>
                    <option>Choice Category</option>
                    {CategoryOptions}
                </SelectField>
            </div>
        </>
    )
}

export default ProductDescription;