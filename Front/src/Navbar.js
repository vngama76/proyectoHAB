import { Link } from 'react-router-dom';
import logo from './Logo.png';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import LoginModal from './LoginModal';
import { Redirect } from 'react-router-dom';

function Navbar() {
    const isLoggedIn = useSelector((s) => !!s.user.token);
    const user = useSelector((s) => s.user);
    console.log(user);

    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.stopPropagation();
        dispatch({
            type: 'LOGOUT',
        });
        if (isLoggedIn) {
            return <Redirect to="/landing" />;
        }
    };
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="navbar">
                <Link to="/lastquestions" className="logo-container">
                    <div
                        style={{
                            backgroundImage: `url(${logo})`,
                        }}
                        id="app-logo"
                    />
                </Link>
                {isLoggedIn && (
                    <Link className="pregunta-button" to="/addQuestion">
                        Haz una Pregunta
                    </Link>
                )}
                <div className="user-area">
                    {!isLoggedIn && (
                        <div
                            className="log-button"
                            onClick={() => setShowModal(true)}
                        >
                            Iniciar sesión
                        </div>
                    )}
                    {isLoggedIn && (
                        <Link to="/">
                            <div className="log-button" onClick={handleLogout}>
                                LogOut
                            </div>
                        </Link>
                    )}
                </div>
            </div>
            {showModal && <LoginModal closeModal={() => setShowModal(false)} />}
        </>
    );
}

export default Navbar;
