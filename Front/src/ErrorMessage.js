import { useDispatch, useSelector } from 'react-redux';

export default function ErrorMessage() {
    const error = useSelector((s) => s.error);
    console.log(error);
    const dispatch = useDispatch();

    return error ? (
        <div>
            <p>{error}</p>
            <button onClick={() => dispatch({ type: 'CLEAR_ERROR' })}>
                Cerrar
            </button>
        </div>
    ) : null;
}
