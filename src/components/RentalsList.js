import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContextProvider'
import { AccommodationsContext } from '../contexts/AccommodationsContext'
import Radium from 'radium'


function RentalList() {
  const { accommodations, fetchAccommodations } = useContext(AccommodationsContext)
  const { userId, fetchSession } = useContext(UserContext)
  const rentalList = accommodations.filter(accommodation => accommodation.user).filter(accommodation => accommodation.user._id === userId)

  
  useEffect(() => {
    fetchAccommodations()
    // fetchSession()
  }, [userId])

  const card = accommodation =>
  (
    <div
      style={styles.box}
      className="card"
      key={accommodation._id}
    >
      <img style={styles.pictures} src={accommodation.imageUrl} alt={'picture' + accommodation._id} />
      <div style={styles.text}>
        <h3>{accommodation.title}</h3>
        <p>Max antal gäster {accommodation.maxGuests} | {accommodation.pricePerNight} SEK</p>
        <p>{accommodation.location.name}</p>
        <p>Uthyrningsperiod:</p>
        <p>Från: {new Date(accommodation.startDate).toLocaleDateString()}</p>
        <p>Till: {new Date(accommodation.endDate).toLocaleDateString()}</p>
      </div>
    </div>
  )

  return (
    <div>
      { accommodations &&
        <div>
          {rentalList.map(accommodation => card(accommodation))}
        </div>}
    </div>
  );
}

const styles = {
  box: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '20px',
    maxWidth: '800px',
    background: '#eee',
    padding: '15px',
    margin: '40px auto',
    borderRadius: '8px',
    ':hover': {
      opacity: '80%',
      cursor: 'pointer'
    }
  },

  pictures: {
    resizeMode: 'contain',
    maxWidth: '40vh',
    borderRadius: '10px',
    //boxShadow: '1px 1px 10px 0.5px #343841'
  },

  text: {
    fontFamily: 'Quicksand',
    textAlign: 'left',
    fontSize: '20px',
    color: 'grey'
  },

  header: {
    fontFamily: 'Quicksand',
    margin: '50px',
    color: 'grey',
  }
}

export default Radium(RentalList);
