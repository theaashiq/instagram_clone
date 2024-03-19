
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useAuthContext = () => {
    const authContext = useContext(AuthContext)

    if(!authContext) {
        throw new Error('Authcontext is undefined')
    }
    return {authContext}
}