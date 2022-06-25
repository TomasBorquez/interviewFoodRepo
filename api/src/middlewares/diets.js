const { Router } = require('express');
const { Diet } = require('../db');
const router = Router();

const defaultDiets = [
  { name: 'Gluten Free' },
  { name: 'Ovo-Vegetarian' },
  { name: 'Primal' },
  { name: 'Ketogenic' },
  { name: 'Vegan' },
  { name: 'Dairy Free' },
  { name: 'Vegetarian' },
  { name: 'Pescetarian' },
  { name: 'Low FOODMAP' },
  { name: 'Lacto-Vegetarian' },
  { name: 'Paleo' },
  { name: 'Whole30' },
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
    res.status(404).send(error);
  }
});

module.exports = router;

// [x] GET /diets:
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
// Testing