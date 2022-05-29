import React, {useState} from 'react';
import Form from "../../components/LoginRegisterForm/Form";
import {errorToastMessage, successToastMessage} from "../../helpers/toastMessageHelper";
import Spinner from "../../components/Spinner/Spinner";
import {useNavigate} from "react-router-dom";
import {authAPI} from "../../api";


const Register: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate()
    const handleSubmit = async (name: string, password: string) => {
        setLoading(true)
        authAPI.registerUser({
            name,
            password,
        }).then(response => {
            if (response.status === 201) {
                successToastMessage('User is created');
                return response.data
            }
        })
            .then(_data => {
                setLoading(false)
                navigate('/login')
            })
            .catch(_err => {
                    errorToastMessage('Something went wrong. Try one more time')
                }
            )
    }
    if (loading) {
        return <Spinner page={false} size={40}/>
    }

    return <Form isRegisterComponent={true} handleFormSubmit={handleSubmit}/>

}
export default Register
