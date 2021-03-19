import React from 'react';
import Radium from 'radium'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: '30vh 0 0 80vh',
  },
}));

const AboutUs = () => {
  const history = useHistory()
  const classes = useStyles();
  //const [modalStyle] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const body = (
    <div>
      <div  className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
        <Button className="modal-button" onClick={() => { history.push('/Mina-sidor'); handleClose() }}>Gå till mina bokningar</Button>
      
      </div>
    </div>
  );

  return (
    <div style={styles.background}>
      <div style={styles.box}>
        <p style={styles.content}>Cras facilisis urna ornare ex volutpat, et
        convallis erat elementum. Ut aliquam, ipsum vitae
        gravida suscipit, metus dui bibendum est, eget rhoncus nibh
        metus nec massa. Maecenas hendrerit laoreet augue
        nec molestie. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.</p>
      </div>
      <button onClick={handleOpen}></button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div >
  );
}

const styles = {
  box: {
    display: 'inline-block',
    float:'left',
    margin: '30vh 0 0 20vh',
    maxWidth: '400px',
    backgroundColor: 'white',
    opacity: '30%',
    padding: '30px',
    borderRadius:'10px'
  },
  content: {
    color: 'black',
    margin: '0',
    fontWeight: 'bold',
    letterSpacing:'0.5px'
  },
  background: {
    backgroundImage: '../background.jpg',
    height: '100vh'
  }
}

export default Radium(AboutUs);