import { Link } from 'react-router-dom';
import useFetch from './useFetch';
import { useSelector } from 'react-redux';
import './Activity.css';

function QuestionsActivity() {
    const user = useSelector((s) => s.user);
    const results = useFetch(
        `http://localhost:4000/api/questions/user/${user.info.id}`
    );

    return (
        <div className="activity-box">
            <div className="activity-title">
                <h5>Preguntas que has realizado</h5>
            </div>

            {results &&
                results.question.map((e) => (
                    <div key={e.id_question}>
                        <Link to={`/questions/${e.id_question}`}>
                            <div className="results-activity-box">
                                <div className="activity-q-a">{e.title}</div>
                                <div className="activity-date">
                                    {e.creation_date.slice(0, 10)}{' '}
                                    {e.creation_date.slice(11, 19)}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}

            {!results && <i>Loading...</i>}
            {results && !results.question.length && (
                <i>Todavia no has hecho ninguna pregunta</i>
            )}
        </div>
    );
}
export default QuestionsActivity;
