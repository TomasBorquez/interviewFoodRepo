import { store } from '../store.js';
import axios from 'axios';

export function updateRecipes() {
  return async function (dispatch) {
    try {
      const res = await axios.get('http://localhost:3001/recipes/database');
      let responseCopy = res.data
      for (let i in responseCopy) {
        let diets = []
        responseCopy[i].healthScore = responseCopy[i].health_score
        delete responseCopy[i].health_score
        for (let k = 0; k < responseCopy[i].Diets.length; k++) {
          diets.push(responseCopy[i].Diets[k].name)
        }
        delete responseCopy[i].Diets
        responseCopy[i]["diets"] = diets
      }
      const res2 = await axios.get('http://localhost:3001/recipes/stored');
      let response2Copy = res2.data.results
      for (let i in response2Copy) {
        let steps = []
        if (response2Copy[i].analyzedInstructions[0]) {
          for (let k = 0; k < response2Copy[i].analyzedInstructions[0].steps.length; k++) {
            steps.push(response2Copy[i].analyzedInstructions[0].steps[k].step)
          }
          response2Copy[i]["steps"] = steps
        }
      }
      dispatch({ type: 'updateRecipes', payload: [...responseCopy, ...response2Copy] });
    } catch (error) {
      const res2 = await axios.get('http://localhost:3001/recipes/stored');
      let response2Copy = res2.data.results
      for (let i in response2Copy) {
        let steps = ''
        if (response2Copy[i].analyzedInstructions[0]) {
          for (let k = 0; k < response2Copy[i].analyzedInstructions[0].steps.length; k++) {
            steps += response2Copy[i].analyzedInstructions[0].steps[k].step
          }
          response2Copy[i]["steps"] = steps
        }
      }
      dispatch({ type: 'updateRecipes', payload: response2Copy });
    }
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

export function orFilBy(filter, sort, inputFilter, reset) {
  var sortedArr
  const recipes = [...store.getState().recipes.recipes]
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
    if (inputFilter) { 
      sortedArr = sortedArr.filter(recipe => recipe.title.toLowerCase().includes(inputFilter.toLowerCase()))
    }
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
    if (inputFilter) { 
      sortedArr = recipes.filter(recipe => recipe.title.toLowerCase().includes(inputFilter.toLowerCase()))
    }
  }
  return function (dispatch) {
    if (sortedArr) {
      dispatch({ type: 'fakeRecipes', payload: sortedArr});
    }
  };
}

export function resetOrFilBy() {
  return function (dispatch) {
    dispatch({ type: 'resetOrFilBy' });
  };
}