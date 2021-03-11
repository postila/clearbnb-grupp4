import React from 'react'
import Radium from 'radium'
import Amenities from '../components/Amenities'

const RentingForm = (props) => {
  return (
    <form key="1" style={styles.form} >

      <h1 style={{ color: '#839cc1' }}>Uthyrningsformulär</h1>

      <label style={styles.label} form="rentingform" for="fname">Titel (max 80 tecken)</label>
      <input key="2" style={styles.input} form="rentingform" type="text" placeholder="Mysig stuga" required></input>

      <label style={styles.label} form="rentingform" for="fname">Ort</label>
      <input key="3" style={styles.input} form="rentingform" maxlength="100" type="text" placeholder="Lund" required></input>
      
      <label style={styles.label} form="rentingform" for="fname">Beskrivning (max 500 tecken)</label>
      <textarea style={styles.description} form="rentingform" maxlength="500" type="text" placeholder="..." required></textarea>

      <label style={styles.label} form="rentingform" for="fname">Bild</label>
      <input key="4" style={styles.input} form="rentingform" type="text" placeholder="http://din.url.här" required></input>
      
      <div style={styles.date_container} >
        <label style={styles.label} form="rentingform" for="fname">Startdatum</label>
        <input key="5" style={styles.date} form="rentingform" type="text" placeholder="2021/01/01" required></input>

        <label style={styles.label} form="rentingform" for="fname">Slutdatum</label>
        <input key="6" style={styles.date} form="rentingform" type="text" placeholder="2021/01/02" required></input>
      </div>

      <h3 style={{ color: '#839cc1' }}>Bekvämligheter</h3>
      <Amenities />
      <br></br>

      <div style={styles.buttons_container}>
      <button style={styles.button}>Färdig</button> 
        <button style={styles.button}>Rensa</button>
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
    textAlign: 'left',
    padding: '10px'
  },
  input: {
    textAlign: 'left',
    height: '50px',
    borderRadius: '7px',
    ':focus': {
      outline: 'none'
    }
  },
  date_container: {
    textAlign: 'center',
    height: '50px',
    width: '100%',
    marginTop: '10px',
    marginBottom: '40px'
  },
  
  date: {
    textAlign: 'center',
    height: '50px',
    width: '90px',
    borderRadius: '7px',
    margin: '10px 20px 0px 20px',
    ':focus': {
      outline: 'none'
    }
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
    ':focus': {
      outline: 'none'
    }
  },
  buttons_container: {
    textAlign: 'center',
    height: '100px',
    verticalAlign: 'text-top',
    width: '100%',
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
    backgroundColor: '#596982'
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