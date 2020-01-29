import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../card/card.component';
import classes from './card-list.module.scss';

const CardList = (props) => {
  const [recipes, setRecipes] = useState([]);
  const isLoading = props.loading;

  useEffect(() => {
    isLoading(true);
    axios
      .get('/api/recipes')
      .then((res) => {
        setRecipes({ recipes: res.data });
      })
      .then(() => isLoading(false))
      .catch((err) => console.log(err));
  }, []);

  const recipesList = recipes.recipes;

  return (
    <div className={classes.cardsList}>
      {recipesList &&
        recipesList.map((item) => {
          return <Card key={item._id} item={item} />;
        })}
    </div>
  );
};

export default CardList;
