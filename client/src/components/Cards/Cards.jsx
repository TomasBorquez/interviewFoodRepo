import React from 'react';
// import { NavLink } from 'react-router-dom';
import './Cards.sass';
import Card from '../Card/Card.jsx';

function Cards({ recipes }) {
  // console.log("-------");
  // console.log(recipes[0].id)
  // console.log(recipes[0].tittle)
  // console.log(recipes[0].image)
  // console.log(recipes[0].summary)
  // console.log(recipes[0].health_score)
  // console.log(recipes[0].steps)
  // console.log(recipes[0].diets)
  // console.log("-------");
  return (
    <React.Fragment>
      <ol id='cards'>
        {recipes.map(recipe => (
          <Card
            key={recipe.id}
            id={recipe.id}
            tittle={recipe.tittle}
            image={recipe.image}
            summary={recipe.summary}
            health_score={recipe.health_score}
            steps={recipe.steps}
            diets={recipe.diets}
          />
        ))}
      </ol>
  </React.Fragment>
  );
}

export default Cards;
