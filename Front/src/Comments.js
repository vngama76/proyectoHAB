import AddComment from './AddComment';
import useFetch from './useFetch';

export default function Comments({ id_answer_father }) {
    console.log(id_answer_father);
    const res = useFetch(
        `http://localhost:4000/api/comments/${id_answer_father}`
    );
    console.log(res && res);
    return (
        <div className="comment">
            <AddComment id_answer_father={id_answer_father} />
            {res?.comments &&
                res.comments.map((a) => (
                    <div key={a.id_answer}>
                        <div className="comment-body">{a.body}</div>
                        <div className="comment-date">
                            {a.creation_date.slice(0, 10)}
                        </div>
                        <span className="comment-hour">
                            {a.creation_date.slice(11, 19)}
                        </span>
                        <div className="comment-username">{a.name_user}</div>
                    </div>
                ))}
        </div>
    );
}
