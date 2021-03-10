import React, { useContext } from 'react';
import { AccommodationsContext } from '../contexts/AccommodationsContext'
import { useParams } from 'react-router-dom';
import Radium from 'radium'
import Amenities from '../components/Amenities'


const AccommodationsDetails = (props) => {
  const { accommodations } = useContext(AccommodationsContext)
  const { id } = useParams()
  const accommodation = accommodations.find(accommodation => accommodation._id === id)
  console.log({ id }, 'id från detaljsida');
  // const accommodationItem = () => {
  //   accommodations.filter(accommodation => accommodation._id === id)
  // }

  return (
    <div>
      <h1>Details Page</h1>
      <h1>{accommodation.title}</h1>
      <div>
        <Amenities></Amenities>
      </div>

    </div>

  );
}

export default AccommodationsDetails;