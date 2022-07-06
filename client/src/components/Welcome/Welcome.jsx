import React from 'react';
import { NavLink } from 'react-router-dom';
import './Welcome.sass'
import Wave from '../../img/wave.png' 
import Salad from '../../img/salad.png' 
import light from '../../img/sun-512.png'

function Welcome() {
  return (
    <div>
      <nav id='nav'>
      <NavLink to=''>
        <div id='company'>
          <div id='circle'></div>
          <h1 id='myCompany'>My company</h1>
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
      <p id='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud. We gon get the jugs, get it girl!</p>
      <NavLink to="/home" id='ready-btn' className='big-btn'>I'm ready!</NavLink>
    </div>
  );
}
export default Welcome;