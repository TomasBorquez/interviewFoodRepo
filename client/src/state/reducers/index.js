import { combineReducers } from "redux"
import recipesReducer from "./recipes.js"

const rootReducer = combineReducers({recipes: recipesReducer});

export default rootReducer