import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'

// pages
import AboutUs from './pages/AboutUs'
import Home from './pages/Home'
import Locations from './pages/Locations'
import MyPage from './pages/MyPage'
import RentingForm from './pages/RentingForm'

import AccommodationsDetails from './pages/AccommodationsDetails';

// components
import NavBar from './components/NavBar'

// contexts
import AccommodationsContextProvider from './contexts/AccommodationsContext'
import LocationContext from './contexts/locationContextProvider'
import AmenitiesContextProvider from './contexts/AmenitiesContext'
import UserContextProvider from './contexts/UserContextProvider'
import BookingContextProvider from './contexts/BookingContextProvider'

function App() {
  
  return (
    <div className="App">
      <UserContextProvider>
          <LocationContext>
            <AccommodationsContextProvider>
              <AmenitiesContextProvider>
                <BookingContextProvider>
                  <Router>
                    <header className="App-header"><NavBar /></header>

                    <main>
                      <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/Om-oss" component={AboutUs} />
                        <Route exact path="/Platser" component={Locations} />
                        <Route exact path="/Platser/:id" component={Locations} />
                        <Route exact path="/Mina-sidor" component={MyPage} />
                        <Route exact path="/Uthyrning" component={RentingForm} />
                        <Route exact path="/accommodationDetails/:id" component={AccommodationsDetails} />
                      </Switch>
                    </main>

                    <footer>&copy; Copyright 2021 Group 4</footer>
                  </Router>
                </BookingContextProvider>
              </AmenitiesContextProvider>
            </AccommodationsContextProvider>
          </LocationContext>
      </UserContextProvider>
    </div>
  );
}

export default App;
