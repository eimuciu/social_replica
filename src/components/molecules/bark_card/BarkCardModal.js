import React from 'react';
//Components
import BarkCard from './BarkCard';
//MUI
import DialogMaterial from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
//Styled components
import styled from 'styled-components';

const Dialog = styled(DialogMaterial)``;

const classes = {
  root: {
    margin: 0,
    padding: '16px',
  },
  closeButton: {
    position: 'absolute',
    right: '8px',
    top: '8px',
    color: 'red',
  },
};

const DialogTitle = ({ onClose }) => {
  // const classes = useStyles();
  return (
    <MuiDialogTitle className={classes.root}>
      <IconButton className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
};

const BarkCardModal = ({ open, onClose, bark }) => {
  return (
    <Dialog open={open} fullWidth>
      <DialogTitle onClose={onClose} />
      <MuiDialogContent>{bark && <BarkCard bark={bark} />}</MuiDialogContent>
    </Dialog>
  );
};

export default BarkCardModal;
