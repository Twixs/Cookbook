import React from 'react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import classes from './form.module.scss';

const RecipeForm = (props) => {
  const { name, description, type } = props;

  const pageTitle = type === 'edit' ? `Edit "${name}" recipe` : 'Add new recipe to the Cookbook!';
  return (
    <div className={classes.editRecipeBlock}>
      <h3 className={classes.pageTitle}>{pageTitle}</h3>
      <Form className={classes.editForm} onSubmit={(e) => props.handleSubmit(e)}>
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
              onChange={(e) => props.handleChange(e)}
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
              onChange={(e) => props.handleChange(e)}
            ></Input>
          </Col>
        </FormGroup>
        <hr />
        <FormGroup row className={classes.ingredientsList}>
          <Label sm={3} for="recipeIngredient" className={classes.label}>
            Ingredients:
          </Label>
          <Col sm={7}>
            <Input
              id="recipeIngredient"
              type="text"
              name="ingredient"
              onChange={(e) => props.handleIngredientChange(e)}
              ref={props.inputIngredientRef}
            />
          </Col>
          <Button color="success" className={classes.formButton} onClick={props.handleIngredientSubmit}>
            Add
          </Button>
        </FormGroup>
        {props.ingredients && props.ingredients.length > 0 && (
          <ul className={classes.list}>
            {props.ingredients.map(({ value, id }) => {
              return (
                <li key={id}>
                  <HighlightOffIcon color="error" onClick={(e) => props.handleRemoveIngredient(e, id)} />
                  <p>{value}</p>
                </li>
              );
            })}
          </ul>
        )}
        <FormGroup className={classes.buttonGroup}>
          <Button color="warning" className={classes.formButton} type="submit">
            Submit
          </Button>
          {type === 'edit' ? (
            <Button color="danger" className={classes.formButton} onClick={(e) => props.handleDelete(e)}>
              Delete
            </Button>
          ) : null}
        </FormGroup>
      </Form>
    </div>
  );
};

export default RecipeForm;
