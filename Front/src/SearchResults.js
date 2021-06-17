import { Link } from 'react-router-dom';
import useFetch from './useFetch';

function SearchResults({ q }) {
    const results = useFetch(`http://localhost:4000/api/questions/tags/${q}`);
    console.log(results);
    return (
        <>
            <div className="results">
                {results?.questions.map((e) => (
                    <Link
                        key={e.id_question}
                        to={`/questions/${e.id_question}`}
                        className="search-results-each"
                    >
                        <div className="results-activity-box">
                            <div className="activity-q-a">{e.title}</div>
                            <div className="activity-date">
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
                {!results && <i>Loading...</i>}
                {!results?.questions.length && <h3>No results found!</h3>}
            </div>
        </>
    );
}

export default SearchResults;
