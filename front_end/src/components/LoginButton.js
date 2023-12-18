import {useAuth0} from '@auth0/auth0-react';

const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        //checking to see if the user is not authenticated before seeing the login button
        !isAuthenticated && (
            <button onClick={() => loginWithRedirect()}>
                Log In
            </button>
        )
    )
}

export default LoginButton