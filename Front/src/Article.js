import { useSelector } from 'react-redux';
import './Article.css';
import { Link } from 'react-router-dom';
import FindUsers from './FindUsers';

export default function Article() {
    const user = useSelector((s) => s.user);

    return (
        <div className="article">
            <Link to="/profile">
                <div
                    className="avatar"
                    style={{
                        backgroundImage: `url(https://i.pinimg.com/originals/fe/3d/cb/fe3dcbad7e0ebe2d80b20673ec7e53d7.jpg)`,
                    }}
                />
            </Link>

            <p className="username">{user.name}</p>

            <FindUsers />
        </div>
    );
}
