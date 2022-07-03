import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import './Creator.sass';

function Creator() {
  const isValid = {}
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
    if (!title.length) isValid.title = 'Title is required'
    else delete isValid.title
    if (!summary.length) isValid.summary = 'Summary is required'
    else delete isValid.summary
    if (!healthScore.length || isNaN(healthScore)) isValid.healthScore = 'Health score is required'
    else delete isValid.healthScore
    if (!image.length) isValid.image = 'Image is required'
    else delete isValid.image
    // console.log(Object.keys(isValid))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, summary, healthScore, image])
  const handleErrors = () => {
    for (let err in isValid) {
      console.log(err);
    } 
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const values = { title, summary, healthScore, image, steps, diets }
    try {
      setisPending(true)
      const response = await axios.post('http://localhost:3001/recipes', values)
      setisPending(false)
      console.log(response.request);
    } catch (error) {
      setisPending(false)
      console.log(error.response.data);
      console.log(error);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        ></input>
        <label>Summary: </label>
        <input
          type="text"
          value={summary}
          onChange={e => setSummary(e.target.value)}
        ></input>
        <label>Health Score: </label>
        <input
          type="number"
          value={healthScore}
          onChange={e => setHealthScore(e.target.value)}
        ></input>
        <label>Image: </label>
        <input
          type="text"
          value={image}
          onChange={e => setImage(e.target.value)}
        ></input>
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
        {!isPending ? <button>Submit</button> : <button>Submitting...</button>}
      </form>
      <div>
        <h1>Card</h1>
        <p>{title}</p>
        <p>{summary}</p>
        <p>{healthScore}</p>
        <img src={image} alt=''></img>
        <p>{steps}</p>
        <p>{diets}</p>
      </div>
      {() => handleErrors()}
    </div>
  );
}
export default Creator;
