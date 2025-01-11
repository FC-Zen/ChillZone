export const getCSRFToken = () => {
    const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
    if (csrfCookie) {
        return csrfCookie.split('=')[1];
    }
    return null; 
};