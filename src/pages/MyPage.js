import React, { useContext, useEffect, useState } from 'react';
import BookingsList from '../components/BookingsList'
import Radium from 'radium'
import { UserContext } from '../contexts/UserContextProvider'

const MyPage = () => {
  const {userName} = useContext(UserContext)
  const [name, setName] = useState('Mina')

  const endNameWithS = e => {
    e +=(e[e.length-1] === 's') ? '':'s'
    setName(e)
  }

  useEffect(() => {
    if(userName) endNameWithS(userName)  
  }, [userName])

  return (
    <div>
      <h1 style={{ fontFamily: 'Quicksand', color: 'grey', padding: '40px'}}>{name} bokningar:</h1>
      <div>
        <BookingsList />
      </div >
    </div>
  );
}



export default Radium(MyPage);