import { useContext, useEffect } from 'react'
import { UserContext } from '../contexts/UserContextProvider'
import { AccommodationsContext } from '../contexts/AccommodationsContext'
import Radium from 'radium'
import { useHistory } from 'react-router-dom'

function RentalList() {
  const { accommodations, fetchAccommodations } = useContext(AccommodationsContext)
  const { userId, fetchSession } = useContext(UserContext)
  const history = useHistory()
  
  const rentalList = accommodations.filter(accommodation => accommodation.user).filter(accommodation => accommodation.user._id === userId)

  const goToRentalForm = () => {
    history.push('/Uthyrning')
  }
  
  useEffect(() => {
    fetchAccommodations()
    // fetchSession()
  }, [])

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
        </div>
      }
      { rentalList.length === 0 &&
        <div style={styles.rentalbox} onClick={() => goToRentalForm()}>
          <h3 style={styles.rentalheader}> KLICKA HÄR FÖR ATT HYRA UT EN BOSTAD</h3>
        </div>
      }
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
    rentalbox: {
    maxWidth: '500px',
    background: '#eee',
    padding: '15px',
    margin: '40px auto',
    borderRadius: '8px',
    fontFamily: 'Quicksand',
    textAlign: 'center',
    ':hover': {
      opacity: '80%',
      cursor: 'pointer'
    }
  },
  rentalheader: {
    fontFamily: 'Quicksand',
    margin: '20px',
    color: 'grey',
    textAlign: 'center',
  },

  pictures: {
    resizeMode: 'contain',
    maxWidth: '40vh',
    borderRadius: '10px',
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
    textAlign: 'left',
  }
}

export default Radium(RentalList);
