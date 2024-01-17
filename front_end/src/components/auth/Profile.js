import { useAuth0 } from '@auth0/auth0-react';
import './Auth.css';

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    return (
        
        //checking to see if the user is not authenticated before seeing the login button */
        isAuthenticated && (
            //Provides image if it exists
            <div className='page-container'>
            <article className="profile">
                {user?.picture && <img src={user.picture} alt={user?.name} />}
                <h2>{user?.name}</h2>
                <ul>
                    {Object.keys(user).map((objKey, i) => 
                        <li key={i}>{objKey}: {user[objKey]}</li>
                    )}
                </ul>
            </article>
            </div>
        )
    )
}

export default Profile