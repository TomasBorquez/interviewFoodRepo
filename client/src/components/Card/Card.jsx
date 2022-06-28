import React from 'react'; 
// import { NavLink } from 'react-router-dom';
import './Card.sass';

function Card({id, tittle, image, summary, health_score, steps, diets}) {
  return (
    <li className='card'>
      <h1>{tittle}</h1>
      <p>ID: {id}</p>
      <p>{summary}</p>
      <p>Health Score: {health_score}</p>
      <p>Steps: {steps}</p>
      <p>Diets: {diets.join(", ")}</p>
      <img className='food' src={image} alt=""></img>
    </li>
  );
}
export default Card;
