interface jwt {
    exp: number,
    fresh?: boolean,
    iat?: number,
    jti?: string,
    nbf?: number,
    sub?: string,
    type?: string
}

const parseToken = (token: string): jwt => {
    try {
        return JSON.parse(atob(token.split('.')[1]))
    } catch (e) {
        console.error('Couldn\'t parse JWT token. Try signing out and in again!');
        return {exp: 0}
    }
}

export default {
    getJwt() {
        return localStorage.getItem('jwt');
    },
    setJwt(jwt: string) {
        localStorage.setItem('jwt', jwt);
    },
    clearJwt() {
        localStorage.removeItem('jwt');
    },
    getRefreshToken() {
        return localStorage.getItem('refreshToken');
    },
    setRefreshToken(refreshToken: string) {
        localStorage.setItem('refreshToken', refreshToken);
    },
    clearRefreshToken() {
        localStorage.removeItem('refreshToken');
    },
    checkValid() {
        const token = localStorage.getItem('jwt');
        if (token) {
            const parsedToken = parseToken(token);
            if (parsedToken.exp < Date.now() / 1000) {
                this.clearJwt();
                return false;
            }
            return true;
        }
        return false;
    }
}