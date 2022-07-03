import React from 'react'; 
import { NavLink } from 'react-router-dom';
import './Card.sass';

function Card({id, title, image, diets}) {
  return (
    <li className='card'>
      <NavLink to={`/details/${id}`}>details</NavLink>
      <h1>{title}</h1>
      <p>{diets.join(", ")}</p>
      <img className='food' src={image} alt=""></img>
    </li>
  );
}
export default Card;