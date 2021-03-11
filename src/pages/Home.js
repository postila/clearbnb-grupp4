import React, { useState } from 'react';
import Login from '../components/Login'
import Register from '../components/Register';
import LocationList from '../components/LocationList'

const Home = () => {
  const [register, setRegister] = useState(false)

  const toggleRegisterForm = () => {
    setRegister(valueOf.register = !valueOf.register)
  }

  return (
    <div style={{ width: '100%' }}>
      <div className="login-register-form">
        {!register && <Login displayRegisterForm={toggleRegisterForm} />}
        {register && <Register displayRegisterForm={toggleRegisterForm}/>}
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