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
    <div
      style={styles.box}
      className="card"
      key={booking._id}
    >
      <img style={styles.pictures} src={booking.accommodation.imageUrl} alt="''"/>
      <div style={styles.text}>
        <h3 style={styles.title}>{booking.accommodation.title}</h3>
        <p style={styles.textCity}>{locations.find(l=>l._id === booking.accommodation.location).name}</p>
        <p>Antal gäster: {booking.guests} | {Intl.NumberFormat("sv-SE", {
          style: "decimal",
          currency: "SEK"
        }).format(Math.round((Math.round((booking.endDate - booking.startDate) / 86400000) * booking.accommodation.pricePerNight*1.15)))} SEK totalt</p>
        <p style={styles.dates}>Ankomst: {new Date((booking.startDate)).toLocaleDateString()}</p>
        <p style={styles.dates}>Avresa: {new Date((booking.endDate)).toLocaleDateString()}</p>
        <p style={styles.host}>Värd: {users[calculateUser(booking)].name} <span style={{ fontWeight: 'bold'}}> · </span> {users[calculateUser(booking)].email} </p>
        {/* <p style={styles.host}>E-mail: {users[calculateUser(booking)].email}</p> */}
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
    // height: '25vh',
    margin: '0 auto',
    '@media (min-width: 900px)': {
      maxWidth: '400px',
      // height: '32vh'
    },
    '@media (max-width: 700px)': {
      gridTemplateColumns: '1fr',
      justifyContent: 'center',
      width: '85vw',
      // height: '37vh',
    },
    '@media (max-width: 400px)': {
      gridTemplateColumns: '1fr',
      justifyContent: 'center',
      width: '80vw',
      // height: '27vh',
    }
  },
  text: {
    fontFamily: 'Quicksand',
    textAlign: 'left',
    fontSize: '1em',
    color: 'grey',
    margin: '5px',
    opacity: '90%',
    lineHeight: '0.9',
    '@media (max-width: 700px)': {
      fontSize: '1em',
      textAlign: 'center',
    }
  },
  textCity: {
    fontFamily: 'Quicksand',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '1em',
    textTransform: 'uppercase',
    margin: '10px 0px',
    color: 'grey',
    '@media (max-width: 700px)': {
      textAlign: 'center',
      padding: '0',
      margin: '3px'
    }
  },
  dates: {
    fontFamily: 'Quicksand',
    textAlign: 'left',
    fontSize: '0.8em',
    margin: '10px 0px',
    color: 'grey',
    '@media (max-width: 700px)': {
      textAlign: 'center',
      padding: '0',
      margin: '3px'
    }
  },
  host: {
    fontFamily: 'Quicksand',
    textAlign: 'left',
    fontSize: '0.8em',
    margin: '10px 0px',
    color: 'grey',
    '@media (max-width: 700px)': {
      textAlign: 'center',
      padding: '0',
      margin: '3px'
    }
  },
  title: {
    fontFamily: 'Quicksand',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '1.3em',
    margin: '10px 5px 20px 0px',
    color: 'grey',
    '@media (max-width: 700px)': {
      textAlign: 'center',
      padding: '0',
      margin: '3px'
    }
  }
}
export default Radium(BookingsList)