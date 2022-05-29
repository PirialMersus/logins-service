import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Paper from '@material-ui/core/Paper';
import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {useForm} from "../../hooks/useForm/useForm";
import {IForm} from "../Create/Create";
import ErrorLabel from "../../components/ErrorLabel/ErrorLabel";
import Spinner from "../../components/Spinner/Spinner";
import Title from "../../components/Title/Title";
import CreateUpdateForm from '../../components/CreateUpdateForm/CreateUpdateForm';
import {IUserLogin} from "../../hooks/useToken/useToken";
import {passwordsAPI} from "../../api";
import {IPassword} from "../../components/Table/ChangedMUITable";
import {errorToastMessage, successToastMessage} from "../../helpers/toastMessageHelper";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '14px',
    },
    titleWrap: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        ['@media (max-width:350px)']: {
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
    },
    title: {
        fontSize: '16px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        whiteSpace: 'nowrap',
    },
    divider: {
        margin: '14px 0',
    },
}));

interface IProps {
    token: IUserLogin
}

const Update: React.FC<IProps> = ({token}): JSX.Element => {
    const classes = useStyles();
    const navigate = useNavigate()
    const {passwordId} = useParams<{ passwordId: string }>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const form = useForm<IForm>({
        service: '',
        name: '',
        password: '',
    });

    useEffect(() => {
        if (token.id) {
            setLoading(true)
            passwordsAPI.getPasswords(token.id)
                .then(data => {
                    const passwords: IPassword[] = data.data.passwords
                    const password = passwords.find(password => password.id.toString() === passwordId?.toString())
                    if (password) {
                        form.setInitial({
                            service: password.service,
                            password: password.password,
                            name: password.name
                        })
                    }
                })
                .catch(error => {
                    errorToastMessage(error.message)
                    setError(true)
                })
                .finally(() => setLoading(false))
        }
    }, [token.id])

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true)

        passwordsAPI.updatePassword({
            userId: token.id.toString(),
            service: form.form.service,
            name: form.form.name,
            password: form.form.password,
            id: passwordId!,
        })
            .then(response => {
                setLoading(false)
                successToastMessage(`${form.form.name} updated`);
                navigate('/')
                if (response.status === 201) {
                    return response.data
                }

            })
            .catch((err) => {
                setLoading(false)
                console.error(err);
                errorToastMessage(err.message);
            });
    };

    if (error) return <ErrorLabel message={'Loading data error'}/>;

    if (loading) return <Spinner page={false}/>;

    return (
        <Paper className={classes.root}>
            <div className={classes.titleWrap}>
                <Title color={'textPrimary'} className={classes.title}>
                    Update password
                </Title>
                <div className={classes.buttonContainer}>
                    <Link to='/'>
                        <Button className={classes.button} color="default" size="small"
                                startIcon={<KeyboardBackspaceIcon/>}>
                            Back to passwords list
                        </Button>
                    </Link>
                </div>
            </div>
            <Divider className={classes.divider}/>
            <CreateUpdateForm {...form} handleSubmit={handleSubmit}/>
        </Paper>
    );
};

export default Update;
