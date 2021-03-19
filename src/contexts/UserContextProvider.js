import { useState, createContext} from 'react';

export const UserContext = createContext()

export default function UserContextProvider(props) {
  const [user, setUser] = useState(null)
  const [userId, setUserId] = useState(null)

  const fetchSession = async () => {
    console.log(user, 'user')
    let res = await fetch('/api/whoami')
    res = await res.json()
    setUserId(res._id)
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
    fetchSession()
  }

  const logout = async () => {
    let res = await fetch('/api/logout', {
      method: 'DELETE',
    })
    res = await res.json()
    console.log(res)
    setUser(null)
    setUserId(null)
  }

  const addUser = async user => {
    let res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user)
    })

    res = await res.json()
    console.log(res);
    login(user)
    fetchSession()
  }

  const values = {
    addUser,
    user,
    userId,
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
