import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index.js';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// -- { Other way } --
// import { createStore } from 'redux'
// import rootReducer from '../reducers'
// const store = (initialState) => createStore(rootReducer, initialState)
// export default store
