import { Link, useHistory } from 'react-router-dom'


export default function NavBar() {



  return (
    <nav style={styles}>
      <Link style={{ textDecoration: 'none', color: '#eee', marginRight: '40px' }} to="/Om-oss">Om oss</Link>
      <Link style={{ textDecoration: 'none', color: '#eee', marginRight: '40px' }} to="/">Hem</Link>
      <Link style={{ textDecoration: 'none', color: '#eee', marginRight: '40px' }} to="/Platser">Platser</Link>
      <Link style={{ textDecoration: 'none', color: '#eee', marginRight: '40px' }} to="/Mina-sidor">Mina sidor</Link>

    </nav>
  )
}

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  fontFamily: 'Verdana'
}