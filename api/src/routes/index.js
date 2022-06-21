// Libraries/Frameworks
const { Router } = require('express');
// MiddleWares
const dietsMiddleware = require('../middlewares/diets.js');
const recipesMiddleware = require('../middlewares/recipes.js');

// Our server
const router = Router();

// Routes directing to Middlewares
router.use('/diets', dietsMiddleware);
router.use('/recipes', recipesMiddleware);

module.exports = router;
