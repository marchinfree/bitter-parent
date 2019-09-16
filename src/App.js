import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SavedPairs from './SavedPairs';
import firebase from './Firebase.js';
import Test from './Test';
import Home from './Home';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

// TO DO on Sunday, Sept. 15,
// Make component and modal to display healthy and junk food nutrients ---DONE---
// Finish error handling for form
// Create header component and JSX elements to be rendered
// Create saved pairs component that will hold user's saved combinations of healthy food + junk food
// Set up firebase storing + deleting -----DONE ------
// Set up routing to display comparison modal + saved pairs component 

class App extends Component {

  render() {
    return (
      <Router>
        <nav>
          <Link to="/Test">Test Link</Link>
          <Link to="/MySavedFoods">Saved Combos</Link>
          <Link to="/Home">Home</Link>
        </nav>
        <Switch>
          <Route path="/Home" component={Home}/>
          <Route path="/Test" component={Test} />
          <Route path="/MySavedFoods" render={(props) => {
          return <SavedPairs {...props}/> }} />    
        </Switch>
      </Router>
    );
  }
}

export default App;



//THIS WAS OUR 'GET' AXIOS CALL:


// working axios call
  // axios({
  //   url: 'https://trackapi.nutritionix.com/v2/search/instant',
  //   dataResponse: 'JSON',
  //   method: 'GET',
  //   params: {
  //     'detailed': true,
  //     'query': 'pizza',
  //     'branded': false,
  //     'self': false, 
  //   },
  //   headers: {
  //     'x-app-id': '4424dc15',
  //     'x-app-key': 'adf9b4e2b35bea41e8e10c775b249104',
  //     'content-type': 'application/x-www-form-urlencoded',
  //   }
  // }).then((response) => {
  // })