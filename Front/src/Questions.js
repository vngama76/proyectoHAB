import { useParams } from 'react-router';
import useFetch from './useFetch';

function Questions() {
  const { q } = useParams();
  const info = useFetch('http://localhost:4000/api/questions/' + q);
  console.log(q, info);
  if (info) {
    return (
      <div>
        <ul>
          <li>{info.title}</li>
          <li>{info.body}</li>
        </ul>
      </div>
    );
  }
}

export default Questions;
