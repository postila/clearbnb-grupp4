import { useContext, useEffect } from 'react'
import { BookingContext } from '../contexts/BookingContextProvider'
import { LocationContext } from '../contexts/locationContextProvider'
import { UserContext } from '../contexts/UserContextProvider'
import Radium from 'radium'

function BookingsList() {
  const { bookings, fetchBookings } = useContext(BookingContext)
  const { locations } = useContext(LocationContext)
  const { userId } = useContext(UserContext)
  
  const bookingsList = bookings.filter(booking => booking.user).filter(booking => booking.user._id === userId)

  useEffect(() => {
    fetchBookings()
  }, [bookings])

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
        {/* <p>{booking.user.name}</p> */}
        
      </div>
    </div>
  )

  return (
    <div style={styles.itemsPositions}>
      <div>
      {bookingsList.map(booking => card(booking))}
      </div>
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


// const styles = {
//   img: {
//     height: '150px',
//     borderRadius: '10px',
//     maxWidth: '12vw'
//   },
//   card: {
//     backgroundColor: '#202329',
//     padding: '10px',
//     marginBottom: '15px',
//     flex: '1 0 21%',
//     borderRadius: '10px',
//     cursor: 'pointer',
//     transition: '200ms',
//     boxShadow: '0 0 6px 2px rgb(22, 22, 22)',
//     ':hover': {
//       transform: 'scale(1.03)',
//       backgroundColor: '#252c36'
//       // opacity: '40%'
//     }
//   },
//   itemsPositions: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(4, 1fr)',
//     gridGap: '25px',
//     color: 'white'
//   }
// }

export default Radium(BookingsList)