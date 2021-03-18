import React, { useState, useContext, useRef, useEffect } from 'react';
import Radium from 'radium'
import { BookingContext } from '../contexts/BookingContextProvider';
import DatePicker from "react-datepicker";
import { useHistory } from 'react-router-dom'


const BookingForm = (props) => {
  const history = useHistory()
  const { addBooking } = useContext(BookingContext)
  const [accommodation, setAccommodation] = useState(null)
  const [validatDates, setValidatDates] = useState(true)
  const [bookingOk, setBookingOk] = useState(false)
  const [price, setPrice] = useState()
  const dayInMilliSec = 86400000;

  const [minDate, setMindate] = useState(new Date())
  const [maxDate, setEndDate] = useState(null)


  const [arrDate, setArrDate] = useState(new Date())
  const [depDate, setDepDate] = useState()
  const guests = useRef()
 
  const createBooking = async e => {
    e.preventDefault()
    const booking = {
      // user: 
      accommodation: accommodation._id,
      startDate: arrDate.getTime(),
      endDate: depDate.getTime(),
      guests: guests.current.value,
    }

    if (arrDate.getTime() < depDate.getTime()) {
      await addBooking(booking)
      setBookingOk(true)
      setValidatDates(true)
      history.push('/Mina-sidor')
    } else {
      setValidatDates(false)
      setBookingOk(false)
    }
  }

  useEffect(() => {
      if (arrDate && depDate) {
        setPrice(((depDate.getTime() - arrDate.getTime()) / dayInMilliSec) * accommodation.pricePerNight)
        return price
      }
    
    if (props.accommodation) {
      setAccommodation(props.accommodation)
      if (props.accommodation.startDate > new Date()) {
        setMindate(props.accommodation.startDate)
      }
      setEndDate(props.accommodation.endDate)
    }
  }, [arrDate, depDate, price, props.accommodation])

  return (
    <div>
      {accommodation &&
      <form onSubmit={createBooking}>
        <div style={styles.guestContainer}>
          Antal gäster
        <input
          type="number"
          ref={guests}
          placeholder="2"
          max={accommodation.maxGuests}
          min="1"
          style={styles.input} />
          <br />
        </div>
        <div style={styles.dateContainer}>
          <div key="d1" style={styles.datePicker}>
            <p>Startdatum</p>
            <DatePicker
              wrapperClassName='datePicker'
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
              wrapperClassName='datePicker'
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
          {!validatDates && <p style={styles.error}>Datum för avresa kan inte ske före ankomstdatum.</p>}
          {bookingOk && <p style={styles.ok}>Bokningen genomförds!</p>}
        </div>
      </form>
      }
      <br /><br />
    </div>
   );
}
 
export default Radium(BookingForm);

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
    width: '100px',
    margin: '10px',
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    ':focus': {
      outline: 'none'
    }
  },
}