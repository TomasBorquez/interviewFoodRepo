import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './Cards.sass';
import Card from '../Card/Card.jsx';

function Cards({ recipes, loading, cardsPerPage }) {
  const [currentRecipes, setCurrentRecipes] = useState([]);
  const currentPage = useSelector(state => state.recipes.currentPage);
  const onFilter = useSelector(state => state.recipes.onFilter);
  useEffect(() => {
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    setCurrentRecipes(recipes.slice(indexOfFirstCard, indexOfLastCard));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes, currentPage, onFilter]);
  console.log(recipes)
  if (loading) {
    return (
      <div>
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
              health_score={recipe.health_score}
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

// key={recipe.id}
// id={recipe.id}
// tittle={recipe.title}
// image={recipe.image}
// summary={recipe.summary}
// health_score={recipe.health_score}
// steps={recipe.steps}
// diets={recipe.diets}
