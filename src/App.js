import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'

// pages
import AboutUs from './pages/AboutUs'
import Home from './pages/Home'
import Locations from './pages/Locations'
import MyPage from './pages/MyPage'
import RentingForm from './pages/RentingForm'


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
            <Route exact path="/Uthyrning" component={RentingForm} />
          </Switch>
        </main>

        <footer>&copy; Copyright 2021 Group 4</footer>
      </Router>
    </div>
  );
}

export default App;
