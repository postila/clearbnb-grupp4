import { useEffect } from 'react';
import { useState, createContext} from 'react';

export const UserContext = createContext()

export default function UserContextProvider(props) {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)
  const [userId, setUserId] = useState(null)
  const [userName, setUserName] = useState(null)

  const fetchSession = async () => {
    let res = await fetch('/api/whoami')
    res = await res.json()
    setUserId(res._id)
    setUserName(res.name)
    setUser(res)
  }
  const fetchUsers = async () => {
    let res = await fetch('/api/users')
    res = await res.json()
    setUsers(res)
  }
  
  const login = async user => {
    let res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user)
    })
    res = await res.json()
    setUser(res)
    fetchSession()
    return res;
  }

  const logout = async () => {
    await fetch('/api/logout', {
      method: 'DELETE',
    })
    setUser(null)
    setUserId(null)
    setUserName(null)
  }

  const addUser = async user => {
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user)
    })
    login(user)
    fetchSession()
  }

  useEffect(() => {
    fetchUsers()
  },[])

  const values = {
    addUser,
    user,
    userId,
    userName,
    login,
    fetchSession,
    logout,
    users,
    fetchUsers
  }

  return (
    <UserContext.Provider value={values}>
      {props.children}
    </UserContext.Provider>
  );
}
