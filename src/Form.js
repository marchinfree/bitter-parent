import React from 'react';
import axios from 'axios';

class Form extends React.Component{

    constructor(){
        super();
        this.state = {
            userInput: ''
        }
    }

    
    handleChange = (event) =>{
        this.setState({
            userInput: event.target.value
        })
        console.log(this.state.userInput);
    }

    handleSubmit = (event) =>{
        event.preventDefault();
    }
    
    getFoods = () => {
        axios({
            url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
            dataResponse: 'JSON',
            method: 'POST',
            data: {
            "query": this.state.userInput,
            },
            headers: {
            'x-app-id': '5bcbc45a',
            'x-app-key': '8e9e3042c76246ec8cd2e04009e3b66e',
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
                "query": this.state.userInput,
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
                'x-app-id': '5bcbc45a',
                'x-app-key': '8e9e3042c76246ec8cd2e04009e3b66e',
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
    }

        
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


  
    render(){
        return(
            <div>
                <form action="" onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} type="text"></input>
                    <button onClick={this.getFoods}>this is a button</button>
                </form>
            </div>
        )
    }

}

export default Form;