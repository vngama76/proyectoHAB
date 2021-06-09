import { useParams } from 'react-router';
import useFetch from './useFetch';

import AddAnswer from './AddAnswer';
import Answers from './Answers';

function Questions() {
    const { q } = useParams();
    const info = useFetch('http://localhost:4000/api/questions/' + q);

    return (
        <div className="question">
            {info && (
                <>
                    <h2>Titulo: {info.title}</h2>
                    <div
                        className="right"
                        dangerouslySetInnerHTML={{ __html: info.body }}
                    />
                    <div>
                        <AddAnswer id={q} />
                    </div>
                    <Answers id_question={q} />
                </>
            )}
        </div>
    );
}

export default Questions;
