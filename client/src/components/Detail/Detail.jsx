import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Detail.sass';

function Detail({ id }) {
  const [recipe, setRecipe] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // setRecipes(useSelector(state => state.recipes.recipes));
  useEffect(() => {
    console.log(recipes);
    async function serverRequest() {
      try {
        const res = await axios.get('http://localhost:3001/filter/test');
        setRecipes(res.data);
      } catch (err) {
        console.log(`This is the error: ${err}`);
      }
    }
    if (isLoading) {
      serverRequest()
      setIsLoading(!isLoading)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  if (!recipe)
    return (
      <div>
        <h1>404 page not found</h1>
      </div>
    );
  else
    return (
      <li className="Detail">
        <h1>{recipe.tittle}</h1>
        <p>ID: {id}</p>
        <p>{recipe.summary}</p>
        <p>Health Score: {recipe.health_score}</p>
        <p>Steps: {recipe.steps}</p>
        <p>Diets: {recipe.diets.join(', ')}</p> */
      </li>
    );
}
export default Detail;
