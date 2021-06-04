import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import './UsersProfile.css';

export default function UsersProfile() {
    const { q } = useParams();
    const results = useFetch('http://localhost:4000/api/users/' + q);
    console.log(results);
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
                        <div
                            className="foto"
                            style={{
                                backgroundImage: `url(https://i.pinimg.com/originals/fe/3d/cb/fe3dcbad7e0ebe2d80b20673ec7e53d7.jpg)`,
                            }}
                        />
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
                        <div className="queso">Queso</div>
                    </div>
                ))
            )}
        </div>
    );
}
