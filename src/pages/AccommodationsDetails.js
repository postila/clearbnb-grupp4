import React, { useContext, useState, useEffect } from 'react';
import { AccommodationsContext } from '../contexts/AccommodationsContext'
import { useParams, useHistory } from 'react-router-dom';
import Radium from 'radium'
import BookingForm from '../components/BookingForm';
import BookingDates from '../components/BookingDates';

const AccommodationsDetails = () => {
  const { accommodations } = useContext(AccommodationsContext)
  const { id } = useParams()
  const history = useHistory()

  let accommodation = accommodations.find(accommodation => accommodation._id === id)

  const [item, setItem] = useState(accommodation)

  useEffect(() => {
    setItem(accommodation)
  }, [item, accommodation])

  const goBack = () => {
    history.go(-1)
  }

  return (

    <div style={styles.box} key="1">
      { accommodation &&
        <div>
        <img style={styles.img} key="2" src={accommodation.imageUrl} alt={'picture ' + id} />
        <div style={styles.infoContainer} key="3">
          <h1>{accommodation.title}</h1>
          <p>Max antal gäster: {accommodation.maxGuests}</p>
          <p>Ort: {accommodation.location.name}</p>
          <p>Pris per natt: {accommodation.pricePerNight} SEK</p>
          <div className="description-content">
            <h4>Beskrivning:</h4>
            <p>{accommodation.description}</p>
          </div>
        </div>
        <div style={styles.infoContainer} key="4">
            <h4>Bekvämligheter:</h4>
            {accommodation.amenitiesList.map((a) => (
              <div key={a._id}>
                {a.washer ? 'Tvättmaskin, ' : ''} {a.wifi ? 'WiFi, ' : ''} {a.essentials ? 'Väsentligheter, ' : ''} {a.kitchen ? 'Kök, ' : ''} {a.TV ? 'TV, ' : ''} {a.airConditioning ? 'Luftkonditionering, ' : ''} {a.iron ? 'Strykjärn, ' : ''} {a.safe ? 'Låst Skåp, ' : ''}
              </div>
            ))}
        </div>
        <BookingDates/>
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
    fontFamily: 'Quicksand',
    margin: '0 auto',
    maxWidth: '800px',
    color: 'grey',
    textAlign: 'center',
    paddingTop: '1vh'
  },
  infoContainer: {
    textAlign: 'left',
    paddingTop: '2vh',
  },
  img: {
    maxWidth: '600px',
    marginTop: '50px',
    borderRadius: '10px',
    boxShadow: '1px 1px 10px 10px #202329'
  }
}

export default Radium(AccommodationsDetails);
