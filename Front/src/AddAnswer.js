import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';

export default function AddAnswer({ id }) {
    const user = useSelector((u) => u.user);
    const [message, setMessage] = useState('');
    console.log(id);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(message);
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
        console.log(res);
        if (res.ok === false) {
            alert('hubo un fallo');
        }
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
