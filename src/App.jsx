import React from 'react';
import Home from './components/home';
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Details from './components/details';
import Footer from './components/footer';
import './App.css';
import Navbar from './components/navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/details/:id" component={Details} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
