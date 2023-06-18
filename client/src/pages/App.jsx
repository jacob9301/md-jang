
import Navigation from '../components/Navigation.jsx';
import NotesBar from '../components/NotesBar.jsx';
import TextEditor from '../components/TextEditor.jsx';
import NewNotePopup from '../components/NewNotePopup.jsx';
import SavedPopup from '../components/SavedPopup.jsx';

function App() {

  return (
    <>
      <div className='navigation-container'>
        <Navigation/>
      </div>
      <NewNotePopup />
      <SavedPopup />
      <div className="d-flex">
        <div className='notesbar-container'>
          <div className='notes-bar-heading'>
            <center>Notes</center>
          </div>
          <NotesBar />
        </div>
        <div className="content-container">
          <TextEditor />
        </div>
      </div>
    </>
  )
}

export default App
