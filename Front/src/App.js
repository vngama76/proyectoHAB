import Navbar from './Navbar';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Search from './Search';
import Questions from './Questions';
import './App.css';
import Article from './Article';
import { useSelector, useDispatch } from 'react-redux';
import UsersFound from './UsersFound';
import UsersProfile from './UsersProfile';
import Profile from './Profile';
import ErrorMessage from './ErrorMessage';
import AddQuestion from './AddQuestion';

const PrivateRoute = ({ children }) => {
    const isLoggedIn = useSelector((s) => !!s.user.token);
    const dispatch = useDispatch();

    if (!isLoggedIn) {
        dispatch({
            type: 'NEW_ERROR',
            error: 'Tienes que acceder para ver esta pgina',
        });
        return <Redirect to="/" />;
    }

    return <>{children}</>;
};

function App() {
    const isLoggedIn = useSelector((s) => !!s.user.token);
    console.log(isLoggedIn);
    return (
        <div className="App">
            <ErrorMessage />
            <Navbar />
            {isLoggedIn && <Article />}
            <main className="main">
                <Switch>
                    <Route path="/search/:q?" exact>
                        <Search />
                    </Route>
                    <Route path="/questions/:q" exact>
                        <Questions />
                    </Route>
                    <Route path="/addQuestion" exact>
                        <AddQuestion />
                    </Route>
                    <Route path="/profile/:q" exact>
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    </Route>
                    <Route path="/search/users/:q" exact>
                        <UsersFound />
                    </Route>
                    <Route path="/profile/users/:q" exact>
                        <UsersProfile />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </main>

            <footer className={isLoggedIn ? 'footer' : 'footer-long'}>
                Gapp™ - Get Answered Application -
            </footer>
        </div>
    );
}

export default App;
