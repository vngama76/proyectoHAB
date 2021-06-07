import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AvatarModal from './AvatarModal';
import './UpdateUser.css';

function UpdateUser() {
    const user = useSelector((u) => u.user);

    const [username, setUsername] = useState(user.name);

    const [description, setDescription] = useState(user.description);

    const [showMail, setShowMail] = useState(0);

    const history = useHistory();

    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);

    const [showMailToString, setShowMailToString] = useState();

    useEffect(() => {
        setShowMailToString(showMail === 0 ? '0' : '1');
    }, [showMail]);

    const handleClick = () => {
        setShowMail(showMail === 0 ? 1 : 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:4000/api/users', {
            method: 'PUT',
            body: JSON.stringify({
                name_user: username,
                show_mail: showMailToString,
                descritpion: description,
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user.token,
            },
        });
        setUsername('');
        setDescription('');
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            //todo Deberíamos llamar a un fetch de getUserById, y suplantar la info de usuario que tenemos en Redux por la nueva info...??
            //todo Article, NavBar y cualquier otro sitio que utiliza esta info se debería recargar junto con la misma acción.
            history.push('/profile/' + data.id);
        }
    };

    const foto = user.foto
        ? require(`../../Back/static/` + user.foto).default
        : 'https://static.vecteezy.com/system/resources/thumbnails/000/379/559/small/Universal__2838_29.jpg';

    return (
        <>
            <div>
                {foto ? (
                    <div
                        className="update-foto"
                        style={{
                            backgroundImage: `url(${foto})`,
                        }}
                        onClick={() => setShowModal(true)}
                    />
                ) : (
                    <div
                        className="update-foto"
                        style={{
                            backgroundImage: `url(https://static.vecteezy.com/system/resources/thumbnails/000/379/559/small/Universal__2838_29.jpg)`,
                        }}
                        onClick={() => setShowModal(true)}
                    />
                )}

                {showModal && (
                    <AvatarModal closeModal={() => setShowModal(false)} />
                )}
                <form onSubmit={handleSubmit}>
                    <h1>Actualiza tus datos</h1>
                    <label>
                        Nombre:{' '}
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Sobre ti:{' '}
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <br />
                    <label>
                        Email visible?{' '}
                        <input
                            type="checkbox"
                            checked={showMail}
                            onChange={handleClick}
                        />
                    </label>
                    <br />
                    <button>Actualizar datos</button>
                </form>
            </div>
        </>
    );
}
export default UpdateUser;
