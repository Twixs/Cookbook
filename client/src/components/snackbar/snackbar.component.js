import React, { useState } from 'react';
import classes from './snackbar.module.scss';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const SnackbarMessage = ({ snackbar }) => {
  const [active, setActive] = useState(false);
  if (snackbar.show) {
    snackbar.show = false;
    setActive(true);
  }

  function closeSnackbar() {
    setActive(false);
  }

  return (
    <div className={classes.snackbar}>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={active}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <SnackbarContent
          data-e2e-id={`snackbar-${snackbar.status}`}
          className={`${classes[snackbar.status]}`}
          aria-describedby="client-snackbar"
          message={<span className={classes.message}>{snackbar.message}</span>}
          action={[
            <IconButton key="close" aria-label="Close" color="inherit" onClick={closeSnackbar}>
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    </div>
  );
};

export default SnackbarMessage;
