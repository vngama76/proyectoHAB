import { useParams } from 'react-router';
import useFetch from './useFetch';
import './Questions.css';

import AddAnswer from './AddAnswer';
import Answers from './Answers';

function Questions() {
    const { q } = useParams();
    const user = useFetch('http://localhost:4000/api/users/question/' + q);
    const info = useFetch('http://localhost:4000/api/questions/' + q);

    return (
        <>
            {info && (
                <div className="question">
                    {user && (
                        <div className="question-owner">
                            <h2 className="question-title">
                                Titulo: {info.title}
                            </h2>
                            <div className="question-userinfo">
                                <div
                                    className="question-userfoto"
                                    style={{
                                        backgroundImage: `url(http://localhost:4000/uploads/${user.foto})`,
                                    }}
                                />
                                <div className="question-username">
                                    {user.name}
                                    <br />
                                    <div className="question-date">
                                        {info.date.slice(0, 10)}/
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

                    <AddAnswer id={q} />

                    <Answers id_question={q} />
                </div>
            )}
        </>
    );
}

export default Questions;
