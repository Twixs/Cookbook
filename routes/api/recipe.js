const express = require("express");
const router = express.Router();

// Recipe Model
const Recipe = require("../../models/Recipe");

// @route GET api/recipes
// @desc Get All Recipes
// @access Public
router.get("/", (req, res) => {
  Recipe.find()
    .sort({ date: -1 })
    .then(recipes => res.json(recipes));
});

// @route GET api/recipes/:id
// @desc Get Recipe by ID
// @access Public
router.get("/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(error => res.status(404).json({ success: false, message: error }));
});

// @route POST api/recipes
// @desc Create A Recipe
// @access Public
router.post("/", (req, res) => {
  const addRecipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    date: new Date()
  });

  addRecipe.save().then(recipe => res.json({ 'recipe': recipe, message: 'Recipe successfully added' }));
});

// @route PUT api/recipes/:id
// @desc Modify A Recipe
// @access Public
router.put("/:id", (req, res) => {
  const { name, description, id } = req.body;

  let query = { _id: id };
  let update = {
    name: name,
    description: description,
    date: new Date()
  }

  Recipe.findByIdAndUpdate(query, update, { new: true }, (err, recipe) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ 'recipe': recipe, message: 'Recipe updated' });
  });
});

// @route DELETE api/recipes/:id
// @desc Delete A Recipe
// @access Public
router.delete("/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true, message: 'Recipe deleted' })))
    .catch(error => res.status(404).json({ success: false, message: error }));
});

module.exports = router;
