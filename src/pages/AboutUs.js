import React from 'react';
import Radium from 'radium'
import Background from '../aboutUsBackground.jpg'


const AboutUs = () => {

  return (
    <div style={styles.background}>
      <div style={{
        backgroundImage: `url(${Background})`, backgroundSize: 'cover', filter: 'grayscale(.5) opacity(0.8) ',
        backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', height: '100vh', margin: '0', backgroundPosition: 'center'
      }}>

        <div style={styles.box}>
          <h1 style={styles.header}>Om oss</h1>
          <p style={styles.content}>ClearBnB skapades 2021. Vårt mål är att ha boenden i hela världen vid 2027. </p><br />
          <p style={styles.content}>Hitta till oss:</p><br />
          <p style={styles.content}>ClearBnB<br />Malmögatan 5<br />541 25 Malmö</p>

        </div>
      </div >
    </div>
  );
}
const styles = {
  box: {
    position: 'absolute',
    left: '15vw',
    top: '30vh',
    right: '15vw',
    maxWidth: '400px',
    backgroundColor: 'white',
    opacity: '55%',
    padding: '30px',
    borderRadius: '10px',
  },
  content: {
    color: 'black',
    margin: '0',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    fontFamily: 'Quicksand',
    textAlign: 'left'
  },
  header: {
    color: 'black',
    margin: '0',
    paddingBottom: '30px',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    fontFamily: 'Quicksand',
    textAlign: 'left'

  },

  background: {
    backgroundImage: ''
  }
}


export default Radium(AboutUs);