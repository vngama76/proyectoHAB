import { applyMiddleware, combineReducers, createStore } from 'redux';

const userReducer = (state = { info: null, token: null }, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, token: action.token };
        case 'LOGOUT':
            return { ...state, token: null };
        case 'INFO':
            return { ...state, info: action.info };
        default:
            return state;
    }
};

const errorReducer = (state = null, action) => {
    switch (action.type) {
        case 'NEW_ERROR':
            return action.error;
        case 'CLEAR_ERROR':
            return null;
        default:
            return state;
    }
};

// const historyReducer = (state = [], action) => {
//   switch (action.type) {
//     case 'SEARCH':
//       return [action.search, ...state].slice(0, 5)
//     default:
//       return state
//   }
// }

const localStorageMiddleware = (store) => (next) => (action) => {
    let result = next(action);
    localStorage.setItem('session', JSON.stringify(store.getState()));
    return result;
};

const store = createStore(
    combineReducers({
        user: userReducer,
        error: errorReducer,
        // history: historyReducer
    }),
    JSON.parse(localStorage.getItem('session')) || {},
    applyMiddleware(localStorageMiddleware)
);

export default store;
