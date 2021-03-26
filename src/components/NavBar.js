import { Link, useHistory } from 'react-router-dom'
import React, { useState, useContext, useEffect } from 'react'
import Radium from 'radium'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { UserContext } from '../contexts/UserContextProvider'
//import myAccount from '../images/my_account.png';

function NavBar() {
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null);

  const { userId, fetchSession, logout, user } = useContext(UserContext)

  const logOut = async () => {
    handleClose()
    await logout()
  }

  useEffect(() => {
    fetchSession()
  }, [userId, user])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  

  return (
    <div>
      {userId && <div>

        { window.innerWidth > 700 &&<nav style={styles.navbar}>
          <div>
            <Link style={styles.button} to="/Platser">Boenden</Link>
            <Link style={styles.button} to="/">Hem</Link>
            <Link style={styles.button} to="/Om-oss">Om oss</Link>
          </div>
        </nav>}
        {window.innerWidth <= 700 && <nav style={styles.navbar}>
          <div style={styles.headerText}>
            <a>ClearBnB</a>
          </div>
        </nav>}
        <div style={styles.mypage}>
          <div>
            <Button aria-haspopup="true">
              <img src="https://i.imgur.com/P0TBhR7.png" style={styles.img}
                aria-controls="simple-menu" onClick={handleClick} alt="''" />
            </Button>

            {window.innerWidth <= 700 &&
              <Menu
                style={styles.dropdown}
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
              <MenuItem onClick={() => { history.push('/'); handleClose() }}>Hem</MenuItem>
              <MenuItem onClick={() => { history.push('/Platser'); handleClose() }}>Boenden</MenuItem>
              <MenuItem onClick={() => { history.push('/Om-oss'); handleClose() }}>Om oss</MenuItem>
              <MenuItem onClick={() => { history.push('/Mina-sidor'); handleClose() }}>Mina sidor</MenuItem>
              <MenuItem onClick={() => { history.push('/Uthyrning'); handleClose() }}>Hyr ut din bostad</MenuItem>
              <MenuItem onClick={() => { history.push('/'); logOut() }}>Logga ut</MenuItem>
      
              </Menu>
            }
            {window.innerWidth > 700 &&
              <Menu
                style={styles.dropdown}
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* <MenuItem >Mitt konto</MenuItem> */}

                <MenuItem onClick={() => { history.push('/Mina-sidor'); handleClose() }}>Mina sidor</MenuItem>
                <MenuItem onClick={() => { history.push('/Uthyrning'); handleClose() }}>Hyr ut din bostad</MenuItem>
                <MenuItem onClick={() => { history.push('/'); logOut() }}>Logga ut</MenuItem>

              </Menu>
            }
          </div >
        </div>
      </div>
      }
    </div>
  )
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Verdana',
    color: '#eee',
    paddingTop: '15px',

  },
  button: {
    fontFamily: 'Quicksand',
    float: 'left',
    paddingLeft: '20px',
    textDecoration: 'none',
    color: '#eee',
  },
  mypage: {
    color: '#eee',
    float: 'right',
    marginTop: '-35px',
    
  },
  img: {
    width: '40px'
  },
  dropdown: {
    marginTop: '30px',
    paddingRight: '25px',
    

  },
  headerText: {
    fontSize: '15px'
  }
}


export default Radium(NavBar);