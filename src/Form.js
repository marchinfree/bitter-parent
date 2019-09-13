import React from 'react';
import { throwStatement } from '@babel/types';


class Form extends React.Component{

    // constructor(){
    //     super();
    //     this.state = {
    //         userInput: ''
    //     }
    // // }

    // getUserInput = (e) =>{
    //     this.setState({
    //         userInput: e.target.value
    //     })
    // }
    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.getFoods();
    }
    
    render(){
        return(
            <div>
                <form action="" onSubmit={this.handleSubmit}>
                    <input onChange={this.props.handleChange} type="text"></input>
                    <button onClick={this.props.getFoods} >this is a button</button>
                </form>
            </div>
        )
    }

}

export default Form;