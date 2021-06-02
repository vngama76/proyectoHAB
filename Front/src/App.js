import Navbar from './Navbar';
import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Search from './Search';
import Questions from './Questions';
import Register from './Register';
import './App.css';
import Article from './Article';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Article />

            <main>
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
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </main>
            <footer className="footer">Gapp - Get Answered Aplication</footer>
        </div>
    );
}

export default App;
