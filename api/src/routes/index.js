// Libraries/Frameworks
const { Router } = require('express');
// MiddleWares
const dietMiddleware = require('../middlewares/diet.js');
const recipeMiddleware = require('../middlewares/recipe.js');

// Our server
const router = Router();

// Routes directing to Middlewares
router.use('/diet', dietMiddleware);
router.use('/recipe', recipeMiddleware);


module.exports = router;
