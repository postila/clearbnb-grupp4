import React, { useState, useContext, useRef, useEffect } from 'react';
import Radium from 'radium'
import { BookingContext } from '../contexts/BookingContextProvider';
import DatePicker from "react-datepicker";
import { useHistory } from 'react-router-dom'


const BookingForm = (props) => {
  const history = useHistory()
  const { addBooking } = useContext(BookingContext)
  const [accommodationId, setAccommodationId] = useState(null)
  const [accommodationPrice, setAccommodationPrice] = useState(null)
  const [accommodationMaxGuests, setAccommodationMaxGuests] = useState(null)
  const [validatDates, setValidatDates] = useState(true)
  const [bookingOk, setBookingOk] = useState(false)
  const [price, setPrice] = useState()
  const dayInMilliSec = 86400000;

  const [arrDate, setArrDate] = useState()
  const [depDate, setDepDate] = useState()
  const guests = useRef()

  const handlePrice = () => {
    if (arrDate && depDate) {
      setPrice(((depDate.getTime() - arrDate.getTime() )/ dayInMilliSec) * accommodationPrice)
      return price
    }
  }
 
  const createBooking = async e => {
    e.preventDefault()
    const booking = {
      // user: 
      accommodation: accommodationId,
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
    handlePrice()
    if (props.accommodation) {
      setAccommodationId(props.accommodation._id)
      setAccommodationPrice(props.accommodation.pricePerNight)
      setAccommodationMaxGuests(props.accommodation.maxGuests)
    }
  }, [arrDate, depDate, props])

  return (
    <div>
      {accommodationId &&
      <form onSubmit={createBooking}>
        <input
          type="number"
          ref={guests}
          placeholder="Antal gäster"
          max={accommodationMaxGuests}
          min="1"
          style={styles.input} /><br />
        <DatePicker selected={arrDate} onChange={data => setArrDate(data)} placeholderText="Ankomst" dateFormat="yyyy/MM/dd" /> <br />
        <DatePicker selected={depDate} onChange={data => setDepDate(data)} placeholderText="Avresa" dateFormat="yyyy/MM/dd" /> <br />

        {arrDate && depDate &&
          <div>
            <p>Pris: {Math.round(price)} SEK</p>
            <p>Serviceavgift: {Math.round((price * 0.15))} SEK</p>
            <p>Totalpris: {Math.round((price * 1.15))}</p>
          </div>
        }

        <button style={styles.button}>Boka</button>
        {!validatDates && <p style={styles.error}>Datum för avresa kan inte ske före ankomstdatum.</p>}
        {bookingOk && <p style={styles.ok}>Bokningen genomförds!</p>}
      </form>
          }
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