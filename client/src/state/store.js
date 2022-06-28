import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index.js';
import thunk from 'redux-thunk';

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

// -- { Other way } --
// import { createStore } from 'redux'
// import rootReducer from '../reducers'
// const store = (initialState) => createStore(rootReducer, initialState)
// export default store
