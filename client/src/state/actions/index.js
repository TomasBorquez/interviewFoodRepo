import { store } from '../store.js';

export function updateRecipes(payload) {
  return function (dispatch) {
    dispatch({ type: 'updateRecipes', payload });
  };
}

export function updateState() {
  return function (dispatch) {
    dispatch({ type: 'updateState' });
  };
}

export function updateCurrentPage(payload) {
  const currentPage = store.getState().recipes.currentPage;
  return function (dispatch) {
    if (payload === 'next') dispatch({ type: 'updateCurrentPage', payload: currentPage + 1 });
    else if (payload === 'prev') dispatch({ type: 'updateCurrentPage', payload: currentPage - 1 });
    else dispatch({ type: 'updateCurrentPage', payload });
  };
}

export function orFilBy(filter, sort) {
  var recipes = store.getState().recipes.recipes, sortedArr;
  if (sort === 'A-Z') sortedArr = recipes.sort((a, b) => a.title.localeCompare(b.title));
  else if (sort === 'Z-A') sortedArr = recipes.sort((a, b) => b.title.localeCompare(a.title))
  else if (sort === 'H') sortedArr = recipes.sort((a, b) => b.healthScore - a.healthScore)
  else if (sort === 'L') sortedArr = recipes.sort((a, b) => a.healthScore - b.healthScore)
  if (sortedArr) {
    if (filter === 'Gluten Free') sortedArr = sortedArr.filter(recipe => recipe.diets.includes(filter.toLowerCase()))
    else if (filter === 'Ovo-Vegetarian') sortedArr = sortedArr.filter(recipe => recipe.diets.includes('lacto ovo vegetarian'))
    else if (filter === 'Primal') sortedArr = sortedArr.filter(recipe => recipe.diets.includes(filter.toLowerCase()))
    else if (filter === 'Ketogenic') sortedArr = sortedArr.filter(recipe => recipe.diets.includes(filter.toLowerCase()))
    else if (filter === 'Vegan') sortedArr = sortedArr.filter(recipe => recipe.diets.includes(filter.toLowerCase()))
    else if (filter === 'Dairy') sortedArr = sortedArr.filter(recipe => recipe.diets.includes(filter.toLowerCase()))
    else if (filter === 'Lacto-Vegetarian') sortedArr = sortedArr.filter(recipe => recipe.diets.includes('lacto ovo vegetarian'))
    else if (filter === 'Pescetarian') sortedArr = sortedArr.filter(recipe => recipe.diets.includes(filter.toLowerCase()))//??
    else if (filter === 'Low') sortedArr = sortedArr.filter(recipe => recipe.diets.includes(filter.toLowerCase()))
    else if (filter === 'Lacto') sortedArr = sortedArr.filter(recipe => recipe.diets.includes(filter.toLowerCase()))
    else if (filter === 'Paleo') sortedArr = sortedArr.filter(recipe => recipe.diets.includes(filter.toLowerCase()))//??
    else if (filter === 'Low FOODMAP') sortedArr = sortedArr.filter(recipe => recipe.diets.includes(filter.toLowerCase()))//??
    else if (filter === 'Vegetarian') sortedArr = sortedArr.filter(recipe => recipe.diets.includes(filter.toLowerCase())) //??
    else if (filter === 'Whole30') sortedArr = sortedArr.filter(recipe => recipe.diets.includes('whole 30'))
    else if (filter === 'Dairy Free') sortedArr = sortedArr.filter(recipe => recipe.diets.includes(filter.toLowerCase()))
  } else {
    if (filter === 'Gluten Free') sortedArr = recipes.filter(recipe => recipe.diets.includes(filter.toLowerCase()))
    else if (filter === 'Ovo-Vegetarian') sortedArr = recipes.filter(recipe => recipe.diets.includes('lacto ovo vegetarian'))
    else if (filter === 'Primal') sortedArr = recipes.filter(recipe => recipe.diets.includes(filter.toLowerCase()))
    else if (filter === 'Ketogenic') sortedArr = recipes.filter(recipe => recipe.diets.includes(filter.toLowerCase()))
    else if (filter === 'Vegan') sortedArr = recipes.filter(recipe => recipe.diets.includes(filter.toLowerCase()))
    else if (filter === 'Dairy') sortedArr = recipes.filter(recipe => recipe.diets.includes(filter.toLowerCase()))
    else if (filter === 'Lacto-Vegetarian') sortedArr = recipes.filter(recipe => recipe.diets.includes('lacto ovo vegetarian'))
    else if (filter === 'Pescetarian') sortedArr = recipes.filter(recipe => recipe.diets.includes(filter.toLowerCase()))//??
    else if (filter === 'Low') sortedArr = recipes.filter(recipe => recipe.diets.includes(filter.toLowerCase()))
    else if (filter === 'Lacto') sortedArr = recipes.filter(recipe => recipe.diets.includes(filter.toLowerCase()))
    else if (filter === 'Paleo') sortedArr = recipes.filter(recipe => recipe.diets.includes(filter.toLowerCase()))//??
    else if (filter === 'Low FOODMAP') sortedArr = recipes.filter(recipe => recipe.diets.includes(filter.toLowerCase()))//??
    else if (filter === 'Vegetarian') sortedArr = recipes.filter(recipe => recipe.diets.includes(filter.toLowerCase())) //??
    else if (filter === 'Whole30') sortedArr = recipes.filter(recipe => recipe.diets.includes('whole 30'))
    else if (filter === 'Dairy Free') sortedArr = recipes.filter(recipe => recipe.diets.includes(filter.toLowerCase()))
  }
  return function (dispatch) {
    if (sortedArr) {
      dispatch({ type: 'fakeRecipes', payload: sortedArr});
    }
  };
}
