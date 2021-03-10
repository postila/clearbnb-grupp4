import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AccommodationsContext } from '../contexts/AccommodationsContext'
import Radium from 'radium'
import { useHistory } from 'react-router-dom'

const Locations = () => {
  const { accommodations } = useContext(AccommodationsContext)
  const history = useHistory()

  const goToDetailsPage = (id) => {
    history.push('/AccommodationDetails/' + id)
  }
  const { id } = useParams()
  console.log(id + ' im ID hey')
  const accommodationList = accommodations.filter(a => a.location === id)
  console.log(accommodationList)


  const card = accommodation => (
    <div
      style={styles.box}
      className="card"
      key={accommodation._id}
      onClick={() =>  goToDetailsPage (accommodation._id)}
    >
      <img style={styles.pictures} src={accommodation.imageUrl} />
      <div style={styles.text}>
        <h3>{ accommodation.title }</h3>
        <p>Gäster {accommodation.maxGuest} | {accommodation.pricePerNight} SEK</p>
      </div>
    </div>
  )

  return (
    <div>
      {accommodationList.map(accommodation => card(accommodation))}
    </div >
  );
}

const styles = {
  box: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '20px',
    maxWidth: '800px',
    background: '#202329',
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
    textAlign: 'left',
    color: 'white'
  }
}

export default Radium(Locations);