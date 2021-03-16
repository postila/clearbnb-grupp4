import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { AccommodationsContext } from '../contexts/AccommodationsContext'
import Radium from 'radium'

const Locations = () => {
  const { accommodations } = useContext(AccommodationsContext)
  
  const history = useHistory()
  
  const goToDetailsPage = (id) => {
    history.push('/accommodationDetails/' + id)
  }
  const { id } = useParams()
  const accommodationList = id ? accommodations.filter(a => a.location._id === id) : accommodations
  const card = accommodation => 
  (
    <div
    style={ styles.box }
    className="card"
    key={ accommodation._id }
    onClick={() => goToDetailsPage(accommodation._id)}
    >
        <img style={ styles.pictures } src={ accommodation.imageUrl } alt={'picture' + accommodation._id} />
        <div style={ styles.text }>
          <h3>{ accommodation.title }</h3>
          <p>Max antal gäster {accommodation.maxGuests} | { accommodation.pricePerNight } SEK</p>
          <p>{ accommodation.location.name }</p>
        </div>
      </div>
  )
  
  return (
    <div>
      { accommodationList.map(accommodation => card(accommodation)) }
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

export default Radium(Locations);