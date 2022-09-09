import { TextArea } from '../../../validation/textArea';
import { SelectField } from '../../../validation/selectField';
import { TextField } from '../../../validation/textField';
import style from '../addProduct.module.scss';

interface Props {
    productName: string;
    place?: string;
    price?: string;
    size?: string;
    phone?: string;
    email?: string;
    category?: string;
}

const ProductDescription = ({ productName, size, price, place, category, phone, email }: Props) => {
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
                <TextField label="Place" className={style.profileInput} id="place" name="place" placeholder="place" value={place} />
                <TextField label="Product Name" className={style.profileInput} name="productName" type="text" value={productName} />
                <TextArea className={style.profileTextArea} label="Product description" name="productDescription" rows="20" />
                <div className={style.numberItems}>
                    <div className={style.profileInputNumber}>
                        <TextField label="Phone" className={style.numberItem} id="phone" name="phone" placeholder="phone" value={phone} />
                    </div>
                    <div className={style.profileInputNumber}>
                        <TextField label="Email" className={style.numberItem} id="email" name="email" placeholder="email" value={email} />
                    </div>
                    <div className={style.profileInputNumber}>
                        <TextField label="Size" className={style.numberItem} id="size" name="size" placeholder="size" value={size} />
                    </div>
                    <div className={style.profileInputNumber}>
                        <TextField label="Price" className={style.numberItem} id="price" name="price" placeholder="price" value={price} />
                    </div>
                </div>
                <TextField label="New Category" className={style.profileInput} id="category" name="category" placeholder="category" value={category} />
                <SelectField name="categories" as="select" value={'categories'}>
                    <option>Choice Category</option>
                    {CategoryOptions}
                </SelectField>
            </div>
        </>
    );
};

export default ProductDescription;
