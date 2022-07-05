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
  return (
    <li className='card'>
      <h1 className="text-overflow-center" id='title'>{title}</h1>
      <img className='food' src={image} alt=""></img>
      <NavLink id='question_mark' to={`/details/${id}`}>?</NavLink>
      <div id='diets'>{handleDiets()}</div>
      <p id='healthScore'>{healthScore}</p>
      <img id='heart' src={heart} alt='heart'></img>
    </li>
  );
}
export default Card;