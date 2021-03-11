import React, { useContext } from 'react'
import { AmenitiesContext } from '../contexts/AmenitiesContext'
import { useHistory } from 'react-router-dom'
import Radium from 'radium'

function Amenities() {
  const { amenities } = useContext(AmenitiesContext)
  const history = useHistory()
  const amenityItem = amenity => (
    <div className="amenityItem" key={amenity._id} style={amenityItemStyle}>
      <input
      type="checkbox"
      value={amenity._id}
      style={checkBoxStyle}></input>
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
const checkBoxStyle = {
  float: 'left',
  marginRight: '10px',
}


export default Radium(Amenities)