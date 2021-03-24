import React from 'react';
import Radium from 'radium'
import Background from '../aboutUsBackground.jpg'


const AboutUs = () => {

  return (
    <div style={styles.background}>
      <div style={{
        backgroundImage: `url(${Background})`, backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', height: '100vh', margin: '0', backgroundPosition: 'center'
      }}>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}>
          <div style={styles.box}>
          <h1 style={styles.header}>Om oss</h1>
            <p style={styles.content}>ClearBnB skapades 2021. Vårt mål är att ha boenden i hela världen vid 2027. </p><br/>
            <p style={styles.content}>Hitta oss</p><br/>
            <p style={styles.content}>ClearBnB<br />Malmögatan 5<br />541 25 Malmö</p>
          
      </div>
      </div >
      </div>
    </div>
  );
}
const styles = {
  box: {

    float: 'left',
    margin: '30vh 0 0 20vh',
    maxWidth: '400px',
    backgroundColor: 'white',
    opacity: '45%',
    padding: '30px',
    borderRadius: '10px'
  },
  content: {
    color: 'black',
    margin: '0',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    fontFamily: 'Quicksand',
     textAlign:'left'
  },
  header: {
    color: 'black',
    margin: '0',
    paddingBottom:'30px',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    fontFamily: 'Quicksand',
    textAlign:'left'

  },
  
  background: {
    backgroundImage:''
  }
}


export default Radium(AboutUs);