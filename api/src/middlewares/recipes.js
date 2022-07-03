// Libraries and such
const { Router } = require('express');
const axios = require('axios');
const router = Router();
// Our modules
const { Recipe, Diet } = require('../db');

// (--------{-------------[-({>>Requests get<<})-]-------------}-------)
// ----- {Request get, gets the information about a recipe by id} ------
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
// --------------- {Request get, gets all the recipes} ---------------
router.get('/', async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const response = await Recipe.findAll({
        where: { name },
        include: {
          model: Diet,
        },
      });
      if (!response.length) res.status(404).send('No recipes in the data base');
      else res.status(201).send(response);
    } else {
      const response = await Recipe.findAll({
        include: {
          model: Diet,
        },
      });
      if (!response.length) res.status(404).send('No recipes in the data base');
      else res.status(201).send(response);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});
// -----------------------------------------------------------------------


// (--------{--------------[-({>>Requests post<<})-]-------------}-------)
// ------------ {Request post, adds a recipe on the datebase} ------------
router.post('/', async (req, res) => {
  const { tittle, image, summary, health_score, steps, diets } = req.body;
  if (tittle && image && summary) {
    try {
      const recipe = await Recipe.create({
        tittle,
        image,
        summary,
        health_score,
        steps,
      });
      await axios.get('http://localhost:3001/diets');
      if (diets) {
        await recipe.addDiets(diets);
        const united = await recipe.getDiets();
        res.status(201).send(united);
      } else res.status(201).send(`${tittle} has been correctly created`);
    } catch (error) {
      res.status(404).send(`There was an error ${error}`);
    }
  } else {
    res.status(404).send(`There was an error`);
  }
});
// -----------------------------------------------------------------------

module.exports = router;

// [x] GET /recipes?name="...":
// Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
// Si no existe ninguna receta mostrar un mensaje adecuado
// [x] GET /recipes/{idReceta}:
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
// [x] POST /recipes:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos relacionada con sus tipos de dietas.