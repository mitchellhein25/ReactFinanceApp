import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    fontFamily:"Sans-serif",
  },
}));

export default function InfoModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" style={{textAlign: 'center'}}>{props.modalHeader}</h2>
      {props.modalText}
    </div>
  );

  return (
    <div>
        <Button variant="contained" color="primary" size="small" type="button" onClick={handleOpen}>
        <InfoIcon/>&nbsp;{props.infoButtonText}
        </Button> 
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
        {body}
      </Modal>
    </div>
  );
}
