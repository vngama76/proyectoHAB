import { useState } from 'react';
import ReactQuill from 'react-quill';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

export default function AddComment({ id_answer_father }) {
    const history = useHistory();
    const user = useSelector((u) => u.user);
    const [message, setMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');

        const res = fetch(
            'http://localhost:4000/api/comments/' + id_answer_father,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + user.token,
                },
                body: JSON.stringify({
                    body: message,
                }),
            }
        );

        if (res.ok === false) {
            alert('hubo un fallo');
        }
        history.push('/temp');
        history.goBack();
    };

    return (
        <div>
            <div>Comenta esta respuesta</div>
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
