import Cookies from 'js-cookie';

export function setToken(token: string) {
    Cookies.set('token', token, { expires: 7, sameSite: 'strict' });
}

export function getToken() {
    const token = Cookies.get('token');
    if (!token) 
        return "";
    return token;
}

export function removeToken() {
    Cookies.remove('token');
}