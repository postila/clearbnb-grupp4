import React, { useContext } from 'react'
import { AmenitiesContext } from '../contexts/AmenitiesContext'
import { useHistory } from 'react-router-dom'
import Radium from 'radium'

function Amenities() {
  const { amenities } = useContext(AmenitiesContext)
  const history = useHistory()
  const amenityItem = amenity => (
    <div
      className="amenityItem"
      key={amenity._id}
      style={amenityStyle}

    >
      <img style={{
        height: '150px'
      }}
        src={amenity.iconUrl}
        alt={'picture ' + amenity._id}
      />
      <h3>{amenity.name}</h3>

    </div>
  )
  return (
    <div style={testListStyle}>
      {amenities.map(amenity => amenityItem(amenity))}
    </div>
  )
}
const amenityStyle = {
  backgroundColor: 'red'
}
const testListStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridGap: '10px',
  color: 'white'
  //justifyContent: 'space-between',
  //flexWrap: 'wrap',
  //width: '100%'
}


export default Radium(Amenities)