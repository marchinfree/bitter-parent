import React from 'react';

class ModalDisplay extends React.Component{
    render(){
        return(
            <div>
                <p>{this.props.healthyFood.food_name} has {(this.props.junkFoodSugar - this.props.healthySugar)} fewer grams of sugar than {this.props.junkFood.food_name}</p>
                <div>
                  <h2>{this.props.healthyFood.food_name}</h2>
                  <ul>
                    <li>Sugar: {this.props.healthySugar}</li>
                    <li>Fat: {this.props.healthyFat}</li>
                    <li>Calories: {this.props.healthyCalories}</li>
                    <li>Protein: {this.props.healthyProtein}</li>
                    <li>Carbs: {this.props.healthyCarbs}</li>
                    <li>Serving Size: {this.props.healthyFood.serving_qty}  {this.props.healthyFood.serving_unit}</li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <h2>{this.props.junkFood.food_name}</h2>
                    <li>Sugar: {this.props.junkFoodSugar}</li>
                    <li>Fat: {this.props.junkFood.nf_total_fat}</li>
                    <li>Calories: {this.props.junkFood.nf_calories}</li>
                    <li>Protein: {this.props.junkFood.nf_protein}</li>
                    <li>Carbs: {this.props.junkFood.nf_total_carbohydrate}</li>
                    <li>Serving size: {this.props.junkFood.serving_qty} {this.props.junkFood.serving_unit}</li>
                  </ul>
                </div>
            </div>
        )
    }
}

export default ModalDisplay;