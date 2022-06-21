const { Router } = require('express');
const { Recipe } = require('../db');
const router = Router();

// Requests get
router.get('/', async (req, res) => {
  const { name } = req.query; // Human Elf Demon...
  try {
    if (name) {
      const response = await Recipe.findAll({ where: {name} });
      if (!response.length) res.status(404).send("No recipes in the data base");
      else res.status(201).send(response);
    } else {
      const response = await Recipe.findAll();
      if (!response.length) res.status(404).send("No recipes in the data base");
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
      const c = await recipe.addDiets([1, 3, 7]);
      console.log(c)
      // console.log("this is the proto", recipe.__proto__);
      // res.status(201).send(`Your recipe ${name} was correctly created :D`);
      const a = await recipe.getDiets()
      res.status(201).send(a);
    } catch (error) {
      res.status(404).send("There was an error" + error);
    }
  } else {
    res.status(404).send(`There was an error`);
  }
});

module.exports = router;


// const a = await recipe.getDiets()
