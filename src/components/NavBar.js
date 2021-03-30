import { Link, useHistory } from 'react-router-dom'
import React, { useState, useContext, useEffect } from 'react'
import Radium from 'radium'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { UserContext } from '../contexts/UserContextProvider'

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
        {window.innerWidth <= 700 && <nav style={styles.logo}>
          <div style={styles.logo}>
            <img
              style={{ height: '20%', width: '20%', paddingTop: '10px', float: 'left', cursor: 'pointer' }}
              src='https://i.imgur.com/hPmyjjA.png'
              alt='logo'
              onClick={() => { history.push('/')}}
            ></img>
          </div>
        </nav>}
        <div style={styles.mypage}>
          <div>
          
            {window.innerWidth <= 700 &&
              <div>
                <Button aria-haspopup="true">
                <img src="https://i.imgur.com/oIHlsCf.png" style={styles.img}
                    aria-controls="simple-menu" onClick={handleClick} alt="''" />
                </Button>
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
              </div>
            }
            {window.innerWidth > 700 &&
              <div>
              <Button aria-haspopup="true">
                <img src="https://i.imgur.com/P0TBhR7.png" style={styles.img}
                  aria-controls="simple-menu" onClick={handleClick} alt="''" />
              </Button>
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
              </div>
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
  navbarSmall: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Verdana',
    color: '#eee',
    paddingTop: '5px',

  },
  logo: {
    display: 'flex',
    //justifyContent: 'center',
    paddingLeft: '20px',
    alignItems: 'center',
    fontFamily: 'Verdana',
    color: '#eee',
    
    //backgroundColor: 'red'

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
    width: '40px',
    filter: 'invert(100 %)'
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