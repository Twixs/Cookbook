import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

import classes from './add-recipe.module.scss';

import { addRecipe } from '../../actions';

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
  }

  submitForm = (e) => {
    e.preventDefault();
    if (this.state.name.trim() && this.state.description.trim()) {
      this.props.addRecipe(this.state);
      this.props.history.push('/');
    }
  };

  validateField = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
              ></Input>
            </Col>
          </FormGroup>
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
