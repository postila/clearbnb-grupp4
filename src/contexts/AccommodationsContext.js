import { createContext, useState, useEffect } from 'react'

export const AccommodationsContext = createContext();

export default function AccommodationsContextProvider(props) {
  const [accommodations, setAccommodations] = useState([])
  
  const fetchAccommodations = async () => {
    let res = await fetch('/rest/accommodations')
    res = await res.json()
    setAccommodations(res)
  }

  useEffect(() => {
    fetchAccommodations()
  }, ([]))
  
  const values = {
    accommodations
  }
  
  return (
    <AccommodationsContext.Provider value={values}>
      {props.children}
    </AccommodationsContext.Provider>
)
}
