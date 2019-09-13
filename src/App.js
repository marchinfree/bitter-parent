import React, {Component} from 'react';
import './App.css';
import Form from './Form'
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
      userInput: '',
      junkFood : {},
      healthyFood: {},
      junkFoodSugar: {},
      healthySugar: {},
    }
  }
  
  // getInfoFromForm = (event) =>{
  //   event.preventDefault();
  //   this.getFoods();
  // }

  getNutrientValue = (nutNum, array) => {
    const nutrient = array.filter(sugarObject =>{
        return sugarObject.attr_id === nutNum
    })
    return nutrient[0].value
  }

  handleChange = (event) =>{
    this.setState({
        userInput: event.target.value
    })
  }
  
  getFoods = () => {
    axios({
        url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
        dataResponse: 'JSON',
        method: 'POST',
        data: {
             "query": this.state.userInput,
             "use_branded_foods": false,
        },
        headers: {
        'x-app-id': '5bcbc45a',
        'x-app-key': '8e9e3042c76246ec8cd2e04009e3b66e',
        },
    }).then((response) => {
        this.setState({
            junkFood: response.data.foods[0],
            junkFoodSugar: response.data.foods[0].nf_sugars
        })
    }).then(()=>{
        axios({
        url: 'https://trackapi.nutritionix.com/v2/search/instant/',
        dataResponse: 'JSON',
        method: 'POST',
        data: {
            "query": this.state.userInput,
            "detailed": true,
            "common": true,
            "common_grocery": false,
            "common_restaurant": false,
            "branded": false,
            "full_nutrients": {
            "269": {
                "lte": (this.state.junkFoodSugar) - 10
            },
            }
        },
        headers: {
            'x-app-id': '5bcbc45a',
            'x-app-key': '8e9e3042c76246ec8cd2e04009e3b66e',
        }
        }) .then((results)=>{
            console.log(results);
            this.setState({
                healthyFood: results.data.common[Math.floor(Math.random()*results.data.common.length)]
            })               
            console.log(this.state.healthyFood);

        }) .then(() =>{
            const sugar = this.getNutrientValue(269,  this.state.healthyFood.full_nutrients);
            // const carbs = this.getNutrientValue(268,  this.state.healthyFood.full_nutrients);
            console.log(sugar);
            // console.log(carbs);

            this.setState({
                healthyFoodSugar: sugar
            })
            console.log(this.state.healthyFoodSugar);
        })
    }).catch(error =>{
        alert(`we broke it!`)
    })
}



  render(){
    return (
      <div className="App">
        
        <Form handleChange={this.handleChange} getFoods={this.getFoods} />

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