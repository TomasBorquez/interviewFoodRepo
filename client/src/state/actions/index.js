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
  // console.log(filter, sort);
  var recipes = store.getState().recipes.fRecipes, sortedArr;
  if (sort === 'A-Z') sortedArr = recipes.sort((a, b) => a.title.localeCompare(b.title));
  else if (sort === 'Z-A') sortedArr = recipes.sort((a, b) => a.title.localeCompare(b.title)).reverse();
  return function (dispatch) {
    if (sortedArr) {
      dispatch({ type: 'fakeRecipes', payload: sortedArr});
    }
    else {
      dispatch({ type: 'fakeRecipes', payload: recipes});
    }
  };
}
