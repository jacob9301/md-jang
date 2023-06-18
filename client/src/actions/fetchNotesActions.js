export const notesUpdated = () => ({
    type: 'NOTES_UPDATED'
});

export const fetchNotesRequested = () => ({
    type: 'FETCH_NOTES_REQUESTED'
});

export const fetchNotesSuccess = titles => ({
    type: 'FETCH_NOTES_SUCCESS',
    payload: titles
});

export const fetchNotesFailure = () => ({
    type: 'FETCH_NOTES_FAILURE'
});