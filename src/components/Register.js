import { useContext, useRef } from 'react';
import { UserContext } from '../contexts/UserContextProvider'

const Register = () => {
  const { addUser } = useContext(UserContext)

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

    if (password.current.value === confirmPassword.current.value) {
      await addUser(user)
      return;
    }
  }

  return (
    <form style={styles.form} onSubmit={createUser}>
      <input ref={ name } style={ styles.input } type="text" placeholder="Namn" required></input>
      <input ref={ email } style={ styles.input } type="text" placeholder="E-mail" required></input>
      <input ref={ password } style={ styles.input } type="password" placeholder="Lösenord" required></input>
      <input ref={ confirmPassword } style={ styles.input } type="password" placeholder="Bekräfta lösenord" required></input>
      <button style={ styles.button }>Skapa konto</button>
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
    textAlign: 'center'
  },
  button: {
    maxWidth: '100px',
    margin: '0 auto',
    marginTop: '10px',
    cursor: 'pointer',
    border: 'none',
    padding: '10px',
    borderRadius: '10px'
  }
}

export default Register;