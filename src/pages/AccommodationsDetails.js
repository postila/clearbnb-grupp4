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

  let locationName = locations.find(location => location._id === accommodation.location).name
    
  const [item, setItem] = useState(accommodation)

  useEffect(() => {
    setItem(accommodation)
  }, [item])

  const goBack = () => {
    history.go(-1)
  }

  // locations.find(location => location._id = accommodation.location).name

  return (
    <div style={styles.box} key="1">
      { accommodation &&
        <div>
        <img style={styles.img} key="2" src={accommodation.imageUrl} alt={'picture ' + id } />
          <h1>{ accommodation.title }</h1>
          <p>Antal gäster: { accommodation.maxGuest }</p>
          <p>Ort: { locationName }</p>
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