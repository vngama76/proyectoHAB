import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AvatarModal from './AvatarModal';
function UpdateUser() {
    const user = useSelector((u) => u.user);
    const [username, setUsername] = useState(user.name);
    const [description, setDescription] = useState(user.description);
    const [showMail, setShowMail] = useState(0);
    const history = useHistory();
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
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            history.push('/profile/' + data.id);
        }
    };

    return (
        <>
            <div>
                <div
                    className="foto"
                    style={{
                        backgroundImage: `url(https://i.pinimg.com/originals/fe/3d/cb/fe3dcbad7e0ebe2d80b20673ec7e53d7.jpg)`,
                    }}
                    onClick={() => setShowModal(true)}
                />
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
