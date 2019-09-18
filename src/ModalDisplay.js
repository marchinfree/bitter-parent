import React from 'react';

const ModalDisplay = (props) => {

  return (
    <div>
      <div className="modalFrontInfo">
        <p>Why would you eat <span className="modalNamePop">{props.allData.junkFood.food_name}</span> when <span className="modalNamePop">{props.allData.healthyFood.food_name}</span> has {(props.allData.junkFoodSugar - props.allData.healthySugar).toFixed(2)} fewer grams of sugar?</p>
      </div>
      <div className="modalBackInfo">
        <div className="healthyModalInfo">
          <ul>
            <h2><i class="fas fa-check"></i> {props.allData.healthyFood.food_name}</h2>
            <li>Sugar: {props.allData.healthySugar}</li>
            <li>Fat: {props.allData.healthyFat}</li>
            <li>Calories: {props.allData.healthyCalories}</li>
            <li>Protein: {props.allData.healthyProtein}</li>
            <li>Carbs: {props.allData.healthyCarbs}</li>
            <li>Serving Size: {props.allData.healthyFood.serving_qty}  {props.allData.healthyFood.serving_unit}</li>
          </ul>
        </div>
        <div className="junkModalInfo">
          <ul>
            <h2><i class="fas fa-times"></i> {props.allData.junkFood.food_name}</h2>
            <li>Sugar: {props.allData.junkFoodSugar}</li>
            <li>Fat: {props.allData.junkFood.nf_total_fat}</li>
            <li>Calories: {props.allData.junkFood.nf_calories}</li>
            <li>Protein: {props.allData.junkFood.nf_protein}</li>
            <li>Carbs: {props.allData.junkFood.nf_total_carbohydrate}</li>
            <li>Serving size: {props.allData.junkFood.serving_qty} {props.allData.junkFood.serving_unit}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}


export default ModalDisplay;