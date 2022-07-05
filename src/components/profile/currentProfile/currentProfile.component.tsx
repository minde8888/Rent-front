import { Address, ProfileImage } from '../../../models/user.model';
import userImage from '../../../svg/325966_user_account_avatar_human_male_icon.svg';
import { ImageError } from '../uploadImage/uploadImage';
import style from '../profile.module.scss';

export interface Props {
    id?: string;
    name?: string;
    surname?: string;
    phoneNumber?: string;
    email?: string;
    occupation?: string;
    imageName?: string;
    file?: HTMLImageElement;
    height?: string;
    width?: string;
    imageFile?: File | ImageError;
    imageSrc?: ProfileImage;
    address?: Address;
    message?: string;
    passToggle: () => void;
    'data-testid'?: string;
}

const CurrentProfile = ({ name, surname, phoneNumber, email, occupation, imageName, address, imageSrc, 'data-testid': dataTestId }: Props): JSX.Element => {
    return (
        <div className={style.columns} data-testid={dataTestId}>
            <div className={style.address}>
                <div>
                    <h3>Address</h3>
                    <div>{address?.country}</div>
                    <div>{address?.city}</div>
                    <div>{address?.street}</div>
                    <div>{address?.zip}</div>
                    <div>{address?.companyCode}</div>
                </div>
            </div>
            <div className={style.image}>
                <img src={imageSrc?.$values !== undefined && imageSrc?.$values.length > 0 ? imageSrc?.$values.toString().replaceAll(',', '') : userImage} alt={imageName} />
            </div>
            |
            <div className={style.details}>
                <div>
                    <h3>Details</h3>
                    <div>{occupation}</div>
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
export default CurrentProfile;
