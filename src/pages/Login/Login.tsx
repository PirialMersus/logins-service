import React, {useState} from 'react';
import Form from "../../components/LoginRegisterForm/Form";
import Spinner from '../../components/Spinner/Spinner';
import {Navigate} from "react-router-dom";
import {errorToastMessage, successToastMessage} from '../../helpers/toastMessageHelper';
import {IUserLogin} from '../../hooks/useToken/useToken';
import {authAPI} from "../../api";


interface IProps {
    token: IUserLogin
    setToken: (newToken: IUserLogin) => void
}

const Login: React.FC<IProps> = ({token, setToken}) => {

    const [loading, setLoading] = useState<boolean>(false);
    const handleSubmit = async (name: string, password: string) => {
        setLoading(true)
        authAPI.loginUser({
            name,
            password
        })
            .then(response => {
                if (response.status === 201) {
                    return response.data
                }
            })
            .then(data => {
                setLoading(false)
                setToken({name, id: data.id})
                successToastMessage(`${name}, welcome to app`);
            })
            .catch(_err => {
                    errorToastMessage('Name or password is incorrect')
                    setLoading(false)
                }
            )
    }

    if (token) return <Navigate to='/'/>

    if (loading) {
        return <Spinner page={false} size={40}/>
    }

    return <Form isRegisterComponent={false} handleFormSubmit={handleSubmit}/>

}
export default Login
