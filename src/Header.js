import React from 'react'

class Header extends React.Component{
    render(){
        return(
            <header className="wrapper">
                <h1>Bitter Parent</h1>
                <div>
                    <h2>Because life is short, not sweet.</h2>
                </div>
                <div>
                    <p>Want to find a healthier snack for your child? Type in their favourite dessert below.</p>
                </div>
            </header>
        )
    }
}

export default Header;