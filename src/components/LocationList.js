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
      <p>{ location.name }</p>
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
    height: '170px',
    borderRadius: '7px',
    maxWidth: '15vw'
    },
  card: {
    color: 'grey',
    //backgroundColor: '#eee',
    backgroundColor: 'rgba(275,275,275,0.6)',
    padding: '8px 8px 0px 8px',
    marginBottom: '15px',
    //flex: '1 0 11%',
    borderRadius: '7px',
    cursor: 'pointer',
    transition: '100ms',
    fontFamily: 'Quicksand',
    fontWeight: 'bold',
    boxShadow: '0 0 6px 2px rgb(44, 44, 44,)',
      ':hover': {
        transform: 'scale(1.02)',
        backgroundColor: '#f1f1f1',
      
        // opacity: '40%'
      }
    },
  itemsPositions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '25px',
    
  },
  background: {
    backgroundImage: ''
  }
}

export default Radium(LocationList)