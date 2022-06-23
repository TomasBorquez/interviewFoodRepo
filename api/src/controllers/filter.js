// Our modules
const { Router, response } = require('express');
const { Recipe, Diet } = require('../db');
const { APIKEY } = process.env;
// Libraries and such
const axios = require('axios');
const router = Router();

// All the recipes:
var recipesArr = []

// ---------- {Requests get} ----------
router.get('/getall', async (req, res) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`)
    res.send(response.data.results)
  } catch (err) {
    res.status(404).send(err);
  }
});

// router.get('/:idRecipe', async (req, res) => {
//   const { idRecipe } = req.params;
//   try {
//     if (idRecipe) {
//       // const response = await Recipe.findOne({ where: { recipe_id: idRecipe } });
//       const response = await Recipe.findByPk(idRecipe, {
//         include: {
//           model: Diet,
//         },
//       });
//       if (!response) res.status(404).send('Such recipe does not exist');
//       else res.status(201).send(response);
//     } else {
//       res.status(404).send('No recipe id recieved');
//     }
//   } catch (err) {
//     res.status(404).send(err);
//   }
// });


module.exports = router;
