/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Card.sass';
import heart from '../../img/heart.svg';

function Card({
  id, title, image, diets, healthScore,
}) {
  const handleDiets = () => {
    if (diets.length) {
      return diets.map((diet, i) => {
        if (i < 2) {
          return (
            <div key={i} className="diet">
              {diet}
            </div>
          );
        }
        if (diets.length >= 3 && i === 2) {
          return (
            <div key={i} className="nDiet">
              ...
            </div>
          );
        }
        return null;
      });
    }
    return <div className="nDiet"> No diets :( </div>;
  };

  const handleHeart = () => {
    if (healthScore < 40) return 'heart-red';
    if (healthScore < 60) return 'heart-orange';
    if (healthScore < 80) return 'heart-yellow';
    return 'heart-green';
  };

  const handleHealthScore = () => {
    if (healthScore < 40) return 'healthScore-red';
    if (healthScore < 60) return 'healthScore-orange';
    if (healthScore < 80) return 'healthScore-yellow';
    return 'healthScore-green';
  };

  return (
    <li className="card">
      <h1 className="text-overflow-center" id="title">
        {title}
      </h1>
      <img className="food" src={image} alt="" />
      <Link id="question_mark" to={`/details/${id}`}>
        ?
      </Link>
      <div id="diets">{handleDiets()}</div>
      <p id={handleHealthScore()}>{healthScore}</p>
      <img id={handleHeart()} src={heart} alt="heart" />
    </li>
  );
}

Card.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  diets: PropTypes.array.isRequired,
  healthScore: PropTypes.number.isRequired,
};

export default Card;
