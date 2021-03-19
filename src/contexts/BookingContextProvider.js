import { createContext, useState, useEffect } from 'react'

export const BookingContext = createContext();

export default function BookingContextProvider(props) {

  const [bookings, setBookings] = useState([])

  const fetchBookings = async () => {
    let res = await fetch('/rest/bookings')
    res = await res.json()
    setBookings(res)
  }

  const addBooking = async booking => {
    let res = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(booking)
    })

    res = await res.json()
    console.log(res, 'booking ok');
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const values = {
    bookings,
    addBooking,
    fetchBookings
  }

  return (
    <BookingContext.Provider value={values}>
      {props.children}
    </BookingContext.Provider>
  )
}