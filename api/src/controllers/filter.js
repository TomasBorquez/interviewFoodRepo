// Our modules
const { Router } = require('express');
const theboys = require('./test.js')
const { APIKEY } = process.env;
// Libraries and such
const axios = require('axios');
const router = Router();

// All the recipes:
var merged = []

// (--------{-------------[-({>>Requests get<<})-]-------------}-------)
// --------- {Request get, merges both database and api data} ----------
router.get('/getall', async (req, res) => {
  try {
    const response = await axios.get("http://localhost:3001/recipes")
    const response2 = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`)
    // console.log(response2)
    merged = [response.data.results, response2.data];
    res.send(merged)
  } catch {
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`).then(result => {
      res.send(result.data.results);
    }).catch(err => {
      res.status(404).send(err);
    });
  }
});
// --------- {Request get, merges both database and api data} ----------
router.get('/test', async (req, res) => {
  res.send(theboys)
});
// -------------------- {Requests get, finds by id} --------------------
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (/[a-zA-Z]/.test(id)) {
      const response = await axios.get("http://localhost:3001/recipes")
      // console.log(response)
      const findRecipe = response.data.find(recipe => recipe.id === id)
      if (!findRecipe) res.status(404).send('Such recipe does not exist');
      else res.status(201).send(findRecipe);
    } else if (id) {
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`)
      // console.log(response)
      const findRecipe = response.data.results.find(recipe => recipe.id === id)
      if (!findRecipe) res.status(404).send('Such recipe does not exist');
      else res.status(201).send(findRecipe);
    }
  } catch (err) {
    // console.log(err)
    res.status(404).send(err);
  }
});
// ---------------------------------------------------------------------

module.exports = router;
