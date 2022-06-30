import React from 'react'; 
// import { NavLink } from 'react-router-dom';
import './Card.sass';

function Card({title, image, diets}) {
  return (
    <li className='card'>
      <h1>{title}</h1>
      <p>{diets.join(", ")}</p>
      <img className='food' src={image} alt=""></img>
    </li>
  );
}
export default Card;


/* function Card({id, tittle, image, summary, health_score, steps, diets}) {
<h1>{tittle}</h1>
<p>ID: {id}</p>
<p>{summary}</p>
<p>Health Score: {health_score}</p>
<p>Steps: {steps}</p>
<p>Diets: {diets.join(", ")}</p> */