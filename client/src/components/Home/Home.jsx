import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../state/actions/index.js';
import Cards from '../Cards/Cards.jsx';
import PageNav from '../PageNav/PageNav.jsx';
import './Home.sass';

function Home() {
  // Pagination
  // eslint-disable-next-line no-unused-vars
  const [cardsPerPage] = useState(9);
  // Various
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  // Redux Hooks
  const dispatch = useDispatch();
  const { updateRecipes, updateState } = bindActionCreators(actions, dispatch);
  const fRecipes = useSelector(state => state.recipes.fRecipes);
  const request = useSelector(state => state.recipes.request);
  const reload = useSelector(state => state.recipes.reload);
  useEffect(() => {
    // console.log(`I was here: ${counter}`);
    setCounter(counter + 1);
    if (request) {
      async function serverRequest() {
        try {
          const res = await axios.get('http://localhost:3001/filter/test');
          // Redux
          updateRecipes(res.data);
          updateState();
          // Loading
          setLoading(!loading);
        } catch (err) {
          console.log(`This is the error: ${err}`);
          updateState();
        }
      }
      serverRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);
  return (
    <div>
      <PageNav loading={loading} cardsPerPage={cardsPerPage} totalPosts={fRecipes.length ? fRecipes.length : 0}/>
      <Cards
        recipes={fRecipes}
        loading={loading}
        cardsPerPage={cardsPerPage}
      />
    </div>
  );
}
export default Home;
