export const getTokenRefresh = () => {
    const token = localStorage.getItem('refresh')
    if (token) {
        return token;
    }
    return null; 
}

export const getTokenAccess = () => {
    const token = localStorage.getItem('access')
    if (token) {
        return token;
    }
    return null; 
}