import React, { useContext, useState, useEffect } from 'react';
import { AccommodationsContext } from '../contexts/AccommodationsContext'
import { useParams, useHistory } from 'react-router-dom';
import Radium from 'radium'
import Amenities from '../components/Amenities'
import BookingForm from '../components/BookingForm';

const AccommodationsDetails = () => {
  const { accommodations } = useContext(AccommodationsContext)
  const { id } = useParams()
  const history = useHistory()
  
  let accommodation = accommodations.find(accommodation => accommodation._id === id)

    
  const [item, setItem] = useState(accommodation)

  useEffect(() => {
    setItem(accommodation)
    console.log(item, 'item från detailj');
  }, [item])

  const goBack = () => {
    history.go(-1)
  }

  return (
    <div style={styles.box} key="1">
      { accommodation &&
        <div>
        <img style={styles.img} key="2" src={accommodation.imageUrl} alt={'picture ' + id } />
          <h1>{ accommodation.title }</h1>
          <p>Antal gäster: { accommodation.maxGuest }</p>
          <p>Ort: { accommodation.location.name }</p>
          <p>Pris per natt: { accommodation.pricePerNight }</p>
            <div className="description-content">
              <h4>Beskrivning:</h4>
              <p>{ accommodation.description }</p>
          </div>
        <Amenities />
        <BookingForm accommodation={item} />
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
    // display: 'inline-block',
    margin: '0 auto',
    maxWidth: '800px',
    color: 'white'
  },
  img: {
    maxWidth: '50vw',
    marginTop: '50px',
    borderRadius: '10px',
    boxShadow: '1px 1px 10px 10px #202329'
  }
}
 
export default Radium(AccommodationsDetails);
