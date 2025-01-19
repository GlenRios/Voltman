import Cookies from 'js-cookie';

export function setBranch(branch: string) {
    Cookies.set('branch', branch, { expires: 7, sameSite: 'strict' });
}

export function getBranch() {
    const branch = Cookies.get('branch');
    if (!branch) 
        return "";
    return branch;
}

export function removeBranch() {
    Cookies.remove('branch');
}