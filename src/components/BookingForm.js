import React, { useState, useContext, useRef } from 'react';
import Radium from 'radium'
import { BookingContext } from '../contexts/BookingContextProvider';
import DatePicker from "react-datepicker";
import { useHistory } from 'react-router-dom'


const BookingForm = (props) => {
  const history = useHistory()
  const { addBooking } = useContext(BookingContext)
  const [accommodationId, setAccommodationId] = useState(props.accommodation._id)
  const [accommodationPrice, setAccommodationPrice] = useState(props.accommodation.pricePerNight)
  const [accommodationMaxGuests, setAccommodationMaxGuests] = useState(props.accommodation.maxGuests)
  const [validatDates, setValidatDates] = useState(true)
  const [bookingOk, setBookingOk] = useState(false)

  const [arrDate, setArrDate] = useState()
  const [depDate, setDepDate] = useState()
  const guests = useRef()

  const calculateTotalPrice = (price, nights) => {
    return (price * nights) * 1.15;
  }

  const createBooking = async e => {
    e.preventDefault()

    const booking = {
      // user: 
      accommodation: accommodationId,
      startDate: arrDate.getTime(),
      endDate: depDate.getTime(),
      guests: guests.current.value,
      // totalPrice: accommodationPrice
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
    console.log(booking, 'bokningen')
    alert('Du har lagt din bokning!')
  }

  return (
    <div>
      <form onSubmit={createBooking}>
        <input
          type="number"
          ref={guests}
          placeholder="Antal gäster"
          max={accommodationMaxGuests}
          min="1"
          style={styles.input} /><br />
        <DatePicker selected={arrDate} onChange={data => setArrDate(data)} placeholderText="Ankomst" style={styles.input} /> <br />
        <DatePicker selected={depDate} onChange={data => setDepDate(data)} placeholderText="Avresa" style={styles.input} /> <br />
        <button style={styles.button}>Boka</button>
        {!validatDates && <p style={styles.error}>Datum för avresa kan inte ske före ankomstdatum.</p>}
        {bookingOk && <p style={styles.ok}>Bokningen genomförds!</p>}
      </form>
    </div>
  );
}

export default Radium(BookingForm);

const styles = {
  input: {
    width: '100px',
    height: '25px',
    margin: '10px'
  },
  button: {
    margin: '10px',
    padding: '10px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    ':focus': {
      outline: 'none'
    }
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
  }
}