import { useParams, NavLink, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Profile.css';

import { useEffect, useState } from 'react';

import UpdateUser from './UpdateUser';
import QuestionsActivity from './QuestionsActivity';
import AnswersActivity from './AnswersActivity';
import { useSetTrigger, useTrigger } from './TriggerContext';
import { useSelector } from 'react-redux';

function Profile() {
    const { q } = useParams();
    const [showModal, setShowModal] = useState(false);
    const trigger = useTrigger();
    const setTrigger = useSetTrigger();
    const token = useSelector((s) => s.user?.token);
    const [res, setUser] = useState();

    const handleClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    useEffect(() => {
        if (trigger) {
            fetch(`http://localhost:4000/api/users/${q}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
                .then((res) => res.json())
                .then(([data]) => setUser(data));
        }
    }, [q, trigger, setUser, token]);
    console.log(res);

    return (
        <div className="profile">
            <h1>Página de usuario</h1>
            {res && (
                <>
                    <Helmet>
                        <title>Perfil de {res.name}</title>
                    </Helmet>
                    <div className="box">
                        <div className="tabs">
                            <div className="box-tabs-title">
                                Info de Usuario
                            </div>
                            Nombre: {res.name} <br />
                            Email:{' '}
                            {res.show_mail
                                ? res.email
                                : ' el usuario prefiere no mostrar su email'}{' '}
                            <br />
                            Rol: {res.rol}
                        </div>
                    </div>
                    <div className="userinfo">
                        {' '}
                        Mas sobre ti:{' '}
                        <div className="userinfotext" readOnly="readonly">
                            {res.description}
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
                                // setTrigger();
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
