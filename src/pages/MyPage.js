import React, { useContext, useEffect, useState } from 'react';
import BookingsList from '../components/BookingsList'
import RentalsList from '../components/RentalsList'
import Radium from 'radium'
import { UserContext } from '../contexts/UserContextProvider'
import { BookingContext } from '../contexts/BookingContextProvider'

const MyPage = () => {
  const {userName} = useContext(UserContext)
  const [name, setName] = useState('Mina')
  const { fetchBookings } = useContext(BookingContext)

  const endNameWithS = e => {
    e += (e[e.length - 1] === 's') ? '' : 's'
    
    setName(e)
  }

 

  useEffect(() => {
    fetchBookings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(userName) endNameWithS(userName)  
  }, [userName])

  return (
    <div style={styles.wrapper}>
      <div>
      <h1 style={styles.text}>{name.charAt(0).toUpperCase() + name.slice(1)} bokningar</h1>
        <BookingsList />
      </div >
      <div>
      <h1 style={styles.text}>{ name.charAt(0).toUpperCase() + name.slice(1)} uthyrningar</h1>
        <RentalsList />
      </div >
    </div>
  );
}

const styles = {
  text: {
    fontFamily: 'Quicksand',
    color: 'grey',
    padding: '40px'
  },
  wrapper: {
    display: 'flex',
    clear: 'none',
    gridGap:'50px',
    justifyContent: 'center',
    '@media (max-width: 1650px)': {
      display: 'grid',
      gridTemplateColumns: '1fr',
      width: '75vw',
      justifyContent: 'center',
      margin: '3vh auto'
    }
  
  }
}



export default Radium(MyPage);