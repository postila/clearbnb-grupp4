import React, { useContext, useEffect, useState } from 'react';
import BookingsList from '../components/BookingsList'
import RentalsList from '../components/RentalsList'
import Radium from 'radium'
import { UserContext } from '../contexts/UserContextProvider'

const MyPage = () => {
  const {userName} = useContext(UserContext)
  const [name, setName] = useState('Mina')

  const endNameWithS = e => {
    e += (e[e.length - 1] === 's') ? '' : 's'
    
    setName(e)
  }

 

  useEffect(() => {
    if(userName) endNameWithS(userName)  
  }, [userName])

  return (
    <div>
      <h1 style={styles.text}>{name.charAt(0).toUpperCase() + name.slice(1)} bokningar</h1>
      <div>
        <BookingsList />
      </div >
      <h1 style={styles.text}>{ name.charAt(0).toUpperCase() + name.slice(1)} uthyrningar</h1>
      <div>
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
    
  }
}



export default Radium(MyPage);