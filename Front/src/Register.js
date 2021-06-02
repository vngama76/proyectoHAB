import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
function Register() {
  const [name_user, setName_user] = useState('');
  const [password_user, setPassword_user] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  // const isRegisterIn = useSelector(s => !!s.user);
  const handleRegister = async (e) => {
    e.preventDefault();
    const reg = await fetch('http://localhost:4000/api/users/register', {
      method: 'POST',
      body: JSON.stringify({
        name_user,
        email,
        password_user,
        repeatedPassword,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (reg.ok) {
      // const data = await reg.json()
      // dispatch({ type: 'REGISTER', user: data })
      history.push('/login');
    }
  };
  // if (isRegisterIn) {
  //     return <Redirect to="/login" />
  // }
  return (
    <div>
      <h1>Registrate</h1>
      <form onSubmit={handleRegister}>
        <label>
          <spam>Usuario:</spam>
          <input
            value={name_user}
            onChange={(e) => setName_user(e.target.value)}
            required
          />
        </label>
        <label>
          <spam>Email:</spam>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <spam>Password:</spam>
          <input
            value={password_user}
            onChange={(e) => setPassword_user(e.target.value)}
            required
          />
        </label>
        <label>
          <spam>Repite Password:</spam>
          <input
            value={repeatedPassword}
            onChange={(e) => setRepeatedPassword(e.target.value)}
            required
          />
        </label>
        <button>Enviar</button>
      </form>
      <p>
        <spam>Ya tienes cuenta?</spam>
        <Link to="/login">Log in</Link>
      </p>
      <p>
        <Link to="/">Home</Link>
      </p>
    </div>
  );
}
export default Register;
