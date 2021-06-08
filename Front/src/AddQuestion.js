import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import './antd.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Option } = Select;

function AddQuestion() {
    const user = useSelector((u) => u.user);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const tagsToLowerCase = tags.map((v) => v.toLowerCase());
    const hadleSubmit = (e) => {
        e.preventDefault();
        setTitle('');
        setMessage('');
        setTags([]);
        const res = fetch('http://localhost:4000/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user.token,
            },
            body: JSON.stringify({
                title: title,
                body: message,
                tags: tagsToLowerCase,
            }),
        });
        console.log(res);
        if (res.ok === false) {
            alert('hubo un fallo');
        }
    };

    return (
        <aside>
            <fieldset>
                <form onSubmit={hadleSubmit}>
                    <div>
                        <p>title:</p>
                        <input
                            placeholder="escribe un titulo para tu pregunta...."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <p>Pregunta:</p>
                        <ReactQuill
                            value={message}
                            onChange={setMessage}
                            required
                        />
                    </div>

                    <div>
                        <Select
                            mode="tags"
                            style={{ width: 300 }}
                            value={tags}
                            onChange={setTags}
                        >
                            <Option></Option>
                        </Select>
                    </div>
                    <button>Enviar</button>
                </form>
            </fieldset>
        </aside>
    );
}

export default AddQuestion;
