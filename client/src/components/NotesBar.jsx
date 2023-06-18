import { useSelector, useDispatch } from 'react-redux';
import { getAllNotes, getCurrentNote } from '../api/api';
import { useEffect } from 'react'
import { fetchNotesSuccess, fetchNotesFailure, fetchNotesRequested } from '../actions/fetchNotesActions';
import { showNewNote } from '../actions/showPopupActions';
import LoadingSpinnerOverlay from './LoadingSpinnerOverlay.jsx';
import { fetchCurrentNoteRequested, setCurrentNote, fetchCurrentNoteFailure } from '../actions/currentNoteActions';
import { useNavigate } from 'react-router-dom';

//sort out how to handle errors and clean up

function NotesBar() {

    const titles = useSelector(state => state.allNotes.titles);
    const hasUpdate = useSelector(state => state.allNotes.hasUpdate);
    const isLoading = useSelector(state => state.allNotes.isLoading);
    const hasError = useSelector(state => state.allNotes.hasError);
    const popupIsShowing = useSelector(state => state.popup.showNewNote);
    const currentNoteId = useSelector(state => state.currentNote.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getNotes = async() => {
        try{
            const response = await getAllNotes();
            if (response.success) {
                dispatch(fetchNotesSuccess(response.notes));
            } else if (response.status == '403') {
                navigate('/login');
                dispatch(fetchNotesFailure());
            } else {
                dispatch(fetchNotesFailure());
            }
        } catch(err) {
            console.error(err);
        }
    };

    //re-fetch notes when new note added
    useEffect(() => {
        if(hasUpdate){
            dispatch(fetchNotesRequested());
            getNotes();
        }
    },[hasUpdate]);

    //fetch notes on initial render
    useEffect(() => {
        dispatch(fetchNotesRequested());
        getNotes();
    },[]);

    const handleNewNote = () => {

        //handle current note incase note is already open

        if (!popupIsShowing) {
            dispatch(showNewNote());
        }
    }

    const handleOpenNote = (event) => {

        const noteId = event.target.getAttribute('data-note-id');

        dispatch(fetchCurrentNoteRequested());

        const getNote = async() => {

            try{
                const response = await getCurrentNote(noteId);

                if (response.success){
                    const note = response.note;
                    dispatch(setCurrentNote(note.title, note._id, note.body));
                } else {
                    dispatch(fetchCurrentNoteFailure(response.status));
                    if (response.status == '403') {
                        navigate('/login');
                    }
                }
            } catch(err) {
                dispatch(fetchCurrentNoteFailure('unable to fetch note'));
                console.error(err);
            }
        }

        getNote();
    }

    return (
        //relative styling so spinner only overlays the parent div
        <div style={{ position: 'relative', overflow: 'auto', height: '100%' }}>
            {isLoading ? <LoadingSpinnerOverlay /> : null }
            {hasError ? <p>Error fetching notes</p> : 
                <div className='flex-column'>
                    <div onClick={handleNewNote} className='note-item'>+ New Note</div>
                    {titles.map((note, i) => (
                        <div
                            key={note._id}
                            data-note-id={note._id} 
                            onClick={handleOpenNote} 
                            className={note._id === currentNoteId ? 'selected-note' : 'note-item'} 
                        >{note.title}</div>
                    ))}
                </div>
            }
        </div>
      );
};

export default NotesBar;