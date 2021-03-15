import React, { useState, useContext, useRef, useEffect } from 'react';
import Radium from 'radium'
import { BookingContext } from '../contexts/BookingContextProvider';
import DatePicker from '../components/DatePicker'


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

  }

  useEffect(() => {
    setArrDate(props.startDate)
    setDepDate(props.endDate)
    console.log(arrDate, 'arrival');
    console.log(depDate, 'departure');
  }, [arrDate, depDate])

  return (
    <div>
      <form>
        <input
          type="number"
          placeholder="Antal gäster"
          max={accommodationMaxGuests}
          min="1"
          style={styles.input} />

        <DatePicker arrDate={arrDate} depDate={depDate} />
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