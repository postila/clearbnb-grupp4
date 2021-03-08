import React, { useState } from 'react';
import Login from '../components/Login'
import Register from '../components/Register';

const Home = () => {
  const [register, setRegister] = useState(false)
  
  const displayRegisterForm = () => {
    setRegister(true)
  }

  return (
    <div>
      <div className="login-register-form">
        {!register && <Login displayRegisterForm={displayRegisterForm} />}
        {register && <Register />}
      </div>
    </div >
  );
}
 
export default Home;