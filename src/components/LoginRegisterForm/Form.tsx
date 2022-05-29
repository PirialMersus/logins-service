import React, {useState} from 'react';
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {TextField} from '../TextField/TextField';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    iconWrap: {
        margin: '10px',
        backgroundColor: "#1976d2",
    },
    error: {
        marginTop: '14px',
        width: '100%',
    },
    form: {
        width: '100%',
        marginTop: '10px',
    },
    buttonsWrapper: {
        margin: '14px 0 10px',
        padding: '14px',
    },
}));

interface IProps {
    isRegisterComponent?: boolean,
    handleFormSubmit: (username: string, password: string) => void
}

const Form: React.FC<IProps> = ({isRegisterComponent = false, handleFormSubmit}) => {
    const classes = useStyles();

    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isRegisterComponent && password !== confirmPassword) {
            setConfirmPasswordError(true)
            setConfirmPassword('')
            return
        }
        handleFormSubmit(username, password)
    }
    const registerClickHandler = () => {

    }
    const errorMessage = false

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.iconWrap}>
                    {isRegisterComponent ? <ExitToAppIcon/> : <LockOutlinedIcon/>}
                </Avatar>
                <Typography component="h1" variant="h5">
                    {isRegisterComponent ? 'Register' : 'Login'}
                </Typography>
                {errorMessage && (
                    <Alert className={classes.error} variant="outlined" severity="error">
                        {errorMessage}
                    </Alert>
                )}
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        autoComplete="off"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Name"
                        name="name"
                        inputProps={{maxLength: 50, minLength: 5}}
                        // error={fields.email.error}
                        value={username}
                        onChange={e => setUserName(e.target.value)}
                    />
                    <TextField
                        minRows={5}
                        maxRows={50}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="off"
                        inputProps={{maxLength: 50, minLength: 5}}
                        // error={fields.password.error}
                        // aria-errormessage={'message'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    {isRegisterComponent &&
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Confirm password"
                            type="password"
                            autoComplete="off"
                            error={confirmPasswordError}
                            aria-errormessage={'enter correct value'}
                            value={confirmPassword}
                            inputProps={{maxLength: 50, minLength: 5}}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    }
                    <Button type="submit" fullWidth variant="contained" color="primary"
                            className={classes.buttonsWrapper}>
                        {isRegisterComponent ? 'Register' : 'Login'}
                    </Button>
                    {!isRegisterComponent &&
                        <Link to={'/register'}>
                            <Button onClick={registerClickHandler} fullWidth variant="outlined" color="default"
                                    className={classes.buttonsWrapper}>
                                Registration
                            </Button>
                        </Link>
                    }
                    {isRegisterComponent &&
                        <Link to={'/login'}>
                            <Button onClick={registerClickHandler} fullWidth variant="outlined" color="primary"
                                    className={classes.buttonsWrapper}>
                                Login
                            </Button>
                        </Link>
                    }
                </form>
            </div>
        </Container>
    )
}
export default Form
