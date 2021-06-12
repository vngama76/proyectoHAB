import { Link } from 'react-router-dom';
import useFetch from './useFetch';

function SearchResults({ q }) {
    // const array = []
    const results = useFetch(`http://localhost:4000/api/questions/tags/${q}`);

    // const byBody =
    // const byTitle =

    // const fullArray = [...array, ...byTags, ...byBody, ...byTitle]
    return (
        <div className="results">
            <h2>Results:</h2>
            {results?.questions.map((e) => (
                <div key={e.id_question}>
                    <Link to={`/questions/${e.id_question}`}>{e.title}</Link>
                </div>
            ))}
            {!results && <i>Loading...</i>}
            {results && !results.questions.lenght < 1 && (
                <i>No results found!</i>
            )}
        </div>
    );
}

export default SearchResults;
