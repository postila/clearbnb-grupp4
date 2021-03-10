import { useContext } from 'react'
import { LocationContext } from '../contexts/locationContextProvider'
import { useHistory } from 'react-router-dom'
import Radium from 'radium'

function LocationList() {
  const { locations } = useContext(LocationContext)
  const history = useHistory()

  const locationItem = location => (
    <div
      className="locationItem"
      key={ location._id }
      style={ styles.card }
      onClick={() => history.push('/Platser/' + location._id)}
    >
      <img style={ styles.img }
        src={ location.imageUrl }
        alt={'picture ' + location._id}
      />
      <h3>{ location.name }</h3>
    </div>
  )

  return (
    <div style={ styles.itemsPositions }>
      {locations.map(location => locationItem(location))}
    </div>
  )
}

const styles = {
  img: {
    height: '150px',
    borderRadius: '10px',
    maxWidth: '12vw'
    },
  card: {
    backgroundColor: '#202329',
    padding: '10px',
    marginBottom: '15px',
    flex: '1 0 21%',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: '200ms',
    boxShadow: '0 0 6px 2px rgb(22, 22, 22)',
      ':hover': {
        transform: 'scale(1.03)',
        backgroundColor: '#252c36'
        // opacity: '40%'
      }
    },
  itemsPositions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '25px',
    color: 'white'
  }
}

export default Radium(LocationList)