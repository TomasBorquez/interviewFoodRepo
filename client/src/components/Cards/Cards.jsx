import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './Cards.sass';
import Card from '../Card/Card.jsx';

function Cards({ recipes, loading, cardsPerPage }) {
  const [currentRecipes, setCurrentRecipes] = useState([]);
  const currentPage = useSelector(state => state.recipes.currentPage);
  useEffect(() => {
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    setCurrentRecipes(recipes.slice(indexOfFirstCard, indexOfLastCard));
  }, [cardsPerPage, currentPage, recipes]);
  if (loading) {
    return (
      <div>
        <h1>Loading</h1>
        <h1>Loading</h1>
        <h1>Loading</h1>
        <h1>Loading</h1>
        <h1>Loading</h1>
        <h1>Loading</h1>
        <h1>Loading</h1>
        <h1>Loading</h1>
        <h1>Loading</h1>
        <h1>Loading</h1>
        <h1>Loading</h1>
        <h1>Loading</h1>
        <h1>Loading</h1>
        <h1>Loading</h1>
        <h1>Loading</h1>
        <h1>Loading</h1>
        <h1>Loading</h1>
        <h1>Loading</h1>
        <h1>Loading</h1>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <ol id="cards">
          {currentRecipes.map(recipe => {
            return (
            <Card
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              summary={recipe.summary}
              healthScore={recipe.healthScore}
              steps={recipe.steps}
              diets={recipe.diets}
            />
          )})}
        </ol>
      </React.Fragment>
    );
  }
}

export default Cards;
