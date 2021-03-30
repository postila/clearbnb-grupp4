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
  const [maxCost, setMaxCost] = useState()
  let accommodationList = accommodations
  const [filteredAccommodationList, setFilteredAccommodationList] = useState(accommodationList)
  const [isId, setIsId] = useState(false)

  async function handleChange(data) {
    await setSelectedLocation(data)
    await history.push('/Platser/' + data)
    setIsId(!isId)
  }


  const goToDetailsPage = (id) => {
    history.push('/accommodationDetails/' + id)
  }



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
        <h3 className="list-title">{accommodation.title}</h3>
        <p style={styles.textCity}>{accommodation.location.name}</p>
        <p style={styles.text}>Pris per natt <span style={styles.bold}> · {Intl.NumberFormat("sv-SE", {
          style: "decimal",
          currency: "SEK"
        }).format(accommodation.pricePerNight)} SEK</span></p>
        <p style={styles.text}>Max gäster <span style={styles.bold}> · {accommodation.maxGuests} st
        </span></p>
      </div>
    </div>
  )



  useEffect(() => {

    if (id) {
      accommodationList = accommodationList.filter(a => a.location._id === selectedLocation)
      setFilteredAccommodationList(accommodationList)
    }

    if (maxGuests) {
      accommodationList = accommodationList.filter(a => a.maxGuests >= maxGuests)
      setFilteredAccommodationList(accommodationList)
    }

    if (maxCost) {
      accommodationList = accommodationList.filter(a => a.pricePerNight <= maxCost)
      setFilteredAccommodationList(accommodationList)
    }

    if (!id && !maxGuests && !maxCost) {
      setFilteredAccommodationList(accommodations)
    }
  }, [id, maxGuests, maxCost, selectedLocation, accommodations, accommodationList])

  useEffect(() => {
    if (!id && isId) {
      setSelectedLocation('')
      setMaxGuests('')
      setMaxCost('')
      setIsId(false)
    }
  }, [isId, id])


  const locationItem = location => (
    <option
      key={location._id}
      onChange={data => setSelectedLocation(data)}
      value={location._id}> {location.name}</option>
  )

  return (
    <div>
      <form key="1" style={styles.inputWrapper}>
        <select
          key="2"
          required ref={location}
          style={styles.input}
          value={selectedLocation}
          options={locations}
          onChange={e => handleChange(e.target.value)}
        >
          <option key="a" disabled selected>Välj Ort</option>
          {locations.map(location => locationItem(location))}
        </select>

        <input
          key="3"
          style={styles.input}
          value={maxGuests}
          onChange={e => setMaxGuests(e.target.value)}
          type="number"
          min="1"
          placeholder='Minst antal gäster'
        ></input>

        <input
          key="4"
          style={styles.input}
          value={maxCost}
          onChange={e => setMaxCost(e.target.value)}
          type="number"
          min="0"
          placeholder='Max kostnad'
          ></input>
      </form>
      {filteredAccommodationList.map(accommodation => card(accommodation))}


    </div>
  );
}

const styles = {
  box: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '20px',
    width: '90vw',
    background: '#eee',
    padding: '15px',
    margin: '20px auto',
    borderRadius: '8px',
    ':hover': {
      opacity: '80%',
      cursor: 'pointer'
    },
    '@media (min-width: 1000px)': {
      width: '800px',
    },
    '@media (max-width: 700px)': {
      gridTemplateColumns: '1fr',
      justifyContent: 'center',
      gridGap: '0'
    }
  },

  pictures: {
    borderRadius: '10px',
    maxWidth: '400px',
    margin: '0 auto',
    '@media (min-width: 900px)': {
    },
    '@media (max-width: 700px)': {
      gridTemplateColumns: '1fr',
      justifyContent: 'center',
      width: '85vw',
      height: '37vh',
    },
    '@media (max-width: 400px)': {
      gridTemplateColumns: '1fr',
      justifyContent: 'center',
      width: '80vw',
      height: '27vh',
    }
  },

  text: {
    fontFamily: 'Quicksand',
    textAlign: 'left',
    fontSize: '1.2em',
    color: 'grey',
    padding: '0',
    margin: '5px',
    opacity: '90%',
    '@media (max-width: 700px)': {
      fontSize: '1em',
      textAlign: 'center',
    }
  },
  textCity: {
    fontFamily: 'Quicksand',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '1.1em',
    textTransform: 'uppercase',
    margin: '10px 5px',
    color: 'grey',
    '@media (max-width: 700px)': {
      textAlign: 'center',
      padding: '0',
      margin: '3px'
    }
  },
  bold: {
    fontWeight: 'bold'
  },

  header: {
    fontFamily: 'Quicksand',
    margin: '50px',
    color: 'grey',
  },

  input: {
    height: '40px',
    width: 'fitContent',
    background: '#eee',
    fontFamily: 'Quicksand',
    borderRadius: '10px',
    border: 'none',
    margin: '15px 10px 15px 10px',
    paddingLeft: '25px',
    justifyContent: 'center',
    '@media (max-width: 900px)': {
      width: '70vw',
      justifyContent: 'center',
      margin: '5px auto',
      height: '40px'
    }
  },
  inputWrapper: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      width: '80vw',
      maxWidth: '800px',
      margin: '2vh auto',
      justifyContent: 'fitContent',
      '@media (max-width: 900px)': {
        display: 'grid',
        gridTemplateColumns: '1fr',
        width: '75vw',
        justifyContent: 'center',
        margin: '3vh auto'
      },
    }
}

export default Radium(Locations);