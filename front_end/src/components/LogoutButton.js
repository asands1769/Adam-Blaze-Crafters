import {useAuth0} from '@auth0/auth0-react';

const LogoutButton = () => {
    const {logout, isAuthenticated } = useAuth0();
    return (
        //checking to see if the user is authenticated before seeing the logout button
        isAuthenticated && (
            <button onClick={() => logout()}>
                Log Out
            </button>
        )
    )
}

export default LogoutButton