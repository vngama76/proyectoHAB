import { Link, Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import useFetch from './useFetch';

function Profile() {
    const { q } = useParams();

    const isLoggedIn = useSelector((s) => !!s.user);

    const res = useFetch(`http://localhost:4000/api/users/${q}`);

    if (!isLoggedIn) return <Redirect to="/login" />;

    return (
        <div className="profile">
            <h1>Profile</h1>
            {res && (
                <>
                    <Helmet>
                        <title>Perfil de {res[0].name}</title>
                    </Helmet>
                    <div className="box">
                        <div className="tabs">
                            <p>My info</p>
                            Nombre: {res[0].name} <br />
                            email: {res[0].email} <br />
                            Mail visible:{' '}
                            {res[0].show_mail ? (
                                <span>Si</span>
                            ) : (
                                <span>No</span>
                            )}
                            <br />
                            Rol: {res[0].rol}
                        </div>
                        <span>
                            <Link to="/updateuser" exact>
                                ✏
                            </Link>
                        </span>
                    </div>
                </>
            )}
        </div>
    );
}
export default Profile;
