import { Link } from 'react-router-dom';
import logo from './Logo.png';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import LoginModal from './LoginModal';

function Navbar() {
    const user = useSelector((s) => s.user);
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.stopPropagation();
        dispatch({
            type: 'LOGOUT',
        });
    };
    const [showModal, setShowModal] = useState(false);

    console.log(user);

    return (
        <>
            <div className="navbar">
                <Link to="/">
                    <img src={logo} className="app-logo" alt="logo" />
                </Link>
                <div className="user-area">
                    {!user && (
                        <div
                            className="log-button"
                            onClick={() => setShowModal(true)}
                        >
                            Iniciar sesión
                        </div>
                    )}
                    {user && (
                        <div className="profile-menu">
                            <div>{user.name}</div>
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
