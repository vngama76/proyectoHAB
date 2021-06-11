import Comments from './Comments';
import useFetch from './useFetch';

export default function Answers({ id_question }) {
    function random_bg_color() {
        var x = Math.floor(Math.random() * 90);
        var y = Math.floor(Math.random() * 90);
        var z = Math.floor(Math.random() * 90);
        return 'rgb(' + x + ',' + y + ',' + z + ')';
    }

    const res = useFetch(`http://localhost:4000/api/answers/${id_question}`);

    return (
        <div>
            {res?.answers &&
                res.answers.map((a) => (
                    <>
                        <div key={a.id_answer} className="answer">
                            <div className="answer-owner">
                                {a.foto ? (
                                    <div
                                        className="answer-userfoto"
                                        style={{
                                            backgroundImage: `url(http://localhost:4000/uploads/${a.foto})`,
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="answer-namefoto"
                                        style={{
                                            backgroundColor: random_bg_color(),
                                        }}
                                    />
                                )}

                                <div className="answer-username">
                                    {a.name_user}
                                    <br />
                                    <div className="answer-date">
                                        {a.creation_date.slice(0, 10)}
                                        {a.creation_date.slice(11, 19)}
                                    </div>
                                </div>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{ __html: a.body }}
                                className="answer-body"
                            />

                            {a.id_answer_father === null && (
                                <Comments id_answer_father={a.id_answer} />
                            )}
                        </div>
                    </>
                ))}
        </div>
    );
}
