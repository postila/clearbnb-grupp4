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
    height: '150px',
    width: '175px',
    borderRadius: '7px',
    //maxWidth: '8vw',
    '@media (max-width: 1000px)': {
      height: '150px',
      width: '175px'
    },
    '@media (max-width: 480px)': {
      height: '34.3vw',
      width: '40vw'
    }

    },
  card: {
    color: 'grey',
    backgroundColor: '#eee',
    padding: '8px 8px 0px 8px',
    marginBottom: '20px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: '100ms',
    fontFamily: 'Quicksand',
    fontSize: '18px',
    fontWeight: 'bold',
    boxShadow: '0 0 6px 2px rgb(44, 44, 44,)',
      ':hover': {
        transform: 'scale(1.02)',
        backgroundColor: '#f1f1f1',
      }, 
    '@media (max-width: 490px)': {
      padding: '1.5vw 1.5vw 0 1.5vw',
      margiinBottom: '5vw'
    }
    },
  itemsPositions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '25px',
    '@media (max-width: 900px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridGap: '30px',
      margin: '10px'
    },
    '@media (max-width: 480px)': {
      gridGap: '3vw',
      marginRight: '5vw'
    }
    
  }
}

export default Radium(LocationList)