import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { ReactNode } from 'react';
import { Box, IconButton, Modal, Paper } from '@mui/material';

export default function ModalDialog({title, content, open: openParam, onAccept, onClose} : {title: ReactNode, content: ReactNode, open: boolean, onAccept: Function, onClose: Function}) {
  const [open, setOpen] = React.useState(openParam);

  const handleAccept = () => {
    onAccept();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  console.log(content)
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          width:'100%'
        }}
      >
        <Paper sx={{position:'relative', maxWidth:'md', marginX:'auto', marginTop:'1vh', paddingX:'2rem', maxHeight:'98vh', overflowY:'scroll'}}>
          <IconButton sx={{fontSize:'2rem', float:'right', right:'0rem', position:'absolute'}} onClick={handleClose}><CloseIcon sx={{fontSize:'3rem'}}/></IconButton>
          {content}
        </Paper>
      </Modal>
    </div>
  );
}

ModalDialog.defaultProps = {
  openParam: false,
  title: 'Confirm the current action.',
  content: '',
  onAccept: () => {},
  onClose: () => {},
};

ModalDialog.propTypes = {
  onAccept: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  content: PropTypes.node,
  title: PropTypes.node,
};
