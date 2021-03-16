import { createContext, useState, useEffect } from 'react'

export const DateContext = createContext();

export default function DateContextProvider(props) {
  const [dates, setDates] = useState([])

  const fetchDates = async () => {
    let res = await fetch('/rest/dates')
    res = await res.json()
    setDates(res)
  }

  useEffect(() => {
    fetchDates()
  }, [])

  const values = {
    dates
  }

  return (
    <DateContext.Provider value={values}>
      {props.children}
    </DateContext.Provider>
  )
}