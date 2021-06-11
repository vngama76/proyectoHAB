import { useState } from 'react';
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
        <div className="add-comment">
            <div>Comenta esta respuesta</div>
            <form className="add-comment-form" onSubmit={handleSubmit}>
                <input
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="add-comment-input"
                />

                <button
                    className="add-comment-button"
                    style={{
                        backgroundImage: `url(https://static.thenounproject.com/png/1054386-200.png)`,
                    }}
                />
            </form>
        </div>
    );
}
