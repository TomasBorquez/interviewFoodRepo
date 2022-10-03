/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';

import './Cards.sass';
import Card from '../Card/Card';
import spinner from '../../img/icons8-spinner-marco-5-90.png';

function Cards({ recipes, loading, cardsPerPage }) {
  const [currentRecipes, setCurrentRecipes] = useState([]);
  const currentPage = useSelector((state) => state.recipes.currentPage);
  useEffect(() => {
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    setCurrentRecipes(recipes.slice(indexOfFirstCard, indexOfLastCard));
  }, [currentPage, recipes]);

  if (loading) {
    return (
      <div id="spinner-container">
        <img src={spinner} id="spinner" alt="" />
      </div>
    );
  }

  return (
    <ol id="cards">
      {currentRecipes.map((recipe) => (
        <Card
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          image={recipe.image}
          healthScore={recipe.healthScore}
          diets={recipe.diets}
        />
      ))}
    </ol>
  );
}

Cards.propTypes = {
  recipes: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  cardsPerPage: PropTypes.number.isRequired,
};

// Verify array before expensive rerender
export default memo(Cards, isEqual);
