import Navbar from './Navbar';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Search from './Search';
import Questions from './Questions';
import './App.css';
import Article from './Article';
import { useSelector } from 'react-redux';
import UsersFound from './UsersFound';
import UsersProfile from './UsersProfile';
import Profile from './Profile';
import UpdateUser from './UpdateUser';

function App() {
    const isLoggedIn = useSelector((s) => !!s.user);
    return (
        <div className="App">
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
                    <Route path="/profile/:q" exact>
                        <Profile />
                    </Route>
                    <Route path="/updateuser" exact>
                        <UpdateUser />
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
