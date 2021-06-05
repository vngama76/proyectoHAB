import { useState } from 'react';
import { useSelector } from 'react-redux';

import './AvatarModal.css';
export default function AvatarModal({ closeModal }) {
    const user = useSelector((u) => u.user);

    const [file, setFile] = useState();
    const foto = user.foto
        ? require(`../../Back/static/` + user.foto).default
        : 'https://static.vecteezy.com/system/resources/thumbnails/000/379/559/small/Universal__2838_29.jpg';

    const [preview, setPreview] = useState(foto);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file !== undefined) {
            const fd = new FormData();
            fd.append('avatar', file);

            const ret = await fetch('http://localhost:4000/api/users/avatar', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + user.token,
                },
                body: fd,
            });
            const data = await ret.json();
            console.log('Data:', data);
            closeModal();
        } else {
            alert('Debes Seleccionar una imagen');
        }
    };

    const handleFile = (e) => {
        const f = e.target.files[0];
        setFile(f);
        setPreview(f ? URL.createObjectURL(f) : user.foto);
    };

    return (
        <div className="modal-bg" onClick={closeModal}>
            <div className="modal-fg" onClick={(e) => e.stopPropagation()}>
                <form className="change-avatar" onSubmit={handleSubmit}>
                    <h1>Subir imagen</h1>
                    <label>
                        {preview && (
                            <div
                                className="preview"
                                style={{ backgroundImage: `url(${preview})` }}
                            />
                        )}

                        <input type="file" onChange={handleFile} />
                    </label>
                    <button>Enviar</button>
                </form>
            </div>
        </div>
    );
}
