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
}