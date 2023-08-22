import { post, postWithAuth, fetchWithAuth } from "./requests";

export const login = async(user) => {
    try{
        const url = "http://localhost:3000/login"
        const response = await post(url, user);

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
        const url = "http://localhost:3000/signup"
        const response = await post(url, user);

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
        const url = "http://localhost:3000/getallnotes"
        const response = await fetchWithAuth(url);

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
        const url = "http://localhost:3000/addnote";
        const response = await postWithAuth(url, note);

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
    const url = `http://localhost:3000/getcurrentnote/${encodedId}`;

    try {
        const response = await fetchWithAuth(url);

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
        const url = "http://localhost:3000/updatenote";
        const response = await postWithAuth(url, note);

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

