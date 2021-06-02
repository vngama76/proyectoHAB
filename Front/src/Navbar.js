import { Link } from 'react-router-dom';
import logo from './Logo.png';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';

function Navbar() {
    const user = useSelector((s) => s.user);
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.stopPropagation();
        dispatch({
            type: 'LOGOUT',
        });
    };
    console.log(user);
    return (
        <div className="navbar">
            <Link to="/">
                <img src={logo} className="app-logo" alt="logo" />
            </Link>

            {!user && (
                <div className="log-control">
                    <Link to="/login">
                        <div className="log-button">Log in</div>
                    </Link>
                    <Link to="/register">
                        <div className="log-button">Register</div>
                    </Link>
                </div>
            )}

            {user && (
                <div className="profile-menu">
                    <div>{user.name}</div>
                    <Link to="/">
                        <div className="log-button" onClick={handleLogout}>
                            LogOut
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Navbar;
