import { useState } from 'react';
import Helmet from 'react-helmet';
import SearchResults from './SearchResults';

function Search() {
    const [search, setSearch] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="search">
            <h1>Busca preguntas</h1>
            <Helmet>
                <title>GAPP - HOME</title>
            </Helmet>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Search..."
                    value={search === ' ' ? '' : search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button>🔍</button>
            </form>
            {search && search !== ' ' && <SearchResults q={search} />}
        </div>
    );
}

export default Search;
