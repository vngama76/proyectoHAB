import { Link } from 'react-router-dom';
import useFetch from './useFetch';

function SearchResults({ q }) {
    const results = useFetch(`http://localhost:4000/api/questions/tags/${q}`);
    return (
        <>
            <div className="home-results">
                {results?.questions.slice(0, 8).map((e) => (
                    <Link
                        key={e.id_question}
                        to={`/questions/${e.id_question}`}
                        className="search-results-each"
                    >
                        <div className="home-results-activity-box">
                            <div className="home-activity-q-a">
                                {e.title.length >= 36
                                    ? e.title.slice(0, 35) + '...'
                                    : e.title}
                            </div>
                            <div className="home-activity-date">
                                {e.creation_date
                                    .slice(0, 10)
                                    .split('-')
                                    .reverse()
                                    .join('-')}{' '}
                                at {e.creation_date.slice(11, 19)}
                            </div>
                        </div>
                    </Link>
                ))}
                {!results && <div>Loading...</div>}
                {!results?.questions.length && (
                    <div>
                        <div>Al parecer no pudimos encontrar tu pregunta</div>
                        <div>
                            Puedes realizar una{' '}
                            <Link
                                to="/addQuestion"
                                style={{
                                    backgroundColor: 'blue',
                                    borderRadius: 5,
                                    padding: 3,
                                    fontWeight: 600,
                                }}
                            >
                                Aqui
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default SearchResults;
