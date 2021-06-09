import useFetch from './useFetch';

export default function Answers({ id_question }) {
    // const [answers, setAnswers] = useState();

    const res = useFetch(`http://localhost:4000/api/answers/${id_question}`);

    return (
        <div>
            {res?.answers &&
                res.answers.map((a) => (
                    <div key={a.id_answer}>
                        <div dangerouslySetInnerHTML={{ __html: a.body }} />
                        <div>{a.creation_date.slice(0, 10)}</div>
                        <div>{a.name_user}</div>
                    </div>
                ))}
        </div>
    );
}
