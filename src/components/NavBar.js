import { Link, useHistory } from 'react-router-dom'
import React, { useState } from 'react'
import Radium from 'radium'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function NavBar() {
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (

    <div>
      <nav style={styles.navbar}>
        <Link style={styles.button} to="/Om-oss">Om oss</Link>
        <Link style={styles.button} to="/">Hem</Link>
        <Link style={styles.button} to="/Platser">Platser</Link>

        <div style={styles.mypage}>
          <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              Mina sidor
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => { history.push('/Platser'); handleClose() }}>Platser</MenuItem>
              <MenuItem onClick={() => { history.push('/'); handleClose() }}>Hem</MenuItem>
              <MenuItem onClick={() => { history.push('/Uthyrning'); handleClose() }}>Uthyrning</MenuItem>
            </Menu>
          </div >

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