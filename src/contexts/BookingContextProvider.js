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
    await fetch('/api/booking', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(booking)
    })
  }

  const deleteBooking = async (id) => {
    await fetch('/rest/booking/' + id, {
      method: 'DELETE'
    })
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const values = {
    bookings,
    addBooking,
    fetchBookings,
    deleteBooking
  }

  return (
    <BookingContext.Provider value={values}>
      {props.children}
    </BookingContext.Provider>
  )
}