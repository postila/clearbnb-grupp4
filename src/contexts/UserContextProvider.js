import { useState, createContext} from 'react';

export const UserContext = createContext()

export default function UserContextProvider(props) {

  const [user, setUser] = useState(null)
  
  const fetchSession = async () => {
    console.log(user, 'user')
    let res = await fetch('/api/whoami')
    res = await res.json()
    console.log(res, 'res')
    setUser(res)
  }
  
  const login = async user => {
    let res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user)
    })
    res = await res.json()
    console.log(res)
    setUser(res)
    
  }

  const logout = async () => {
    let res = await fetch('/api/logout', {
      method: 'DELETE',
    })
    res = await res.json()
    console.log(res)
    setUser(null)
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
    login,
    fetchSession,
    logout
  }

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  );
}
