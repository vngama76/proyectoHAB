import useFetch from './useFetch';
import './TableTags.css';
import { Link } from 'react-router-dom';

export default function TopTags() {
    const result = useFetch('http://localhost:4000/api/tags/incidence/');

    return (
        <div className="table-tags">
            <h2 className="head">Top Tags</h2>

            <div className="top-tags">
                {result &&
                    result[0].tags.slice(0, 5).map((s) => (
                        <Link to={`/tagsresults/${s.tag_name}`}>
                            <p className="tags">{s.tag_name}</p>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
