/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable brace-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs';
import ReviewsForm from '../ReviewsForm/ReviewsForm';
import spinner from '../../img/icons8-spinner-marco-5-90.png';
import s from './Reviews.module.sass';

function Reviews({ recipe }) {
  const [reviews, setReviews] = useState();
  const [data, setData] = useState({ avg: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(false);

  const updateReviews = async () => {
    try {
      setLoading(true);
      const res = await (await axios.get(`/reviews/${recipe.id}`)).data;
      setReviews(res);
      const res2 = await (await axios.get(`/recipes/${recipe.id}`)).data;
      setData({ avg: res2.average_reviews, total: res2.amount_reviews });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateReviews();
  }, []);

  const handleStars = (starAmount) => {
    const temp = [];
    let flag = true;
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(starAmount)) temp.push(<BsStarFill />);
      else if (flag && starAmount - Math.floor(starAmount) >= 0.5) {
        temp.push(<BsStarHalf />);
        flag = false;
      } else temp.push(<BsStar />);
    }
    return temp.map((star, i) => (
      <li className={s.star} key={i}>
        {star}
      </li>
    ));
  };

  const handleTime = (time) => {
    let temp = '';
    for (let i = 0; i < time.length; i++) {
      if (time[i] === 'T') temp += ' ';
      else if (time[i] === '.') break;
      else temp += time[i];
    }
    return temp;
  };

  const toggleForm = () => setForm((currForm) => !currForm);

  if (loading) {
    return (
      <div id={s.reviewsContainer}>
        <div id={s.reviews}>
          <h1 id={s.title3}>Reviews</h1>
          <div id={s.spinner}>
            <img src={spinner} id="spinner" alt="" />
          </div>
        </div>
      </div>
    );
  }
  if (!reviews.length) {
    return (
      <div id={s.reviewsContainer}>
        <div id={s.reviews}>
          <h1 id={s.title3}>Reviews</h1>
          <h2
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '20px',
            }}
          >
            No reviews
          </h2>
          <button type="button" id={s.toggleButton} onClick={toggleForm}>
            Leave review
          </button>
          {form && <ReviewsForm toggleForm={toggleForm} idRecipe={recipe.id} updateReviews={updateReviews} />}
        </div>
      </div>
    );
  }
  return (
    <div id={s.reviewsContainer}>
      <div id={s.reviews}>
        <h1 id={s.title3}>Reviews</h1>
        <div id={s.stats}>
          <p>{Math.round(data.avg * 10) / 10} Avg.</p>
          <ul className={s.stars}>{handleStars(data.avg)}</ul>
          <p>{`${data.total} Reviews`}</p>
        </div>
        <ul id={s.reviewsMap}>
          {reviews.map((review) => (
            <li className={s.review} key={review.id}>
              <h4>{review.name}</h4>
              <p>{handleTime(review.createdAt)}</p>
              <p>{review.body}</p>
              <ul className={s.stars}>{handleStars(review.star_rating)}</ul>
            </li>
          ))}
        </ul>
        <button type="button" id={s.toggleButton} onClick={toggleForm}>
          Leave review
        </button>
        {form && <ReviewsForm toggleForm={toggleForm} idRecipe={recipe.id} updateReviews={updateReviews} />}
      </div>
    </div>
  );
}

Reviews.propTypes = {
  recipe: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default memo(Reviews);
