import Navbar from './Navbar';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Search from './Search';
import Questions from './Questions';
import Register from './Register';
import './App.css';
import Article from './Article';
import { useSelector } from 'react-redux';
import Profile from './Profile';
import FindUsers from './FindUsers';

function App() {
    const isLoggedIn = useSelector((s) => !!s.user);
    return (
        <div className="App">
            <Navbar />
            {isLoggedIn && <Article />}
            <main className="main">
                <Switch>
                    <Route path="/login" exact>
                        <Login />
                    </Route>
                    <Route path="/register" exact>
                        <Register />
                    </Route>
                    <Route path="/search/:q?" exact>
                        <Search />
                    </Route>
                    <Route path="/questions/:q" exact>
                        <Questions />
                    </Route>
                    <Route path="/users/:q" exact>
                        <FindUsers />
                    </Route>
                    <Route path="/profile" exact>
                        <Profile />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </main>
            <footer className="footer">
                Gapp™ - Get Answered Aplication - (c)HACK A BOSS, 2021.
            </footer>
        </div>
    );
}

export default App;
