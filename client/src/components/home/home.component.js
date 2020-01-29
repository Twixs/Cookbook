import React from "react";
import classes from './home.module.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import CardList from "../cards-list/card-list.component";
import Header from "../header/header.component";

const Home = () => {
  return (
      <div className={classes.home}>
        <Header />
        <CardList />
      </div>
  );
}

export default Home;