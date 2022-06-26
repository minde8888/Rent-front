import { TextField } from '../../validation/textField';
import style from './addProduct.module.scss';


const ProductSpecifications = () => {

    return (
        <>
            <h3>Specifications</h3>
            <div className={style.items}>
                <TextField label="Energy Source" className={style.profileInput} id="energySource" name="energySource" placeholder="energySource" />
                <div className={style.numberItems}>
                    <div className={style.profileInputNumber}>
                        <TextField label="Max Load" className={style.profileInput} id="maxLoad" name="maxLoad" placeholder="maxLoad" />
                    </div>
                    <div className={style.profileInputNumber}>
                        <TextField label="Weight" className={style.profileInput} id="weight" placeholder="weight" name="weight" />
                    </div>
                    <div className={style.profileInputNumber}>
                        <TextField label="Lifting Height" className={style.profileInput} id="liftingHeight" name="liftingHeight" placeholder="liftingHeight" />
                    </div>
                    <div className={style.profileInputNumber}>
                        <TextField label="Capacity" className={style.profileInput} id="capacity" name="capacity" placeholder="capacity" />
                    </div>
                    <div className={style.profileInputNumber}>
                        <TextField label="Speed" className={style.profileInput} id="speed" name="speed" placeholder="speed" />
                    </div>
                    <div className={style.profileInputNumber}>
                        <TextField label="Length" className={style.profileInput} id="length" name="length" placeholder="length" />
                    </div>
                    <div className={style.profileInputNumber}>
                        <TextField label="Product Width" className={style.profileInput} id="productWidth" name="productWidth" placeholder="productWidth" />
                    </div>
                    <div className={style.profileInputNumber}>
                        <TextField label="Product Height" className={style.profileInput} id="productHeight" name="productHeight" placeholder="productHeight" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductSpecifications;