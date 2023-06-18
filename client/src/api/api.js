export const login = async(user) => {
    try{
        const response = await fetch("http://localhost:5000/login", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(response.status);
        }

        const responseJson = await response.json();

        if (responseJson.success) {
            localStorage.setItem('accessToken', responseJson.accessToken);
        } 

        return responseJson;
    } catch(err) {
        return {success: false, message: (err.message ? err.message : err)};
    }
};

export const signup = async(user) => {
    try{
        const response = await fetch("http://localhost:5000/signup", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(response.status);
        }

        const responseJson = await response.json();

        if (responseJson.success) {
            localStorage.setItem('accessToken', responseJson.accessToken);
        }

        return responseJson;
    } catch(err) {
        return {success: false, message: (err.message ? err.message : err)};
    }
};

export const getAllNotes = async() => {
    try {
        const response = await fetch("http://localhost:5000/getallnotes",{
            headers: {
              'authorisation': ('Bearer ' + localStorage.getItem('accessToken'))
            }
        });

        if (!response.ok) {
            throw new Error(response.status);
        } 
        
        const responseJson = await response.json();

        return responseJson;

    } catch(err){
        console.error(err);
        return {success: false, status: err.message ? err.message : ''};
    }
};

export const postNewNote = async(note) => {

    try {
        const response = await fetch("http://localhost:5000/addnote", {
            method: 'POST',
            headers: {
                'authorisation': ('Bearer ' + localStorage.getItem('accessToken')),
                'Content-type': 'application/json'
            },
            body: JSON.stringify(note)
        });

        if (!response.ok) {
            throw new Error(response.status);
        } 

        const responseJson = await response.json();

        return responseJson;

    } catch(err) {
        console.error('error fetching all notes:',
        (err.message ? err.message : err));

        return {success: false, status: err.message ? err.message : ''};
    }
};

export const getCurrentNote = async(noteId) => {

    const encodedId = encodeURIComponent(noteId);
    const url = `http://localhost:5000/getcurrentnote/${encodedId}`;

    try {
        const response = await fetch(url,{
            headers: {
              'authorisation': ('Bearer ' + localStorage.getItem('accessToken'))
            }
        });

        if (!response.ok) {
            console.log(response.status);
            throw new Error(response.status);
        } 

        const responseJson = await response.json();
        
        return responseJson;

    } catch(err){
        console.error(err);
        return {success: false, status: err.message ? err.message : ''};
    }
};

export const updateNoteBody = async(note) => {

    try {
        const response = await fetch("http://localhost:5000/updatenote", {
            method: 'POST',
            headers: {
                'authorisation': ('Bearer ' + localStorage.getItem('accessToken')),
                'Content-type': 'application/json'
            },
            body: JSON.stringify(note)
        });

        if (!response.ok) {
            throw new Error(response.status);
        }

        const responseJson = await response.json();
        return responseJson;

    } catch(err) {
        console.error(err);
        return {success: false, status: err.message ? err.message : ''};
    }

};

