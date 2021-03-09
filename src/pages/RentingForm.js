import React from 'react';
import Radium from 'radium'

const RentingForm = (props) => {
  return (
    <form style={styles.form}>
      <label style={styles.label} for="fname">Titel</label>
      <input style={styles.input} type="text" placeholder="..." required></input>

      <label style={styles.label} for="fname">Ort</label>
      <input style={styles.input} type="text" placeholder="..." required></input>
      
      <label style={styles.label} for="fname">Beskrivning (max 500 bokstäver)</label>
      <textarea style={styles.description} form="rentingform" maxlength="500" type="text" placeholder="..." required></textarea>

      <label style={styles.label} for="fname">Bild</label>
      <input style={styles.input} type="text" placeholder="Länk till bild" required></input>
      <div>
      <button style={styles.button}>Färdig</button> 
        <button style={styles.button}>Avbryt</button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    display: 'grid',
    gridGap: '3px',
    maxWidth: '500px',
    margin: '20px auto',
    padding: '10px'
  },
  input: {
    textAlign: 'left',
    height: '50px'
  },

  label: {
    textAlign: 'left',
    verticalAlign: 'text-bottom',
    lineHeight: '10px',
    color: 'white',
    paddingTop: '20px',
    paddingBottom: '10px',
  },

  description: {
    textAlign: 'left',
    height: '100px',
    verticalAlign: 'text-top',
    resize: 'none',
  },

  button: {
    width: '120px',
    margin: '0 auto',
    marginTop: '10px',
    marginLeft: '10px',
    cursor: 'pointer',
    border: 'none',
    padding: '10px',
    borderRadius: '7px',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#ed3333'
  },
  register: {
    cursor: 'pointer',
    fontSize: '10px',
    textTransform: 'uppercase',
    ':hover': {
      opacity: '50%'
    }
  }
}

export default Radium(RentingForm);