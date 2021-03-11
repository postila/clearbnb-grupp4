import React, { useState } from 'react';
import Login from '../components/Login'
import Register from '../components/Register';
import { LocationContext } from '../contexts/locationContextProvider'
import LocationList from '../components/LocationList'
const Home = () => {
  const [register, setRegister] = useState(false)

  const displayRegisterForm = () => {
    setRegister(true)
  }

  return (
    <div style={{ width: '100%' }}>
      <div className="login-register-form">
        {!register && <Login displayRegisterForm={displayRegisterForm} />}
        {register && <Register />}
      </div>
      <div style={locationListStyle}>
        <LocationList />
      </div>
    </div >
  );
}
const locationListStyle = {
  display: 'grid',
  gridGap: '10px 10px',
  justifyContent: 'center',
  width: '100%'
}

export default Home;