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
    margin: '10px auto',
    borderRadius: '15px',
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
  },

}

export default Radium(RentalList);
