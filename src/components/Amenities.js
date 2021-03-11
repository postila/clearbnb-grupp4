import React, { useContext } from 'react'
import { AmenitiesContext } from '../contexts/AmenitiesContext'
import Radium from 'radium'

function Amenities() {
  const { amenities } = useContext(AmenitiesContext)
  const amenityItem = amenity => (
    <div className="amenityItem" key={amenity._id} style={amenityItemStyle}>
      <div style={{float: 'left', paddingBottom: '10px'}}>
        <img style={{ height: '30px'}} src={amenity.iconUrl} alt={'picture ' + amenity._id} />
      </div>

      <div style={{ float: 'left', paddingLeft: '10px' }}>
        <p>{amenity.name}</p>
      </div>

    </div>
  )
  return (
    <div className="amenitiesMap" style={amenitiesListStyle}>
      {amenities.map(amenity => amenityItem(amenity))}
    </div>
  )
}
const amenityItemStyle = {
  width: '150px',
  fontSize: '10px'
}
const amenitiesListStyle = {
  display: 'grid',
  color: 'white',
  justifyContent: 'center'
}


export default Radium(Amenities)