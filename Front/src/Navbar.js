import { Link } from 'react-router-dom';
import logo from './Logo.png';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import LoginModal from './LoginModal';

function Navbar() {
    const user = useSelector((s) => s.user);
    console.log(user);

    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.stopPropagation();
        dispatch({
            type: 'LOGOUT',
        });
    };
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="navbar">
                <Link to="/">
                    <img src={logo} className="app-logo" alt="logo" />
                </Link>
                <Link to="/addQuestion">Pregunta</Link>
                <div className="user-area">
                    {!user.token && (
                        <div
                            className="log-button"
                            onClick={() => setShowModal(true)}
                        >
                            Iniciar sesión
                        </div>
                    )}
                    {user.info && (
                        <div className="profile-menu">
                            <div>{user.info.name}</div>
                            <Link to="/">
                                <div
                                    className="log-button"
                                    onClick={handleLogout}
                                >
                                    LogOut
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            {showModal && <LoginModal closeModal={() => setShowModal(false)} />}
        </>
    );
}

export default Navbar;
