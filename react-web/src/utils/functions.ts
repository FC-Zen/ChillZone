export const getCSRFToken = () => {
    const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
    if (csrfCookie) {
        return csrfCookie.split('=')[1];
    }
    return null; 
};

export const getToken = () => {
    const token = localStorage.getItem('token')
    if (token) {
        return token;
    }
    return null; 
}