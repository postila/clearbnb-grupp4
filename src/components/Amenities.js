import React, { useContext, useState, useEffect } from 'react'
import { AmenitiesContext } from '../contexts/AmenitiesContext'
import Radium from 'radium'

function Amenities(props) {
  const { amenities } = useContext(AmenitiesContext)
  let [title, setTitle] = useState('')

  const handleChange = async (name) => {
    setTitle(name)
    await props.addToList(title)
    console.log(title, 'title')
  }

  const amenityItem = amenity => (
    <div className="amenityItem" key={amenity._id} style={amenityItemStyle}>
      <input
        type="checkbox"
        value={amenity.name}
        onClick={async e => handleChange(e.target.value)}
        style={checkBoxStyle}>

      </input>
      <div key="1" style={{ float: 'left', paddingBottom: '10px' }}>
        <img style={{ height: '30px' }} src={amenity.iconUrl} alt={'picture ' + amenity._id} />
      </div>

      <div key="2" style={{ float: 'left', paddingLeft: '10px' }}>
        <p>{amenity.name}</p>
      </div>

    </div>
  )
  return (
    <div key="3" className="amenitiesMap" style={amenitiesListStyle}>
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