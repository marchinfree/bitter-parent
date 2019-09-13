import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

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


  // healthyFunction = () => {
  //     Math.floor(Math.random()*100)+1;
  // }


  componentDidMount(){
  //this shows we can make an axios call that returns the food in a way that we want
    axios({
      url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
      dataResponse: 'JSON',
      method: 'POST',
      data: {
        "query": "chocolate bar",
      },
      headers: {
        'x-app-id': '4424dc15',
        'x-app-key': 'adf9b4e2b35bea41e8e10c775b249104',
        // 'content-type': 'application/x-www-form-urlencoded',
        // 'x-remote-user-id': 0,
      },
    }).then((response) => {
      //this shows we can narrow down the response from the API call
      // const foodGroup = response.data.foods[0].tags.food_group;
      // console.log(response.data.foods[0].tags.food_group);
      //this works when we set it as a variable, but not when we try to push it into state.
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
          "query": "chocolate bar",
          "detailed": true,
          "common": true,
          "branded": false,
          "full_nutrients": {
            "269": {
              "lte": (this.state.junkFoodSugar) - 10
            },
          }
        },
        headers: {
          'x-app-id': '4424dc15',
          'x-app-key': 'adf9b4e2b35bea41e8e10c775b249104',
        }
      }) .then((results)=>{
        console.log(results);
        this.setState({
          healthyOptionsArray: results.data.common,
          healthyFood: Math.floor(Math.random()*100)+1,
        })
      }) .then(()=>{
        // console.log(this.state.healthyOptionsArray.length);
        console.log(this.state.healthyFood);
      })
    })
    


      



    
  //   .then(() =>{
  //     axios({
  //       url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
  //       dataResponse: 'JSON',
  //       method: 'POST',
  //       data: {
  //         "query": "cheese",
  //       },
  //       headers: {
  //         'x-app-id': '4424dc15',
  //         'x-app-key': 'adf9b4e2b35bea41e8e10c775b249104',
  //       },
  //     }).then((result) => {
  //       console.log(result.data.foods[0].tags.food_group);
  //       this.setState({
  //         healthyFood: result.data.foods[0],
  //       })
  //     })
  // })
  
  }

  

  render(){

  return (
    <div className="App">
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