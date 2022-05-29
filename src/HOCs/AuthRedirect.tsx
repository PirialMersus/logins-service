import React, {FC, ReactNode} from 'react';
import {Navigate} from "react-router-dom";
import {IUserLogin} from '../hooks/useToken/useToken';

interface IProps {
    children: ReactNode
    token: IUserLogin
}

const AuthRedirect: FC<IProps> = ({children, token}) => {
    if (!token) {
        return <Navigate to = '/login'/>
    }
    else return <>{children}</>

};

export default AuthRedirect;