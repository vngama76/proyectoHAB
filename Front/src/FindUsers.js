import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function FindUsers() {
    const history = useHistory();
    const [search, setSearch] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search) {
            history.push('/search/users/' + search);
            setSearch('');
        }
    };
    return (
        <div className="search">
            <h1>Encuentra un Usuario:</h1>

            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Nombre de Usuario..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button>Busca</button>
            </form>
        </div>
    );
}
