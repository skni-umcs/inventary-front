import axios from 'axios';
import {omit} from 'lodash';
import LogRocket from 'logrocket';
import {toast} from 'react-toastify';
import ItemType from '../types/item.type';
import UserType from '../types/user.type';
import AuthClient from './auth-client';

const apiUrl = import.meta.env.REACT_APP_ENV === 'development'
                ? import.meta.env.REACT_APP_DEV_API_URL
                : import.meta.env.REACT_APP_PROD_API_URL;

const getConfig = (tokenType?: string) => {
    if (!AuthClient.checkValid()) {
        return {};
    }
    return {
        headers: {
            'Authorization': `Bearer ${tokenType === 'refresh' ? AuthClient.getRefreshToken() : AuthClient.getJwt()}`,
            'Accept-Language': 'pl-PL',
            'Pzdr': ':>',
        },
    };
};

const checkForErr = (err: any) => {
    if (err.response.status === 401) {
        AuthClient.clearJwt();
        window.location.href = 'inventaryapp';
    } else if (err.response.status === 422) {
        // pass
    } else {
        console.error('Error: ', err);
    }
};

export default {
    getItems(n: number, skip: number) {
        return axios.get(`${apiUrl}/item/list?length=${n}&skip=${skip}`, getConfig())
            .then(res => {
                if (!res.data) {
                    return [];
                }
                return res.data;
            })
            .catch(checkForErr);
    },
    getItemById(id: number) {
        return axios.get(`${apiUrl}/item/${id}`, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr);
    },
    addItem(newItem: ItemType) {
        return axios.post(`${apiUrl}/item`, newItem, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr);
    },
    importItems(items: ItemType[], count: number) {
        axios.post(`${apiUrl}/item`, items.pop(), getConfig())
            .then(res => {
                if (items.length > 0) {
                    this.importItems(items, count + 1);
                } else {
                    count = count + 1;
                    toast.success(`${count} ${count === 1
                        ? 'przedmiot zaimportowany'
                        : count < 5
                            ? 'przedmioty zaimportowane'
                            : 'przedmiotów zaimportowanych'}\nOdśwież stronę`);
                }
            })
            .catch(checkForErr);
    },
    updateItem(item: ItemType) {
        return axios.put(`${apiUrl}/item`, item, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr);
    },
    deleteItems(ids: number[], count: number) {
        axios.delete(`${apiUrl}/item/${ids.pop()}`, getConfig())
            .then(() => {
                if (ids.length > 0) {
                    this.deleteItems(ids, count + 1);
                } else {
                    count = count + 1;
                    toast.success(`${count} ${count === 1
                        ? 'przedmiot usunięty'
                        : count < 5
                            ? 'przedmioty usunięte'
                            : 'przedmiotów usuniętych'}`);
                }
            })
            .catch(checkForErr);
    },
    getCategories() {
        if (!AuthClient.checkValid()) { return Promise.resolve([]); }
        return axios.get(`${apiUrl}/category/all`, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr);
    },
    addCategory(newCategory: string) {
        const payload = {
            name: newCategory,
        };
        return axios.post(`${apiUrl}/category`, payload, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr);
    },
    deleteCategory(id: number) {
        return axios.delete(`${apiUrl}/category/${id}`, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr);
    },
    editCategory(newCategory: { id: number, name: string }) {
        return axios.put(`${apiUrl}/category`, newCategory, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr);
    },
    getStorages() {
        if (!AuthClient.checkValid()) { return Promise.resolve([]); }
        return axios.get(`${apiUrl}/warehouse/all`, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr);
    },
    addStorage(newStorage: string) {
        const payload = {
            name: newStorage,
        };
        return axios.post(`${apiUrl}/warehouse`, payload, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr);
    },
    editStorage(newStorage: { id: number, name: string }) {
        return axios.put(`${apiUrl}/warehouse`, newStorage, getConfig())
            .then(res => {
                return res.data;
            }).catch(checkForErr);
    },
    deleteStorage(id: number) {
        return axios.delete(`${apiUrl}/warehouse/${id}`, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr);
    },
    login(username: string, password: string) {
        return axios.post(`${apiUrl}/login`, {username, password})
            .then(res => {
                if (res.data.message === 'unauthorized') {
                    return res.data.message;
                }
                AuthClient.setJwt(res.data.token);
                AuthClient.setRefreshToken(res.data.refresh_token);

                this.getCurrentUser().then(user => {
                    LogRocket.identify(user.user, {
                        name: user.user,
                    });
                }).catch(checkForErr);

                return res.data.message;
            })
            .catch(checkForErr);
    },
    register(user: UserType) {
        return axios.post(`${apiUrl}/register?token=${user.token}`, omit(user, 'token'))
            .then(res => {
                return res.data;
            })
            .catch(checkForErr);
    },
    logout() {
        AuthClient.clearJwt();
        AuthClient.clearRefreshToken();
        window.location.href = 'inventaryapp';
    },
    getCurrentUser() {
        return axios.get(`${apiUrl}/user`, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr);
    },
    refreshToken() {
        return axios.get(`${apiUrl}/refresh`, getConfig('refresh'))
            .then(res => {
                AuthClient.setJwt(res.data.token);
                return res.data.message;
            })
            .catch(checkForErr);
    },
    getMyTokens() {
        return axios.get(`${apiUrl}/register/token/my`, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr);
    },
    addToken(name: string, quota: number) {
        return axios.get(`${apiUrl}/register/token/generate?name=${name}&userLimit=${quota}`, getConfig())
            .then(res => {
                return res.data;
            })
            .catch(checkForErr);
    },
};
