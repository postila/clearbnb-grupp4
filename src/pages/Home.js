import React, { useState } from 'react';
import Login from '../components/Login'
import Register from '../components/Register';
import { LocationContext } from '../contexts/locationContextProvider'
import LocationList from '../components/LocationList'
import Background from '../homeBackground.jpg'

const Home = () => {
  const [register, setRegister] = useState(false)

  const displayRegisterForm = () => {
    setRegister(true)
  }

  return (
    <div style={{ backgroundImage: `url(${Background})`, height: '100vh', margin: '0', marginTop:'-20px' }}>
    <div style={{ width: '100%' }}>
      <div className="login-register-form">
        {!register && <Login displayRegisterForm={displayRegisterForm} />}
        {register && <Register />}
      </div>
      <div style={styles.locationList}>
        <LocationList />
      </div>
      </div >
    </div>
  );
}
const styles = {
  locationList: {
    display: 'grid',
    gridGap: '10px 10px',
    justifyContent: 'center',
    //flexWrap: 'wrap',
    width: '100%'
  },
  background: {
    backgroundImage: '',

  }
}

export default Home;