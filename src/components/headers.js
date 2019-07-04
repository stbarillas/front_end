import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Login from "./login";
import Logout from './logout';
import Sandbox from './sandbox';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit">
                        <Link to="/">Instruments</Link>
                    </Button>
                    <Button color="inherit">
                        <Link to="/usersettings">User Settings</Link>
                    </Button>
                    {/*Toggles between Login and Logout Components*/}
                    {props.is_auth ? <Logout on_logout={()=>props.on_logout()}/> : <Login on_login={()=>props.on_login()}/>}
                    <Sandbox/>
                </Toolbar>
            </AppBar>
        </div>
    );
}