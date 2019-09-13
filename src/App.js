import React, {Component} from 'react';
import './App.css';
import Form from './Form'
import { tsImportEqualsDeclaration } from '@babel/types';

class App extends Component {
  constructor(){
    super();
    this.state = {
      junkFood : {},
      healthyFood: {},
      junkFoodSugar: {},
      healthySugar: {},
      healthyOptionsArray: [],
    }
  }
  

  render(){
    return (
      <div className="App">
        
        <Form junkFood={this.state.junkFood} healthyFood={this.state.healthyFood} junkFoodSugar={this.state.junkFoodSugar} healthySugar={this.state.healthySugar} healthyOptionsArray={this.state.healthyOptionsArray} />

        <p>You are eating {this.state.junkFood.nf_sugars} grams of sugar</p>
      </div>
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
  //   console.log(response);
  // })