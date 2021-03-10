import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// pages
import AboutUs from './pages/AboutUs'
import Home from './pages/Home'
import Locations from './pages/Locations'
import MyPage from './pages/MyPage'
import LocationContext from './contexts/locationContextProvider'

import NavBar from './components/NavBar'

// contexts
import AccommodationsContextProvider from './contexts/AccommodationsContext'

function App() {
  return (
    <div className="App">
      <AccommodationsContextProvider>
      <LocationContext> 
        <Router>
          <header className="App-header"><NavBar /></header>

          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/Om-oss" component={AboutUs} />
                <Route exact path="/Platser" component={Locations} />
                <Route exact path="/Platser/:id" component={Locations} />
              <Route exact path="/Mina-sidor" component={MyPage} />
            </Switch>
          </main>

          <footer>&copy; Copyright 2021 Group 4</footer>
        </Router>
      </LocationContext>
      </AccommodationsContextProvider>
    </div>
  );
}

export default App;
