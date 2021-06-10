import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import { useHistory } from 'react-router';
import './antd.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Option } = Select;

function AddQuestion() {
  const history = useHistory();
  const user = useSelector((u) => u.user);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const tagsToLowerCase = tags.map((v) => v.toLowerCase());
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitle('');
    setMessage('');
    setTags([]);
    const res = await fetch('http://localhost:4000/api/questions', {
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
    if (res.ok) {
      const question = await res.json();
      console.log(question);
      history.push('/questions/' + question.question.id_question);
    }

    if (res.ok === false) {
      alert('hubo un fallo');
    }
  };

  return (
    <aside>
      <fieldset>
        <form onSubmit={handleSubmit}>
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
            <ReactQuill value={message} onChange={setMessage} required />
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
