import React from 'react';


class Form extends React.Component{

    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.getFoods();
    }


    render(){
        return(
            <div>
                <form action="" onSubmit={this.handleSubmit}>
                    <input onChange={this.props.handleChange} type="text"></input>
                    <button onClick={this.props.getFoods}>this is a button</button>
                </form>
            </div>
        )
    }

}


export default Form;