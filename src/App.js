import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
    }
  }
  componentDidMount(){
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
    axios({
      url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
      dataResponse: 'JSON',
      method: 'POST',
      // query: "pizza",
      // data: {
      //   query: "pizza"
      // },
      
      
      // transformRequest: [function (pizza, headers){
      //   return pizza
      // }],

      // transformResponse: [function(pizza){
      //   return pizza
      // }],

      params: {
      "query": "cheese",
          // "tag_id": "2583",
        // 'detailed': true,
        // 'query': 'pizza',
        // 'branded': false,
        // 'self': false,
      },
      headers: {
        'x-app-id': '4424dc15',
        'x-app-key': 'adf9b4e2b35bea41e8e10c775b249104',
        'content-type': 'application/x-www-form-urlencoded',
        'x-remote-user-id': 0,
      },
      // transformRequest: [(data, headers) =>{
      //   return data
      // }],
      // transformResponse: [(data) =>{
      //   return data
      // }]
    }).then((response) => {
      console.log(response);
    })

  }



  render(){
  return (
    <div className="App">
    
    </div>
  );
  }
}

export default App;
