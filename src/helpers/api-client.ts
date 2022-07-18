import axios from 'axios';
import AuthClient from './auth-client';
import IItem from "../types/item.type";
import {toast} from "react-toastify";

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
        return axios.get(`${api_url}/item/${id}`, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr)
    },
    addItem (newItem: IItem) {
        return axios.post(`${api_url}/item`, newItem, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr);
    },
    updateItem (item: IItem) {
        return axios.put(`${api_url}/item`, item, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr)
    },
    deleteItems(ids: number[]) {
        let count = ids.length;
            axios.delete(`${api_url}/item/${ids.pop()}`, getConfig())
                .then(() => {
                    if(ids.length > 0) {
                        this.deleteItems(ids);
                    }
                })
                .catch(checkForErr)
                .finally(() => {
                    toast.success(`Usunięto ${count} elementów`);
                })
    },
    getCategories () {
        return axios.get(`${api_url}/category/all`, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr)
    },
    addCategory (newCategory: string) {
        let payload = {
            name: newCategory
        }
        return axios.post(`${api_url}/category`, payload, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr);
    },
    deleteCategory (id: number) {
        return axios.delete(`${api_url}/category/${id}`, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr);
    },
    editCategory (newCategory: {id: number, name: string}) {
        return axios.put(`${api_url}/category`, newCategory, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr);
    },
    getStorages () {
        return axios.get(`${api_url}/warehouse/all`, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr)
    },
    addStorage (newStorage: string) {
        let payload = {
            name: newStorage
        }
        return axios.post(`${api_url}/warehouse`, payload, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr);
    },
    editStorage (newStorage: {id: number, name: string}) {
        return axios.put(`${api_url}/warehouse`, newStorage, getConfig())
            .then(res => {
                return res.data;
            }).catch(checkForErr);
    },
    deleteStorage (id: number) {
        return axios.delete(`${api_url}/warehouse/${id}`, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr);
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
            .catch(checkForErr)
    },
    logout () {
        AuthClient.clearJwt();
        window.location.href = '/';
    }
}
