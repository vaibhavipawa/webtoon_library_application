import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import WebtoonDetailPage from './WebtoonDetailPage';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import FavoritesPage from './FavoritesPage';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/webtoon/:id" component={WebtoonDetailPage} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/favorites" component={FavoritesPage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
