import React from 'react';
import Radium from 'radium'
import Background from '../background.jpg'


const AboutUs = () => {

  // const handleClick = useState()
  return (
    <div style={{ backgroundImage: `url(${Background})`, height: '100vh', margin: '0' }}>
      <div style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}>
        <div style={{ width: '100%' }}>
          <div style={styles.box}>
            <p style={styles.content}>ClearBnb skapades 2021. </p>
          </div>
        </div >
      </div>
    </div>
  );
}

const styles = {
  box: {
    display: 'inline-block',
    float: 'left',
    margin: '30vh 0 0 20vh',
    maxWidth: '400px',
    backgroundColor: 'white',
    opacity: '30%',
    padding: '30px',
    borderRadius: '10px'

  },
  content: {
    color: 'black',
    margin: '0',
    fontWeight: 'bold',
    letterSpacing: '0.5px'
  },
  background: {
    backgroundImage: ''
  }

}

export default Radium(AboutUs);