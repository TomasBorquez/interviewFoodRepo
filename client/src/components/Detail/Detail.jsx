import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Detail.sass';

function Detail({ id }) {
  const [recipe, setRecipe] = useState(null);
  let recipes = useSelector(state => state.recipes.recipes)
  useEffect(() => {
    async function serverRequest() {
      try {
        const res = await axios.get('http://localhost:3001/filter/test');
        // eslint-disable-next-line react-hooks/exhaustive-deps
        recipes = res.data;
      } catch (err) {
        console.log(`This is the error: ${err}`);
      }
    }
    if (isNaN(id)){
      if (!recipes && !recipe) serverRequest()
      else if (!recipe) setRecipe(recipes.find(recipe => recipe.id === id))
    } else {
      if (!recipes && !recipe) serverRequest()
      else if (!recipe) setRecipe(recipes.find(recipe => recipe.id === Number(id)))
    }
  }, [recipes]);
  if (!recipe)
    return (
      <div>
        <h1>404 page not found</h1>
      </div>
    );
  else
    return (
      <div>
        <NavLink to='/home'>Home</NavLink>
        <li className="Detail">
          <h1>{recipe.title}</h1>
          <p>ID: {id}</p>
          <div dangerouslySetInnerHTML={{__html: recipe.summary}}/>
          <p>Health Score: {recipe.healthScore}</p>
          <p>Steps: {recipe.steps}</p>
          <p>Diets: {recipe.diets.join(', ')}</p>
        </li>
      </div>
    );
}
export default Detail;
