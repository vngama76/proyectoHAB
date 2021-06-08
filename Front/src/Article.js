import { useSelector } from 'react-redux';
import './Article.css';
import { Link } from 'react-router-dom';
import FindUsers from './FindUsers';

export default function Article() {
    const user = useSelector((s) => s.user.info);
    console.log(user);
    const foto = user
        ? `http://localhost:4000/uploads/${user.foto}`
        : 'https://static.vecteezy.com/system/resources/thumbnails/000/379/559/small/Universal__2838_29.jpg';

    return (
        <div className="article">
            {user.token && (
                <>
                    <Link to={'/profile/' + user.id}>
                        <div
                            className="avatar"
                            style={{
                                backgroundImage: `url(${foto})`,
                            }}
                        />
                    </Link>

                    <p className="username">{user.name}</p>

                    <FindUsers />
                </>
            )}
        </div>
    );
}