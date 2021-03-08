import React from 'react';

const Register = () => {
  return (
    <form style={styles.form}>
      <input style={styles.input} type="text" placeholder="Namn" required></input>
      <input style={styles.input} type="text" placeholder="E-mail" required></input>
      <input style={styles.input} type="password" placeholder="Lösenord" required></input>
      <input style={styles.input} type="password" placeholder="Bekräfta lösenord" required></input>
      <button style={styles.button}>Skapa konto</button>
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