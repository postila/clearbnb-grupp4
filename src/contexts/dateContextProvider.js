import { createContext, useState, useEffect } from 'react'

export const DateContext = createContext();

export default function DateContextProvider(props) {
  const [dates, setDates] = useState([])

  const fetchDates = async () => {
    let res = await fetch('/rest/dates')
    res = await res.json()
    setDates(res)
  }

  const addDates = async dates => {
    let res = await fetch('/rest/dates', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(dates)
    })

    res = res.json()
    console.log(res, 'dates added')
  }

  useEffect(() => {
    fetchDates()
  }, [addDates])

  const values = {
    dates,
    addDates
  }

  return (
    <DateContext.Provider value={values}>
      {props.children}
    </DateContext.Provider>
  )
}
