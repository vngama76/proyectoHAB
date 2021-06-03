import { Link } from 'react-router-dom';

export default function UserCard({ u }) {
    return (
        <Link to={'/profile/users/' + u.user.id_user}>
            <div className="user-data" key={u.user.id_user}>
                <h5>Usuario: {u.user.name_user}</h5>
                <div
                    className="user-foto"
                    style={{
                        backgroundImage: `url(https://i.pinimg.com/originals/fe/3d/cb/fe3dcbad7e0ebe2d80b20673ec7e53d7.jpg)`,
                    }}
                />
                {u.user.show_mail === 1 && <div>{u.user.email}</div>}
                {u.user.description && <div>{u.user.description}</div>}
            </div>
        </Link>
    );
}
