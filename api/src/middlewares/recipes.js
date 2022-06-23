// Our modules
const { Router } = require('express');
const { Recipe, Diet } = require('../db');
// Libraries and such
const axios = require('axios');
const router = Router();


// Requests get
router.get('/:idRecipe', async (req, res) => {
  const { idRecipe } = req.params;
  try {
    if (idRecipe) {
      // const response = await Recipe.findOne({ where: { recipe_id: idRecipe } });
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

router.get('/', async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const response = await Recipe.findAll({ where: { name } });
      if (!response.length) res.status(404).send('No recipes in the data base');
      else res.status(201).send(response);
    } else {
      const response = await Recipe.findAll();
      if (!response.length) res.status(404).send('No recipes in the data base');
      else res.status(201).send(response);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

// Requests post
router.post('/', async (req, res) => {
  const { name, image, summary, health_score, steps, diets } = req.body;
  if (name && image && summary) {
    try {
      const recipe = await Recipe.create({
        name,
        image,
        summary,
        health_score,
        steps,
      });
      await axios.get("http://localhost:3001/diets");
      if (diets) {
        await recipe.addDiets(diets);
        const united = await recipe.getDiets();
        res.status(201).send(united);
      } else res.status(201).send(`${name} has been correctly created`);
    } catch (error) {
      res.status(404).send(`There was an error ${error}`);
    }
  } else {
    res.status(404).send(`There was an error`);
  }
});

module.exports = router;
