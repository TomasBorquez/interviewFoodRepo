const initialState = {
  recipes: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'update':
      // console.log('we are inside update')
      // console.log(state);
      return {
        ...state,
        recipes: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
