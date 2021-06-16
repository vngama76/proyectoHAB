import { Link } from 'react-router-dom';
import useFetch from './useFetch';
import './FindExperts.css';

export default function FindExperts() {
    const q = 'expert';
    const results = useFetch('http://localhost:4000/api/users/rolrandom/' + q);
    console.log(results);
    return (
        <div className="find-experts">
            <Link to="/expertsfound">
                <button className="find-experts-button" type="button">
                    Busca un experto
                </button>
            </Link>
            <div className="expert-card">
                {results &&
                    results[0].users.map((e) => (
                        <Link to={'/profile/users/' + e.id_user}>
                            {e.foto ? (
                                <div className="user--data" key={e.id_user}>
                                    <h5>{e.name_user}</h5>
                                    <div
                                        className="expert-avatar"
                                        style={{
                                            backgroundImage: `url(http://localhost:4000/uploads/${e.foto})`,
                                        }}
                                    />
                                    <div>{e.descritpion}</div>
                                </div>
                            ) : (
                                <div className="user--data" key={e.id_user}>
                                    <h5>{e.name_user}</h5>
                                    <div
                                        className="expert-name-foto"
                                        style={{
                                            backgroundColor: e.color,
                                        }}
                                    >
                                        {e.name_user.slice(0, 1)}
                                    </div>
                                    <div>{e.descritpion}</div>
                                </div>
                            )}
                        </Link>
                    ))}
            </div>
        </div>
    );
}
