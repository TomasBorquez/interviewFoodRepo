import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import './Creator.sass';

function Creator() {
  const [recipe, setRecipe] = useState(null);
  // setRecipes(useSelector(state => state.recipes.recipes));
  useEffect(() => {
    async function serverRequest() {
      try {
        await axios.get('http://localhost:3001/filter/test');
      } catch (err) {
        console.log(`This is the error: ${err}`);
      }
    }
  }, [recipe]);
    return (
      <div>
        <h1>Hello world</h1>
      </div>
    );
}
export default Creator;
