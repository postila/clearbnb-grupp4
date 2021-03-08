import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// pages
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">

        </header>

        <main>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </main>

        <footer>&copy; Copyright 2021 Group 4</footer>
      </Router>
    </div>
  );
}

export default App;
