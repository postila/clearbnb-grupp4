import { Link, useHistory } from 'react-router-dom'
import Radium from 'radium'


function NavBar() {



  return (
    //<div style={{ width: '100%', margin: '0 auto', backgroundColor: 'red' }}>
    /* <div style={styles.container}>
    <nav style={styles.navbar}>
      <div style={styles.left}>12343</div>
      <div style={styles.button}>
        <Link to="/Om-oss ">Om oss</Link>
        <Link to="/">Hem </Link>
        <Link to="/Platser">Platser</Link>
      </div>
      <div style={styles.dropdown}>
        <Link  to="/Mina-sidor">Mina sidor</Link>
      </div>
      </nav> 
      </div> */
    <div>
    <nav style={styles.navbar}>
      <Link style={styles.button} to="/Om-oss">Om oss</Link>
      <Link style={styles.button} to="/">Hem</Link>
      <Link style={styles.button} to="/Platser">Platser</Link>
    
      <div style={styles.mypage}>
          <Link style={{ color: 'white' }} to="/Mina-sidor">Mina sidor</Link>
      </div>
    
      </nav>
    </div>

  )
}

const styles = {
navbar: {
  //display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  fontFamily: 'Verdana',
  textDecoration: 'none',
  color: '#eee',
  marginRight: '40px',
  paddingTop: '15px'
  
  },
button: {
  marginRight: '40px',
  color: '#eee',
  },
mypage: {
  color: '#eee',
  float: 'right',
  
  },


} 


const navDropDown = {

}

export default Radium(NavBar);