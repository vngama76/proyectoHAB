import { useHistory, useParams } from 'react-router';
import useFetch from './useFetch';
import './Questions.css';

import AddAnswer from './AddAnswer';
import Answers from './Answers';
import VoteThis from './VoteThis';
import { useDispatch, useSelector } from 'react-redux';

function Questions() {
    const history = useHistory();
    const userIsAdmin = useSelector((s) => !!s.user.info.rol.includes('admin'));
    const token = useSelector((s) => s.user?.token);
    const dispatch = useDispatch();
    const { q } = useParams();
    const user = useFetch('http://localhost:4000/api/users/question/' + q); //Obtengo los datos de la pregunta
    const info = useFetch('http://localhost:4000/api/questions/' + q); //Obtengo los datos del usuario que ha realizado la pregunta
    // TODO Se podria resumir en Backend

    const HandleCloseQuestion = async (e) => {
        //Para cerrar la pregunta siendo el admin
        e.preventDefault();

        const res = await fetch(
            'http://localhost:4000/api/admin/questions/' + q,
            {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }
        );
        if (res.ok) {
            history.push('/tab');
            history.goBack();
        } else {
            dispatch({
                type: 'NEW_ERROR',
                error: 'Error al cerrar pregunta',
            });
        }
    };

    return (
        <>
            {info && (
                <div className="question">
                    {user && (
                        <div className="question-owner">
                            <h2 className="question-title">{info.title}</h2>
                            <div className="question-userinfo">
                                {user.foto ? (
                                    <div
                                        className="question-userfoto"
                                        style={{
                                            backgroundImage: `url(http://localhost:4000/uploads/${user.foto})`,
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="question-namefoto"
                                        style={{
                                            backgroundColor: user.color,
                                        }}
                                    >
                                        {user.name.slice(0, 1)}
                                    </div>
                                )}
                                <div className="question-username">
                                    {user.name}
                                    <br />
                                    <div className="question-date">
                                        {info.date.slice(0, 10)} at:{' '}
                                        {info.date.slice(11, 19)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div
                        className="question-body"
                        dangerouslySetInnerHTML={{ __html: info.body }}
                    />

                    <div className="vote-addanswer">
                        <div className="is-admin">
                            <VoteThis
                                // VoteThis es un complemento que llamaremos en Questions, Answers y Comments
                                url_post={
                                    'http://localhost:4000/api/score/question/'
                                }
                                //url_post la utilizamos para la accion de votar
                                url_user={
                                    'http://localhost:4000/api/getscore/question/'
                                }
                                //url_user lo utilizamos para saber si el usuario ha votado anteriormente la pregunta/respuesta/comentario
                                url_get={
                                    'http://localhost:4000/api/getTotalScore/question/'
                                }
                                //url_get lo utilizamos en el fetch que contamos la catidad de puntos de la pregunta/comentario/respuesta
                                id_a_votar={q}
                                clase={'question'} //comprobamos si es una pregunta, respuesta o comentario para elegir las clases
                                id_target_user={info.id_user} //servirà para comparar el id del usuario que votaría la pregunta tuviera el mismo id que la pregunta/respuesta/comentario, no lo dejaremos votar
                            />
                            {userIsAdmin &&
                                info.status !== 'PREGUNTA CERRADA' && ( //si es admin y la pregunta no esta cerrada... se muestra el boton de cerrar.
                                    <button
                                        className="admin-button"
                                        title="No admite más Respuestas"
                                        onClick={HandleCloseQuestion}
                                    >
                                        Cierra pregunta
                                    </button>
                                )}
                        </div>

                        {info.status !== 'PREGUNTA CERRADA' && (
                            <AddAnswer id={q} /> //Si la pregunta no está cerrada, permitimos agregar respuestas
                        )}
                    </div>

                    <Answers
                        id_question={q}
                        question_status={info.status}
                        id_answer_acepted={info.id_answer_acepted}
                    />
                    {/* Pasamos como parametros el status de la pregunta para comprobaciones, y el id de la pregunta que haya sido aceptada si la hubiera  */}
                </div>
            )}
        </>
    );
}

export default Questions;
