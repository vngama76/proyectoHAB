import {
    useParams,
    useHistory,
    NavLink,
    Switch,
    Route,
} from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import useFetch from './useFetch';
import './Profile.css';

import { useState } from 'react';

import UpdateUser from './UpdateUser';
import QuestionsActivity from './QuestionsActivity';
import AnswersActivity from './AnswersActivity';

function Profile() {
    const { q } = useParams();
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);

    // const isLoggedIn = useSelector((s) => !!s.user);
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
                            <div className="box-tabs-title">
                                Info de Usuario
                            </div>
                            Nombre: {res[0].name} <br />
                            Email:{' '}
                            {res[0].show_mail
                                ? res[0].email
                                : ' el usuario prefiere no mostrar su email'}{' '}
                            <br />
                            Rol: {res[0].rol}
                        </div>
                    </div>
                    <div className="userinfo">
                        {' '}
                        Mas sobre ti:{' '}
                        <div className="userinfotext" readOnly="readonly">
                            {res[0].description}
                        </div>
                    </div>

                    <div
                        onClick={handleClick}
                        className="pencil"
                        title="modifica tus datos"
                        style={{
                            backgroundImage: `url(https://www.vhv.rs/dpng/d/91-912742_paper-and-pencil-circle-icon-hd-png-download.png)`,
                        }}
                    />

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
            {res && (
                <div>
                    {' '}
                    <div className="tabs">
                        <NavLink
                            to={`/profile/${q}/questions`}
                            activeClassName="active"
                        >
                            Preguntas
                        </NavLink>
                        <NavLink
                            to={`/profile/${q}/answers`}
                            exact
                            activeClassName="active"
                        >
                            Respuestas
                        </NavLink>
                    </div>
                    <div className="content">
                        <Switch>
                            <Route path={`/profile/${q}/questions`} exact>
                                <QuestionsActivity />
                            </Route>
                            <Route path={`/profile/${q}/answers`} exact>
                                <AnswersActivity />
                            </Route>
                        </Switch>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Profile;
