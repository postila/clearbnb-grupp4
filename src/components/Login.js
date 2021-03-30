import React, { useState, useContext } from 'react';
import Radium from 'radium'
import { UserContext } from '../contexts/UserContextProvider'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';


const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(UserContext)
  const [showNotification, setShowNotification] = useState()
  const [open, setOpen] = useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };

  const createLogin = async e => {
    
    e.preventDefault()

    const account = {
      email: email,
      password: password
    }
    const test = await login(account)
    if (test.error) {
      setShowNotification(true)
      setOpen(true)
    }
    setEmail('')
    setPassword('')
  }


  return (
    <div>
      <form key="1" style={styles.form}>
        <input key="2" style={styles.input} type="email" placeholder="E-mail" required onChange={ e => setEmail(e.target.value) } value={email}></input>
        <input key="3" style={styles.input} type="password" placeholder="Lösenord" required onChange={ p => setPassword(p.target.value)} value={password}></input>
        <button key="4" style={styles.button} onClick={createLogin}>Logga in</button>
        
        <p onClick={props.displayRegisterForm} style={styles.register}>
          Inget konto? <br/> Registrera dig här
        </p>
        
        
      </form>
      {showNotification && <div><Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
        message="Du har angett felaktig e-postadress eller lösenord"
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
      </div>}
    </div>
  );
}

const styles = {
  form: {
    display: 'grid',
    gridGap: '15px',
    maxWidth: '500px',
    margin: '23px auto',
    padding: '100px',
    '@media (max-width: 700px)': {
      maxWidth: '550px',
      margin: '65px auto',
      padding: '50px',
    }
  },
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
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    color: 'grey',
    maxWidth: '100px',
    margin: '10px auto',
    cursor: 'pointer',
    border: 'none',
    padding: '10px',
    borderRadius: '6px',
    textTransform: 'uppercase',
  },
  register: {
    cursor: 'pointer',
    color: 'grey',
    padding: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    ':hover': {
      opacity: '75%'
    }
  }
}

export default Radium(Login);