// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../state/actions/index.js';
import Cards from '../Cards/Cards.jsx';
import './Home.sass';

var counter = 0

function Home() {
  const dispatch = useDispatch();
  const { updateRecipes, updateState } = bindActionCreators(actions, dispatch);
  const recipes = useSelector(state => state.recipes.recipes) 
  const request = useSelector(state => state.recipes.request) 
  useEffect(() => {
    console.log(`I was here: ${counter}`)
    counter++
    console.log(request);
    if (request) {
      async function serverRequest(){
        try {
          const response = await fetch('http://localhost:3001/filter/test');
          const json = await response.json();
          updateRecipes(json);
          updateState();
        } catch (err) {
          console.log("This is the error: " + err);
          updateState();
        }
      }
      serverRequest()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);
  return (
    <div>
      <Cards recipes={recipes} />
    </div>
  );
}
export default Home;
