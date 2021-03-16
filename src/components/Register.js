import { useContext, useRef, useState } from 'react';
import { UserContext } from '../contexts/UserContextProvider'

const Register = (props) => {
  const { addUser } = useContext(UserContext)
  const [error, setError] = useState(false)

  const name = useRef()
  const email = useRef()
  const password = useRef()
  const confirmPassword = useRef()

  const createUser = async e => {
    e.preventDefault()

    const user = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value
    }

    if (password.current.value !== confirmPassword.current.value) {
      setError(true)
      name.current.value = ''
      email.current.value = ''
      password.current.value = ''
      confirmPassword.current.value = ''
      return;
    }
    await addUser(user)
  }

  return (
    <form key="1" style={styles.form} onSubmit={createUser}>
      <input key="2" ref={name} style={styles.input} type="text" placeholder="Namn" required></input>
      <input key="3" ref={email} style={styles.input} type="email" placeholder="E-mail" required></input>
      <input key="4" ref={password} style={styles.input} type="password" placeholder="Lösenord" required></input>
      <input key="5" ref={confirmPassword} style={styles.input} type="password" placeholder="Bekräfta lösenord" required></input>
      {error && <p style={styles.error}>Lösenordet matchar inte</p>}
      <div>
        <button style={styles.button}>Skapa konto</button>
        <p style={styles.logIn} onClick={props.displayRegisterForm}>Har du redan ett konto? Logga in här</p>
      </div>
    </form>
  );
}

const styles = {
  form: {
    display: 'grid',
    gridGap: '15px',
    maxWidth: '400px',
    margin: '20px auto',
    padding: '10px'
  },
  input: {
    textAlign: 'center',
    padding: '10px',
    borderRadius: '10px',
    border: 'none',
    ':focus': {
      outline: 'none'
    }
  },
  button: {
    fontFamily: 'Quicksand',
    maxWidth: '100px',
    margin: '0 auto',
    marginTop: '10px',
    cursor: 'pointer',
    border: 'none',
    padding: '10px',
    borderRadius: '6px'
  },
  error: {
    background: '#202329',
    color: 'white',
    padding: '10px',
    fontWeight: '700',
    maxWidth: '250px',
    margin: '10px auto',
    borderRadius: '10px'
  },
  logIn: {
    cursor: 'pointer',
    fontSize: '12px',
    textTransform: 'uppercase',
    ':hover': {
      opacity: '50%'
    }
  }
}

export default Register;