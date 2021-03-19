import React, { useState, useContext, useRef, useEffect } from 'react';
import Radium from 'radium'
import { BookingContext } from '../contexts/BookingContextProvider';
import DatePicker from "react-datepicker";
import { useHistory } from 'react-router-dom'
import { UserContext } from '../contexts/UserContextProvider';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const BookingForm = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const history = useHistory()
  const { addBooking } = useContext(BookingContext)
  const { user } = useContext(UserContext)
  const [accommodation, setAccommodation] = useState(null)
  const [accommodationPrice, setAccommodationPrice] = useState(null)
  // const [validatDates, setValidatDates] = useState(true)
  // const [bookingOk, setBookingOk] = useState(false)
  const [price, setPrice] = useState()
  const dayInMilliSec = 86400000;

  const [minDate, setMindate] = useState(new Date())
  const [maxDate, setEndDate] = useState(null)


  const [arrDate, setArrDate] = useState(new Date())
  const [depDate, setDepDate] = useState()
  const guests = useRef()
  const body = (
    <div style={styles.modalContainer}>
      <div className={classes.paper}>
        <h2 id="simple-modal-title">Din bokning är lagd ✔️</h2>
        <Button className="modal-button" style={buttonStyle} onClick={() => { history.push('/Mina-sidor'); handleClose() }}>Gå till mina bokningar</Button>
      </div>
    </div>
  );
  const createBooking = async e => {
    e.preventDefault()
    const booking = {
      user: user._id,
      accommodation: accommodation._id,
      startDate: arrDate.getTime(),
      endDate: depDate.getTime(),
      guests: guests.current.value,
    }
    console.log(user)

    if (arrDate.getTime() < depDate.getTime()) {
      await addBooking(booking)
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false);
  };



  useEffect(() => {
    if (arrDate && depDate) {
      setPrice(Math.ceil((depDate.getTime() - arrDate.getTime()) / dayInMilliSec) * accommodationPrice)
      return price
    }
    if (props.accommodation) {
      setAccommodation(props.accommodation)
      setAccommodationPrice(props.accommodation.pricePerNight)
      if (props.accommodation.startDate > new Date()) {
        setMindate(props.accommodation.startDate)
      }
      setEndDate(props.accommodation.endDate)
    }
  }, [arrDate, depDate, price, props.accommodation, accommodationPrice])

  return (
    <div>
      {accommodation &&
        <form onSubmit={createBooking}>
          <div style={styles.guestContainer}>
            Antal gäster
        <input
              type="number"
              ref={guests}
              max={accommodation.maxGuests}
              min="1"
              style={styles.input}
              required />
            <br />
          </div>
          <div style={styles.dateContainer}>
            <div key="d1" style={styles.datePicker}>
              <p>Startdatum</p>
              <DatePicker
                className='datePicker'
                dateFormat="yyyy/MM/dd"
                placeholderText="Ankomst"
                selected={arrDate}
                onChange={(data) => setArrDate(data)}
                minDate={minDate}
              />
            </div>
            <div key="d2" style={styles.datePicker}>
              <p>Slutdatum</p>
              <DatePicker
                className='datePicker'
                dateFormat="yyyy/MM/dd"
                selected={depDate}
                placeholderText="Avresa"
                onChange={(data) => setDepDate(data)}
                minDate={arrDate}
                maxDate={maxDate}
              />
            </div>
          </div>

          {arrDate && depDate &&
            <div>
              <p>Pris: {Math.round(price)} SEK</p>
              <p>Serviceavgift: {Math.round((price * 0.15))} SEK</p>
              <p>Totalpris: {Math.round((price * 1.15))}</p>
            </div>
          }
          <div style={styles.bokaContainer}>
            <button style={styles.button}>Boka</button>
            {/* {!validatDates && <p style={styles.error}>Datum för avresa kan inte ske före ankomstdatum.</p>} */}
            {/* {bookingOk && <p style={styles.ok}>Bokningen genomförds!</p>} */}
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          disableScrollLock="false"
        >
          {body}
        </Modal>
        </form>
      }
      <br /><br />
    </div>
  );
}

export default Radium(BookingForm);

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: '0 auto'
  },
}));

const buttonStyle = {
  backgroundColor: 'red'
}

const styles = {
  input: {
    width: '50px',
    height: '25px',
    margin: '10px',
    textAlign: 'center'

  },
  guestContainer: {
    fontFamily: 'Quicksand',
    color: 'grey',
    padding: '50px',
    textAlign: 'center',

  },
  error: {
    backgroundColor: 'crimson',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    padding: '5px',
    margin: '10px auto',
    width: '500px',
    borderRadius: '10px'
  },
  ok: {
    backgroundColor: '#65c28c',
    fontWeight: 'bold',
    padding: '5px',
    margin: '10px auto',
    width: '300px',
    borderRadius: '10px'
  },
  dateContainer: {
    textAlign: 'center',
    height: '100px',
    width: '100%',
    margin: '0 auto',
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
  },
  bokaContainer: {
    textAlign: 'center',
    height: '50px',
    width: '100%',
    margin: '0 auto',

  },
  button: {
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '14px',
    color: 'grey',
    width: '170px',
    margin: '10px',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    ':focus': {
      outline: 'none'
    }
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    paddingTop: '20%',
    userSelect: 'none',
    color: 'rgba(0,0,0,0)',
    textShadow: '0 0 0 #000'
  },
}