import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { updateNoteBody } from '../api/api';
import { showSaved } from '../actions/showPopupActions';
import { useNavigate } from 'react-router-dom';
import { setCurrentNote } from '../actions/currentNoteActions';
import generatePDF from '../utils/toPdf';

function Navigation() {

  const currentNoteId = useSelector(state => state.currentNote.id);
  const currentNoteContent = useSelector(state => state.currentNote.content);
  const popupIsShowing = useSelector(state => state.popup.showSaved);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handlePdf = () => {
    if (currentNoteId != '') {
      generatePDF();
    }
  }

  const handleSave = () => {
    if (currentNoteId != '') {
      const note = {
        noteId: currentNoteId,
        content: currentNoteContent
      }

      const save = async() => {
        try {
          const response = await updateNoteBody(note);

          if (response.success && !popupIsShowing) {
            dispatch(showSaved());
          } else if (response.status == '403') {
            navigate('/login');
          }

        } catch (err) {
          console.error(err);
        }
      }

      save();

    }
  }

  const handleClose = () => {
    dispatch(setCurrentNote('','',''));
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container className="">
        <Navbar.Brand>MD-Jang</Navbar.Brand>
        <Nav>
          <Navbar.Collapse>
            <Nav.Link>About</Nav.Link>
            <Nav.Link onClick={handlePdf} >PDF</Nav.Link>
            <Nav.Link onClick={handleSave} >Save</Nav.Link>
            <Nav.Link onClick={handleClose} >Close</Nav.Link>
          </Navbar.Collapse>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
  
export default Navigation;