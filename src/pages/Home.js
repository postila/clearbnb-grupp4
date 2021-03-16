import Radium from 'radium'
import React, { useState } from 'react';
import Login from '../components/Login'
import Register from '../components/Register';
import LocationList from '../components/LocationList'
import Background from '../homeBackground.jpg'

const Home = () => {
  const [register, setRegister] = useState(false)

  const toggleRegisterForm = () => {
    setRegister(valueOf.register = !valueOf.register)
  }

  return (
    <div style={{backgroundImage: `url(${Background})`, height: '100vh', margin: '0'}}>
      <div style={{ backgroundColor: 'rgba(175, 175, 175, 0.7)' }}>
      <div style={{ width: '100%' }}>
          {/* <div style={styles.bodyStyle}> */}
            <div style={styles.left}> <img style={styles.logo} src='https://i.imgur.com/eTEP9yc.png' alt='logo'></img></div>
            <div style={styles.center} className="login-register-form">
              {!register && <Login displayRegisterForm={toggleRegisterForm} />}
              {register && <Register displayRegisterForm={toggleRegisterForm} />}
            </div>
            <div style={styles.locationList}>
              <LocationList />
            </div>
        </div >
        </div>
        {/* </div> */}
        <div style={styles.right}></div>
      </div >
  );
}
const styles = {
  locationList: {
    display: 'grid',
    gridGap: '10px 10px',
    justifyContent: 'center',
    //flexWrap: 'wrap',
    width: '100%',
  },
  background: {
    backgroundImage: ' ',

  },
  // bodyStyle:{
  //   width: '100%',
  //   background: 'linear-gradient(#62caed 0%, #ffffff 30%)'
  // },
  logo: {
    paddingTop: '20px',
    width: '100px',
    opacity:'50%'
  
  },
  left: {
    float: 'left',
    width: '10%',
    background: 'transparent'
  },
  center: {
    float: 'left',
    width: '80%'
  },
  right: {
    float: 'right',
    width: '10%'
  }
}
export default Radium(Home);