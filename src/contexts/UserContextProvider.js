import { useState, createContext} from 'react';

export const UserContext = createContext()

export default function UserContextProvider(props) {

  const [user, setUser] = useState()
  
  const tempLogin = async user => {
    let res = await fetch('/api/login')
    res = await res.json()
    setUser(res)
  }
  
  const login = async user => {
    let res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user)
    })
    res = await res.json()
  }

  const addUser = async user => {
    let res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user)
    })

    res = await res.json()
    console.log(res);
  }

  const values = {
    addUser,
    user,
    login
  }

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  );
}
