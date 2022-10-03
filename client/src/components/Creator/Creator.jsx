/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import Fish from '../../img/fish-8-64.png';
import light from '../../img/sun-512.png';
import dietsList from '../../diets.json';
import './Creator.sass';

const isValidInitialState = {
  title: 'Title is required',
  summary: 'Summary is required',
  healthScore: 'Health score is required',
  image: 'Image is required',
};

const dietasInitialState = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false,
  10: false,
  11: false,
  12: false,
};

function Creator() {
  const [serverResponse, setServerResponse] = useState('');
  const [dietas, setDietas] = useState(dietasInitialState);
  const [isValid, setIsvalid] = useState(isValidInitialState);
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
    else setDiets(diets.filter((diet) => diet !== Number(dietType)));
  };

  const dietsAdder = (e, d) => {
    e.preventDefault();
    const dietasCopy = { ...dietas };
    if (!dietas[d]) {
      dietsHandler(true, d);
      dietasCopy[d] = true;
    } else {
      dietsHandler(false, d);
      dietasCopy[d] = false;
    }
    setDietas(dietasCopy);
  };

  useEffect(() => {
    // Assign possible errors
    const isValidCopy = { ...isValid };
    if (!title.length) isValidCopy.title = 'Title is required';
    else if (title.length < 6 || title.length > 30) isValidCopy.title = 'Title needs to be between 6-30 letters';
    else delete isValidCopy.title;
    if (!summary.length) isValidCopy.summary = 'Summary is required';
    else if (summary.length < 13 || summary.length > 60) isValidCopy.summary = 'Summary needs to be between 13-60 letters';
    else delete isValidCopy.summary;
    if (!healthScore.length || isNaN(healthScore)) isValidCopy.healthScore = 'Health score is required';
    else if (healthScore > 100 || healthScore < 0) isValidCopy.healthScore = 'Health score needs to be between 0-100';
    else delete isValidCopy.healthScore;
    if (!image.length) isValidCopy.image = 'Image is required';
    else delete isValidCopy.image;
    setIsvalid(isValidCopy);
    // Check if its valid
    let counter = 0;
    for (const err in isValidCopy) {
      if (isValidCopy[err]) counter++;
    }
    if (!counter) setIsAllowed(true);
    else if (counter) setIsAllowed(false);
  }, [title, summary, healthScore, image, dietas]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = {
      title, summary, healthScore, image, steps, diets,
    };
    try {
      setisPending(true);
      const response = await axios.post('/recipes', values);
      setisPending(false);
      setServerResponse(response.request.statusText);
    } catch (error) {
      setisPending(false);
      setServerResponse(error.response.data);
    }
  };

  const handleButton = () => {
    if (!isPending && isAllowed) return <button type="submit" id="submit-button">Submit</button>;
    if (isPending) return <p id="unavailableButton">Submitting...</p>;
    return <p id="unavailableButton">Can&apos;t submit</p>;
  };

  const errSuccHandler = (message) => {
    if (message === 'Created') return <p className="success">Recipe has been created!</p>;

    const messageCopy = message.charAt(0).toUpperCase() + message.slice(1);
    return <p className="error">{messageCopy}</p>;
  };

  const filterDiets = () => dietsList.map((diet, i) => (
    <button
      onClick={(e) => dietsAdder(e, i + 1)}
      key={i}
      className={dietas[i + 1] ? 'activeDiet' : 'inactiveDiet'}
      type="button"
    >
      {diet}
    </button>
  ));

  return (
    <div>
      <nav id="nav">
        <NavLink to="/home" id="company">
          <div id="circle">
            <img id="fish" src={Fish} alt="fish" />
          </div>
          <h1 id="myCompany">Limonada</h1>
        </NavLink>
        <div id="lighter">
          <button id="lightSwitcherr" type="button">
            <img id="light" src={light} alt="" />
          </button>
        </div>
      </nav>
      <div className="create_recipe_text_container">
        <div id="create_recipe_text_container">
          <h1 id="create_recipe_text">Create your own recipe!</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div id="creation-card-display">
          <div id="creation-card1">
            <h1 id="creation-details-title">Required</h1>
            <div id="stuff">
              <div className="inline">
                <label className="t-card" id="title-form">
                  Title:
                </label>
                <input
                  type="text"
                  value={title}
                  className="input"
                  onChange={(e) => setTitle(e.target.value)}
                />
                {isValid.title ? (
                  <p className="error-message">{isValid.title}</p>
                ) : (
                  <p className="success-message">Valid title</p>
                )}
              </div>
              <div className="inline">
                <label className="t-card">Summary: </label>
                <textarea
                  type="text"
                  value={summary}
                  className="textarea"
                  id="summary"
                  onChange={(e) => setSummary(e.target.value)}
                />
                {isValid.summary ? (
                  <p className="error-message">{isValid.summary}</p>
                ) : (
                  <p className="success-message">Valid summary</p>
                )}
              </div>
              <div className="inline">
                <label className="t-card">Health Score: </label>
                <input
                  type="number"
                  value={healthScore}
                  className="input"
                  id="healthScoree"
                  onChange={(e) => setHealthScore(e.target.value)}
                />
                {isValid.healthScore ? (
                  <p className="error-message">{isValid.healthScore}</p>
                ) : (
                  <p className="success-message">Valid Health Score</p>
                )}
              </div>
              <div className="inline" id="image">
                <label className="t-card">Image: </label>
                <input
                  type="text"
                  value={image}
                  className="input"
                  onChange={(e) => setImage(e.target.value)}
                />
                {isValid.image ? (
                  <p className="error-message">{isValid.image}</p>
                ) : (
                  <p className="success-message">Valid Image</p>
                )}
              </div>
            </div>
          </div>
          <div id="creation-card2">
            <h1 id="creation-details-title2">Optional</h1>
            <div className="notinline">
              <label className="t-card">Steps: </label>
              <textarea
                type="text"
                value={steps}
                className="textarea"
                onChange={(e) => setSteps(e.target.value)}
              />
            </div>
            <label className="t-card">
              Diets: (Click on them to add or remove a diet)
            </label>
            <div id="Dietss">
              {filterDiets()}
            </div>
          </div>
        </div>
        <div id="bottombutton">
          <div id="button-handler">{handleButton()}</div>
          <div id="error-success-handler">{errSuccHandler(serverResponse)}</div>
          {/* Sweet alert here */}
        </div>
      </form>
    </div>
  );
}
export default Creator;
