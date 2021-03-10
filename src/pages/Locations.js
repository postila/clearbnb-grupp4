import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AccommodationsContext } from '../contexts/AccommodationsContext'

const Locations = () => {
  const { accommodations } = useContext(AccommodationsContext)
  const { id } = useParams()
  accommodations.find(a => a._id === id)

  const card = accommodation => ( 
    <div
      className="card"
      key={accommodation._id}
    >
      <h1>{ accommodation.location }</h1>
    </div>
  )

  return (
    <div>
      {accommodations.map(accommodation => card(accommodation))}
    </div >
  );
}

export default Locations;