import React from 'react';


const modal = (props) => {
    return (
        <div className="modalParent">
            <div className="modal-wrapper"
                style={{
                    display: props.show ? 'block' : 'none',
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    <div>{props.children}</div>
                </div>
                <div className="modal-footer">
                    <button className="add-button" type="button" onClick={props.handleFireSave} disabled={props.allData.buttonClicked === true ? true : false}><i className="fas fa-heart" aria-label="Click to save this search result."></i></button>
                </div>
            </div>
        </div>
    )
}

export default modal;


