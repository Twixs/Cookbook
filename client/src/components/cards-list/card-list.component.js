import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../card/card.component";
import classes from "./card-list.module.scss";

const CardList = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    axios
      .get("/api/recipes")
      .then(res => {
        setRecipes({ recipes: res.data });
      })
      .catch(err => console.log(err));
  }, []);

  if (!recipes) return <p>loading...</p>;

  const recipesList = recipes.recipes;

  return (
    <div className={classes.cardsList}>
      {recipesList &&
        recipesList.map(item => {
          return (
              <Card key={item._id} item={item} />
          );
        })}
    </div>
  );
};

export default CardList;
