import React, { Component } from 'react';
import './App.css';
import Form from './Form'
import axios from 'axios';
import Modal from './Modal/Modal';
import firebase from './Firebase.js';


// TO DO on Sunday, Sept. 15,
// Make component and modal to display healthy and junk food nutrients ---DONE---
// Finish error handling for form
// Create header component and JSX elements to be rendered
// Create saved pairs component that will hold user's saved combinations of healthy food + junk food
// Set up firebase storing + deleting -----DONE ------
// Set up routing to display comparison modal + saved pairs component 

class App extends Component {
  constructor() {
    super();
    this.state = {
      userInput: '',
      junkFood: {},
      healthyFood: {},
      junkFoodSugar: '',
      healthySugar: '',
      healthyFat: '',
      healthyCalories: '',
      healthyProtein: '',
      healthyCarbs: '',
      isShowing: false,
      fireFoods: [],
      everythingHealthy: [],
    }
  }

  // ADDED COMPONENT DID MOUNT
  componentDidMount() {

    // stores what database looks like
    const dbRef = firebase.database().ref();
    // monitors stores and returns changes
    dbRef.on('value', (data) => {
      // this only returns the items
      const response = data.val();
      //  create array for new state
      const newState = [];

      // loop through new state
      for (let key in response) {
        newState.push({
          title: response[key],
          uniqueKey: key,
          // response[key]
        });
      }

      // set new foods state
      this.setState({
        fireFoods: newState,
      });
    });

  }

  // function to remove item from board ---this will live on new pairs page
  removeFoods = (foodId) => {
    const dbRef = firebase.database().ref();
    dbRef.child(foodId).remove();

  }

 // this adds items to the community board / firebase ----Need to put this function on modal button
 handleFireSave = (event) => {

  event.preventDefault();
  const junkAndHealthyData = {
    junk: this.state.allOfTheJunk,
    healthy: this.state.allOfTheHealthy,
  };
  const dbRef = firebase.database().ref();
  dbRef.push(junkAndHealthyData);

};

  // getInfoFromForm = (event) =>{
  //   event.preventDefault();
  //   this.getFoods();
  // }

  getNutrientValue = (nutNum, array) => {
    const nutrient = array.filter(sugarObject => {
      return sugarObject.attr_id === nutNum
    })
    return nutrient[0].value
  }

  handleChange = (event) => {
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
        'x-app-id': '4424dc15',
        'x-app-key': 'adf9b4e2b35bea41e8e10c775b249104',
      },
    }).then((response) => {
      this.setState({
        // NOTE for modal: to access micronutrients later, just use this.state.junkFood.nf_[nameOfNutrient]
        junkFood: response.data.foods[0],
        junkFoodSugar: response.data.foods[0].nf_sugars,
        allOfTheJunk: {
          junkName: response.data.foods[0].food_name,
          junkSugar: response.data.foods[0].nf_sugars,
          junkFat: response.data.foods[0].nf_total_fat,
          junkProtein: response.data.foods[0].nf_protein,
          junkCarbs: response.data.foods[0].nf_total_carbohydrate,
          junkCalories: response.data.foods[0].nf_calories,
          junkServingSize: {
            quantity: response.data.foods[0].serving_qty,
            unit: response.data.foods[0].serving_unit,
          }
        }
      })
    }).then(() => {
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
          'x-app-id': '4424dc15',
          'x-app-key': 'adf9b4e2b35bea41e8e10c775b249104',
        }
      }).then((results) => {
        this.setState({
          healthyFood: results.data.common[Math.floor(Math.random() * results.data.common.length)]
        })
      }).then(() => {
        const sugar = this.getNutrientValue(269, this.state.healthyFood.full_nutrients);
        const fat = this.getNutrientValue(204, this.state.healthyFood.full_nutrients);
        const protein = this.getNutrientValue(203, this.state.healthyFood.full_nutrients);
        const carbs = this.getNutrientValue(205, this.state.healthyFood.full_nutrients);
        const calories = this.getNutrientValue(208, this.state.healthyFood.full_nutrients);

        this.setState({
          healthySugar: sugar,
          healthyFat: fat,
          healthyProtein: protein,
          healthyCarbs: carbs,
          healthyCalories: calories,
          allOfTheHealthy: {
            healthyName: this.state.healthyFood.food_name,
            healthySugar: sugar,
            healthyFat: fat,
            healthyProtein: protein,
            healthyCarbs: carbs,
            healthyCalories: calories,
            healthyServingSize: {
              quantity: this.state.healthyFood.serving_qty,
              unit: this.state.healthyFood.serving_unit,
            },
          }
        })
      })

    }).then(() => {
      this.setState({
        isShowing: true
      });

    })
      .catch(error => {
        alert(`we broke it!`)
      })
  }

  // DO WE NEED THESE NOW?
  openModalHandler = () => {
    this.setState({
      isShowing: true
    });
  }

  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
  }


  render() {
    return (
      <div className="App">

        <Form handleChange={this.handleChange} getFoods={this.getFoods} />

        <div>
          {this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null}

          {/* <button className="open-modal-btn" onClick={this.openModalHandler}>Open Modal</button> */}

{/* ALL RESULTS NOW LIVE IN THE MODAL, NEED TO FLIP CARDS */}
          <Modal
            className="modal"
            show={this.state.isShowing}
            close={this.closeModalHandler}>
            <div>
              <p>{this.state.healthyFood.food_name} has {(this.state.junkFoodSugar - this.state.healthySugar)} fewer grams of sugar than {this.state.junkFood.food_name}</p>
            </div>
            <div>
              <h2>{this.state.healthyFood.food_name}</h2>
              <ul>
                <li>Sugar: {this.state.healthySugar}</li>
                <li>Fat: {this.state.healthyFat}</li>
                <li>Calories: {this.state.healthyCalories}</li>
                <li>Protein: {this.state.healthyProtein}</li>
                <li>Carbs: {this.state.healthyCarbs}</li>
                <li>Serving Size: {this.state.healthyFood.serving_qty}  {this.state.healthyFood.serving_unit}</li>
              </ul>
            </div>
            <div>
              <ul>
                <h2>Junk food nutrients</h2>
                <li>Sugar: {this.state.junkFoodSugar}</li>
                <li>Fat: {this.state.junkFood.nf_total_fat}</li>
                <li>Calories: {this.state.junkFood.nf_calories}</li>
                <li>Protein: {this.state.junkFood.nf_protein}</li>
                <li>Carbs: {this.state.junkFood.nf_total_carbohydrate}</li>
                <li>Serving size: {this.state.junkFood.serving_qty} {this.state.junkFood.serving_unit}</li>
              </ul>
            </div>
          </Modal>

          {/* testing firebase ---THIS WILL BECOME THE SAVED PAIRS PAGE---HOW TO SAVE PAIRS? */}

          <div className="board-button">
            <button type="button" className="add-button" onClick={this.handleFireSave}>Add to board</button>

          </div>
          <div>
            <h2>Fave pairs</h2>
            <ul>
              {this.state.fireFoods.map(foods => {
                // const arrayOfKeys = Object.keys(foods);
                return (
                  <li key={foods.uniqueKey}>
                    <p>{foods.title.healthy.healthyName} has {foods.title.healthy.healthyCalories} calories and {foods.title.healthy.healthySugar} grams of sugar. Meanwhile, {foods.title.junk.junkName} has {foods.title.junk.junkCalories} calories and {foods.title.junk.junkSugar} grams of sugar.
                    <span><button className="remove-button" onClick={() => this.removeFoods(foods.uniqueKey)}>Remove</button></span></p>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

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
  // })