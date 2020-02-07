import React, { useEffect, useState, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RecipeForm from '../form/form.component';

import classes from './edit-recipe.module.scss';

import { getRecipe, editRecipe, deleteRecipe } from '../../actions';


const EditRecipe = props => {
  const id = props.match.params.id;
  const { recipe } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const inputIngredientRef = createRef();

  useEffect(() => {
    props.getRecipe(id);
  }, []);

  useEffect(() => {
    setName(recipe.name);
    setDescription(recipe.description);
    setIngredients(recipe.ingredients);
  }, [recipe]);

  const handleChange = (e) => {
    e.target.name === 'name' ? setName(e.target.value) : setDescription(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && description.trim()) {
      const newRecipe = { id, name, description, ingredients };
      props.editRecipe(newRecipe);
      props.history.push('/');
    }
  };


  const handleDelete = (e) => {
    e.preventDefault();
    const oldRecipe = { id, name, description };
    props.deleteRecipe(oldRecipe);
    props.history.push('/');
  };

  const handleIngredientChange = (e) => {
    inputIngredientRef.current.value = e.target.value;
  }

  // TODO: fix add/remove ingredients
  const handleIngredientSubmit = (e) => {
    let ingredient = {
      id: ingredients.length + 1,
      value: inputIngredientRef.current.value
    }
    let nextIngredients = [...ingredients];
    nextIngredients.push(ingredient);
    setIngredients({ ingredients: nextIngredients });
  }

  const removeIngredient = (e, id) => {
    console.log(id, ingredients)
    const list = [...ingredients];
    const idx = list.findIndex(ingredient => ingredient.id === id);
    list.splice(idx, 1);
    setIngredients({ ingredients: list })
  }

  return (
    <RecipeForm
      type="edit"
      name={name}
      description={description}
      ingredients={ingredients}
      handleChange={handleChange}
      handleDelete={handleDelete}
      handleSubmit={handleSubmit}
      handleIngredientChange={handleIngredientChange}
      handleIngredientSubmit={handleIngredientSubmit}
      handleRemoveIngredient={removeIngredient}
      inputIngredientRef={inputIngredientRef}
    />
  );
}

const mapStateToProps = state => {
  return {
    recipe: state.recipe.recipe
  }
}

const mapDispatchToProps = {
  getRecipe,
  editRecipe,
  deleteRecipe
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditRecipe));
