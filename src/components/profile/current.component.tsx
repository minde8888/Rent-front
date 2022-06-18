import { Address, ProfileImage } from '../../models/user.model';
import userImage from '../../svg/325966_user_account_avatar_human_male_icon.svg';
import { ImageError } from './editProfile/uploadImage';
import style from './profile.module.scss';

export interface Props {
    id?: string;
    name?: string;
    surname?: string;
    phoneNumber?: string;
    email?: string;
    occupation?: string;
    imageName?: string;
    error?: string;
    file?: HTMLImageElement;
    height?: string;
    width?: string;
    imageFile?: File | ImageError;
    imageSrc?: ProfileImage;
    address?: Address;
}



const Current = ({ error, name, surname, phoneNumber, email, occupation, imageName, address, imageSrc }: Props): JSX.Element => {

    return (
        <div className={style.columns}>
            <div className={style.address}>
                <div>
                    <h3>Address</h3>
                    <div>{address?.country}Norway</div>
                    <div>{address?.city}</div>
                    <div>{address?.street} 23</div>
                    <div>{address?.zip}</div>
                    <div>{address?.companyCode}</div>
                </div>
            </div>
            <div className={style.image}>
                <img src={imageSrc?.$values !== undefined && imageSrc?.$values.length > 0 ? imageSrc?.$values.toString().replaceAll(',', '') : userImage} alt={imageName} />
                {error && <div className={style.profileError}>{'error'}</div>}
            </div>
            <div className={style.details}>
                <div>
                    <h3>Details</h3>
                    <div>{occupation}Manager</div>
                    <div>
                        {name} {surname}
                    </div>
                    <div>{phoneNumber}</div>
                    <div>{email}</div>
                </div>
            </div>
        </div>
    );
};
export default Current;
