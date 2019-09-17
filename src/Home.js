import React from 'react';
import Header from './Header';
import Form from './Form'

const Home = (props) => {
    return(
        <div>
            <Header />
            <Form handleChange={props.handleChange} getFoods={props.getFoods}/>
        </div>
    )
}

export default Home;