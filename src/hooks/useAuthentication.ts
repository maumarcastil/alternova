import * as React from 'react';
import { useDispatch } from 'react-redux';
import { User, onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase/firebaseConfig';
import { setUser as setUserRedux } from '../redux/slices/user';

const useAuthentication = () => {
    const [user, setUser] = React.useState<User>();
    const dispatch = useDispatch<any>();

    React.useEffect(() => {
        const unsubscribeFromAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                dispatch(setUserRedux(user))
            } else {
                setUser(undefined);
            }
        });
        return unsubscribeFromAuth;
    }, []);

    return { user, setUser };
};

export default useAuthentication;