import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/home/home.component";
import AddRecipe from "./components/add-recipe/add-recipe.component";
import EditRecipe from "./components/edit-recipe/edit-recipe.component";

const App = () => {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/add-recipe">
        <AddRecipe />
      </Route>
      <Route path="/edit-recipe/:id">
        <EditRecipe />
      </Route>
    </Router>
  );
};

export default App;
