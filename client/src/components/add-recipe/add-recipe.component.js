import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import classes from './add-recipe.module.scss';

import { addRecipe } from '../../actions';

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      ingredients: [],
    };

    this.inputIngredientRef = createRef();
  }

  validateField = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitForm = (e) => {
    e.preventDefault();
    if (this.state.name.trim() && this.state.description.trim()) {
      this.props.addRecipe(this.state);
      this.props.history.push('/');
    }
  };

  handleIngredientChange = (e) => {
    this.inputIngredientRef.current.value = e.target.value;
  }

  handleIngredientSubmit = (e) => {
    let ingredient = {
      id: this.state.ingredients.length + 1,
      value: this.inputIngredientRef.current.value
    }
    this.setState((state) => ({
      ingredients: [
        ...state.ingredients,
        ingredient
      ]
    }));
  }

  removeItem = (e, id) => {
    const list = [...this.state.ingredients];
    const idx = list.findIndex(ingredient => ingredient.id === id);
    list.splice(idx, 1);
    this.setState({ ingredients: list })
  }

  render() {
    return (
      <div className={classes.addRecipeBlock}>
        <h3 className={classes.pageTitle}>Add new recipe to the Cookbook!</h3>
        <Form className={classes.addForm} onSubmit={(e) => this.submitForm(e)}>
          <FormGroup row>
            <Label sm={3} for="recipeTitle" className={classes.label}>
              Recipe title
            </Label>
            <Col sm={9}>
              <Input id="recipeTitle" type="text" name="name" onChange={(e) => this.validateField(e)}></Input>
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
                onChange={(e) => this.validateField(e)}
              />
            </Col>
          </FormGroup>
          <hr />
          <FormGroup row className={classes.ingredientsList}>
            <Label sm={3} for="recipeIngredient" className={classes.label}>Ingredients:</Label>
            <Col sm={7}>
              <Input
                id="recipeIngredient"
                type="text"
                name="ingredient"
                onChange={(e) => this.handleIngredientChange(e)}
                ref={this.inputIngredientRef}
              />
            </Col>
            <Button
              color="success"
              className={classes.formButton}
              onClick={this.handleIngredientSubmit}>
              Add
              </Button>
          </FormGroup>
          {this.state.ingredients.length > 0 &&
            <ul className={classes.list}>
              {this.state.ingredients.map(({ value, id }) => {
                return <li key={id}>
                  <HighlightOffIcon
                    color="error"
                    onClick={(e) => this.removeItem(e, id)}
                  />
                  <p>{value}</p>
                </li>
              })}
            </ul>
          }
          <br />
          <Button color="warning" className={classes.formButton}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addRecipe
}

export default withRouter(connect(null, mapDispatchToProps)(AddRecipe));
