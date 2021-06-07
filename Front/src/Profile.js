import { Link, Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import useFetch from './useFetch';
import './Profile.css';

function Profile() {
    const { q } = useParams();

    const isLoggedIn = useSelector((s) => !!s.user);

    const res = useFetch(`http://localhost:4000/api/users/${q}`);

    if (!isLoggedIn) return <Redirect to="/login" />;

    return (
        <div className="profile">
            <h1>Página de usuario</h1>
            {res && (
                <>
                    <Helmet>
                        <title>Perfil de {res[0].name}</title>
                    </Helmet>
                    <div className="box">
                        <div className="tabs">
                            <p>Info de Usuario</p>
                            Nombre: {res[0].name} <br />
                            Email: {res[0].email} <br />
                            Mail visible:{' '}
                            {res[0].show_mail ? (
                                <span>Si</span>
                            ) : (
                                <span>No</span>
                            )}
                            <br />
                            Rol: {res[0].rol}
                        </div>
                    </div>
                    <div className="userinfo">
                        {' '}
                        Mas sobre ti:{' '}
                        <textarea className="userinfotext" readonly="readonly">
                            {res[0].description}
                        </textarea>
                    </div>
                    <span>
                        <Link to="/updateuser" exact>
                            <h3>✏ </h3>
                        </Link>
                    </span>
                </>
            )}
        </div>
    );
}
export default Profile;
