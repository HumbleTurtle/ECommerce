import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import PropTypes from 'prop-types';
import { ReactNode } from 'react';

export default function AlertDialog({title, text, open: openParam, onAccept, onClose} : {title: ReactNode, text: ReactNode, open: boolean, onAccept: Function, onClose: Function} ) {
  const [open, setOpen] = React.useState(openParam);

  const handleAccept = () => {
    onAccept();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAccept} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AlertDialog.defaultProps = {
  openParam: false,
  title: 'Confirm the current action.',
  onAccept: () => {},
  onClose: () => {},
};

AlertDialog.propTypes = {
  onAccept: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  text: PropTypes.node,
  title: PropTypes.node,
};
