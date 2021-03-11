import { createContext, useState, useEffect } from 'react'

export const AccommodationsContext = createContext();

export default function AccommodationsContextProvider(props) {
  const [accommodations, setAccommodations] = useState([])
  
  const fetchAccommodations = async () => {
    let res = await fetch('/rest/accommodations')
    res = await res.json()
    setAccommodations(res)
  }

  const addAccommodation = async accommodation => {
    let res = await fetch('/api/accommodations', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(accommodation)
    })

    res = await res.json()
    setAccommodations([...accommodations, accommodation])
  }

  useEffect(() => {
    fetchAccommodations()
  }, [])
  
  const values = {
    accommodations,
    addAccommodation
  }
  
  return (
    <AccommodationsContext.Provider value={values}>
      {props.children}
    </AccommodationsContext.Provider>
)
}
