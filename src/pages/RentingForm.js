import Radium from 'radium'
import React from 'react'
import { useRef, useContext, useState } from 'react'
import { AccommodationsContext } from '../contexts/AccommodationsContext'
import { LocationContext } from '../contexts/locationContextProvider'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { UserContext } from '../contexts/UserContextProvider'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import '../App.css';


function CreateRentingForm() {
  const { addAccommodation } = useContext(AccommodationsContext)
  const { userId } = useContext(UserContext)
  const history = useHistory()
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const minDate = new Date()

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={styles.modalContainer}>
      <div className={classes.paper}>
        <h2 id="simple-modal-title">Din bostad finns nu ute för bokning ✔️</h2>
         <p id="simple-modal-description">
          Tack för att du använder clearBnB!
      </p> 
        <Button className="modal-button" style={styles.modalButton} onClick={() => { history.push('/Mina-sidor'); handleClose() }}>Gå till mina bokningar</Button>
      </div>
    </div>
  );
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

  const title = useRef()
  const location = useRef()
  const description = useRef()
  const maxGuests = useRef()
  const pricePerNight = useRef()
  const imageUrl = useRef()
  const washer = useRef()
  const wifi = useRef()
  const essentials = useRef()
  const kitchen = useRef()
  const TV = useRef()
  const airConditioning = useRef()
  const iron = useRef()
  const safe = useRef()

  const createRentingForm = async e => {
    e.preventDefault()

    const rentingForm = {
      user: userId,
      title: title.current.value,
      location: location.current.value,
      description: description.current.value,
      maxGuests: maxGuests.current.value,
      pricePerNight: pricePerNight.current.value,
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
      imageUrl: imageUrl.current.value,
      amenitiesList: {
        washer: washer.current.checked,
        wifi: wifi.current.checked,
        essentials: essentials.current.checked,
        kitchen: kitchen.current.checked,
        TV: TV.current.checked,
        airConditioning: airConditioning.current.checked,
        iron: iron.current.checked,
        safe: safe.current.checked
      }
    }
    await addAccommodation(rentingForm)

    title.current.value = ''
    location.current.value = ''
    description.current.value = ''
    imageUrl.current.value = ''
    maxGuests.current.value = ''
    pricePerNight.current.value = ''
    washer.current.value = ''
    wifi.current.value = ''
    essentials.current.value = ''
    kitchen.current.value = ''
    TV.current.value = ''
    airConditioning.current.value = ''
    iron.current.value = ''
    safe.current.value = ''

    setOpen(true)
    
  }

  // useEffect(() => {
  //   fetchSession()
  // }, [userId])

  const { locations } = useContext(LocationContext)

  const locationItem = location => (

    <option key={location._id} value={location._id}> {location.name}</option>

  )

  return (
    <div style={styles.outerContainer}>
      <form key="1" style={styles.form} onSubmit={createRentingForm}>
        <h1 style={styles.headline}>Uthyrningsformulär</h1>

        <label style={styles.label}>Titel </label>
        <input
          key="2"
          required ref={title}
          style={styles.input}
          type="text"
          maxLength="80"
        ></input>

        <label style={styles.label} >Ort</label>

        <select
          key="3"
          required ref={location}
          style={styles.input}
        >
          <option key="o" disabled selected></option>
          {locations.map(location => locationItem(location))}
        </select>

        <label style={styles.label} >Beskrivning</label>
        <textarea
          style={styles.description}
          ref={description}
          maxLength="1500"
          type="text"
          required>
        </textarea>

        <label style={styles.label} >Bild
        <span style={styles.url}> (Klistra in en url)</span>
        </label>
        <input
          key="4"
          style={styles.input}
          required
          ref={imageUrl}
          type="text"
        ></input>

        <div style={styles.guestContainer} >
          <label style={styles.label} >Max antal gäster</label>
          <input
            key="5"
            style={styles.guests}
            required ref={maxGuests}
            type="number"
            min="1"
          ></input>

          <label style={styles.label} >Pris per natt</label>
          <input
            key="6"
            style={styles.guests}
            ref={pricePerNight}
            required
            type="number"
            min="0"
          ></input>
        </div>
        <div style={styles.dateContainer}>
          <div key="d1" style={styles.datePicker}>
            <p style={styles.dateLabel}>Startdatum</p>
            <DatePicker
              className='datePicker'
              dateFormat="yyyy/MM/dd"
              selected={startDate}
              minDate={new Date()}
              required
              onChange={(data) => setStartDate(data)}
            />
          </div>
          <div key="d2" style={styles.datePicker}>
            <p style={styles.dateLabel}>Slutdatum</p>
            <DatePicker
              className='datePicker'
              dateFormat="yyyy/MM/dd"
              selected={endDate}
              minDate={startDate || minDate}
              required
              onChange={(data) => setEndDate(data)}
            />
          </div>
        </div>
        <h3 style={styles.headline}>Bekvämligheter</h3>

        <div style={styles.amenities}>
          <div style={styles.amenityItem}>
            <input
              key="a1"
              style={styles.checkBox}
              type="checkbox"
              ref={washer}
              value="washer"
            ></input>
            <img key="i1" style={styles.icon} src="https://i.imgur.com/ZHG7tWd.png" alt="''"></img>
            <label style={styles.iconLabel} >Tvättmaskin</label>
          </div>

          <div style={styles.amenityItem}>
            <input
              key="a2"
              style={styles.checkBox}
              type="checkbox"
              ref={wifi}
              value="wifi"
            ></input>
            <img key="i2" style={styles.icon} src="https://i.imgur.com/bEPBdlP.png" alt="''"></img>
            <label style={styles.iconLabel} >WiFi</label>
          </div>

          <div style={styles.amenityItem}>
            <input
              key="a3"
              style={styles.checkBox}
              type="checkbox"
              ref={essentials}
              value="essentials"
            ></input>
            <img key="i3" style={styles.icon} src="https://i.imgur.com/gcqJNww.png" alt="''"></img>
            <label style={styles.iconLabel} >Väsentligheter</label>
          </div>

          <div style={styles.amenityItem}>
            <input
              key="a4"
              style={styles.checkBox}
              type="checkbox"
              ref={kitchen}
              value="kitchen"
            ></input>
            <img key="i4" style={styles.icon} src="https://i.imgur.com/LvTR8oD.png" alt="''"></img>
            <label style={styles.iconLabel} >Kök</label>
          </div>

          <div style={styles.amenityItem}>
            <input
              key="a5"
              style={styles.checkBox}
              type="checkbox"
              ref={TV}
              value="TV"
            ></input>
            <img key="i5" style={styles.icon} src="https://i.imgur.com/o8S2jMk.png" alt="''"></img>
            <label style={styles.iconLabel} >TV</label>
          </div>

          <div style={styles.amenityItem}>
            <input
              key="a6"
              style={styles.checkBox}
              type="checkbox"
              ref={airConditioning}
              value="airConditioning"
            ></input>
            <img key="i6" style={styles.icon} src="https://i.imgur.com/bF4klbB.png" alt="''"></img>
            <label style={styles.iconLabel} >AC</label>
          </div>

          <div style={styles.amenityItem}>
            <input
              key="a7"
              style={styles.checkBox}
              type="checkbox"
              ref={iron}
              value="iron"
            ></input>
            <img key="i7" style={styles.icon} src="https://i.imgur.com/3XShQ5y.png" alt="''"></img>
            <label style={styles.iconLabel} >Strykjärn</label>
          </div>

          <div style={styles.amenityItem}>
            <input
              key="a8"
              style={styles.checkBox}
              type="checkbox"
              ref={safe}
              value="Låst skåp"
            ></input>
            <img key="i8" style={styles.icon} src="https://i.imgur.com/FXhmIhX.png" alt="''"></img>
            <label style={styles.iconLabel} >Låst skåp</label>
          </div>

        </div>


        <div style={styles.buttonContainer}>
          <button style={styles.button} key="7">Färdig</button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            disableScrollLock={false}
          >
            {body}
          </Modal>

        </div>
      </form >
  </div>
    )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: '0 auto'
  },
}));

const styles = {
  outerContainer: {
    '@media (max-width: 1000px)': {
      width: '80%'
    }

  },

  form: {
    display: 'grid',
    gridGap: '3px',
    maxWidth: '800px',
    margin: '0px auto',
    textAlign: 'center',
    padding: '10px',
    '@media (max-width: 1000px)': {
      padding: '0px',
    }
  },
  amenities: {
    display: 'grid',
    color: 'white',
    justifyContent: 'center',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '25px',
    paddingBottom: '30px',
    '@media (max-width: 1000px)': {
      padding: '0px',
      gridTemplateColumns: 'repeat(2, 1fr)',
      marginLeft: '10px',
      marginRight: '10px',
    }
  },
  headline: {
    fontFamily: 'Quicksand',
    color: 'grey',
    paddingLeft: '40px',
    paddingRight: '40px',
    paddingTop: '30px',
    textAlign: 'center',
  },
  label: {
    textAlign: 'left',
    verticalAlign: 'text-bottom',
    lineHeight: '20px',
    color: 'grey',
    paddingTop: '15px',
    paddingBottom: '10px',
    '@media (max-width: 1000px)': {
      marginLeft: '10px',
      marginRight: '10px',
      lineHeight: '30px',
      
    }

  },
  input: {
    textAlign: 'left',
    height: '50px',
    borderRadius: '7px',
    border: '1px',
    backgroundColor: '#eee',
    ':focus': {
      outline: 'none'
    },
    '@media (max-width: 1000px)': {
      marginLeft: '10px',
      marginRight: '10px',
    }
  },
  description: {
    fontFamily: 'Quicksand',
    backgroundColor: '#eee',
    border: '0',
    color: 'grey',
    textAlign: 'left',
    height: '100px',
    verticalAlign: 'text-top',
    resize: 'none',
    ':focus': {
      outline: 'none'
    },
    '@media (max-width: 1000px)': {
      marginLeft: '10px',
      marginRight: '10px',
      height: '200px',
    }
  },
  guestContainer: {
    textAlign: 'center',
    height: '50px',
    width: '100%',
    marginTop: '10px',
    marginBottom: '40px',
    '@media (max-width: 1000px)': {
      marginLeft: '23%',
      width: '50%',
      marginBottom: '17vh',
      marginTop: '5vh'
    }
  },
  guests: {
    textAlign: 'center',
    backgroundColor: '#eee',
    height: '40px',
    width: '90px',
    border: '0',
    borderRadius: '7px',
    margin: '10px 20px 0px 20px',
    ':focus': {
      outline: 'none'
    },
    '@media (max-width: 1000px)': {
      width: '65%',
      marginTop: '1vh',
      
    }
  },
  dateContainer: {
    textAlign: 'center',
    height: '50px',
    width: '100%',
    margin: '0 auto',
    '@media (max-width: 1000px)': {
      width: '85%',
      marginTop: '8vh',
      height: '80px',
      marginBottom: '8vh',
    }
  },
  datePicker: {
    float: 'left',
    fontFamily: 'Quicksand',
    color: 'grey',
    textAlign: 'left',
    marginLeft: '22%',
    lineHeight: '5px',
    width: '100px',
    border: '0',
    '@media (max-width: 1000px)': {
      textAlign: 'center',
      marginLeft: '25%',
      width: '90px',
    }
  },
  dateLabel: {
    
    '@media (max-width: 1000px)': {
      textAlign: 'center',
      width: '100%',
      paddingLeft: '9vw'
      
    }
  },
  buttonContainer: {
    textAlign: 'center',
    height: '100px',
    verticalAlign: 'text-top',
    width: '100%',
    marginBottom: '40px',
  },
  button: {
    width: '120px',
    marginTop: '40px',
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    fontSize: '16px',
    color: 'grey',
    maxWidth: '100px',
    cursor: 'pointer',
    border: 'none',
    padding: '10px',
    borderRadius: '6px',
    textTransform: 'uppercase',
    ':hover': {
      background: '#e6e6e6',
    },
    '@media (max-width: 1000px)': {
      width: '200px',
      maxWidth: '200px',
      padding: '15px',
    }
  },
  amenityItem: {
    fontFamily: 'Quicksand',
    float: 'right',

  },
  checkBox: {
    float: 'left',
    marginTop: '8px',
  },
  icon: {
    width: '30px',
    marginRight: '15px',
    float: 'right',
  },
  iconLabel: {
    fontSize: '12px',
    textAlign: 'left',
    lineHeight: '0px',
    color: 'grey',
    paddingTop: '15px',
    float: 'left'
  },
  modalContainer: {
    fontFamily: 'Quicksand',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    paddingTop: '20%',
    userSelect: 'none',
    color: 'rgba(0,0,0,0)',
    textShadow: '0 0 0 #000'
  },
  url: {
    fontSize: '10px',
    textTransform: 'uppercase'
  },
  modalButton: {
    background: '#eee',
    marginTop: '40px',
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    fontSize: '14px',
    color: 'grey',
    cursor: 'pointer',
    border: 'none',
    padding: '15px',
    borderRadius: '6px',
    textTransform: 'uppercase',
    ':hover': {
      background: '#e6e6e6',
    },
    '@media (max-width: 1000px)': {
      width: '90%',
      maxWidth: '200px',
      padding: '15px',
    }
  },
}


export default Radium(CreateRentingForm)