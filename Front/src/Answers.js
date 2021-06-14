import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Comments from './Comments';
import useFetch from './useFetch';

export default function Answers({
    id_question,
    question_status,
    id_answer_acepted,
    id_question_user,
}) {
    const res = useFetch(`http://localhost:4000/api/answers/${id_question}`);
    const token = useSelector((s) => s.user?.token);
    const dispatch = useDispatch();
    const history = useHistory();
    const id_user = useSelector((s) => s.user?.info.id);
    console.log(id_user);
    async function HandleAcceptAnswerClick(e, id_answer) {
        //Para aceptar una respuesta
        e.preventDefault();
        const res = await fetch(
            'http://localhost:4000/api/questions/' + id_question,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({
                    id_answer: id_answer,
                }),
            }
        );
        if (res.ok) {
            history.push('/tab');
            history.goBack();
        } else {
            dispatch({
                type: 'NEW_ERROR',
                error: 'Error al aceptar Respuesta',
            });
        }
    }

    return (
        <div>
            {res?.answers &&
                res.answers.map((a) => (
                    <>
                        <div key={a.id_answer} className="answer">
                            <div className="answer-owner">
                                {a.foto ? (
                                    <div
                                        className="answer-userfoto"
                                        style={{
                                            backgroundImage: `url(http://localhost:4000/uploads/${a.foto})`,
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="answer-namefoto"
                                        style={{
                                            backgroundColor: a.color,
                                        }}
                                    >
                                        {a.name_user.slice(0, 1)}
                                    </div>
                                )}

                                <div className="answer-username">
                                    {a.name_user}
                                    <br />
                                    <div className="answer-date">
                                        {a.creation_date.slice(0, 10)} at:{' '}
                                        {a.creation_date.slice(11, 19)}
                                    </div>
                                </div>
                            </div>
                            <div>
                                {question_status !== 'PREGUNTA CERRADA' &&
                                    id_question_user === id_user && ( //Si la pregunta no está cerrada y el usuario loggeado es el autor de la pregunta, mostramos el boton para aceptar respuesta
                                        <button
                                            title="Cierra la pregunta a futuras respuestas"
                                            className="accept-answer-checkbox"
                                            onClick={(e) =>
                                                HandleAcceptAnswerClick(
                                                    e,
                                                    a.id_answer
                                                )
                                            }
                                        >
                                            Aceptar Respuesta
                                        </button>
                                    )}
                                {id_answer_acepted === a.id_answer && ( //Si la respuesta es la elegida como aceptada mostramos el mensaje
                                    <div className="accepted-question-message">
                                        ✓ Esta Respuesta ha sido elegida como
                                        Aceptada
                                    </div>
                                )}
                                <div
                                    dangerouslySetInnerHTML={{ __html: a.body }}
                                    className="answer-body"
                                />
                            </div>

                            {a.id_answer_father === null && (
                                <Comments
                                    id_answer_father={a.id_answer}
                                    id_target_user={a.id_user}
                                /> //answers le deberá pasar el id de la respuesta para conseguir los comentarios y el id_user que la ha hecho para comprobar si es el creador de la respuesta que va a votar.
                            )}
                        </div>
                    </>
                ))}
        </div>
    );
}
