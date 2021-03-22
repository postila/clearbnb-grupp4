import React from 'react';
import Radium from 'radium'

const AboutUs = () => {

  return (
    <div style={styles.background}>
      <div style={styles.box}>
        <p style={styles.content}>Cras facilisis urna ornare ex volutpat, et
        convallis erat elementum. Ut aliquam, ipsum vitae
        gravida suscipit, metus dui bibendum est, eget rhoncus nibh
        metus nec massa. Maecenas hendrerit laoreet augue
        nec molestie. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.</p>
      </div>
    </div >
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
    backgroundImage: '../background.jpg',
    height: '100vh'
  }
}


export default Radium(AboutUs);