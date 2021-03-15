import React, { useContext } from 'react'
import { AmenitiesContext } from '../contexts/AmenitiesContext'
import { useHistory } from 'react-router-dom'
import Radium from 'radium'

function Amenities(props) {
  let amenityList = []
  const { amenities } = useContext(AmenitiesContext)
  const history = useHistory()

  const amenityItem = amenity => (
    <div className="amenityItem" key={amenity._id} style={amenityItemStyle}>
      <input
        type="checkbox"
        value={amenity._id}
        onClick={() => {
          let index = amenityList.indexOf(amenity._id)
          console.log(index, 'index')
          if (index == -1) { amenityList.push(amenity._id) }
          else { amenityList.splice(index, 1) }
          console.log(amenityList, amenity.name,)
        }}
        style={checkBoxStyle}></input>
      <div style={{ float: 'left', paddingBottom: '10px' }}>
        <img style={{ height: '30px' }} src={amenity.iconUrl} alt={'picture ' + amenity._id} />
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
  justifyContent: 'center',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridGap: '25px'
}
const checkBoxStyle = {
  float: 'left',
  marginRight: '10px',
  marginTop: '7px',
  backGroundColor: 'black'
}

export default Radium(Amenities)