import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import heart from '../../img/heart.svg'
import * as actions from '../../state/actions/index.js';
import light from '../../img/sun-512.png';
import './Detail.sass';

function Detail({ id }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  // Redux Stuff
  const dispatch = useDispatch();
  const { updateRecipes } = bindActionCreators(actions, dispatch);
  var recipes = useSelector(state => state.recipes.recipes);
  useEffect(() => {
    if (isNaN(id)) {
      if (!recipes.length) {
        updateRecipes();
        setLoading(!loading)
      }
      else if (!recipe && recipes.length) {
        setRecipe(recipes.find(recipe => recipe.id === id));
        setLoading(!loading)
      }
    } else {
      if (!recipes.length) {
        updateRecipes();
        setLoading(!loading)
      }
      else if (!recipe && recipes.length) {
        setRecipe(recipes.find(recipe => recipe.id === Number(id)));
        setLoading(!loading)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes]);
  const handleHeart = () => {
    if (recipe.healthScore < 40) return 'detail-heart-red'
    else if (recipe.healthScore < 60) return 'detail-heart-orange'
    else if (recipe.healthScore < 80) return 'detail-heart-yellow'
    else return 'detail-heart-green'
  }
  const handleHealthScore = () => {
    if (recipe.healthScore < 40) return 'detail-healthScore-red'
    else if (recipe.healthScore < 60) return 'detail-healthScore-orange'
    else if (recipe.healthScore < 80) return 'detail-healthScore-yellow'
    else return 'detail-healthScore-green'
  }
  const handleDiets = () => {
    if (recipe.diets.length) return recipe.diets.map((diet, i) => <div key={i} className='diet'>{diet}</div>)
    else return <div className='nDiet'>No diets</div>
  }
  if (loading && !recipe) {
    return (
      <div>
        <nav id="nav">
          <NavLink to="/home" id="company">
            <div id="circle"></div>
            <h1 id="myCompany">My company</h1>
          </NavLink>
          <div id="lighter">
            <button id="lightSwitcherr">
              <img id="light" src={light} alt=""></img>
            </button>
          </div>
        </nav>
        <h1>Loading</h1>
      </div>
    );
  }
  else if (!recipe && recipes)
    return (
      <div>
        <nav id="nav">
          <NavLink to="/home" id="company">
            <div id="circle"></div>
            <h1 id="myCompany">My company</h1>
          </NavLink>
          <div id="lighter">
            <button id="lightSwitcherr">
              <img id="light" src={light} alt=""></img>
            </button>
          </div>
        </nav>
        <h1>404 page not found</h1>
      </div>
    );
  else
    return (
      <div>
        <nav id="nav">
          <NavLink to="/home" id="company">
            <div id="circle"></div>
            <h1 id="myCompany">My company</h1>
          </NavLink>
          <div id="lighter">
            <button id="lightSwitcherr">
              <img id="light" src={light} alt=""></img>
            </button>
          </div>
        </nav>
        <div id='tuCards'>
          <div id='card1'>
            <li id="detail">
              <p id={handleHealthScore()}>{recipe.healthScore}</p>
              <img id={handleHeart()} src={heart} alt='heart'></img>
              <h1 id='title1'>{recipe.title}</h1>
              <img id='img-detail' src={recipe.image} alt=""></img>
              <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
              <div id='dietas'>{handleDiets()}</div>
            </li>
          </div>
          <div id='card2'>
            <h1 id='title2'>Steps</h1>
            <p id={recipe.steps ? 'texto' : 'texto_rojo'}>{recipe.steps || 'No steps...'}</p>
          </div>
        </div>
      </div>
    );
}
export default Detail;
