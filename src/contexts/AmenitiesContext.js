import { createContext, useState, useEffect } from 'react'

export const AmenitiesContext = createContext();

export default function AmenitiesContextProvider(props) {
  const [amenities, setAmenities] = useState([])

  const fetchAmenities = async () => {
    let res = await fetch('/rest/amenities')
    res = await res.json()
    setAmenities(res)
  }

  useEffect(() => {
    fetchAmenities()
  }, [])

  const values = {
    amenities
  }

  return (
    <AmenitiesContext.Provider value={values}>
      {props.children}
    </AmenitiesContext.Provider>
  )
}

/*const defaultAmenities = [
  {
    "_id": "6048bd4adc93177f077ef87a",
    "name": "washer",
    "iconUrl": "https://www.flaticon.com/svg/vstatic/svg/1414/1414456.svg?token=exp=1615381319~hmac=a14384b50be8427d875c1085bf5c872f"
  },
  {
    "_id": "6048c012dc93177f077ef87c",
    "name": "Wifi",
    "iconUrl": "https://www.flaticon.com/svg/vstatic/svg/1414/1414469.svg?token=exp=1615381319~hmac=71b90aa0dc2354c6873905595cb0592f"
  },
  {
    "_id": "6048c15fdc93177f077ef87f",
    "name": "essentials",
    "iconUrl": "https://www.flaticon.com/svg/vstatic/svg/1414/1414486.svg?token=exp=1615381319~hmac=a781fca8fae18f827f74074738b355d2"
  },
  {
    "_id": "6048c1aadc93177f077ef880",
    "name": "kitchen",
    "iconUrl": "https://www.flaticon.com/svg/vstatic/svg/1414/1414444.svg?token=exp=1615381319~hmac=ee6b3e1ca6e76c8e9f8a25ed0bd67d07"
  },
  {
    "_id": "6048c223dc93177f077ef881",
    "name": "TV",
    "iconUrl": "https://www.flaticon.com/svg/vstatic/svg/1414/1414459.svg?token=exp=1615381319~hmac=7eedc56de8b59ccf9048aa05b8c16a4b"
  },
  {
    "_id": "6048c23edc93177f077ef882",
    "name": "airConditioning",
    "iconUrl": "https://www.flaticon.com/svg/vstatic/svg/1414/1414443.svg?token=exp=1615381319~hmac=2298046b5d03f0c0701632263b470280"
  },
  {
    "_id": "6048c287dc93177f077ef883",
    "name": "iron",
    "iconUrl": "https://www.flaticon.com/svg/vstatic/svg/1414/1414458.svg?token=exp=1615381319~hmac=acd9ac3e9f8db0612faec8d7e2a31c94"
  },
  {
    "_id": "6048c2e3dc93177f077ef884",
    "name": "Låst skåp",
    "iconUrl": "https://www.flaticon.com/svg/vstatic/svg/1414/1414453.svg?token=exp=1615381319~hmac=97478d13dc524e5878d8d2290e374d1b"
  }
]*/