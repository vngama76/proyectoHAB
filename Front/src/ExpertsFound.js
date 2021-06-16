import useFetch from './useFetch';
import './UsersFound.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function ExpertsFound() {
    const s = 'expert';
    const result = useFetch('http://localhost:4000/api/users/rol/' + s);
    console.log(result);
    return (
        <>
            <h3 className="experts-h3">Nuestros Expertos</h3>
            <Helmet>
                <title>GAPP - Experts</title>
            </Helmet>
            <div className="experts-found">
                {result &&
                    result[0].users.map((h) => (
                        <Link
                            className="experts-gap"
                            to={'/profile/users/' + h.id_user}
                        >
                            {h.foto ? (
                                <div className="user-data" key={h.id_user}>
                                    <h5>{h.name_user}</h5>
                                    <div
                                        className="user-foto"
                                        style={{
                                            backgroundImage: `url(http://localhost:4000/uploads/${h.foto})`,
                                        }}
                                    />
                                    <div>{h.descritpion}</div>
                                </div>
                            ) : (
                                <div className="user-data" key={h.id_user}>
                                    <h5>{h.name_user}</h5>
                                    <div
                                        className="user-name-foto"
                                        style={{
                                            backgroundColor: h.color,
                                        }}
                                    >
                                        {h.name_user.slice(0, 1)}
                                    </div>
                                    <div>{h.descritpion}</div>
                                </div>
                            )}
                        </Link>
                    ))}
            </div>
        </>
    );
}
