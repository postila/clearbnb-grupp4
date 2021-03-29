import { useContext } from 'react'
import { BookingContext } from '../contexts/BookingContextProvider'
import { LocationContext } from '../contexts/locationContextProvider'
import { UserContext } from '../contexts/UserContextProvider'
import Radium from 'radium'

function BookingsList() {
  const { bookings } = useContext(BookingContext)
  const { locations } = useContext(LocationContext)
  const { users, userId } = useContext(UserContext)
 
  const bookingsList = bookings.filter(booking => booking.user && booking.accommodation).filter(booking => booking.user._id === userId)

  const calculateUser = booking => {
    let us = booking.accommodation.user
    let i = 0
    for(i = 0; i < users.length; i++) {
      if (users[i]._id === us) {
        break;
      }
    }
    return i
  }

  const card = booking => 
  (
    <div bookings
      style={styles.box}
      className="card"
      key={booking._id}
    >
      <img style={styles.pictures} src={booking.accommodation.imageUrl} alt="''"/>
      <div style={styles.text}>
        <h3>{booking.accommodation.title}</h3>
        <p>{locations.find(l=>l._id === booking.accommodation.location).name}</p>
        <p>Antal gäster {booking.guests} | {Math.round((Math.round((booking.endDate - booking.startDate) / 86400000) * booking.accommodation.pricePerNight*1.15))} SEK</p>
        <p>Ankomst: {new Date((booking.startDate)).toLocaleDateString()}</p>
        <p>Avresa: {new Date((booking.endDate)).toLocaleDateString()}</p>
        <p>Värd: {users[calculateUser(booking)].name}</p>
        <p>E-mail: {users[calculateUser(booking)].email}</p>  
      </div>
    </div>
  )

  return (
    <div style={styles.itemsPositions}>
      {bookings && locations && users &&
      <div>
      {bookingsList.map(booking => card(booking))}
      </div>}
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
    textAlign: 'left'
  }
}

export default Radium(BookingsList)