import React, { useState, useContext, useRef } from 'react';
import Radium from 'radium'
import { BookingContext } from '../contexts/BookingContextProvider';
import DatePicker from "react-datepicker";


const BookingForm = (props) => {
  const { addBooking } = useContext(BookingContext)
  const [accommodationId, setAccommodationId] = useState(props.accommodation._id)
  const [accommodationPrice, setAccommodationPrice] = useState(props.accommodation.pricePerNight)
  const [accommodationMaxGuests, setAccommodationMaxGuests] = useState(props.accommodation.maxGuests)
  const [validation, setValidation] = useState(true)

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
      // totalPrice: 
    }

    if (arrDate.getTime() < depDate.getTime()) {
      await addBooking(booking)
    } else {
      setValidation(false)
    }
    console.log(booking, 'bokningen')
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
      {!validation && 
      <div>
        <p style={styles.error}>Datum för avresa kan inte ske före ankomstdatum.</p>
      </div>
      }
      </form>

    </div>
   );
}
 
export default Radium(BookingForm);

const styles = {
  input: {
    // display: 'block',
    width: '100px',
    height: '25px',
    margin: '10px'
  },
  button: {
    margin: '10px',
    padding: '10px',
    borderRadius: '10px',
    border: 'none',
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
    // border: 'none',
    borderRadius: '10px'
  }
}