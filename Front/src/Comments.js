import useFetch from './useFetch';

export default function Comments({ id_answer_father }) {
  const res = useFetch(
    `http://localhost:4000/api/comments/${id_answer_father}`
  );

  return (
    <div>
      {res?.comments &&
        res.comments.map((a) => (
          <>
            <div key={a.id_answer}>
              <div dangerouslySetInnerHTML={{ __html: a.body }} />
              <div>{a.creation_date.slice(0, 10)}</div>
              <span>{a.creation_date.slice(11, 19)}</span>
              <div>{a.name_user}</div>
            </div>
          </>
        ))}
    </div>
  );
}
