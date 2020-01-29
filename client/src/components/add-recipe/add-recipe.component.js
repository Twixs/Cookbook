import React, { Component } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import { withRouter } from "react-router-dom";
import Header from "../header/header.component";
import classes from "./add-recipe.module.scss";

class AddRecipe extends Component {
  state = {
    name: "",
    description: ""
  };

  submitForm = e => {
    e.preventDefault();
    if (this.state.name.trim() && this.state.description.trim()) {
      axios
        .post("/api/recipes", this.state)
        .then(res => {
          if (res.status === 200) {
            alert("Your recipe has successfully been saved!");
            this.props.history.push("/");
          }
        })
        .catch(err => console.log(err));
    }
  };

  validateTitle = e => {
    this.setState({ name: e.target.value });
  };

  validateDesc = e => {
    this.setState({ description: e.target.value });
  };

  render() {
    return (
      <div className={classes.addRecipeBlock}>
        <Header />
        <h3 className={classes.pageTitle}>Add new recipe to the Cookbook!</h3>
        <Form className={classes.addForm} onSubmit={e => this.submitForm(e)}>
          <FormGroup row>
            <Label sm={3} for="recipeTitle" className={classes.label}>
              Recipe title
            </Label>
            <Col sm={9}>
              <Input
                id="recipeTitle"
                type="text"
                name="title"
                onChange={e => this.validateTitle(e)}
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
                onChange={e => this.validateDesc(e)}
              ></Input>
            </Col>
          </FormGroup>
          <Button color="warning" className={classes.formButton}>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(AddRecipe);
