/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Reviews from '../Reviews/Reviews';

import Fish from '../../img/fish-8-64.png';
import heart from '../../img/heart.svg';
import spinner from '../../img/icons8-spinner-marco-5-90.png';
import * as actions from '../../state/actions/index';
import './Detail.sass';

function Detail({ id }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  // Redux Stuff
  const dispatch = useDispatch();
  const { updateRecipes } = bindActionCreators(actions, dispatch);
  const recipes = useSelector((state) => state.recipes.recipes);

  useEffect(() => {
    if (!recipes.length) {
      setLoading(true);
      updateRecipes();
    } else if (isNaN(id)) {
      setRecipe(recipes.find((recipeTemp) => recipeTemp.id === id));
      setLoading(false);
    } else {
      setRecipe(recipes.find((recipeTemp) => recipeTemp.id === Number(id)));
      setLoading(false);
    }
  }, [recipes]);

  const handleHeart = () => {
    if (recipe.healthScore < 40) return 'detail-heart-red';
    if (recipe.healthScore < 60) return 'detail-heart-orange';
    if (recipe.healthScore < 80) return 'detail-heart-yellow';
    return 'detail-heart-green';
  };

  const handleHealthScore = () => {
    if (recipe.healthScore < 40) return 'detail-healthScore-red';
    if (recipe.healthScore < 60) return 'detail-healthScore-orange';
    if (recipe.healthScore < 80) return 'detail-healthScore-yellow';
    return 'detail-healthScore-green';
  };

  const handleDiets = () => {
    if (recipe.diets.length) return recipe.diets.map((diet, i) => <div key={i} className="diet">{diet}</div>);
    return <div className="nDiet">No diets :(</div>;
  };

  if (loading) {
    return (
      <div>
        <nav id="nav">
          <NavLink to="/home" id="company">
            <div id="circle"><img id="fish" src={Fish} alt="fish" /></div>
            <h1 id="myCompany">Limonada</h1>
          </NavLink>
        </nav>
        <div id="spinner-container">
          <img src={spinner} id="spinner" alt="" />
        </div>
      </div>
    );
  }

  if (!recipe && recipes) {
    return (
      <div>
        <nav id="nav">
          <NavLink to="/home" id="company">
            <div id="circle"><img id="fish" src={Fish} alt="fish" /></div>
            <h1 id="myCompany">Limonada</h1>
          </NavLink>
        </nav>
        <div className="center-me">
          <h1>404 page not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav id="nav">
        <NavLink to="/home" id="company">
          <div id="circle"><img id="fish" src={Fish} alt="fish" /></div>
          <h1 id="myCompany">Limonada</h1>
        </NavLink>
      </nav>
      <div>
        <div id="tuCards">
          <div id="card1">
            <p id={handleHealthScore()}>{recipe.healthScore}</p>
            <img id={handleHeart()} src={heart} alt="heart" />
            <h1 id="title1">{recipe.title}</h1>
            <img id="img-detail" src={recipe.image} alt="" />
            <p className="intro">Summary:</p>
            <div className="texto" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
            <p className="intro">Diets:</p>
            <div id="dietas">{handleDiets()}</div>
          </div>
          <div id="card2">
            <h1 id="title2">Steps</h1>
            <p className={recipe.steps ? 'texto' : 'texto_rojo'}>{recipe.steps || 'No steps...'}</p>
          </div>
        </div>
        {isNaN(id) && <Reviews recipe={recipe} />}
      </div>
    </div>
  );
}

Detail.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Detail;
