import React from 'react';


class Form extends React.Component{
    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.getFoods();
    }

    render(){
        return(
            <div className="wrapper">
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.props.handleChange} type="text"></input>
                    <button onClick={this.props.getFoods}>Unsweeten my child!</button>
                </form>
            </div>
        )
    }

}


export default Form;