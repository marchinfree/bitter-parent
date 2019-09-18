import React from 'react';
import Header from './Header';
import Form from './Form';
import Modal from './Modal';
import ModalDisplay from './ModalDisplay';

const Home = (props) => {
    return (
        <div>
            <div>
            <Header />
            <Form handleChange={props.handleChange} getFoods={props.getFoods} />
            {props.allData.apiFailed === true ? <p className="errorMessage">Oops! Something's wrong. Re-type your search or try again later.</p> : null}
            <div>
            {props.allData.isShowing ? <div onClick={props.closeModalHandler} className="back-drop"></div> : null}
            </div>
        
                <Modal className="modal"
                    show={props.allData.isShowing}
                    close={props.closeModalHandler}
                    handleFireSave={props.handleFireSave}
                    allData={props.allData}
                   >

                    <ModalDisplay  allData={props.allData}
                    show={props.allData.isShowing}
                    />
                </Modal>
            </div>
        </div>
    )
}

export default Home;