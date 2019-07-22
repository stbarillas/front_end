import React from "react";
import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 150,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    close: {
        padding: theme.spacing(0.5),
    },
    button: {
        margin: theme.spacing(1),
    },
}));

function Login(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        username: '',
        password: '',
    });

    const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    };

    function handleSubmit(event) {
        const url = 'http://127.0.0.1:8000/api-token-auth/';
        var data = {
            "username": values.username,
            "password": values.password,
        }
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json',
            }
        })
        // If response is ok, translate to json. Otherwise, throw Error
            .then(res => {
                if(res.ok){
                    return res.json()
                } else {
                    throw new Error(res.status);
                }
            })
            .then(response => {
                // Saves token to sessionStorage & passes up auth state to trigger rerender
                console.log(response)
                if (sessionStorage) {
                    sessionStorage.setItem('token', response['token']);
                    sessionStorage.setItem('user_id', response['user_id']);
                    sessionStorage.setItem('username', values.username)
                    sessionStorage.setItem('full_name', response['full_name']);
                    sessionStorage.setItem('email', response['email']);
                    props.on_login();
                }
            })
            .catch(error => console.error('API error:', error));
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                id="standard-name"
                className={classes.textField}
                label="username"
                value={values.username}
                onChange={handleChange('username')}
                margin="normal"
            />
            <TextField
                id="standard-name"
                className={classes.textField}
                label="password"
                value={values.password}
                onChange={handleChange('password')}
                margin="normal"
            />
            <Button variant="contained" className={classes.button} type='submit'>
                Login
            </Button>
            <Button variant="contained" className={classes.button}>
                <Link to="/register">register</Link>
            </Button>
        </form>
    );
}

export default Login