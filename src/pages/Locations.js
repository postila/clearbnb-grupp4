import React, { useContext } from 'react';
import { AccommodationsContext } from '../contexts/AccommodationsContext'

const Locations = () => {
  const { accommodations } = useContext(AccommodationsContext)

  const card = accommodation => (
    <div
      className="card"
      key={accommodation._id}
    >
      <h1>{ accommodation.title }</h1>
    </div>
  )

  return (
    <div>
      {accommodations.map(accommodation => card(accommodation))}
    </div >
  );
}

export default Locations;