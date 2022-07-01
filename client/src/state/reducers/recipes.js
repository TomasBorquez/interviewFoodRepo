const initialState = {
  onFilter: 0,
  recipes: [],
  fRecipes: [],
  request: true,
  currentPage: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'fakeRecipes':
      return {
        ...state,
        fRecipes: action.payload,
        onFilter: state.onFilter + 1,
      };
    case 'resetOrFilBy':
      return {
        ...state,
        fRecipes: [...state.recipes],
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
