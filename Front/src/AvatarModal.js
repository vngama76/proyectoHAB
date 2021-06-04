import { useState } from 'react';
import { useSelector } from 'react-redux';
import './AvatarModal.css';

export default function AvatarModal({ closeModal }) {
    const user = useSelector((u) => u.user);

    const defaultimage =
        'https://i.pinimg.com/originals/fe/3d/cb/fe3dcbad7e0ebe2d80b20673ec7e53d7.jpg';
    const [file, setFile] = useState();
    const [preview, setPreview] = useState(defaultimage);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('avatar', file);

        const ret = await fetch('http://localhost:4000/api/users/avatar', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + user.token,
            },
            body: fd,
        });
        console.log('Status:', ret);
        const data = await ret.json();
        console.log('Data:', data);
    };

    const handleFile = (e) => {
        const f = e.target.files[0];
        console.log(typeof f, f);
        setFile(f);
        setPreview(f ? URL.createObjectURL(f) : defaultimage);
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
