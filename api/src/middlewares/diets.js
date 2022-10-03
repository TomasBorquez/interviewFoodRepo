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

router.get('/', async (req, res) => {
  try {
    await Diet.bulkCreate(defaultDiets);
    const response = await Diet.findAll();
    res.status(201).send(response);
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
