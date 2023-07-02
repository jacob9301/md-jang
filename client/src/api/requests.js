export const fetchWithAuth = async (url) => {
    const response = await fetch(url, {
            headers: {
                'authorisation': ('Bearer ' + localStorage.getItem('accessToken'))
            },
    });

    return response;
};

export const postWithAuth = async (url, payload) => {
    const response = await fetch(url, {
            method: 'POST',
            headers: {
                'authorisation': ('Bearer ' + localStorage.getItem('accessToken')),
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
    });

    return response;
};

export const post = async (url, payload) => {
    const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
    });

    return response;
}