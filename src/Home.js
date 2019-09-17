import React from 'react';
import Header from './Header';
import Form from './Form';
import Modal from './Modal';
import ModalDisplay from './ModalDisplay';

const Home = (props) => {
    console.log(props);
    return (
        <div>
            <Header />
            <Form handleChange={props.handleChange} getFoods={props.getFoods} />

            <div>
            {props.allData.isShowing ? <div onClick={props.closeModalHandler} className="back-drop"></div> : null}
            </div>
            
            <div>
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