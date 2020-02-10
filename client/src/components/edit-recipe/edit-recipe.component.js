import React, { useEffect, useState, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RecipeForm from '../form/form.component';

import { getRecipe, editRecipe, deleteRecipe } from '../../actions';


const EditRecipe = props => {
  const id = props.match.params.id || '';
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

  const handleIngredientSubmit = (e) => {
    const ingredient = {
      id: ingredients.length + 1,
      value: inputIngredientRef.current.value
    }
    const nextIngredients = [...ingredients];
    nextIngredients.push(ingredient);
    setIngredients(nextIngredients);
  }

  const removeIngredient = (e, id) => {
    const list = [...ingredients];
    const idx = list.findIndex(ingredient => ingredient.id === id);
    list.splice(idx, 1);
    setIngredients(list)
  }

  return (
    <RecipeForm
      type='edit'
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
