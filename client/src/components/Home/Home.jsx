// Libraries and such
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
// Our Modules
import * as actions from '../../state/actions/index.js';
import Cards from '../Cards/Cards.jsx';
import PageNav from '../PageNav/PageNav.jsx';
import './Home.sass';

function Home() {
  // Pagination
  const [cardsPerPage] = useState(9);
  // Various
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  // Redux Hooks
  const dispatch = useDispatch();
  const { updateRecipes } = bindActionCreators(actions, dispatch);
  const fRecipes = useSelector(state => state.recipes.fRecipes);
  useEffect(() => {
    console.log(`I was here: ${counter}`);
    setCounter(counter + 1);
    if (counter === 0) {
      console.log('i entered')
      updateRecipes();
      setLoading(!loading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <PageNav
        loading={loading}
        cardsPerPage={cardsPerPage}
        totalPosts={fRecipes.length}
      />
      <Cards recipes={fRecipes} loading={loading} cardsPerPage={cardsPerPage} />
    </div>
  );
}
export default Home;
