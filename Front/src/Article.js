import { useSelector } from 'react-redux';
import './Article.css';
import { Link } from 'react-router-dom';
import FindUsers from './FindUsers';

export default function Article() {
    const user = useSelector((s) => s.user.info);

    if (!user) return <p>Cargando...</p>;
    const foto = user.foto
        ? `http://localhost:4000/uploads/${user.foto}`
        : null;

    return (
        <div className="article">
            <>
                <Link to={'/profile/' + user.id}>
                    {foto ? (
                        <div
                            className="avatar"
                            style={{
                                backgroundImage: `url(${foto})`,
                            }}
                        />
                    ) : (
                        <div
                            className="namefoto"
                            style={{
                                backgroundColor: '#2592B0',
                            }}
                        >
                            {user.name.slice(0, 1)}
                        </div>
                    )}
                </Link>

                <p className="username">{user.name}</p>

                <FindUsers />
            </>
        </div>
    );
}
