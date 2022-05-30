import axios from "axios";
import {IUserCreate} from "./hooks/useToken/useToken";
import {IPassword} from "./components/Table/ChangedMUITable";

const instance = axios.create({
    baseURL: "https://peaceful-tundra-26357.herokuapp.com/",
    // baseURL: "http://localhost:5000/",
    headers: {
        'Content-Type': 'application/json',
    },
});

export const passwordsAPI = {
    addPasswordToUser(credentials: Omit<IPassword, 'id'>) {
        return instance.post(`passwords/create`, credentials);
    },
    getPasswords(userId: string | number) {
        return instance.get(`passwords/${userId}`);
    },
    updatePassword(credentials: IPassword) {
        return instance.put(`passwords`, credentials);
    },
    deletePassword(passwordId: string, userId: string) {
        return instance.post(`passwords/delete`, {userId, passwordId});
    },
};
export const authAPI = {
    loginUser(credentials: { name: string, password: string }) {
        return instance.put(`login`, credentials);
    },
    registerUser(credentials: IUserCreate) {
        return instance.post(`login`, credentials);
    },
};