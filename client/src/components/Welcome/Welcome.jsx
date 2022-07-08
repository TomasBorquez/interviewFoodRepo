import React from 'react';
import { NavLink } from 'react-router-dom';
import './Welcome.sass'
import Wave from '../../img/wave.png' 
import Salad from '../../img/salad.png' 
import light from '../../img/sun-512.png'
import Fish from '../../img/fish-8-64.png'

function Welcome() {
  return (
    <div>
      <nav id='nav'>
      <NavLink to=''>
        <div id='company'>
          <div id='circle'><img id='fish' src={Fish} alt='fish'></img></div>
          <h1 id='myCompany'>Limonada</h1>
        </div>
      </NavLink>
        <div id='lighter'>
          <button id='lightSwitcherr'><img id='light' src={light} alt=''></img></button>
        </div>
      </nav>
      <img src={Wave} id='wave' alt=''/>
      <img src={Salad} id='salad' alt=''/>
      <div id='line'></div>
      <p id='tittle1' className='tittle'><span className='brown'>SALAD</span> FRESH,</p>
      <p id='tittle2' className='tittle'><span className='brown'>SALAD</span> GOOD!</p>
      <p id='description'>{'We share to the world the best healthiest (and not healthiest) recipes with a very wide number of them, for every taste and diet. YOU can also create your own recipes and share them to your friends and the world!'}</p>
      <NavLink to="/home" id='ready-btn' className='big-btn'>I'm ready!</NavLink>
    </div>
  );
}
export default Welcome;