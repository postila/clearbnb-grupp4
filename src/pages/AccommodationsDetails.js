import React, { useContext, useState, useEffect } from 'react';
import { AccommodationsContext } from '../contexts/AccommodationsContext'
import { LocationContext } from '../contexts/locationContextProvider'
import { useParams, useHistory } from 'react-router-dom';

import Radium from 'radium'


const AccommodationsDetails = () => {
  const { accommodations } = useContext(AccommodationsContext)
  const { locations } = useContext(LocationContext)
  const { id } = useParams()
  const history = useHistory()
  
  let accommodation = accommodations.find(accommodation => accommodation._id === id)
    
  const [item, setItem] = useState(accommodation)

  useEffect(() => {
    setItem(accommodation)
  }, [item])

  const goBack = () => {
    history.go(-1)
  }


  return (
    <div style={styles.box}>
      { accommodation &&
        <div>
          <img style={styles.img} src={ accommodation.imageUrl } />
          <h1>{ accommodation.title }</h1>
          <p>Antal gäster: { accommodation.maxGuest }</p>
          <p>Ort: { locations.find(location => location._id = accommodation.location).name }</p>
          <p>Pris per natt: { accommodation.pricePerNight }</p>
            <div className="description-content">
              <h4>Beskrivning:</h4>
              <p>{ accommodation.description }</p>
            </div>
        </div> }
      { !accommodation &&
        <div>
          <h3>Accommodation not found</h3>
          <button onClick={goBack}>Tillbaka</button>
        </div>
      }
    </div>
  );
}

const styles = {
  box: {
    display: 'inline-block',
    maxWidth: '800px',
    color: 'white'
  },
  img: {
    maxWidth: '50vw',
    margin: '50px',
    borderRadius: '10px',
    boxShadow: '1px 1px 10px 10px #202329'
  }
}
 
export default Radium(AccommodationsDetails);