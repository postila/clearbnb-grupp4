import React, { useRef, useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { AccommodationsContext } from '../contexts/AccommodationsContext'
import Radium from 'radium'
import { LocationContext } from '../contexts/locationContextProvider'

const Locations = () => {
  const { accommodations } = useContext(AccommodationsContext)
  const { locations } = useContext(LocationContext)
  const { id } = useParams()
  const [selectedLocation, setSelectedLocation] = useState(id)
  const location = useRef()
  const history = useHistory()
  const [maxGuests, setMaxGuests] = useState()

  async function handleChange(data) {
    await setSelectedLocation(data)
    await history.push('/Platser/' + data)
    console.log(data)
  }


  const goToDetailsPage = (id) => {
    history.push('/accommodationDetails/' + id)
  }
  let [accommodationList, setAccommodationList] = useState([...accommodations])


  const card = accommodation =>

  (
    <div
      style={styles.box}
      className="card"
      key={accommodation._id}
      onClick={() => goToDetailsPage(accommodation._id)}
    >
      <img style={styles.pictures} src={accommodation.imageUrl} alt={'picture' + accommodation._id} />
      <div style={styles.text}>
        <h3>{accommodation.title}</h3>
        <p>Max antal gäster {accommodation.maxGuests} | {accommodation.pricePerNight} SEK</p>
        <p>{accommodation.location.name}</p>
      </div>
    </div>
  )



  useEffect(() => {
    console.log(maxGuests, 'hej')
    console.log(id, 'id')
    if (id) setAccommodationList([accommodationList.filter(a => a.location._id === selectedLocation)])
    if (maxGuests) setAccommodationList([accommodationList.filter(a => a.maxGuests >= maxGuests)])
  }, [maxGuests, id, selectedLocation])


  const locationItem = location => (
    <option
      onChange={data => setSelectedLocation(data)}
      value={location._id}> {location.name}</option>
  )

  


  return (
    <div>
      <form key="1">
        <select
          key="2"
          required ref={location}
          style={styles.input}
          value={selectedLocation}
          options={locations}
          onChange={e => handleChange(e.target.value)}
        >

          <option value="" disabled selected>Välj Ort</option>
          {locations.map(location => locationItem(location))}

        </select>
        {/* <h1>{selectedLocation}</h1> */}
        {/* <select
          key="3"
          required ref={accommodation}
          style={styles.input}>
          {accommodations.map(accommodation => accommodationPrice(accommodation))}
        </select>*/}
        {/* <select
          key="4"
          required ref={accommodations}
          style={styles.input}
          value={selectedMaxGuests}
          options={accommodations.maxGuests}
          onChange={e => handleChange(e.target.value)}>
          {accommodations.map(accommodation => guests(accommodation))}
        </select> */}
        <input
          key="5"
          style={styles.input}
          value={maxGuests}
          onChange={e => setMaxGuests(e.target.value)}
          type="number"
          min="1"
          placeholder='Max antal gäster'
        ></input>
      </form>
      {accommodationList.map(accommodation => card(accommodation))}
    </div>
  );
}

const styles = {
  box: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '20px',
    maxWidth: '800px',
    background: '#eee',
    padding: '15px',
    margin: '40px auto',
    borderRadius: '8px',
    ':hover': {
      opacity: '80%',
      cursor: 'pointer'
    }
  },

  pictures: {
    resizeMode: 'contain',
    maxWidth: '40vh',
    borderRadius: '10px',
    //boxShadow: '1px 1px 10px 0.5px #343841'
  },

  text: {
    fontFamily: 'Quicksand',
    textAlign: 'left',
    fontSize: '20px',
    color: 'grey'
  },

  header: {
    fontFamily: 'Quicksand',
    margin: '50px',
    color: 'grey',
  },
  input: {
    height: '30px',
    width: '250px',
    background: '#eee',
    fontFamily: 'Quicksand',
    borderRadius: '10px',
    border: 'none',
    margin: '5vh 0 0 0'
  }
}

export default Radium(Locations);