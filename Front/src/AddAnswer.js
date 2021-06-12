import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function AddAnswer({ id }) {
    const history = useHistory();
    const user = useSelector((u) => u.user);
    const [message, setMessage] = useState('');
    console.log(id);
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');

        const res = fetch('http://localhost:4000/api/answers/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user.token,
            },
            body: JSON.stringify({
                body: message,
            }),
        });

        if (res.ok === false) {
            alert('hubo un fallo');
        }
        history.push('/temp');
        history.goBack();
    };

    return (
        <div className="add-answer">
            <form className="add-answer-form" onSubmit={handleSubmit}>
                <ReactQuill
                    value={message}
                    placeholder="Escribe una Respuesta..."
                    onChange={setMessage}
                    required
                    className="add-answer-quill"
                />
                <button
                    className="add-answer-button"
                    style={{
                        backgroundImage: `url(https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-share-512.png)`,
                    }}
                />
            </form>
        </div>
    );
}
