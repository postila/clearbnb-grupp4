import Radium from 'radium'
import React from 'react'
import { useRef, useContext, useState } from 'react'
import Amenities from '../components/Amenities'
import { AccommodationsContext } from '../contexts/AccommodationsContext'
import { LocationContext } from '../contexts/locationContextProvider'
import AmenitiesContext from '../contexts/AmenitiesContext'
import { useHistory } from 'react-router-dom'

function CreateRentingForm() {
  const { addAccommodation } = useContext(AccommodationsContext)
  //const history = useHistory()
  // const { addRentingForm } = useContext(AmenitiesContext)

  const title = useRef()
  const location = useRef()
  const description = useRef()
  const maxGuests = useRef()
  const pricePerNight = useRef()
  const imageUrl = useRef()
  const Tvättmaskin = useRef()
  const WiFi = useRef()
  const Väsentligheter = useRef()
  const Kök = useRef()
  const TV = useRef()
  const Luftkonditionering = useRef()
  const Strykjärn = useRef()
  const LåstSkåp = useRef()
  const [aList, addAList] = useState([])

  const createRentingForm = async e => {
    e.preventDefault()

    const rentingForm = {
      title: title.current.value,
      location: location.current.value,
      description: description.current.value,
      maxGuests: maxGuests.current.value,
      pricePerNight: pricePerNight.current.value,
      imageUrl: imageUrl.current.value,
      amenitiesList: {
        Tvättmaskin: Tvättmaskin.current.checked,
        WiFi: WiFi.current.checked,
        Väsentligheter: Väsentligheter.current.checked,
        Kök: Kök.current.checked,
        TV: TV.current.checked,
        Luftkonditionering: Luftkonditionering.current.checked,
        Strykjärn: Strykjärn.current.checked,
        LåstSkåp: LåstSkåp.current.checked
      }
    }
    console.log(rentingForm)
    await addAccommodation(rentingForm)

    // addRentingForm(rentingForm)

    //history.push('/AccommodationDetails/' + .id)

    title.current.value = ''
    location.current.value = ''
    description.current.value = ''
    imageUrl.current.value = ''
    maxGuests.current.value = ''
    pricePerNight.current.value = ''
    Tvättmaskin.current.value = ''
    WiFi.current.value = ''
    Väsentligheter.current.value = ''
    Kök.current.value = ''
    TV.current.value = ''
    Luftkonditionering.current.value = ''
    Strykjärn.current.value = ''
    LåstSkåp.current.value = ''

  }

  const { locations } = useContext(LocationContext)

  const locationItem = location => (

    <option value={location._id}> {location.name}</option>

  )

  //const RentingForm = (props) => {

  return (
    <form key="1" style={styles.form} onSubmit={createRentingForm}>

      <h1 style={{ color: '#839cc1' }}>Uthyrningsformulär</h1>

      <label style={styles.label} form="rentingform">Titel (max 80 tecken)</label>
      <input key="2" required ref={title} style={styles.input}
        form="rentingform" type="text" placeholder="Mysig stuga" required></input>

      <label style={styles.label} form="rentingform">Ort</label>

      <select key="3" required ref={location} style={styles.input}
        form="rentingform" required>

        {locations.map(location => locationItem(location))}

      </select>

      <label style={styles.label} form="rentingform">Beskrivning (max 500 tecken)</label>
      <textarea style={styles.description} required ref={description}
        form="rentingform" maxLength="500" type="text" placeholder="..." required></textarea>

      <label style={styles.label} form="rentingform">Bild</label>
      <input key="4" style={styles.input} required ref={imageUrl}
        form="rentingform" type="text" placeholder="http://din.url.här" required></input>

      <div style={styles.date_container} >
        <label style={styles.label} form="rentingform">Max antal gäster</label>
        <input key="5" style={styles.date} required ref={maxGuests}
          form="rentingform" type="number" placeholder="8" required></input>

        <label style={styles.label} form="rentingform">Pris per natt</label>
        <input key="6" style={styles.date} required ref={pricePerNight}
          form="rentingform" type="text" placeholder="500" required></input>
      </div>

      <h3 style={{ color: '#839cc1' }}>Bekvämligheter</h3>

      <br></br>


      <div style={styles.temp}>
        <div style={styles.checkBox}>
          <input key="a1" style={styles.input}
            form="rentingform" type="checkbox" required ref={Tvättmaskin} value="Tvättmaskin" ></input>
          <label style={styles.label} form="rentingform">Tvättmaskin</label>
        </div>

        <div style={styles.checkBox}>
          <input key="a2" style={styles.input}
            form="rentingform" type="checkbox" required ref={WiFi} value="WiFi" ></input>
          <label style={styles.label} form="rentingform">WiFi</label>
        </div>

        <div style={styles.checkBox}>
          <input key="a3" style={styles.input}
            form="rentingform" type="checkbox" required ref={Väsentligheter} value="Väsentligheter" ></input>
          <label style={styles.label} form="rentingform">Väsentligheter</label>
        </div>

        <div style={styles.checkBox}>
          <input key="a4" style={styles.input}
            form="rentingform" type="checkbox" required ref={Kök} value="Kök" ></input>
          <label style={styles.label} form="rentingform">Kök</label>
        </div>

        <div style={styles.checkBox}>
          <input key="a5" style={styles.input}
            form="rentingform" type="checkbox" required ref={TV} value="TV" ></input>
          <label style={styles.label} form="rentingform">TV</label>
        </div>

        <div style={styles.checkBox}>
          <input key="a6" style={styles.input}
            form="rentingform" type="checkbox" required ref={Luftkonditionering} value="Luftkonditionering" ></input>
          <label style={styles.label} form="rentingform">Luftkonditionering</label>
        </div>

        <div style={styles.checkBox}>
          <input key="a7" style={styles.input}
            form="rentingform" type="checkbox" required ref={Strykjärn} value="Strykjärn" ></input>
          <label style={styles.label} form="rentingform">Strykjärn</label>
        </div>

        <div style={styles.checkBox}>
          <input key="a8" style={styles.input}
            form="rentingform" type="checkbox" required ref={LåstSkåp} value="Låst skåp" ></input>
          <label style={styles.label} form="rentingform">Låst skåp</label>
        </div>

      </div>


      <div style={styles.buttons_container}>
        <button
          style={styles.button}
          key="7"
        >Färdig</button>

      </div>
    </form>
  )
}

const styles = {
  form: {
    display: 'grid',
    gridGap: '3px',
    maxWidth: '500px',
    margin: '20px auto',
    textAlign: 'left',
    padding: '10px'
  },

  temp: {
    display: 'grid',
    color: 'white',
    justifyContent: 'center',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '25px',
  },

  input: {
    textAlign: 'left',
    height: '50px',
    borderRadius: '7px',
    ':focus': {
      outline: 'none'
    }
  },

  date_container: {
    textAlign: 'center',
    height: '50px',
    width: '100%',
    marginTop: '10px',
    marginBottom: '40px'
  },

  date: {
    textAlign: 'center',
    height: '50px',
    width: '90px',
    borderRadius: '7px',
    margin: '10px 20px 0px 20px',
    ':focus': {
      outline: 'none'
    }
  },

  label: {
    textAlign: 'left',
    verticalAlign: 'text-bottom',
    lineHeight: '10px',
    color: 'white',
    paddingTop: '20px',
    paddingBottom: '10px',
  },

  description: {
    textAlign: 'left',
    height: '100px',
    verticalAlign: 'text-top',
    resize: 'none',
    ':focus': {
      outline: 'none'
    }
  },

  buttons_container: {
    textAlign: 'center',
    height: '100px',
    verticalAlign: 'text-top',
    width: '100%',
  },

  button: {
    width: '120px',
    marginTop: '10px',
    marginLeft: '10px',
    cursor: 'pointer',
    border: 'none',
    padding: '10px',
    borderRadius: '7px',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#596982'
  },

  register: {
    cursor: 'pointer',
    fontSize: '10px',
    textTransform: 'uppercase',
    ':hover': {
      opacity: '50%'
    }
  },
  checkBox: {
    float: 'left',
    marginTop: '10px',
    marginRight: '7px'
  }
}

export default Radium(CreateRentingForm)