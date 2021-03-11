import { createContext, useState, useEffect } from 'react'

export const LocationContext = createContext();

export default function LocationsContextProvider(props) {
  const [locations, setLocations] = useState([])

  const fetchLocations = async () => {
    let res = await fetch('/rest/locations')
    res = await res.json()
    setLocations(res)
  }

  useEffect(() => {
    fetchLocations()
  }, [])

  const values = {
    locations
  }
  
  return (
    <LocationContext.Provider value={values}>
      {props.children}
    </LocationContext.Provider>
  )
}



//const defaultLocations = [{ "_id": "604634656616d0ae566dcdc0", "name": "Stockholm", "imageUrl": "https://media.timeout.com/images/105237902/image.jpg" }, { "_id": "604634dd6616d0ae566dcdc1", "name": "Göteborg", "imageUrl": "https://via.tt.se/data/images/00463/d956c74c-6e02-4d32-89d7-7f32ea3fa774.jpg" }, { "_id": "6047421b553f86f0a5badc4e", "name": "Lund", "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e8/Lunds_domkyrka1.jpeg" }, { "_id": "6047428d553f86f0a5badc4f", "name": "Södertälje", "imageUrl": "https://static-cdn.sr.se/images/5293/a5db0856-c188-4d29-b59b-19744a63160c.jpg?preset=768x432" }, { "_id": "604742cf553f86f0a5badc50", "name": "Borås", "imageUrl": "https://www.rotter.se/uploads/images/nyhetsbilder/house_of_knowledge_pressbild_boras_beskuren.jpg" }, { "_id": "60474307553f86f0a5badc51", "name": "Luleå", "imageUrl": "https://www.ltu.se/cms_fs/1.178581!/image/8831207-vacker-forsommarkvall-i-lulea.jpg" }, { "_id": "60474350553f86f0a5badc52", "name": "Jönköping", "imageUrl": "https://www.jonkoping.se/images/18.f356a12169ec9d53d46233/1554896828559/(2)%20Visionsbild.jpg" }, { "_id": "60474376553f86f0a5badc53", "name": "Varberg", "imageUrl": "https://www.visitvarberg.se/images/18.1f82914172cd85756ee03ed/1593691736104/varbergsfastning-franhavet-800px.jpg" }]

