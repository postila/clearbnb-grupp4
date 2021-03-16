import React from 'react';
import BookingsList from '../components/BookingsList'
import Radium from 'radium'

const MyPage = () => {

  return (
    <div>
      <h1 style={{ fontFamily: 'Quicksand', color: 'grey', padding: '40px'}}>Mina bokningar:</h1>
      <div>
        <BookingsList />
      </div >
    </div>
  );
}



export default Radium(MyPage);