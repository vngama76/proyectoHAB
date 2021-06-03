import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import UserCard from './UserCard';
import './UsersFound.css';

export default function UsersFound() {
    const { q } = useParams();
    const results = useFetch('http://localhost:4000/api/users/name/' + q);
    return (
        <>
            <h3>Usuarios Encontrados:</h3>
            <Helmet>
                <title>GAPP - Users</title>
            </Helmet>
            <div className="user-found">
                {!results && <i>Loading...</i>}
                {results?.error ? (
                    <i>No results found!</i>
                ) : (
                    results?.map((u) => <UserCard u={u} />)
                )}
            </div>
        </>
    );
}
