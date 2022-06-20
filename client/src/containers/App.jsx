// Libraries/Frameworks
import React from 'react';
import { Route } from 'react-router-dom';
// Our code
import Welcome from '../components/Welcome/Welcome.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/" render={() => <Welcome />} />
    </div>
  );
}

export default App;
