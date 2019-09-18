import React from 'react';

class SavedPairs extends React.Component{
    render(){
        return(
            <div className="wrapper savedPairsPageWrapper">
                <h2 className="savedPairs">Pair-adise City</h2>
                <ul className="savedPairsWrapper">
                {this.props.fireFoods.map(foods => {
                    return (
                        <div className="pairWrapper">
                            <li key={foods.uniqueKey} className="pairs">
                                <h2 className="pairName">{foods.title.junk.junkName} vs. {foods.title.healthy.healthyName}</h2>
    
                                <ul className="healthyInfo">
                                <li>Calories: {foods.title.healthy.healthyCalories}</li>
                                <li>Serving Size: {foods.title.healthy.healthyServingSize.quantity} {foods.title.healthy.healthyServingSize.unit}</li>
                                <li>Sugar: {foods.title.healthy.healthySugar}</li>
                                <li>Protein: {foods.title.healthy.healthyProtein}</li>
                                <li>Fat: {foods.title.healthy.healthyFat}</li>
                                <li>Carbs: {foods.title.healthy.healthyCarbs}</li>
                                </ul>
    
                                <ul className="junkInfo">
                                <li>Calories: {foods.title.junk.junkCalories}</li>
                                <li>Serving Size: {foods.title.junk.junkServingSize.quantity} {foods.title.junk.junkServingSize.unit}</li>
                                <li>Sugar: {foods.title.junk.junkSugar}</li>
                                <li>Protein: {foods.title.junk.junkProtein}</li>
                                <li>Fat: {foods.title.junk.junkFat}</li>
                                <li>Carbs: {foods.title.junk.junkCarbs}</li>
                                </ul>
                            </li>
                            <span><button className="remove-button" onClick={() => this.props.removeFoods(foods.uniqueKey)}>Remove</button></span>
                        </div>
                    );
                })}
                </ul>
          </div>
        )
    }

}

export default SavedPairs