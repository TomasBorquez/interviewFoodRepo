const { Router } = require('express');
const { Review, Recipe } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
  const { name, starRating, body, idRecipe } = req.body;
  try {
    const review = await Review.create({
      name,
      star_rating: starRating,
      body,
      RecipeId: idRecipe,
    });
    const recipe = await Recipe.findOne({ where: { id: idRecipe } });
    let x = recipe.amount_reviews + 1;
    let amountReviewsCopy, averageReviewsCopy;
    if (recipe.average_reviews === null) {
      amountReviewsCopy = 0;
      averageReviewsCopy = 0;
    } else {
      amountReviewsCopy = recipe.amount_reviews;
      averageReviewsCopy = recipe.average_reviews;
    }
    let y = (averageReviewsCopy * amountReviewsCopy + review.star_rating) / x;
    const response = await recipe.update({
      amount_reviews: x,
      average_reviews: y,
    });
    res.status(201).send(response);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

router.get('/findall', async (req, res) => {
  try {
    const response = await Review.findAll();
    if (!response) res.status(404).send('No recipes at all!');
    else res.status(201).send(response);
  } catch (err) {
    console.log(err)
    res.status(404).send(err);
  }
})

router.get('/:idRecipe', async (req, res) => {
  const { idRecipe } = req.params;
  try {
    if (idRecipe) {
      const response = await Review.findAll({
        where: {
          RecipeId: idRecipe,
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


module.exports = router;
