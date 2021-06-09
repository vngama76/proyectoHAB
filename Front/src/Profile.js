import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import useFetch from './useFetch';
import './Profile.css';

import { useState } from 'react';

import UpdateUser from './UpdateUser';

function Profile() {
    const { q } = useParams();
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);

    const isLoggedIn = useSelector((s) => !!s.user);

    const res = useFetch(`http://localhost:4000/api/users/${q}`);

    const handleClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

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

                    <h3 onClick={handleClick}> ✏ </h3>
                    {showModal && (
                        <UpdateUser
                            closeModal={() => {
                                history.go(0);
                                setShowModal(false);
                            }}
                        />
                    )}
                </>
            )}
        </div>
    );
}
export default Profile;
