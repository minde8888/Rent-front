import { Props } from "../current.component";
import style from '../profile.module.scss';
import userImage from '../../../svg/325966_user_account_avatar_human_male_icon.svg';
import { useState } from "react";


const ProfileEdit = ({ error, id, name, surname, phoneNumber, email, occupation, imageName, address }: Props): JSX.Element => {
    const [inputError, setInputError] = useState<string>('');
    return (<div className={style.columns}>

        <div className={style.address}>
            <div>
                <h3>Address</h3>
                <input placeholder="country" value={address?.country} />
                <input placeholder="city" value={address?.city} />
                <input placeholder="street" value={address?.street} />
                <input placeholder="zip" value={address?.zip} />
                <input placeholder="companyCode" value={address?.companyCode} />
            </div>
        </div>
        <div className={style.image}>
            <img
                src={userImage}
                alt={imageName}
            />
            {error && (
                <div className={style.profileError}>{"error"}</div>
            )}
        </div>

        <div className={style.details}>
            <div>
                <h3>Details</h3>
                <input placeholder="occupation" value={occupation} />
                <input placeholder="name" value={name} />
                <input placeholder="surname" value={surname} />
                <input placeholder="phoneNumber" value={phoneNumber} />
                <input placeholder="email" value={email} />
            </div>
        </div>
    </div>)
}

export default ProfileEdit;