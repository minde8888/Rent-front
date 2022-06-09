import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProfile } from '../../services/user.services/user.services';

export const Profile = (): JSX.Element => {
    console.log(111);

    const [data, setData] = useState({});
    const [error, setError] = useState('');
    const { id } = useParams();

    useEffect(() => {
        console.log(22222);

        getRequests();
    }, []);

    const getRequests = async () => {
        try {
            if (id !== undefined) {
                const user = await getProfile(id);
                setData(user);
            }
        } catch (error: any) {
            setError(error.message);
        }
    };
    console.log(data);
    console.log(error);

    return <div>profile</div>;
};

// function withRouter(Component: any) {
//     function ComponentWithRouterProp(props: JSX.IntrinsicAttributes) {
//         let location = useLocation();
//         let navigate = useNavigate();
//         let params = useParams();
//         return <Component {...props} router={{ location, navigate, params }} />;
//     }

//     return ComponentWithRouterProp;
// }

// export default withRouter(Profile);

// export default Profile;
