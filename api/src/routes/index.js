// Libraries/Frameworks
const { Router } = require('express');
// MiddleWares
const dietsMiddleware = require('../middlewares/diets.js');
const recipesMiddleware = require('../middlewares/recipes.js');
const filterController = require('../controllers/filter.js');

// Our server
const router = Router();

// Routes directing to Middlewares
router.use('/diets', dietsMiddleware);
router.use('/recipes', recipesMiddleware);
router.use('/filter', filterController);

module.exports = router;
