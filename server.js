const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const recipes = require('./routes/api/recipe');

const app = express();

//BodyParser Middlware
app.use(bodyParser.json());

//DB config
const db = require("./config/key").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to Mongo!"))
  .catch(error => console.log("Error while connection establishment:", error));

// Use Routes
app.use('/api/recipes', recipes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
