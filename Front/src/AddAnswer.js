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
        history.go(0);
    };

    return (
        <div>
            <div>Responde a esta pregunta</div>
            <form className="answer-form" onSubmit={handleSubmit}>
                <div>
                    <ReactQuill
                        value={message}
                        onChange={setMessage}
                        required
                    />
                </div>
                <button>Enviar</button>
            </form>
        </div>
    );
}
