import React, { useState, useContext, useEffect } from 'react';
import Radium from 'radium'
import { UserContext } from '../contexts/UserContextProvider'

const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(UserContext)

  const createLogin = async e => {
    e.preventDefault()

    const account = {
      email: email,
      password: password
    }
    console.log(account)
    await login(account)

    email.current.value = ''
    password.current.value = ''
  }

  useEffect(() => {
    setEmail(email)
    setPassword(password)
  }, [email, password])


  return (
    <form key="1" style={styles.form}>
      <input key="2" style={styles.input} type="email" placeholder="E-mail" required onChange={ e => setEmail(e.target.value) } value={email}></input>
      <input key="3" style={styles.input} type="password" placeholder="Lösenord" required onChange={ p => setPassword(p.target.value)} value={password}></input>
      <button key="4" style={styles.button} onClick={createLogin}>Logga in</button>
      <p style={styles.register}>Inget konto?
        <span onClick={ props.displayRegisterForm }> Registrera dig här</span>
      </p>
    </form>
  );
}

const styles = {
  form: {
    display: 'grid',
    gridGap: '15px',
    maxWidth: '500px',
    margin: '0px auto',
    padding: '100px'

  },
  input: {
    textAlign: 'center',
    fontFamily: 'Quicksand',
    padding: '10px',
    borderRadius: '10px',
    border: 'none',
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
    fontFamily: 'Quicksand',
    fontSize: '12px',
    fontWeight: 'bold',
    borderRadius: '10px',
    textTransform: 'uppercase',
    padding: '5px',
    color: 'grey',
    background: '#eee',
    ':hover': {
      background: '#e6e6e6',
    }
  }
}

export default Radium(Login);