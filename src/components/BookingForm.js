import React, { useState, useContext, useRef } from 'react';
import Radium from 'radium'
import { BookingContext } from '../contexts/BookingContextProvider';

const BookingForm = (props) => {
  const { addBooking } = useContext(BookingContext)
  const [accommodationId, setAccommodationId] = useState(props.accommodation._id)
  const [accommodationPrice, setAccommodationPrice] = useState(props.accommodation.pricePerNight)
  const [accommodationMaxGuests, setAccommodationMaxGuests] = useState(props.accommodation.maxGuest)
  console.log(accommodationPrice);
  console.log(accommodationMaxGuests);

  const startDate = useRef()
  const endDate = useRef()
  const guests = useRef()

  const calculateTotalPrice = (price, nights) => {
    return (price * nights) * 1.15;
  }

  const createBooking = async e => {
    e.preventDefault()

  }

  return (
    <div>
      <form>
        <lable>Gäster: </lable>
        <input type="number" max={accommodationMaxGuests} min="1" />
      </form>
    </div>
   );
}
 
export default Radium(BookingForm);