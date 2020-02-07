import React from 'react';
import classes from './header.module.scss';
import { Link } from 'react-router-dom';
import add_icon from '../../assets/add_icon.png';

const Header = () => {
  return (
    <header className={classes.header}>
      <Link to="/">
        <h1>Cookbook</h1>
      </Link>
      <Link to="/add-recipe">
        <h5>
          <img className={classes.addIcon} src={add_icon} alt="Add recipe"></img>
          Add recipe
        </h5>
      </Link>
    </header>
  );
};

export default Header;
