const initialState = {
    showNewNote: false,
    showSaved: false
};

const popupReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SHOW_NEW_NOTE':
            return {
                ...state,
                showNewNote: true
            };
        
        case 'HIDE_NEW_NOTE':
            return {
                ...state,
                showNewNote: false
            };

        case 'SHOW_SAVED':
            return {
                ...state,
                showSaved: true
            };
        
        case 'HIDE_SAVED':
            return {
                ...state,
                showSaved: false
            };
        
        default:
            return state;
    }
};

export default popupReducer;