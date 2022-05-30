import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Paper from '@material-ui/core/Paper';
import React, {SyntheticEvent} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {useForm} from '../../hooks/useForm/useForm';
import CreateUpdateForm from '../../components/CreateUpdateForm/CreateUpdateForm';
import {passwordsAPI} from "../../api";
import {IUserLogin} from "../../hooks/useToken/useToken";
import {errorToastMessage, successToastMessage} from '../../helpers/toastMessageHelper';
import Title from "../../components/Title/Title";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
    titleWrap: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        '@media (max-width:350px)': {
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
        '@media (max-width:500px)': {
            whiteSpace: 'normal',
        },
    },
    divider: {
        margin: '14px 0',
    },
}));

export interface IForm {
    service: string;
    name: string;
    password: string;
}

interface IProps {
    token: IUserLogin
}

const Create: React.FC<IProps> = ({token}) => {
    const classes = useStyles();
    const navigate = useNavigate()

    const {form, handleTextFiledChange} = useForm<IForm>({
        service: '',
        name: '',
        password: '',
    });

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        passwordsAPI.addPasswordToUser({
            userId: token.id,
            service: form.service,
            name: form.name,
            password: form.password,
        })
            .then(response => {
                successToastMessage(`${form.name} created`);
                navigate('/')
                if (response.status === 201) {
                    return response.data
                }

            })
            .catch((err) => {
                console.error(err);
                errorToastMessage(err.message);
            });
    };

    return (
        <Paper className={classes.root}>
            <div className={classes.titleWrap}>
                <Title color={'textPrimary'} className={classes.title}>
                    Create password
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
            <CreateUpdateForm form={form} handleTextFiledChange={handleTextFiledChange} handleSubmit={handleSubmit}/>
        </Paper>
    );
};

export default Create;
