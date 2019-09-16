import React, { Component } from 'react';
import './App.css';
import Form from './Form'
import axios from 'axios';
import Header from './Header';
import Modal from './Modal';
import ModalDisplay from './ModalDisplay';
import firebase from './Firebase.js';
import SavedPairs from './SavedPairs';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

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
        'x-app-id': '5bcbc45a',
        'x-app-key': '8e9e3042c76246ec8cd2e04009e3b66e',
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
          'x-app-id': '5bcbc45a',
          'x-app-key': '8e9e3042c76246ec8cd2e04009e3b66e',
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

    }).then(() => {
      this.setState({
        savedPair: this.state.junkFoodSugar,
        savedPairName: (this.state.junkFood.food_name + "/" + this.state.healthyFood.food_name)

      })
      console.log(this.state.healthyFood)
    })
  

      .catch(error => {
        alert(`we broke it!`)
      })
  }

  // function to save user pairs
  // saveUserPairs = () => {
  //   const foodPairing = [];
  //   foodPairing.push(this.state.junkFoodSugar, this.state.healthySugar)
  //   this.setState({
  //     savedPair: foodPairing

  //   })

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
      <Router>
        <nav>
          <Link exact to="/MySavedFoods">Saved Combos</Link>
          <Link to="/">Home</Link>
        </nav>
        <Route exact path="/" component={App} />
        <Route path="/MySavedFoods"
              render={() =>{
                return <SavedPairs removeFoods={this.removeFoods} fireFoods={this.state.fireFoods} />
                } 
              }
            />
        <div className="App">
          <Header />
          <Form handleChange={this.handleChange} getFoods={this.getFoods} />
  
          <div>
            {this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null}
            {/* <button className="open-modal-btn" onClick={this.openModalHandler}>Open Modal</button> */}
            <Modal
              className="modal"
              show={this.state.isShowing}
              close={this.closeModalHandler}
              handleFireSave={this.handleFireSave}
              allOfTheJunk={this.state.allOfTheJunk}
              allOfTheHealthy={this.state.allOfTheHealthy}>
              <ModalDisplay 
                healthyFood={this.state.healthyFood}
                healthySugar={this.state.healthySugar}
                healthyFat={this.state.healthyFat}
                healthyCalories={this.state.healthyCalories}
                healthyCarbs={this.state.healthyCarbs}
                junkFood={this.state.junkFood}
                junkFoodSugar={this.state.junkFoodSugar}
                junkFoodFat={this.state.junkFoodFat}
                junkFoodCalories={this.state.junkFoodCalories}
                junkFoodCarbs={this.state.junkFoodCarbs}
              />
            </Modal>
            </div>
        </div>
       
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