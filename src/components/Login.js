import React from 'react';
import Radium from 'radium'

const Login = (props) => {
  return (
    <form style={styles.form}>
      <input style={styles.input} type="text" placeholder="E-mail" required></input>
      <input style={styles.input} type="password" placeholder="Lösenord" required></input>
      <button style={styles.button}>Logga in</button>
      <p>Skapa konto?
        <span style={styles.register} onClick={ props.displayRegisterForm }> Registrera dig här</span>
      </p>
    </form>
  );
}

const styles = {
  form: {
    display: 'grid',
    gridGap: '15px',
    maxWidth: '300px',
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
    maxWidth: '100px',
    margin: '0 auto',
    marginTop: '10px',
    cursor: 'pointer',
    border: 'none',
    padding: '10px',
    borderRadius: '6px'
  },
  register: {
    cursor: 'pointer',
    fontSize: '10px',
    fontFamily: 'Quicksand',
    borderRadius: '10px',
    background: '#202329',
    color: 'white',
    textTransform: 'uppercase',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  register: {
    cursor: 'pointer',
    fontSize: '10px',
    textTransform: 'uppercase',
    ':hover': {
      opacity: '50%'
    }
  },


}

export default Radium(Login);