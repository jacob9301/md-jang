import React, { useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { hideNewNote } from '../actions/showPopupActions';
import { postNewNote } from '../api/api';
import { notesUpdated } from '../actions/fetchNotesActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function NewNotePopup() {

    const [newTitle, setTitle] = useState('');

    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState('');

    const show = useSelector(state =>  state.popup.showNewNote);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = () => {
        setAlert(false);
        setTitle('');
        dispatch(hideNewNote());
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleCreate = () => {
        const newNote = async() => {
            try {
                const response = await postNewNote({title: newTitle, body: ''});
                if (response.success) {
                    dispatch(notesUpdated());
                    handleClose();
                } else if (response.status == '403') {
                    navigate('/login');
                } else {
                    setAlertMsg(response.message);
                    setAlert(true);
                }
            } catch(err) {
                console.error('newnotepopup.jsx:',err);
                setAlertMsg('something went wrong');
                setAlert(true);
            }
        }

        newNote();
    }
  
    return (
      <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Title your new note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {alert ? <Alert variant='danger'>{alertMsg}</Alert> : null}
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control type='text' value={newTitle} onChange={handleTitleChange} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleCreate}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
};
  
  export default NewNotePopup;