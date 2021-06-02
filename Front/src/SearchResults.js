import { Link } from 'react-router-dom';
import useFetch from './useFetch';

function SearchResults({ q }) {
  const results = useFetch(`http://localhost:4000/api/questions/tags/${q}`);

  console.log(results);
  return (
    <div className="results">
      <h2>Results:</h2>
      {results?.questions.map((e) => (
        <li key={e.id_question}>
          <Link to={`/questions/${e.id_question}`}>{e.title}</Link>
        </li>
      ))}
      {!results && <i>Loading...</i>}
      {results && !results.results && <i>No results found!</i>}
    </div>
  );
}

export default SearchResults;
