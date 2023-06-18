const initialState = {
    title: '', //title and ID
    id: '',
    content: '', //note body
    hasUpdate: false,
    isLoading: false,
    error: null
};

const currentNoteReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case 'SET_CURRENT_NOTE':
            return {
                title: action.payload.title,
                id: action.payload.id,
                content: action.payload.content,
                hasUpdate: false,
                isLoading: false,
                error: null
            };
        
        case 'UPDATE_CURRENT_NOTE':
            return {
                ...state,
                content: action.payload,
                hasUpdate: true
            };

        case 'FETCH_CURRENT_NOTE_REQUESTED':
            return {
                ...state,
                isLoading: true
            };
        
        case 'FETCH_CURRENT_NOTE_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default:
            return state;

    }

};

export default currentNoteReducer;