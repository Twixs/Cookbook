const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
    type: Array,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = Recipe = mongoose.model('recipe', RecipeSchema);