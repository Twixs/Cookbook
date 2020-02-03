import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import classes from './card-list.module.scss';

import Card from '../card/card.component';
import LoaderContext from '../../loader-context';

const CardList = (props) => {
  const [recipes, setRecipes] = useState([]);
  const loaderContext = useContext(LoaderContext);

  useEffect(() => {
    loaderContext.setLoading(true);
    axios
      .get('/api/recipes')
      .then((res) => {
        setRecipes({ recipes: res.data });
      })
      .then(() => loaderContext.setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.cardsList}>
      {!loaderContext.isLoading &&
        recipes.recipes &&
        recipes.recipes.map((item) => {
          return <Card key={item._id} item={item} />;
        })}
    </div>
  );
};

export default CardList;
