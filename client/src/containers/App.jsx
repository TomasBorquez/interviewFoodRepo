// Libraries/Frameworks
import React from 'react';
import { Route } from 'react-router-dom';
// Our code
import Welcome from '../components/Welcome/Welcome.jsx';
import Home from '../components/Home/Home.jsx';
import Detail from '../components/Detail/Detail.jsx';
import Creator from '../components/Creator/Creator.jsx';
import './App.sass';

function App() {
  return (
    <div className="App">
      <Route exact path="/" render={() => <Welcome />}/>
      <Route exact path="/home" render={() => <Home />}/>
      <Route exact path="/create" render={() => <Creator/>} />
      <Route exact path='/details/:recipeId' render={({match}) => <Detail id={match.params.recipeId}/>} />
    </div>
  );
}

export default App;
