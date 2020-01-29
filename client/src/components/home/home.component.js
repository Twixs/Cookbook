import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import classes from './home.module.scss';

import CardList from '../cards-list/card-list.component';

const Home = (props) => {
  return (
    <div className={classes.home}>
      <CardList loading={props.setLoading} />
    </div>
  );
};

export default Home;
