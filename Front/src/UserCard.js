import { Link } from 'react-router-dom';

export default function UserCard({ u }) {
    return (
        <Link to={'/profile/users/' + u.id_user}>
            <div className="user-data" key={u.id_user}>
                <h5>Usuario: {u.name_user}</h5>
                <div
                    className="user-foto"
                    style={{
                        backgroundImage: `url(https://i.pinimg.com/originals/fe/3d/cb/fe3dcbad7e0ebe2d80b20673ec7e53d7.jpg)`,
                    }}
                />
                {u.show_mail === 1 && <div>{u.email}</div>}
                {u.description && <div>{u.description}</div>}
            </div>
        </Link>
    );
}
