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

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} className="App-logo" alt="logo" />
      </Link>

      {!user && (
        <Link to="/login">
          <button className="login-button">Log in</button>
        </Link>
      )}

      {user && (
        <Link to="/">
          <button className="login-button" onClick={handleLogout}>
            Log out
          </button>
        </Link>
      )}
    </div>
  );
}

export default Navbar;
