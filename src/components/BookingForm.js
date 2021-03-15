import React, { useState, useContext, useRef } from 'react';
import Radium from 'radium'
import { BookingContext } from '../contexts/BookingContextProvider';
import DatePicker from "react-datepicker";


const BookingForm = (props) => {
  const { addBooking } = useContext(BookingContext)
  const [accommodationId, setAccommodationId] = useState(props.accommodation._id)
  const [accommodationPrice, setAccommodationPrice] = useState(props.accommodation.pricePerNight)
  const [accommodationMaxGuests, setAccommodationMaxGuests] = useState(props.accommodation.maxGuests)

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

    console.log(booking, 'bokningen')
    await addBooking(booking)
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
    ':hover': {
      focus: 'none'
    }
  }
}