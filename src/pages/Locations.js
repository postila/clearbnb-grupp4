import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { AccommodationsContext } from '../contexts/AccommodationsContext'
import { LocationContext } from '../contexts/locationContextProvider'
import Radium from 'radium'

const Locations = () => {
  const { accommodations } = useContext(AccommodationsContext)
  const { locations } = useContext(LocationContext)
  
  const history = useHistory()
  
  const goToDetailsPage = (id) => {
    history.push('/accommodationDetails/' + id)
  }
  const { id } = useParams()
  const accommodationList = id ? accommodations.filter(a => a.location === id) : accommodations
  
  const card = accommodation => 
    (
      <div
        style={styles.box}
        className="card"
        key={accommodation._id}
        onClick={() => goToDetailsPage(accommodation._id)}
      >
        <img style={styles.pictures} src={accommodation.imageUrl} />
        <div style={styles.text}>
          <h3>{accommodation.title}</h3>
          <p>Gäster {accommodation.maxGuest} | {accommodation.pricePerNight} SEK</p>
          <p>{ locations.find(location => location._id === accommodation.location).name }</p>
        </div>
      </div>
      )

  return (
    <div>
      {accommodationList.map(accommodation => card(accommodation))}
    </div>
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