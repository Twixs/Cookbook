import React, { useState, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RecipeForm from '../form/form.component';

import { addRecipe, showSnackbar } from '../../actions';

const AddRecipe = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const inputIngredientRef = createRef();

  const validateField = (e) => {
    e.target.name === 'name' ? setName(e.target.value) : setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && description.trim() && ingredients.length) {
      const newRecipe = { name, description, ingredients }
      props.addRecipe(newRecipe);
      props.history.push('/');
    } else {
      props.showSnackbar({
        show: true,
        message: 'Please fill in all fields of the form!',
        status: 'error',
      })
    }
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

  const removeItem = (e, id) => {
    const list = [...ingredients];
    const idx = list.findIndex(ingredient => ingredient.id === id);
    list.splice(idx, 1);
    setIngredients(list)
  }

  return (
    <RecipeForm
      type='add'
      name={name}
      description={description}
      ingredients={ingredients}
      handleChange={validateField}
      handleSubmit={handleSubmit}
      handleIngredientChange={handleIngredientChange}
      handleIngredientSubmit={handleIngredientSubmit}
      handleRemoveIngredient={removeItem}
      inputIngredientRef={inputIngredientRef}
    />
  );
}

const mapDispatchToProps = {
  addRecipe,
  showSnackbar
}

export default withRouter(connect(null, mapDispatchToProps)(AddRecipe));
