import { useContext, useState } from 'react'
import { BookingContext } from '../contexts/BookingContextProvider'
import { UserContext } from '../contexts/UserContextProvider'
import Radium from 'radium'
import { useParams } from 'react-router'

function BookingDates() {
  const { bookings, fetchBookings } = useContext(BookingContext)
  const { userId } = useContext(UserContext)
  const { id } = useParams()

  const bookingsList = bookings.filter(booking => booking.accommodation).filter(booking => booking.accommodation._id === id)

  let [dates, setDates] = useState([])
  for (let date of bookingsList) {
    if (!dates.includes(date.startDate || date.endDate)) setDates([...dates, date.startDate, date.endDate])
  }
  console.log(dates, 'dates')

  let [allDates, setAllDates] = useState([])
  for (let i = 0; i < dates.length - 1; i += 2) {
    while (dates[i] < dates[i + 1]) {
      if (!allDates.includes(dates[i])) {
        setAllDates([...allDates, dates[i]])
        dates[i] += 86400000
      }
    }
    if (!allDates.includes(dates[i + 1]))
      setAllDates([...allDates, dates[i + 1]])
  }
  console.log(allDates, 'allDates')

  return (
    <div style={styles.itemsPositions}>

    </div>
  )
}

const styles = {
  box: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '20px',
    maxWidth: '800px',
    backgroundColor: '#eee',

    padding: '15px',
    margin: '10px auto',
    borderRadius: '15px',
    ':hover': {
      opacity: '80%',
      cursor: 'pointer'
    }
  },
  pictures: {
    maxWidth: '45vh',
    borderRadius: '10px',
    boxShadow: '1px 1px 10px 0.5px #343841'
  },
  text: {
    fontFamily: 'Quicksand',
    color: 'grey',
    textAlign: 'left',
    color: 'grey',
  }
}
export default Radium(BookingDates)