import React from 'react';
import { withRouter } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import readMore from '../../utils/readMore';
import classes from './card.module.scss';
import { Button } from 'reactstrap';

const Card = ({ item, history }) => {
  return (
    <div className={classes.card}>
      <h2 className={classes.heading}>{item.name}</h2>
      <p>{readMore(item.description)}</p>
      <p className={classes.lastModified}>Last modified: {formatDate(item.date)}</p>
      <Button outline color="warning" onClick={() => history.push(`edit-recipe/${item._id}`)}>
        Edit recipe
      </Button>
    </div>
  );
};

export default withRouter(Card);
