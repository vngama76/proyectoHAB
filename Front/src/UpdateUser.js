import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './UpdateUser.css';
import refreshUser from './helpers';
import UpdateAvatar from './UpdateAvatar';

function UpdateUser({ closeModal }) {
    const user = useSelector((u) => u.user.info);

    const [username, setUsername] = useState(user.name);

    const [description, setDescription] = useState(user.description);

    const [showMail, setShowMail] = useState(user.show_mail);

    const dispatch = useDispatch();

    const [file, setFile] = useState();

    const foto = user.foto
        ? `http://localhost:4000/uploads/${user.foto}`
        : 'https://static.vecteezy.com/system/resources/thumbnails/000/379/559/small/Universal__2838_29.jpg';

    const [preview, setPreview] = useState(foto);

    const [showMailToString, setShowMailToString] = useState();

    useEffect(() => {
        setShowMailToString(showMail === 0 ? '0' : '1');
    }, [showMail]);

    const handleClick = () => {
        setShowMail(showMail === 0 ? 1 : 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        UpdateAvatar(file, user);
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
        const password = '123456';

        if (res.ok) {
            const data = await res.json();
            console.log(data);
            refreshUser(user.email, password, dispatch);
            closeModal();
        }
    };
    const handleFile = (e) => {
        const f = e.target.files[0];
        setFile(f);
        setPreview(f ? URL.createObjectURL(f) : user.foto);
    };
    return (
        <>
            <div className="modal-bg" onClick={closeModal}>
                <div className="modal-fg" onClick={(e) => e.stopPropagation()}>
                    <form className="update-user" onSubmit={handleSubmit}>
                        <h1>Actualiza tus datos</h1>
                        <label>
                            {preview && (
                                <div
                                    className="preview"
                                    style={{
                                        backgroundImage: `url(${preview})`,
                                    }}
                                />
                            )}

                            <input type="file" onChange={handleFile} />
                        </label>
                        <label className="nombre">
                            Nombre:{' '}
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>
                        <label className="text-area">
                            Sobre ti:{' '}
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                        <label className="email">
                            Email visible?{' '}
                            <input
                                type="checkbox"
                                checked={showMail}
                                onChange={handleClick}
                            />
                        </label>
                        <button>Actualizar datos</button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default UpdateUser;
