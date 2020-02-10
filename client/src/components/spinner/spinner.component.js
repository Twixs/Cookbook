import React from 'react';
import { connect } from 'react-redux';
import classes from './spinner.module.scss';

const Spinner = (props) => {
  return props.show ? <div className={classes.lds_dual_ring}></div> : null;
};

const mapStateToProps = (state) => {
  return {
    show: state.recipes.pending || state.recipe.pending,
  };
};

export default connect(mapStateToProps)(Spinner);
