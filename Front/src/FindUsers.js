import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Helmet from 'react-helmet';
import SearchResults from './SearchResults';

export default function FindUsers() {
    const { q } = useParams();
    const history = useHistory();
    const [search, setSearch] = useState(q || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push('/search/' + search);
    };
    return (
        <div className="search">
            <h1>Busca preguntas</h1>
            <Helmet>
                <title>GAPP - Users</title>
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
