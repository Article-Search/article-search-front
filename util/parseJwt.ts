export function parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    console.log('hello')
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export function storeToken(key: string, token: string) {
    localStorage.setItem(key, token);
}
