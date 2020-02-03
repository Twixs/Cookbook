import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classes from './add-recipe.module.scss';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

import SnackbarMessage from '../snackbar/snackbar.component';
import LoaderContext from '../../loader-context';

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      snackbar: {
        show: false,
        message: '',
        status: '',
      },
    };
  }

  static contextType = LoaderContext;

  componentDidMount() {
    this.context.setLoading(false);
  }

  submitForm = (e) => {
    e.preventDefault();
    if (this.state.name.trim() && this.state.description.trim()) {
      axios
        .post('/api/recipes', this.state)
        .then((res) => {
          this.setState({
            snackbar: {
              show: true,
              message: 'Your recipe has successfully been saved!',
              status: 'success',
            },
          });
          if (res.status === 200) {
            setTimeout(() => this.props.history.push('/'), 1000);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  validateField = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className={classes.addRecipeBlock}>
        <SnackbarMessage snackbar={this.state.snackbar} />
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

export default withRouter(AddRecipe);
