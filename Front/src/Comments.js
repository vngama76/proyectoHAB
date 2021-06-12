import AddComment from './AddComment';
import useFetch from './useFetch';

export default function Comments({ id_answer_father }) {
    console.log(id_answer_father);

    const res = useFetch(
        `http://localhost:4000/api/comments/${id_answer_father}`
    );

    console.log(res && res);
    return (
        <>
            <AddComment id_answer_father={id_answer_father} />
            {res?.comments &&
                res.comments.map((a) => (
                    <div key={a.id_answer} className="comment">
                        <div className="comment-owner">
                            {a.foto ? (
                                <div
                                    className="comment-userfoto"
                                    style={{
                                        backgroundImage: `url(http://localhost:4000/uploads/${a.foto})`,
                                    }}
                                />
                            ) : (
                                <div
                                    className="comment-namefoto"
                                    style={{
                                        backgroundColor: a.color,
                                    }}
                                >
                                    {a.name_user.slice(0, 1)}
                                </div>
                            )}
                            <div className="comment-username">
                                {a.name_user}
                                <div className="comment-date">
                                    {a.creation_date.slice(0, 10)} at:{' '}
                                    {a.creation_date.slice(11, 19)}
                                </div>
                            </div>
                        </div>
                        <div className="comment-body">{a.body}</div>
                    </div>
                ))}
        </>
    );
}
