import { useParams } from 'react-router';
import useFetch from './useFetch';

function Questions() {
    const { q } = useParams();
    const info = useFetch('http://localhost:4000/api/questions/' + q);

    return (
        <div className="question">
            {info && (
                <>
                    <h2>Titulo: {info.title}</h2>
                    <p>{info.body}</p>
                </>
            )}
        </div>
    );
}

export default Questions;
