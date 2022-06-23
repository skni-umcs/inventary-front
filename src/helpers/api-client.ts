import axios from 'axios';
import AuthClient from './auth-client';
const api_url = process.env.API_URL ? process.env.API_URL : 'http://localhost:5000';

const getConfig = () => {
    return {
        headers: {
            'Authorization': `Bearer ${AuthClient.getJwt()}`
        }
    }
}

const checkForErr = (err: any) => {
    if(err.response.status == 401) {
        AuthClient.clearJwt();
        window.location.href = '/';
    } else {
        console.error("Error: ", err);
    }
}

export default {
    getItems (n: number, skip: number) {
        return axios.get(`${api_url}/item/list?length=${n}&skip=${skip}`, getConfig())
            .then(res => {
                if(!res.data){
                    return [];
                }
                return res.data;
            })
            .catch(checkForErr);
    },
    getItemById (id: number) {
        return axios.get(`${api_url}/item/${id}`, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.error(err);
            })
    },
    getCategories () {
        return axios.get(`${api_url}/categories`, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.error(err);
            })
    },
    getStorages () {
        return axios.get(`${api_url}/storages`, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.error(err);
            })
    },
    login (username: string, password: string) {
        return axios.post(`${api_url}/login`, {username, password})
            .then(res => {
                if(res.data.message == "unauthorized") {
                    return res.data.message;
                }
                console.log(res.data);
                AuthClient.setJwt(res.data.token);
                return res.data.message;
            })
            .catch(err => {
                console.error(err);
            })
    }
}
