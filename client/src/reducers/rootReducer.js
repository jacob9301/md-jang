import allNotesReducer from './allNotesReducer';
import currentNoteReducer from './currentNoteReducer';
import popupReducer from './popupReducer';

const rootReducer = {
    allNotes: allNotesReducer,
    currentNote: currentNoteReducer,
    popup: popupReducer
}

export default rootReducer;