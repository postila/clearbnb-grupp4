import { useContext } from 'react'
import { BookingContext } from '../contexts/BookingContextProvider'
import { LocationContext } from '../contexts/locationContextProvider'
import { UserContext } from '../contexts/UserContextProvider'
import Radium from 'radium'

function BookingsList() {
  const { bookings } = useContext(BookingContext)
  const { locations } = useContext(LocationContext)
  const { userId } = useContext(UserContext)
  
  const bookingsList = bookings.filter(booking => booking.user && booking.accommodation).filter(booking => booking.user._id === userId)


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
      </div>
    </div>
  )

  return (
    <div style={styles.itemsPositions}>
      {bookings && locations && 
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
    width: '90vw',
    background: '#eee',
    padding: '15px',
    margin: '20px auto',
    borderRadius: '8px',
    '@media (min-width: 1000px)': {
      width: '800px',
    },
    '@media (max-width: 700px)': {
      gridTemplateColumns: '1fr',
      justifyContent: 'center',
      gridGap: '0'
    }
  },
  pictures: {
    borderRadius: '10px',
    width: '40vw',
    height: '25vh',
    margin: '0 auto',
    '@media (min-width: 900px)': {
      maxWidth: '400px',
      height: '32vh'
    },
    '@media (max-width: 700px)': {
      gridTemplateColumns: '1fr',
      justifyContent: 'center',
      width: '85vw',
      height: '37vh',
    },
    '@media (max-width: 400px)': {
      gridTemplateColumns: '1fr',
      justifyContent: 'center',
      width: '80vw',
      height: '27vh',
    }
  },
  text: {
    fontFamily: 'Quicksand',
    textAlign: 'left',
    fontSize: '1.2em',
    color: 'grey',
    padding: '0',
    margin: '5px',
    opacity: '90%',
    lineHeight:'0.9',
    '@media (max-width: 700px)': {
      fontSize: '1em',
      textAlign: 'center',
    }
  }
}

export default Radium(BookingsList)