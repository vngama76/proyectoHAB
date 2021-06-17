import { useParams } from 'react-router-dom';
import TagsChart from './TagsChart';
import useFetch from './useFetch';
import './UsersProfile.css';

export default function UsersProfile() {
    const { q } = useParams();
    const results = useFetch('http://localhost:4000/api/users/' + q);
    return (
        <div className="perfil-usuario-tercero">
            <p>Perfil de Usuario</p>
            {!results && <i>Loading...</i>}
            {results?.error ? (
                <i>No results found!</i>
            ) : (
                results?.map((u) => (
                    <div key={u.id} className="datos-usuario">
                        <div className="nombre">Nombre: {u.name}</div>
                        {u.foto ? (
                            <div
                                className="avatar"
                                style={{
                                    backgroundImage: `url(${u.foto})`,
                                }}
                            />
                        ) : (
                            <div
                                className="namefoto"
                                style={{
                                    backgroundColor: u.color,
                                }}
                            >
                                {u.name.slice(0, 1)}
                            </div>
                        )}
                        <div className="email">
                            Email:{' '}
                            {u.show_mail
                                ? u.email
                                : 'El usuario prefiere no mostrar su email'}
                        </div>
                        <div className="descripcion">
                            Descripción:
                            <div>{u.description}</div>
                        </div>
                        <div className="puntos">Puntos</div>
                        <TagsChart className="queso" />
                    </div>
                ))
            )}
        </div>
    );
}
