import { useContext, useEffect } from 'react'
import { UserContext } from '../contexts/UserContextProvider'
import { AccommodationsContext } from '../contexts/AccommodationsContext'
import Radium from 'radium'
import { useHistory } from 'react-router-dom'

function RentalList() {
  const { accommodations, fetchAccommodations } = useContext(AccommodationsContext)
  const { userId } = useContext(UserContext)
  const history = useHistory()
  
  const rentalList = accommodations.filter(accommodation => accommodation.user).filter(accommodation => accommodation.user._id === userId)

  const goToRentalForm = () => {
    history.push('/Uthyrning')
  }
  
  useEffect(() => {
    fetchAccommodations()
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
        <h3 style={styles.title}>{accommodation.title}</h3>
        <p style={styles.textCity}>{accommodation.location.name}</p>
        <p>Max antal gäster {accommodation.maxGuests} | {Intl.NumberFormat("sv-SE", {
          style: "decimal",
          currency: "SEK"
        }).format(accommodation.pricePerNight)} SEK per natt</p>
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
  textCity: {
    fontFamily: 'Quicksand',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '1em',
    textTransform: 'uppercase',
    margin: '10px 5px',
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
    margin: '10px 5px 20px 5px',
    color: 'grey',
    '@media (max-width: 700px)': {
      textAlign: 'center',
      padding: '0',
      margin: '3px'
    }
  }
}

export default Radium(RentalList);
