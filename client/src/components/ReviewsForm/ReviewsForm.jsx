/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs';
import s from './Reviews.module.sass';

function ReviewsForm({ idRecipe, toggleForm, updateReviews }) {
  const initialStateData = {
    name: 'Anonymous',
    starRating: 0,
    body: '',
    idRecipe,
  };
  const [data, setData] = useState(initialStateData);

  const openEdit = useRef();

  const closeList = (e) => (openEdit.current && !openEdit.current.contains(e.target)) && toggleForm();

  const handleInput = (e) => {
    const dataCopy = { ...data, [e.target.title]: e.target.value };
    setData(() => dataCopy);
  };

  const handleClickStar = (starNumber) => {
    let starNumberCopy = starNumber;
    if (starNumber === data.starRating) starNumberCopy -= 1;
    const dataCopy = { ...data, starRating: starNumberCopy };
    setData(() => dataCopy);
  };

  const handleSubmit = async () => {
    toggleForm();
    await axios.post('reviews', data);
    updateReviews();
  };

  const handleStars = () => {
    const temp = [];
    let flag;
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(data.starRating)) temp.push(<BsStarFill />);
      else if (flag && data.starRating - Math.floor(data.starRating) >= 0.5) {
        temp.push(<BsStarHalf />);
        flag = false;
      } else temp.push(<BsStar />);
    }
    return temp.map((star, i) => (
      <li className={s.star} key={i}>
        <button onClick={() => handleClickStar(i + 1)} type="button">{star}</button>
      </li>
    ));
  };

  document.addEventListener('mousedown', closeList);

  return (
    <div id={s.darker}>
      <div id={s.form} ref={openEdit}>
        <h1 id={s.title4}>Form</h1>
        <form id={s.formBody}>
          <div className={s.former}>
            <label>Name: </label>
            <input
              type="text"
              value={data.name}
              title="name"
              className="input"
              onChange={handleInput}
            />
          </div>
          <div className={s.former}>
            <label>Opinion: </label>
            <input
              type="text"
              value={data.body}
              title="body"
              className="input"
              onChange={handleInput}
            />
          </div>
          <div id={s.starForm}>
            <label>Star Rating: </label>
            <ul className={s.stars}>{handleStars()}</ul>
          </div>
          <div>
            <button type="submit" onClick={handleSubmit} id={s.submitButton} disabled={!(data.name && data.body)}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

ReviewsForm.propTypes = {
  toggleForm: PropTypes.func.isRequired,
  updateReviews: PropTypes.func.isRequired,
  idRecipe: PropTypes.string.isRequired,
};

export default ReviewsForm;
