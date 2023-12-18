import { useAuth0 } from '@auth0/auth0-react';
import './Auth.css';

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        //checking to see if the user is not authenticated before seeing the login button
        !isAuthenticated && (
            <button className="login-button" onClick={() => loginWithRedirect()}>
                Log In
            </button>
        )
    )
}

export default LoginButton