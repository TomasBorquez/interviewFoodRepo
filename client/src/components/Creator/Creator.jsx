import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import light from '../../img/sun-512.png';
import './Creator.sass';

function Creator() {
  const initialState = {
    title: 'Title is required',
    summary: 'Summary is required',
    healthScore: 'Health score is required',
    image: 'Image is required',
  };
  const [serverResponse, setServerResponse] = useState('');
  const [isValid, setIsvalid] = useState(initialState);
  const [isAllowed, setIsAllowed] = useState(false);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [healthScore, setHealthScore] = useState('');
  const [image, setImage] = useState('');
  const [steps, setSteps] = useState('');
  const [diets, setDiets] = useState([]);
  const [isPending, setisPending] = useState(false);
  const dietsHandler = (checked, dietType) => {
    if (checked) setDiets([...diets, Number(dietType)]);
    else setDiets(diets.filter(diet => diet !== Number(dietType)));
  };
  useEffect(() => {
    // Assign possible errors
    const isValidCopy = { ...isValid };
    if (!title.length) isValidCopy.title = 'Title is required';
    else delete isValidCopy.title;
    if (!summary.length) isValidCopy.summary = 'Summary is required';
    else delete isValidCopy.summary;
    if (!healthScore.length || isNaN(healthScore)) isValidCopy.healthScore = 'Health score is required';
    else delete isValidCopy.healthScore;
    if (!image.length) isValidCopy.image = 'Image is required';
    else delete isValidCopy.image;
    setIsvalid(isValidCopy);
    // Check if its valid
    let counter = 0;
    for (let err in isValidCopy) {
      if (isValidCopy[err]) counter++;
    }
    if (!counter) setIsAllowed(true);
    else if (counter) setIsAllowed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, summary, healthScore, image]);
  const handleSubmit = async e => {
    e.preventDefault();
    const values = { title, summary, healthScore, image, steps, diets };
    try {
      setisPending(true);
      const response = await axios.post(
        'http://localhost:3001/recipes',
        values
      );
      setisPending(false);
      setServerResponse(response.request.statusText);
    } catch (error) {
      setisPending(false);
      setServerResponse(error.response.data);
    }
  };
  const handleButton = () => {
    if (!isPending && isAllowed) return <button>Submit</button>;
    else if (isPending) return <button>Submitting...</button>;
    else return <p>cant submit</p>;
  };
  return (
    <div>
      <nav id="nav">
        <NavLink to="/home" id="company">
            <div id="circle"></div>
            <h1 id="myCompany">My company</h1>
          </NavLink>
          <div id="lighter">
            <button id="lightSwitcherr">
            <img id="light" src={light} alt=""></img>
          </button>
        </div>
      </nav>
      <div className='create_recipe_text_container'>
        <div id='create_recipe_text_container'>
          <h1 id='create_recipe_text'>Create your own recipe!</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        ></input>{' '}
        {isValid.title && <p>{isValid.title}</p>}
        <label>Summary: </label>
        <input
          type="text"
          value={summary}
          onChange={e => setSummary(e.target.value)}
        ></input>{' '}
        {isValid.summary && <p>{isValid.summary}</p>}
        <label>Health Score: </label>
        <input
          type="number"
          value={healthScore}
          onChange={e => setHealthScore(e.target.value)}
        ></input>{' '}
        {isValid.healthScore && <p>{isValid.healthScore}</p>}
        <label>Image: </label>
        <input
          type="text"
          value={image}
          onChange={e => setImage(e.target.value)}
        ></input>{' '}
        {isValid.image && <p>{isValid.image}</p>}
        <label>Steps: </label>
        <textarea
          type="text"
          value={steps}
          onChange={e => setSteps(e.target.value)}
        ></textarea>
        <label>Diets: </label>
        <div id="Diets">
          <label>Gluten Free: </label>
          <input
            name="1"
            type="checkbox"
            onChange={e => dietsHandler(e.target.checked, e.target.name)}
          ></input>
          <label>Ovo-Vegetarian: </label>
          <input
            name="2"
            type="checkbox"
            onChange={e => dietsHandler(e.target.checked, e.target.name)}
          ></input>
          <label>Primal: </label>
          <input
            name="3"
            type="checkbox"
            onChange={e => dietsHandler(e.target.checked, e.target.name)}
          ></input>
          <label>Ketogenic: </label>
          <input
            name="4"
            type="checkbox"
            onChange={e => dietsHandler(e.target.checked, e.target.name)}
          ></input>
          <label>Vegan: </label>
          <input
            name="5"
            type="checkbox"
            onChange={e => dietsHandler(e.target.checked, e.target.name)}
          ></input>
          <label>Dairy Free: </label>
          <input
            name="6"
            type="checkbox"
            onChange={e => dietsHandler(e.target.checked, e.target.name)}
          ></input>
          <label>Vegetarian: </label>
          <input
            name="7"
            type="checkbox"
            onChange={e => dietsHandler(e.target.checked, e.target.name)}
          ></input>
          <label>Pescetarian: </label>
          <input
            name="8"
            type="checkbox"
            onChange={e => dietsHandler(e.target.checked, e.target.name)}
          ></input>
          <label>Low FOODMAP: </label>
          <input
            name="9"
            type="checkbox"
            onChange={e => dietsHandler(e.target.checked, e.target.name)}
          ></input>
          <label>Lacto-Vegetarian: </label>
          <input
            name="10"
            type="checkbox"
            onChange={e => dietsHandler(e.target.checked, e.target.name)}
          ></input>
          <label>Paleo: </label>
          <input
            name="11"
            type="checkbox"
            onChange={e => dietsHandler(e.target.checked, e.target.name)}
          ></input>
          <label>Whole30: </label>
          <input
            name="12"
            type="checkbox"
            onChange={e => dietsHandler(e.target.checked, e.target.name)}
          ></input>
        </div>
        {handleButton()}
        <h2>{serverResponse}</h2>
      </form>
      <div>
        <h1>Card</h1>
        <p>{title}</p>
        <p>{summary}</p>
        <p>{healthScore}</p>
        <img src={image} alt=""></img>
        <p>{steps}</p>
        <p>{diets}</p>
      </div>
    </div>
  );
}
export default Creator;
