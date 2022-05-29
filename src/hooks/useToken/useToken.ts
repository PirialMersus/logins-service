import {useEffect, useState} from 'react';

export interface IUserLogin {
    name: string,
    id: string
}
export interface IUserCreate {
    name: string,
    password: string
}

export default function useToken() {
    const [token, setToken] = useState<IUserLogin>({name: '', id: ''});
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = tokenString && JSON.parse(tokenString);
        setToken(userToken)
    }
    useEffect(() => getToken(), [])
    const saveToken = (userToken: IUserLogin) => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };
    return {
        setToken: saveToken,
        token
    }
}