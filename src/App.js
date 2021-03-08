import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// pages
import AboutUs from './pages/AboutUs'
import Home from './pages/Home'
import Locations from './pages/Locations'
import MyPage from './pages/MyPage'


import NavBar from './components/NavBar'

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header"><NavBar /></header>

        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Om-oss" component={AboutUs} />
            <Route exact path="/Platser" component={Locations} />
            <Route exact path="/Mina-sidor" component={MyPage} />
          </Switch>
        </main>

        <footer>&copy; Copyright 2021 Group 4</footer>
      </Router>
    </div>
  );
}

export default App;
