import { useParams } from 'react-router-dom';
import React, { MouseEventHandler, useState } from 'react';
import style from './profile.module.scss';
import CurrentProfile from './currentProfile/currentProfile.component';
import Edit from './editProfile/profileEdit.component';
import { useAppSelector } from '../../hooks/redux.hooks';

const Profile: React.FC = (): JSX.Element => {
    const [toggle, setToggle] = useState<boolean>(true);
    const { id } = useParams();
    const { user } = useAppSelector((state) => state.data);

    const passToggle = (): void => {
        setToggle(true);
    };

    const editHandler: MouseEventHandler<HTMLButtonElement> = () => {
        setToggle(false);
    };

    return (
        <div className={style.container}>
            <h2>Profile</h2>
            {toggle ? (
                <>
                    <CurrentProfile
                        data-testid="current-profile"
                        id={user?.id}
                        name={user?.name}
                        surname={user?.surname}
                        phoneNumber={user?.phoneNumber}
                        email={user?.email}
                        occupation={user?.occupation}
                        imageName={user?.imageName}
                        address={user?.addressDto}
                        imageSrc={user?.imageSrc}
                        passToggle={passToggle}
                    />
                    <div className={style.button}>
                        <button onClick={editHandler} id={id} className={style.edit}>
                            Edit
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <Edit
                        data-testid="edit-profile"
                        id={user?.id}
                        name={user?.name}
                        surname={user?.surname}
                        phoneNumber={user?.phoneNumber}
                        email={user?.email}
                        occupation={user?.occupation}
                        imageName={user?.imageName}
                        address={user?.addressDto}
                        imageSrc={user?.imageSrc}
                        passToggle={passToggle}
                    />
                </>
            )}
        </div>
    );
};

export default Profile;
