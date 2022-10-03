// Libraries and such
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
// Our Modules
import * as actions from '../../state/actions/index';
import Cards from '../Cards/Cards';
import PageNav from '../PageNav/PageNav';
import './Home.sass';

function Home() {
  const [cardsPerPage] = useState(9);
  const [loading, setLoading] = useState(true);
  // Redux
  const dispatch = useDispatch();
  const { updateRecipes } = bindActionCreators(actions, dispatch);
  const fRecipes = useSelector((state) => state.recipes.fRecipes);

  useEffect(() => {
    setLoading(true);
    updateRecipes().then(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageNav
        loading={loading}
        cardsPerPage={cardsPerPage}
        totalPosts={fRecipes.length}
      />
      <Cards
        recipes={fRecipes}
        loading={loading}
        cardsPerPage={cardsPerPage}
      />
    </div>
  );
}
export default Home;
