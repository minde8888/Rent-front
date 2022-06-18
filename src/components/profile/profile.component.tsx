import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { getProfile } from '../../services/user.services/user.services';
import { User } from '../../models/user.model';
import style from './profile.module.scss';
import Current from './current.component';
import Edit from './editProfile/profileEdit.component';
import { useAppSelector } from '../../hooks/redux.hooks';

const Profile: React.FC = (): JSX.Element => {
    // const [data, setData] = useState<User | undefined>();
    const [logged, setLogged] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [toggle, setToggle] = useState<boolean>(true);
    const { id } = useParams();

    const { user } = useAppSelector((state) => state.data);
    // console.log(data);


    // const getRequests = async () => {
    //     console.log(2222);

    //     try {
    //         if (typeof id === 'string') {
    //             console.log(3333);

    //             // const user = await getProfile(id);
    //             setData(user);
    //         }
    //     } catch (error: any) {
    //         setError(error.message);
    //     }
    // };
    // if (logged && typeof id === 'string') {
    //     console.log(1111);

    //     getRequests();
    //     setLogged(false);
    // }

    const editHandler = (event: React.MouseEvent<HTMLHeadingElement>) => {
        setToggle(false);
    };
    const saveHandler = (event: React.MouseEvent<HTMLHeadingElement>) => {
        setToggle(true);
    };

    return (
        <div className={style.container}>
            <h2>Profile</h2>
            {toggle ? (
                <>
                    <Current
                        id={user?.id}
                        name={user?.name}
                        surname={user?.surname}
                        phoneNumber={user?.phoneNumber}
                        email={user?.email}
                        occupation={user?.occupation}
                        imageName={user?.imageName}
                        address={user?.addressDto}
                        imageSrc={user?.imageSrc}
                        error={error}

                    />
                    <div className={style.bottom}>
                        <div onClick={editHandler} id={id} className={style.edit}>
                            Edit
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Edit
                        id={user?.id}
                        name={user?.name}
                        surname={user?.surname}
                        phoneNumber={user?.phoneNumber}
                        email={user?.email}
                        occupation={user?.occupation}
                        imageName={user?.imageName}
                        address={user?.addressDto}
                        imageSrc={user?.imageSrc}
                        error={error}
                    />
                </>
            )}
        </div>
    );
};

export default Profile;
