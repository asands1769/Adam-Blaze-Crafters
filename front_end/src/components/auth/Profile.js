import { useAuth0 } from '@auth0/auth0-react';
import './Auth.css';

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    return (
        //checking to see if the user is not authenticated before seeing the login button
        isAuthenticated && (
            <article className="profile">
                {JSON.stringify(user)}
            </article>
        )
    )
}

export default Profile