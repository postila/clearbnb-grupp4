import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AccommodationsContext } from '../contexts/AccommodationsContext'

const Locations = () => {
  const { accommodations } = useContext(AccommodationsContext)
  const { id } = useParams()
  console.log(id + ' im ID hey')
  const accommodationList = accommodations.filter(a => a.location === id)
  console.log(accommodationList)


  const card = accommodation => (
    <div
      className="card"
      key={accommodation._id}
    >
      <h1>{accommodation.location}</h1>
    </div>
  )

  return (
    <div>
      {accommodationList.map(accommodation => card(accommodation))}
    </div >
  );
}

export default Locations;