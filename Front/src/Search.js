import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import Helmet from 'react-helmet';
import SearchResults from './SearchResults';

function Search() {
  const { q } = useParams();
  const history = useHistory();
  const [search, setSearch] = useState(q || '');
  const dispatch = useDispatch();
  const recent = useSelector((s) => s.history);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/search/' + search);
    dispatch({ type: 'SEARCH', search });
  };

  return (
    <div className="search">
      <h1>Busca preguntas</h1>
      <Helmet>
        <title>GAPP - {q ? 'Search: ' + q : 'Search'}</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>🔍</button>
      </form>
      {q && <SearchResults q={q} />}
    </div>
  );
}

export default Search;
