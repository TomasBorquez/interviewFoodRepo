import React from 'react'; 
import { NavLink } from 'react-router-dom';
import './Card.sass';

function Card({id, title, image, diets}) {
  const handleDiets = () => {
    if (diets.length) {
      return diets.map((diet, i) => {
        if (i === 3) return <div className='diet'>...</div>
        else if (i <= 3) return <div className='diet'>{diet}</div>
      })
    }
    else return "No diets"
  }
  return (
    <li className='card'>
      <h1 className="text-overflow-center" id='title'>{title}</h1>
      <img className='food' src={image} alt=""></img>
      <NavLink id='question_mark' to={`/details/${id}`}>?</NavLink>
      <div id='diets'>{handleDiets()}</div>
    </li>
  );
}
export default Card;