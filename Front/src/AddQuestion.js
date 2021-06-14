import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    const dispatch = useDispatch();
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
            history.push('/questions/' + question.question.id_question);
        } else {
            dispatch({
                type: 'NEW_ERROR',
                error: 'Error al enviar Pregunta',
            });
        }
    };

    return (
        <div className="add-question-page">
            <form onSubmit={handleSubmit} className="form-quill">
                <div className="form-p-input">
                    <p className="add-question-p">Título:</p>
                    <input
                        className="add-question-input"
                        placeholder="Escribe un titulo para tu pregunta...."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="react-quill-div">
                    <ReactQuill
                        value={message}
                        onChange={setMessage}
                        required
                    />

                    <Select
                        mode="tags"
                        style={{ width: 300 }}
                        value={tags}
                        onChange={setTags}
                        placeholder="Tags..."
                        className="tags-input"
                    >
                        <Option></Option>
                    </Select>
                </div>

                <button className="quill-button">Postear Pregunta</button>
            </form>
            <div className="tips">
                <div className="tips-einstein">
                    “SI YO TUVIERA UNA HORA PARA RESOLVER UN PROBLEMA Y MI VIDA
                    DEPENDIERA DE LA SOLUCIÓN, INVERTIRÍA LOS PRIMEROS 55
                    MINUTOS PARA DETERMINAR LA PREGUNTA APROPIADA, PORQUE UNA
                    VEZ QUE SUPIERA LA PREGUNTA CORRECTA, PODRÍA RESOLVER EL
                    PROBLEMA EN CINCO MINUTOS.” <br /> ALBERT EINSTEIN
                </div>
                <div className="tips-consejos">
                    <div>
                        <h5>
                            ¿QUIEN – QUE – CUANDO – DONDE – CUAL – POR QUE Y
                            COMO?
                        </h5>
                        Intenta colocar estas palabras que harán referencia. Al
                        ir desde la simple pregunta «sí / no» en el inicio hasta
                        el «por qué» como pregunta final, te darás cuenta de que
                        las consultas tienden a estimular el pensamiento más
                        reflexivo
                    </div>
                    <div>
                        <h5>Crea una pregunta atractiva</h5>
                        Para formular preguntas poderosas, es importante alentar
                        a la reflexión y apuntar a estimular el aprendizaje y la
                        colaboración. Nuestros expertos se ecuentran siempre al
                        acecho de preguntas interesantes.
                    </div>
                    <div>
                        <h5>Da opciones de respuesta correcta</h5>Hacer las
                        preguntas correctas es algo extremadamente importante y
                        por lo tanto ofrecer en estas preguntas las opciones de
                        respuesta correcta es algo indispensable. Recuerda que
                        la pregunta debe ser algo fácil de responder.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddQuestion;
