// Libraries/Frameworks
const { Router } = require('express');
// MiddleWares
const dietsMiddleware = require('../middlewares/diets.js');
const recipesMiddleware = require('../middlewares/recipes.js');
const reviewsMiddleware = require('../middlewares/reviews.js');

// Our server
const router = Router();

// Routes directing to Middlewares
router.use('/diets', dietsMiddleware);
router.use('/recipes', recipesMiddleware);
router.use('/reviews', reviewsMiddleware);

module.exports = router;
