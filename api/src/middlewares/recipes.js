// Libraries and such
const { Router, response } = require('express');
const axios = require('axios');
const router = Router();
// Our modules
const { APIKEY } = process.env;
const { Review, Recipe, Diet } = require('../db');

let information

router.get('/stored', async (req, res) => {
  try {
    if (!information) {
      const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`)
      information = response.data
      res.status(201).send(response.data)
    } else res.status(201).send(information)
  } catch (error) {
    res.status(404).send(error)
  }
});

router.get('/database', async (req, res) => {
  try {
    const response = await Recipe.findAll({
      include: {
        model: Diet,
      },
    });
    if (!response.length) res.status(404).send('No recipes in the data base');
    else res.status(201).send(response);
  } catch (error) {
    console.log(error)
    res.status(404).send(error);
  }
});

router.get('/:idRecipe', async (req, res) => {
  const { idRecipe } = req.params;
  try {
    if (idRecipe) {
      const response = await Recipe.findByPk(idRecipe, {
        include: {
          model: Diet,
        },
      });
      if (!response) res.status(404).send('Such recipe does not exist');
      else res.status(201).send(response);
    } else {
      res.status(404).send('No recipe id recieved');
    }
  } catch (err) {
    res.status(404).send(err);
  }
});

router.delete('/:idRecipe', async (req, res) => {
  const { idRecipe } = req.params;
  try {
    if (idRecipe) {
      await Review.destroy({ where: { RecipeId: idRecipe } });
      const response1 = await Recipe.destroy({ where: { id: idRecipe } });
      if (!response1) res.status(404).send('Such recipe does not exist');
      else res.status(204).send('Successfully deleted');
    } 
    else res.status(404).send('No recipe id recieved');
  } catch (err) {
    res.status(404).send(err);
  }
})

router.post('/', async (req, res) => {
  const { title, image, summary, healthScore, steps, diets } = req.body;
  if (title && image && summary) {
    try {
      const recipe = await Recipe.create({
        title,
        image,
        summary,
        health_score: healthScore,
        steps,
      });
      if (diets) {
        await recipe.addDiets(diets);
        const united = await recipe.getDiets();
        res.status(201).send(united);
      } 
      else res.status(201).send(`${title} has been correctly created`);
    } catch (err) {
      if (err.errors[0].message) res.status(400).send(err.errors[0].message);
      else res.status(400).send(err);
    }
  } else {
    res.status(400).send('There was an error');
  }
});

module.exports = router;