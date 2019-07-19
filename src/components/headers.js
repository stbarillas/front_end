import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Login from "./login";
import Logout from './logout';


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
    let button;

    if (props.is_auth) {
        button = <Logout on_logout={()=>props.on_logout()}/>
    }else {
        button = (
            <span>
                <Login on_login={()=>props.on_login()}/>
                <Button color="inherit">
                    <Link to="/register">register</Link>
                </Button>
            </span>
        )
    }

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
                    {button}
                    {/*/!*Toggles between Login and Logout Components*!/*/}
                    {/*{props.is_auth ? <Logout on_logout={()=>props.on_logout()}/> : <Login on_login={()=>props.on_login()}/>}*/}
                    {/*<Button color="inherit">*/}
                    {/*    <Link to="/register">register</Link>*/}
                    {/*</Button>*/}
                </Toolbar>
            </AppBar>
        </div>
    );
}