import userImage from '../../svg/325966_user_account_avatar_human_male_icon.svg';
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
    height?: number;
    width?: number;
    address?: {
        $id?: string;
        addressId?: string;
        city?: string;
        companyCode?: string;
        country?: string;
        customerId?: string;
        sellerId?: string;
        shopId?: string;
        street?: string;
        zip?: string;
    };
}

const Current = ({ error, id, name, surname, phoneNumber, email, occupation, imageName, address }: Props): JSX.Element => {
    return (
        <div className={style.columns}>
            <div className={style.address}>
                <div>
                    <h3>Address</h3>
                    <div>{address?.country}Norway</div>
                    <div>{address?.city}Fauske</div>
                    <div>{address?.street}Kleiva 23</div>
                    <div>{address?.zip}8200</div>
                    <div>{address?.companyCode}9821050588</div>
                </div>
            </div>
            <div className={style.image}>
                <img src={userImage} alt={imageName} />
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
