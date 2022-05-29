import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Settings from "./pages/Settings/Settings";
import useToken from "./hooks/useToken/useToken";
import Login from './pages/Login/Login';
import VpnLockIcon from '@material-ui/icons/VpnLock';
import Register from "./pages/Register/Register";
import AuthRedirect from "./HOCs/AuthRedirect";
import Title from './components/Title/Title';
import {makeStyles} from "@material-ui/core/styles";
import Create from "./pages/Create/Create";
import Update from "./pages/Update/Update";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        padding: '20px',
    },

    appTitle: {
        justifyContent: 'center',
        fontSize: '36px !important',
        ['@media (max-width:750px)']: {
            fontSize: '28px !important',
        },
        ['@media (max-width:500px)']: {
            fontSize: '20px !important',
        },
    },
    greetings: {
        justifyContent: 'center',
        fontSize: '26px !important',
        ['@media (max-width:750px)']: {
            fontSize: '20px !important',
        },
        ['@media (max-width:500px)']: {
            fontSize: '14px !important',
        },
    },
    iconPlanet: {
        color: '#3f51b5',
        marginRight: '14px',
        ['@media (max-width:750px)']: {
            fontSize: '22px !important',
            marginRight: '10px',
        },
        ['@media (max-width:500px)']: {
            fontSize: '16px !important',
            marginRight: '6px',
        },
    },
}));

function App() {
    const classes = useStyles();
    const {setToken, token} = useToken()
    return (
        <div className={classes.wrapper}>
            <Title color={'textPrimary'} className={classes.appTitle}
                   Icon={<VpnLockIcon className={classes.iconPlanet} fontSize="large"/>}>
                Password manager
            </Title>
            <Title color={'textPrimary'} className={classes.greetings}>
                Hello{token?.name && `, ${token.name}`}
            </Title>
            <Routes>
                <Route path="/" element={<AuthRedirect token={token}><Dashboard token={token}/></AuthRedirect>}/>
                <Route path="/login" element={<Login setToken={setToken} token={token}/>}/>
                <Route path="/preferences" element={<AuthRedirect token={token}><Settings/></AuthRedirect>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/create" element={<AuthRedirect token={token}><Create token={token}/></AuthRedirect>}/>
                <Route path="/update/:passwordId"
                       element={<AuthRedirect token={token}><Update token={token}/></AuthRedirect>}/>
            </Routes>
        </div>
    );
}

export default App;