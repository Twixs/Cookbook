import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './card-list.module.scss';

import Card from '../card/card.component';
import { fetchRecipes } from '../../actions';

const CardList = (props) => {
  useEffect(() => {
    props.fetchRecipes();
  }, []);

  return (
    <div className={classes.cardsList}>
      {props.recipes &&
        props.recipes.map((item) => {
          return <Card key={item._id} item={item} />;
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
  };
};

const mapDispatchToProps = {
  fetchRecipes,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
