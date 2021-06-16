import Navbar from './Navbar';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import Questions from './Questions';
import './App.css';
import Article from './Article';
import { useSelector, useDispatch } from 'react-redux';
import UsersFound from './UsersFound';
import UsersProfile from './UsersProfile';
import Profile from './Profile';
import ErrorMessage from './ErrorMessage';
import AddQuestion from './AddQuestion';
import ExpertsFound from './ExpertsFound';
import FindExperts from './FindExperts';

const PrivateRoute = ({ children }) => {
    const isLoggedIn = useSelector((s) => !!s.user.token);
    const dispatch = useDispatch();

    if (!isLoggedIn) {
        dispatch({
            type: 'NEW_ERROR',
            error: 'Tienes que acceder para ver esta página',
        });
        return <Redirect to="/" />;
    }

    return <>{children}</>;
};

function App() {
    const isLoggedIn = useSelector((s) => !!s.user.token);
    return (
        <div className="App">
            <ErrorMessage />

            <Navbar />
            <FindExperts />
            {isLoggedIn && <Article />}
            <main className="main">
                <Switch>
                    <Route path="/questions/:q" exact>
                        <Questions />
                    </Route>
                    <Route path="/temp" exact />
                    <Route path="/addQuestion" exact>
                        <AddQuestion />
                    </Route>
                    <Route path="/profile/users/:q" exact>
                        <PrivateRoute>
                            <UsersProfile />
                        </PrivateRoute>
                    </Route>
                    <Route path="/profile/:q">
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    </Route>
                    <Route path="/profile/">
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    </Route>
                    <Route path="/search/users/:q" exact>
                        <PrivateRoute>
                            <UsersFound />
                        </PrivateRoute>
                    </Route>
                    <Route path="/expertsfound" exact>
                        <PrivateRoute>
                            <ExpertsFound />
                        </PrivateRoute>
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
