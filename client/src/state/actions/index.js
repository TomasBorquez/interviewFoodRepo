export function updateRecipes(payload) {
  return async function(dispatch) {
      dispatch({ type: 'updateRecipes', payload });
  }
}

export function updateState() {
  return async function(dispatch) {
    dispatch({type: 'updateState'});
  }
}