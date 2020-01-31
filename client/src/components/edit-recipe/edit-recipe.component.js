import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import classes from './edit-recipe.module.scss';
import SnackbarMessage from '../snackbar/snackbar.component';

class EditRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: '',
      description: '',
      snackbar: {
        show: false,
        message: '',
        status: '',
      },
    };
  }

  componentWillMount() {
    this.props.setLoading(true);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`/api/recipes/${id}`)
      .then((res) => {
        this.setState({
          name: res.data.name,
          description: res.data.description,
        });
      })
      .then(() => this.props.setLoading(false))
      .catch((err) => console.log(err));
  }

  submitForm = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    if (this.state.name.trim() && this.state.description.trim()) {
      axios
        .put(`/api/recipes/${id}`, this.state)
        .then((res) => {
          this.setState({
            snackbar: {
              show: true,
              message: 'The recipe has been successfully updated',
              status: 'success',
            },
          });
          if (res.status === 200) {
            setTimeout(() => {
              this.props.history.push('/');
            }, 1000);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  validateField = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  deleteRecipe = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    axios
      .delete(`/api/recipes/${id}`)
      .then((res) => {
        this.setState({
          snackbar: {
            show: true,
            message: `The recipe "${this.state.name}" has been deleted`,
            status: 'error',
          },
        });
        if (res.status === 200) {
          setTimeout(() => {
            this.props.history.push('/');
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className={classes.editRecipeBlock}>
        <SnackbarMessage snackbar={this.state.snackbar} />
        <h3 className={classes.pageTitle}>Edit "{this.state.name}" recipe</h3>
        <Form className={classes.editForm} onSubmit={(e) => this.submitForm(e)}>
          <FormGroup row>
            <Label sm={3} for="recipeTitle" className={classes.label}>
              Recipe title
            </Label>
            <Col sm={9}>
              <Input
                id="recipeTitle"
                type="text"
                name="name"
                value={this.state.name}
                onChange={(e) => this.validateField(e)}
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
                value={this.state.description}
                onChange={(e) => this.validateField(e)}
              ></Input>
            </Col>
          </FormGroup>
          <FormGroup className={classes.buttonGroup}>
            <Button color="warning" className={classes.formButton} type="submit">
              Submit
            </Button>
            <Button color="danger" className={classes.formButton} onClick={(e) => this.deleteRecipe(e)}>
              Delete
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default withRouter(EditRecipe);
