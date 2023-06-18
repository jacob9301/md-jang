export const fetchCurrentNoteRequested = () => ({
    type: 'FETCH_CURRENT_NOTE_REQUESTED'
});

export const setCurrentNote = (title, id, body) => ({
    type: 'SET_CURRENT_NOTE',
    payload: {
        title: title,
        id: id,
        content: body
    }
});

export const updateCurrentNote = body => ({
    type: 'UPDATE_CURRENT_NOTE',
    payload: body
});

export const fetchCurrentNoteFailure = error => ({
    type: 'FETCH_CURRENT_NOTE_FAILURE',
    payload: error
});