const initialState = {
    titles: [],
    hasUpdate: false,
    isLoading: false,
    hasError: null
};

const allNotesReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case 'NOTES_UPDATED':
            return {
                ...state,
                hasUpdate: true
            };
        
        case 'FETCH_NOTES_SUCCESS':
            return {
                titles: action.payload,
                hasUpdate: false,
                isLoading: false,
                hasError: false
            }
        
        case 'FETCH_NOTES_FAILURE':
            return {
                ...state,
                hasUpdate: false,
                isLoading: false,
                hasError: true
            }
        
        case 'FETCH_NOTES_REQUESTED':
            return {
                ...state,
                isLoading: true
            };

        default:
            return state;

    }

};

export default allNotesReducer;