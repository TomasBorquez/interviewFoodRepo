// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { NavLink } from 'react-router-dom';
import * as actions from '../../state/actions/index.js';
import Cards from '../Cards/Cards.jsx';
import './Home.sass';

function Home() {
  // console.log('step 1');
  const dispatch = useDispatch();
  // console.log('step 2');
  const { updateRecipes } = bindActionCreators(actions, dispatch);
  // console.log('step 3');
  updateRecipes()
  const response = useSelector(state => state.recipes);
  const recipes = response.recipes
  // console.log(recipes)
  // console.log('step 4');
  // useEffect(() => {
  //   console.log('entered here');
  //   function fetchData() {
  //     updateRecipes();
  //   }
  //   fetchData();
  // }, [recipes, updateRecipes]);
  return (
    <div>
      <Cards recipes={recipes}/>
    </div>
  );
}
export default Home;
