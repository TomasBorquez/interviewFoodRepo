const initialState = {
  recipes: [],
  request: true,
};

const rootReducer = (state = initialState, action) => {
  // console.log(state);
  switch (action.type) {
    case 'updateRecipes':
      return {
        ...state,
        recipes: action.payload,
      };
    case 'updateState':
      return {
        ...state,
        request: !state.request,
      };
    default:
      return state;
  }
};

export default rootReducer;
