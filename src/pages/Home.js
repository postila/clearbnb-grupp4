import Radium from 'radium'
import React, { useState } from 'react';
import Login from '../components/Login'
import Register from '../components/Register';
import LocationList from '../components/LocationList'

import { UserContext } from '../contexts/UserContextProvider'
import { useContext } from 'react';

const Home = () => {
  const [register, setRegister] = useState(false)
  const { userName, userId } = useContext(UserContext)

  // useEffect(() => {
  //   fetchSession()
  // }, [userId])

  const toggleRegisterForm = () => {
    setRegister(valueOf.register = !valueOf.register)
  }

  return (
    <div style={styles.bodyStyle}>
      <div style={styles.left}> <img style={styles.logo} src='https://i.imgur.com/eTEP9yc.png' alt='logo'></img></div>
      {!userId && <div style={styles.center} className="login-register-form">
        {!register && <Login displayRegisterForm={toggleRegisterForm} />}
        {register && <Register displayRegisterForm={toggleRegisterForm} />}
      </div>}

      <div style={styles.locationList}>
        {userId &&
          <div>
          <h1 className="welcome-text" style={styles.welcome}>Välkommen {userName}!</h1>
            <LocationList />
          </div>}
      </div>
      <div style={styles.right}></div>
    </div >
  );
}
const styles = {
  locationList: {
    display: 'grid',
    gridGap: '10px 10px',
    justifyContent: 'center',
    width: '100%',
  },
  bodyStyle: {
    width: '100%',
    background: 'linear-gradient(#62caed 0%, #ffffff 25vh)'
  },
  logo: {
    paddingTop: '20px',
    width: '100px',
    '@media (max-width: 490px)': {
      opacity: '0%'
    }
  },
  left: {
    float: 'left',
    width: '10%',
    background: 'transparent',
    '@media (max-width: 700px)': {
      display: 'none'
    }
  },
  center: {
    float: 'left',
    width: '80%'
  },
  right: {
    float: 'right',
    width: '10%'
  },
  welcome: {
    textTransform: 'capitalize', 
    fontFamily: 'Quicksand', 
    color: 'white', 
    marginTop: '-20px',
    marginBottom: '70px',
    '@media (max-width: 490px)': {
      marginTop: '10px',
      marginBottom: '40px'
    }
  }
}
export default Radium(Home);
