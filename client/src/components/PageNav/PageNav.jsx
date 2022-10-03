/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Fish from '../../img/fish-8-64.png';
import * as actions from '../../state/actions/index';
import diets from '../../diets.json';
import './PageNav.sass';

const filterDiets = () => diets.map((diet, i) => <option key={i} value={diet}>{diet}</option>);
const filtersInitialState = {
  filter: '',
  order: '',
  origin: '',
  input: '',
};

function PageNav({ loading, cardsPerPage, totalPosts }) {
  const [filters, setFilters] = useState(filtersInitialState);
  const [pageNumbers, setPageNumbers] = useState([]);
  // Redux
  const dispatch = useDispatch();
  const { updateCurrentPage, orFilBy, resetOrFilBy } = bindActionCreators(actions, dispatch);
  const currentPage = useSelector((state) => state.recipes.currentPage);

  useEffect(() => {
    const pageNumbersTemp = [];
    for (let i = 1; i <= Math.ceil(totalPosts / cardsPerPage); i++) {
      pageNumbersTemp.push(i);
    }
    setPageNumbers(pageNumbersTemp);
    if (!filters.filter.length && !filters.order.length && !filters.origin.length && !filters.input.length) resetOrFilBy();
    else {
      orFilBy(filters);
      updateCurrentPage(1);
    }
  }, [filters.filter, filters.order, filters.origin, filters.input, totalPosts]);

  const handleChange = (e, type) => setFilters({ ...filters, [type]: e.target.value });
  const handleReset = () => setFilters(filtersInitialState);

  if (loading) {
    return (
      <nav id="nav">
        <NavLink to="/home" id="company">
          <div id="circle"><img id="fish" src={Fish} alt="fish" /></div>
          <h1 id="myCompany">Limonada</h1>
        </NavLink>
      </nav>
    );
  }

  return (
    <div>
      <nav id="nav">
        <NavLink to="" id="company">
          <div id="circle"><img id="fish" src={Fish} alt="fish" /></div>
          <h1 id="myCompany">Limonada</h1>
        </NavLink>
        <div id="end">
          <input placeholder="Search..." id="searchBar" type="text" value={filters.input} onChange={(e) => handleChange(e, 'input')} />
        </div>
      </nav>
      <NavLink id="create" to="/create">+</NavLink>
      <div id="form">
        <button id="resetButton" type="button" onClick={() => handleReset()}>Reset</button>
        <form>
          <select id="orders" className="decorated" onChange={(e) => handleChange(e, 'order')} value={filters.order}>
            <option value="">Order by</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="H">Highest rating</option>
            <option value="L">Lowest rating</option>
          </select>
          <select id="filters" className="decorated" onChange={(e) => handleChange(e, 'filter')} value={filters.filter}>
            <option value="">Filter type</option>
            {filterDiets()}
          </select>
          <select id="orders" className="decorated" onChange={(e) => handleChange(e, 'origin')} value={origin}>
            <option value="">All</option>
            <option value="API">API</option>
            <option value="DB">DB</option>
          </select>
        </form>
      </div>
      <div className="navtop">
        <button className="bf-btn" type="button" onClick={() => (currentPage > 1 && updateCurrentPage('prev'))}> Prev </button>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button type="button" className={Number(currentPage) === Number(number) ? 'page-number-buttons-selected' : 'page-number-buttons'} onClick={() => updateCurrentPage(number)}>
                {number}
              </button>
            </li>
          ))}
        </ul>
        <button type="button" className="bf-btn" onClick={() => (currentPage !== Math.ceil(totalPosts / cardsPerPage) && updateCurrentPage('next'))}>
          Next
        </button>
      </div>
    </div>
  );
}

PageNav.propTypes = {
  loading: PropTypes.bool.isRequired,
  cardsPerPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
};

export default PageNav;
