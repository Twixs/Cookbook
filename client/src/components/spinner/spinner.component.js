import React from 'react';
import classes from './spinner.module.scss';

const Spinner = (props) => {
  return props.show ? <div className={classes.lds_dual_ring}></div> : null;
};

export default Spinner;
