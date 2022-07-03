const { Router } = require('express');
const { Diet } = require('../db');
const router = Router();

const defaultDiets = [
  { name: 'gluten free' },
  { name: 'ovo vegetarian' },
  { name: 'primal' },
  { name: 'ketogenic' },
  { name: 'vegan' },
  { name: 'dairy free' },
  { name: 'vegetarian' },
  { name: 'pescetarian' },
  { name: 'low foodmap' },
  { name: 'lacto vegetarian' },
  { name: 'paleo' },
  { name: 'whole 30' },
];

// Requests get
router.get('/', async (req, res) => {
  try {
    const response = await Diet.findAll();
    if (!response.length) {
      Diet.bulkCreate(defaultDiets);
      const response = await Diet.findAll();
      // console.log(">> Had to create them");
      res.status(201).send(response);
    } else {
      // console.log(">> They were already here");
      res.status(201).send(response);
    }
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;

// [x] GET /diets:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá