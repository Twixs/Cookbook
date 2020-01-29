import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import Home from './components/home/home.component';
import Header from './components/header/header.component';
import AddRecipe from './components/add-recipe/add-recipe.component';
import EditRecipe from './components/edit-recipe/edit-recipe.component';
import Spinner from './components/spinner/spinner.component';

class App extends Component {
  state = {
    isLoading: true,
  };

  setLoading = (bool) => {
    this.setState({ isLoading: bool });
  };

  render() {
    return (
      <Router>
        <Spinner show={this.state.isLoading} />
        <Header />
        <Route exact path="/">
          <Home setLoading={(bool) => this.setLoading(bool)} />
        </Route>
        <Route path="/add-recipe">
          <AddRecipe />
        </Route>
        <Route path="/edit-recipe/:id">
          <EditRecipe setLoading={(bool) => this.setLoading(bool)} />
        </Route>
      </Router>
    );
  }
}

export default App;
