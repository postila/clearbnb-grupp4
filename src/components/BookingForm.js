import React, { useState, useContext, useRef } from 'react';
import Radium from 'radium'
import { BookingContext } from '../contexts/BookingContextProvider';
import DatePicker from "react-datepicker";


const BookingForm = (props) => {
  const { addBooking } = useContext(BookingContext)
  const [accommodationId, setAccommodationId] = useState(props.accommodation._id)
  const [accommodationPrice, setAccommodationPrice] = useState(props.accommodation.pricePerNight)
  const [accommodationMaxGuests, setAccommodationMaxGuests] = useState(props.accommodation.maxGuests)
  console.log(accommodationPrice);
  console.log(accommodationMaxGuests);

  const [arrDate, setArrDate] = useState()
  const [depDate, setDepDate] = useState()
  const guests = useRef()

  const calculateTotalPrice = (price, nights) => {
    return (price * nights) * 1.15;
  }

  const createBooking = async e => {
    e.preventDefault()

    console.log(arrDate.getTime(), 'ankomst');
    console.log(depDate.getTime(), 'avresa');

  }

  return (
    <div>
      <form onSubmit={createBooking}>
        <input
          type="number"
          placeholder="Antal gäster"
          max={accommodationMaxGuests}
          min="1"
          style={styles.input} />
        <DatePicker selected={arrDate} onChange={data => setArrDate(data)} />
        <DatePicker selected={depDate} onChange={data => setDepDate(data)} />
        <button>Boka</button>
      </form>
    </div>
   );
}
 
export default Radium(BookingForm);

const styles = {
  input: {
    display: 'block',
    width: '100px',
    height: '25px'
  }
}