import { createContext } from 'react'

export const BookingContext = createContext();

export default function BookingContextProvider(props) {

  const addBooking = async booking => {
    let res = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(booking)
    })

    res = await res.json()
    console.log(res, 'booking ok');
  }

  const values = {
    addBooking
  }

  return (
    <BookingContext.Provider value={values}>
      {props.children}
    </BookingContext.Provider>
  )
}