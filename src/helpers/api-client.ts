import axios from 'axios';
import AuthClient from './auth-client';
import IItem from "../types/item.type";

const api_url = process.env.REACT_APP_ENV === 'developement' ? process.env.REACT_APP_DEV_API_URL : process.env.REACT_APP_PROD_API_URL;

const getConfig = () => {
    return {
        headers: {
            'Authorization': `Bearer ${AuthClient.getJwt()}`,
            'Accept-Language': 'pl-PL',
            'Pzdr': ':>'
        }
    }
}

const checkForErr = (err: any) => {
    if(err.response.status === 401) {
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
        return axios.get(`${api_url}/item?itemId=${id}`, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.error(err);
            })
    },
    updateItem(item: IItem) {
        return axios.put(`${api_url}/item`, item, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.error(err);
            })
    },
    deleteItems(ids: number[]) {
            axios.delete(`${api_url}/item?itemId=${ids.pop()}`, getConfig())
                .catch(err => {
                    console.error(err);
                })
                .finally(() => {
                    if(ids.length > 0) {
                        this.deleteItems(ids);
                    }
                })
        return new Promise((resolve, reject) => {
            resolve(void 0);
        });
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
                if(res.data.message === "unauthorized") {
                    return res.data.message;
                }
                console.log(res.data);
                AuthClient.setJwt(res.data.token);
                return res.data.message;
            })
            .catch(err => {
                console.error(err);
            })
    },
    logout () {
        AuthClient.clearJwt();
        window.location.href = '/';
    }
}
