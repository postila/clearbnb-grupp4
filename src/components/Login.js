import React from 'react';
import Radium from 'radium'

const Login = (props) => {
  return (
    <form key="1" style={styles.form}>
      <input key="2" style={styles.input} type="email" placeholder="E-mail" required></input>
      <input key="3" style={styles.input} type="password" placeholder="Lösenord" required></input>
      <button key="4" style={styles.button}>Logga in</button>
      <p style={styles.register}>Skapa konto?
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
    maxWidth: '100px',
    margin: '10px auto',
    // marginTop: '10px',
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
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    ':hover': {
      opacity: '50%'
    }
  },


}

export default Radium(Login);