const initialState = {
  recipes: [],
  fRecipes: [],
  request: true,
  reload: true,
  currentPage: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'fakeRecipes':
      console.log(action.payload);
      return {
        ...state,
        fRecipes: action.payload,
      };
    case 'updateRecipes':
      return {
        ...state,
        recipes: action.payload,
        fRecipes: action.payload,
      };
    case 'updateState':
      return {
        ...state,
        request: !state.request,
      };
    case 'updateCurrentPage':
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
