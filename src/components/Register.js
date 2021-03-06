import React, { useContext, useRef, useState, useLayoutEffect } from 'react';
import { UserContext } from '../contexts/UserContextProvider'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

const Register = (props) => {
  const { addUser } = useContext(UserContext)
  const { users, fetchUsers } = useContext(UserContext)
  const [showNotification, setShowNotification] = useState(false)
  const [showPasswordNotification, setShowPasswordNotification] = useState(false)
  const [open, setOpen] = useState(false);

  const name = useRef()
  const email = useRef()
  const password = useRef()
  const confirmPassword = useRef()

  useLayoutEffect(() => {
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    setOpen(false);
  };
  const createUser = async e => {
    e.preventDefault()

    const user = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value
    }

    if (password.current.value !== confirmPassword.current.value) {
      
      password.current.value = ''
      confirmPassword.current.value = ''
      setOpen(true)
      setShowPasswordNotification(true)
      return;
    }
    
    const check = users.filter(a => a.email === user.email)
    if (check.length === 0) {
      await addUser(user)
    }
    else {
      email.current.value = ''
      password.current.value = ''
      confirmPassword.current.value = ''
      setShowNotification(true)
      setOpen(true)
    }
  }

  return (
    <div style={styles.container}>
      <form className="register-form" key="1" onSubmit={createUser}>
        <input key="2" ref={ name } style={ styles.input } type="text" placeholder="Namn" required></input>
        <input key="3" ref={ email } style={ styles.input } type="email" placeholder="E-mail" required></input>
        <input key="4" ref={ password } style={ styles.input } type="password" placeholder="L??senord" required></input>
        <input key="5" ref={confirmPassword} style={styles.input} type="password" placeholder="Bekr??fta L??senord" required></input>
        {showPasswordNotification && <div><Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          //autoHideDuration={2000}
          onClose={handleClose}
          message="L??senorden matchar inte"
          action={
            <React.Fragment>
              <Button color="primary" size="small" onClick={handleClose}>
                Okej
            </Button>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>

              </IconButton>
            </React.Fragment>
          }
        />

        </div>
        }
        <div>
          <br></br>
          <button style={styles.button}>Skapa konto</button>
          <p className="register-login" onClick={props.displayRegisterForm}>Har du redan ett konto?<br/>Logga in h??r</p>
        </div>
      </form>
      {showNotification && <div><Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        //autoHideDuration={2000}
        onClose={handleClose}
        message="Det finns redan ett konto med den e-postadressen!"
        action={
          <React.Fragment>
            <Button color="primary" size="small" onClick={handleClose}>
              Okej
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>

            </IconButton>
          </React.Fragment>
        }
      />
       
      </div>
      }
      </div>
  );
}

const styles = {
 
  input: {
    height: '38px',
    textAlign: 'center',
    fontFamily: 'Quicksand',
    padding: '10px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#eee',
    ':focus': {
      outline: 'none'
    }
  },
  button: {
    maxWidth: '150px',
    cursor: 'pointer',
    fontFamily: 'Quicksand',
    fontSize: '12px',
    fontWeight: 'bold',
    borderRadius: '6px',
    border: 'none',
    textTransform: 'uppercase',
    padding: '10px',
    color: 'grey',
    background: '#eee',
    ':hover': {
      background: '#e6e6e6',
    }
  },
  logIn: {
    cursor: 'pointer',
    color: 'grey',
    padding: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
}

export default Register;