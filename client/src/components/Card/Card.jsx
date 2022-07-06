import React from 'react'; 
import { NavLink } from 'react-router-dom';
import './Card.sass';
import heart from '../../img/heart.svg'

function Card({id, title, image, diets, healthScore}) {
  const handleDiets = () => {
    if (diets.length) {
      // eslint-disable-next-line array-callback-return
      return diets.map((diet, i) => {
        if (i < 2) return <div key={i} className='diet'>{diet}</div>
        else if (diets.length >= 3 && i === 2) return <div key={i} className='nDiet'>...</div>
      })
    }
    else return <div className='nDiet'>No diets</div>
  }
  const handleHeart = () => {
    if (healthScore < 40) return 'heart-red'
    else if (healthScore < 60) return 'heart-orange'
    else if (healthScore < 80) return 'heart-yellow'
    else return 'heart-green'
  }
  const handleHealthScore = () => {
    if (healthScore < 40) return 'healthScore-red'
    else if (healthScore < 60) return 'healthScore-orange'
    else if (healthScore < 80) return 'healthScore-yellow'
    else return 'healthScore-green'
  }
  return (
    <li className='card'>
      <h1 className="text-overflow-center" id='title'>{title}</h1>
      <img className='food' src={image} alt=""></img>
      <NavLink id='question_mark' to={`/details/${id}`}>?</NavLink>
      <div id='diets'>{handleDiets()}</div>
      <p id={handleHealthScore()}>{healthScore}</p>
      <img id={handleHeart()} src={heart} alt='heart'></img>
    </li>
  );
}
export default Card;