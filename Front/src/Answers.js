import AddComment from './AddComment';
import Comments from './Comments';
import useFetch from './useFetch';

export default function Answers({ id_question }) {
  // const [answers, setAnswers] = useState();

  const res = useFetch(`http://localhost:4000/api/answers/${id_question}`);

  return (
    <div>
      {res?.answers &&
        res.answers.map((a) => (
          <>
            <div key={a.id_answer}>
              <div dangerouslySetInnerHTML={{ __html: a.body }} />
              <div>{a.creation_date.slice(0, 10)}</div>
              <span>{a.creation_date.slice(11, 19)}</span>
              <div>{a.name_user}</div>
              <div>Comenta esta respuesta</div>
              <AddComment id_answer_father={a.id_answer} />
              <Comments id_answer_father={a.id_answer} />
            </div>
          </>
        ))}
    </div>
  );
}
