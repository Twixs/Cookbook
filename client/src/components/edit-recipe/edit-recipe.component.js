import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

import classes from './edit-recipe.module.scss';

import { getRecipe, editRecipe, deleteRecipe } from '../../actions';


const EditRecipe = props => {
  const id = props.match.params.id;
  const { recipe } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    props.getRecipe(id);
  }, []);

  useEffect(() => {
    setName(recipe.name);
    setDescription(recipe.description);
  }, [recipe]);

  const handleChange = (e) => {
    e.target.name === 'name' ? setName(e.target.value) : setDescription(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && description.trim()) {
      const newRecipe = { id, name, description };
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

  return (
    <div className={classes.editRecipeBlock}>
      <h3 className={classes.pageTitle}>Edit "{recipe.name}" recipe</h3>
      <Form className={classes.editForm} onSubmit={(e) => handleSubmit(e)}>
        <FormGroup row>
          <Label sm={3} for="recipeTitle" className={classes.label}>
            Recipe title
            </Label>
          <Col sm={9}>
            <Input
              id="recipeTitle"
              type="text"
              name="name"
              value={name || ''}
              onChange={(e) => handleChange(e)}
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} for="recipeDescription" className={classes.label}>
            Recipe description
            </Label>
          <Col sm={9}>
            <Input
              id="recipeDescription"
              type="textarea"
              name="description"
              className={classes.description}
              value={description || ''}
              onChange={(e) => handleChange(e)}
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup className={classes.buttonGroup}>
          <Button color="warning" className={classes.formButton} type="submit">
            Submit
            </Button>
          <Button color="danger" className={classes.formButton} onClick={(e) => handleDelete(e)}>
            Delete
            </Button>
        </FormGroup>
      </Form>
    </div>
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
