/* eslint-disable brace-style */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable func-names */
import axios from 'axios';
import { store } from '../store';

export function updateRecipes() {
  return async function (dispatch) {
    try {
      const res = await axios.get('/recipes/database');
      const responseCopy = res.data;
      const res2 = await axios.get('/recipes/stored');
      const response2Copy = res2.data.results;
      for (const i in responseCopy) {
        const diets = [];
        responseCopy[i].healthScore = responseCopy[i].health_score;
        delete responseCopy[i].health_score;
        for (let k = 0; k < responseCopy[i].Diets.length; k++) {
          diets.push(responseCopy[i].Diets[k].name);
        }
        delete responseCopy[i].Diets;
        responseCopy[i].diets = diets;
      }
      for (const i in response2Copy) {
        const steps = [];
        if (response2Copy[i].analyzedInstructions[0]) {
          for (
            let k = 0;
            k < response2Copy[i].analyzedInstructions[0].steps.length;
            k++
          ) {
            steps.push(response2Copy[i].analyzedInstructions[0].steps[k].step);
          }
          response2Copy[i].steps = steps;
        }
      }
      dispatch({
        type: 'updateRecipes',
        payload: [...responseCopy, ...response2Copy],
      });
    } catch (error) {
      const res2 = await axios.get('/recipes/stored');
      const response2Copy = res2.data.results;
      for (const i in response2Copy) {
        let steps = '';
        if (response2Copy[i].analyzedInstructions[0]) {
          for (
            let k = 0;
            k < response2Copy[i].analyzedInstructions[0].steps.length;
            k++
          ) {
            steps += response2Copy[i].analyzedInstructions[0].steps[k].step;
          }
          response2Copy[i].steps = steps;
        }
      }
      dispatch({ type: 'updateRecipes', payload: response2Copy });
    }
  };
}

export function updateCurrentPage(payload) {
  const { currentPage } = store.getState().recipes;
  return function (dispatch) {
    if (payload === 'next') dispatch({ type: 'updateCurrentPage', payload: currentPage + 1 });
    else if (payload === 'prev') dispatch({ type: 'updateCurrentPage', payload: currentPage - 1 });
    else dispatch({ type: 'updateCurrentPage', payload });
  };
}

export function orFilBy({
  filter, order, input, origin,
}) {
  let sortedArr;
  const recipes = [...store.getState().recipes.recipes];
  // Sort
  if (order === 'A-Z') sortedArr = recipes.sort((a, b) => a.title.localeCompare(b.title));
  else if (order === 'Z-A') sortedArr = recipes.sort((a, b) => b.title.localeCompare(a.title));
  else if (order === 'H') sortedArr = recipes.sort((a, b) => b.healthScore - a.healthScore);
  else if (order === 'L') sortedArr = recipes.sort((a, b) => a.healthScore - b.healthScore);
  else sortedArr = recipes;
  // Filter by diet
  if (filter.length) {
    if (filter === 'Ovo-Vegetarian' || filter === 'Lacto-Vegetarian') {
      sortedArr = sortedArr.filter((recipe) => recipe.diets.includes('lacto ovo vegetarian'));
    }
    else if (filter === 'Whole30') sortedArr = sortedArr.filter((recipe) => recipe.diets.includes('whole 30'));
    else sortedArr = sortedArr.filter((recipe) => recipe.diets.includes(filter.toLowerCase()));
  }
  // Filter by where the info is coming from
  if (origin === 'API') sortedArr = sortedArr.filter((recipe) => !/[a-zA-Z]/.test(recipe.id));
  else if (origin === 'DB') sortedArr = sortedArr.filter((recipe) => /[a-zA-Z]/.test(recipe.id));
  // Filter by input
  if (input) sortedArr = sortedArr.filter((recipe) => recipe.title.toLowerCase().includes(input.toLowerCase()));

  return function (dispatch) {
    dispatch({ type: 'fakeRecipes', payload: sortedArr });
  };
}

export function resetOrFilBy() {
  return function (dispatch) {
    dispatch({ type: 'resetOrFilBy' });
  };
}
