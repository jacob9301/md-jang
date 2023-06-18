import React from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { hideSaved } from '../actions/showPopupActions';
import 'bootstrap/dist/css/bootstrap.min.css';

function SavedPopup() {

    const show = useSelector(state =>  state.popup.showSaved);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(hideSaved());
    }
  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Alert variant='success'>Note saved succesfully</Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Okay
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
};
  
  export default SavedPopup;