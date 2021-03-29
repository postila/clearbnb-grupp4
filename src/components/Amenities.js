import React, { useContext } from 'react'
import { AmenitiesContext } from '../contexts/AmenitiesContext'
import { AccommodationsContext } from '../contexts/AccommodationsContext'
import Radium from 'radium'
import { useParams } from 'react-router'

function Amenities() {

  const { amenities } = useContext(AmenitiesContext)
  const { accommodations } = useContext(AccommodationsContext)
  const { id } = useParams()
  const accommodation = accommodations.find(a => a._id === id)

  let AmenitiesList = []

  if (accommodation.amenitiesList.map(a => a.washer).includes(true))  AmenitiesList.push(amenities.find(x => x.name === 'Tvättmaskin'))
  if (accommodation.amenitiesList.map(a => a.wifi).includes(true))  AmenitiesList.push(amenities.find(x => x.name === 'Wifi')) 
  if (accommodation.amenitiesList.map(a => a.essentials).includes(true))  AmenitiesList.push(amenities.find(x => x.name === 'Väsentligheter')) 
  if (accommodation.amenitiesList.map(a => a.kitchen).includes(true))  AmenitiesList.push(amenities.find(x => x.name === 'Kök')) 
  if (accommodation.amenitiesList.map(a => a.TV).includes(true))  AmenitiesList.push(amenities.find(x => x.name === 'TV')) 
  if (accommodation.amenitiesList.map(a => a.airConditioning).includes(true))  AmenitiesList.push(amenities.find(x => x.name === 'Luftkonditionering')) 
  if (accommodation.amenitiesList.map(a => a.iron).includes(true))  AmenitiesList.push(amenities.find(x => x.name === 'Strykjärn')) 
  if (accommodation.amenitiesList.map(a => a.safe).includes(true))  AmenitiesList.push(amenities.find(x => x.name === 'Låst skåp')) 
  
  const amenityItem = amenity => (
    <div
      className="amenityItem"
      key={amenity._id}
    >
      <img
        style={amenityItemStyle}
        src={amenity.iconUrl}
        alt={'picture ' + amenity._id}
      />
      <span style={{color: 'black'}}> {amenity.name}</span>
    </div>
  )
  
  return (
    <div key="3" className="amenitiesMap" style={amenitiesListStyle}>
      {AmenitiesList.map(amenity => amenityItem(amenity))}
    </div>
  )
}



const amenityItemStyle = {
  width: '25px',
  fontSize: '8px',
  
}
const amenitiesListStyle = {
  display: 'grid',
  color: 'white',
  justifyContent: 'center',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridGap: '25px',
  '@media (max-width: 1000px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '20px',
  }
}
const checkBoxStyle = {
  float: 'left',
  marginRight: '10px',
  marginTop: '7px',
  backGroundColor: 'black'
}

export default Radium(Amenities)