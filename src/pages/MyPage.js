import React from 'react';
import BookingsList from '../components/BookingsList'
import RentalsList from '../components/RentalsList'
import Radium from 'radium'

const MyPage = () => {

  return (
    <div>
      <h1 style={{ fontFamily: 'Quicksand', color: 'grey', padding: '40px'}}>Mina bokningar:</h1>
      <div>
        <BookingsList />
      </div >
      <h1 style={{ fontFamily: 'Quicksand', color: 'grey', padding: '40px' }}>Mina uthyrningar:</h1>
      <div>
        <RentalsList />
      </div >
    </div>
  );
}



export default Radium(MyPage);