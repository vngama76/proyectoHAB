import { useSelector } from 'react-redux';
import './Article.css';
import { Link } from 'react-router-dom';
import FindUsers from './FindUsers';
import { useEffect, useState } from 'react';
import { useTrigger } from './TriggerContext';

export default function Article() {
    const id = useSelector((s) => s.user.info.id);
    const [user, setUser] = useState();
    const token = useSelector((s) => s.user?.token);
    const trigger = useTrigger();

    useEffect(() => {
        if (trigger) {
            fetch(`http://localhost:4000/api/users/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
                .then((res) => res.json())
                .then(([data]) => setUser(data));
        }
    }, [id, trigger, setUser, token]);
    return (
        <div className="article">
            {user && (
                <>
                    <Link to={'/profile/' + user.id}>
                        {user.foto ? (
                            <div
                                className="avatar"
                                style={{
                                    backgroundImage: `url(http://localhost:4000/uploads/${user.foto})`,
                                }}
                            />
                        ) : (
                            <div
                                className="namefoto"
                                style={{
                                    backgroundColor: user.color,
                                }}
                            >
                                {user.name.slice(0, 1)}
                            </div>
                        )}
                    </Link>

                    <p className="username">{user.name}</p>

                    <div className="article-rol">
                        {' '}
                        {user.rol === 'admin'
                            ? 'Admin'
                            : user.rol === 'expert'
                            ? 'Experto'
                            : 'User'}
                    </div>

                    <FindUsers />
                </>
            )}
        </div>
    );
}
