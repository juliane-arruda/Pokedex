import React from 'react';
import Home from './components/home';
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Details from './components/details';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/details/:id" component={Details} />
      </Switch>
    </Router>
  );
}

export default App;
