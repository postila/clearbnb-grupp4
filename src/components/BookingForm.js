import React, { useState, useContext, useRef, useEffect } from 'react';
import Radium from 'radium'
import { BookingContext } from '../contexts/BookingContextProvider';
import DatePicker from "react-datepicker";
import { useHistory, useParams } from 'react-router-dom'
import { UserContext } from '../contexts/UserContextProvider';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const BookingForm = (props) => {
  const [open, setOpen] = React.useState(false);
  const { user } = useContext(UserContext)
  const { id } = useParams()
  const classes = useStyles();
  const history = useHistory()

  const { addBooking, bookings } = useContext(BookingContext)
  const [accommodation, setAccommodation] = useState(null)
  const [accommodationPrice, setAccommodationPrice] = useState(null)
  const [price, setPrice] = useState()
  const [singelton, setSingelton] = useState(0)
  const guests = useRef()

  const dayInMilliSec = 86400000;
  const today = new Date(new Date().toDateString()).getTime()

  const [minDate, setMindate] = useState(today)
  const [maxDate, setMaxDate] = useState(null)
  const [arrDate, setArrDate] = useState(null)
  const [depDate, setDepDate] = useState()

  const bookingsList = bookings.filter(booking => booking.accommodation).filter(booking => booking.accommodation._id === id)
  const [dates, setDates] = useState([])
  let [allDates, setAllDates] = useState([])

  // Modal after booking is placed
  const body = (
    <div style={styles.modalContainer}>
      <div className={classes.paper}>
        <h2 id="simple-modal-title">Din bokning är lagd ✔️</h2>
        <Button className="modal-button" style={buttonStyle} onClick={() => { history.push('/Mina-sidor'); handleClose() }}>Gå till mina bokningar</Button>
      </div>
    </div>
  );

  const createAllDatesList = () => {

    // Adding startDate and endDate to dates
    for (let date of bookingsList) {
      date.startDate = new Date(new Date(date.startDate).toDateString()).getTime()
      date.endDate = new Date(new Date(date.endDate).toDateString()).getTime()
      if (date.endDate >= today && (!dates.includes(date.startDate) || !dates.includes(date.endDate))) {
        setDates([...dates, date.startDate, date.endDate])
      }
    }

    // Adding all dates between startDate and endDate to allDates
    for (let i = 0; i < dates.length - 1; i += 2) {
      while (dates[i] < dates[i + 1]) {
        if (!allDates.includes(dates[i]) && dates[i] >= today) {
          setAllDates([...allDates, dates[i]])
        }
        dates[i] = new Date(new Date(dates[i] + dayInMilliSec).toDateString()).getTime()
      }
      if (!allDates.includes(dates[i + 1]))
        setAllDates([...allDates, dates[i + 1]])
    }
    allDates = allDates.sort((a, b) => a > b ? 1 : -1)

    // isTodayBooked returns the earliest date that is available for booking
    if(props.accommodation.startDate < today)setMindate(isTodayBooked())
  }

  const isTodayBooked = () => {
    let date = today
    if (allDates.includes(today)) {
      while (allDates.includes(date)) {
        date = new Date(new Date(date + dayInMilliSec).toDateString()).getTime()
      }
    }
    return date
  }

  const checkAndSetMaxDate = data => {
    setArrDate(data)
    setDepDate(null)

    for (let date of allDates) {
      if (date > data) {
        setMaxDate(date)
        return
      }
    }
    setMaxDate(accommodation.endDate)
  }

  const createBooking = async e => {
    e.preventDefault()
    const booking = {
      user: user._id,
      accommodation: accommodation._id,
      startDate: arrDate.getTime(),
      endDate: depDate.getTime(),
      guests: guests.current.value,
    }

    if (arrDate < depDate) {
      await addBooking(booking)
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (arrDate && depDate) {
      setPrice(Math.ceil((new Date(depDate).getTime() - new Date(arrDate).getTime()) / dayInMilliSec) * accommodationPrice)
    }
    else setPrice(0)
    if (new Date(arrDate).getTime() === new Date(depDate).getTime()) {
      setDepDate(null)
    }
  }, [arrDate, depDate, price, accommodationPrice])

  useEffect(() => {
    if (props.accommodation && singelton === 0) {
      setAccommodation(props.accommodation)
      setAccommodationPrice(props.accommodation.pricePerNight)
      if (props.accommodation.startDate > today) {
        setMindate(props.accommodation.startDate)
      }
      setMaxDate(props.accommodation.endDate)
      setSingelton(1)
    }
    if (bookingsList && props.accommodation) {
      createAllDatesList()
    }
  }, [props.accommodation, bookingsList, singelton, today])

  return (
    <div>
      {accommodation &&
        <form onSubmit={createBooking}>
          <div style={styles.guestContainer}>
            Antal gäster
        <input
              type="number"
              ref={guests}
              max={accommodation.maxGuests}
              min="1"
              style={styles.input}
              required />
            <br />
          </div>
          <div style={styles.dateContainer}>
            <div key="d1" style={styles.datePicker}>
              <p>Startdatum</p>
              <DatePicker
                className='datePicker'
                dateFormat="yyyy/MM/dd"
                placeholderText="Ankomst"
                selected={arrDate}
                onChange={(data) => checkAndSetMaxDate(data)}
                minDate={minDate}
                maxDate={accommodation.endDate}
                excludeDates={allDates}
              />
            </div>
            <div key="d2" style={styles.datePicker}>
              <p>Slutdatum</p>
              <DatePicker
                className='datePicker'
                dateFormat="yyyy/MM/dd"
                selected={depDate}
                placeholderText="Avresa"
                onChange={(data) => setDepDate(data)}
                minDate={arrDate || minDate}
                maxDate={maxDate}
                excludeDates={allDates}
              />
            </div>
          </div>

          {arrDate && depDate &&
            <div>
              <p>Pris: {Math.round(price)} SEK</p>
              <p>Serviceavgift: {Math.round((price * 0.15))} SEK</p>
              <p>Totalpris: {Math.round((price * 1.15))}</p>
              <p>{new Date(accommodation.startDate).toDateString()}</p>
            </div>
          }
          <div style={styles.bokaContainer}>
            <button style={[{ cursor: price > 0 ? 'pointer' : 'default' }, styles.button]}>Boka</button>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            disableScrollLock={false}
          >
            {body}
          </Modal>
        </form>
      }
      <br /><br />
    </div>
  );
}

export default Radium(BookingForm);

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: '0 auto'
  },
}));

const buttonStyle = {
  backgroundColor: 'red'
}

const styles = {
  input: {
    width: '50px',
    height: '25px',
    margin: '10px',
    textAlign: 'center'

  },
  guestContainer: {
    fontFamily: 'Quicksand',
    color: 'grey',
    padding: '50px',
    textAlign: 'center',

  },
  error: {
    backgroundColor: 'crimson',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    padding: '5px',
    margin: '10px auto',
    width: '500px',
    borderRadius: '10px'
  },
  ok: {
    backgroundColor: '#65c28c',
    fontWeight: 'bold',
    padding: '5px',
    margin: '10px auto',
    width: '300px',
    borderRadius: '10px'
  },
  dateContainer: {
    textAlign: 'center',
    height: '100px',
    width: '100%',
    margin: '0 auto',
  },
  datePicker: {
    float: 'left',
    fontFamily: 'Quicksand',
    color: 'grey',
    textAlign: 'left',
    marginLeft: '22%',
    lineHeight: '5px',
    width: '100px',
    border: '0',
  },
  bokaContainer: {
    textAlign: 'center',
    height: '50px',
    width: '100%',
    margin: '0 auto',

  },
  button: {
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '14px',
    color: 'grey',
    width: '170px',
    margin: '10px',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    ':focus': {
      outline: 'none'
    }
  },
  pointer: {
    cursor: 'pointer'
  },
  noPointer: {
    cursor: 'not-allowed'
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    paddingTop: '20%',
    userSelect: 'none',
    color: 'rgba(0,0,0,0)',
    textShadow: '0 0 0 #000'
  },
}