import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {SimpleSnackbar} from './snackbar'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
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
}));

function TextFields(props) {
    const classes = useStyles();
    const data = props.userData[0];
    const [values, setValues] = React.useState({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
    });

    const [open, setOpen] = React.useState(false);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = event => {
        const id = sessionStorage.getItem('user_id'),
            submitData = {
                'first_name': values.firstName,
                'last_name' : values.lastName,
                'email' : values.email,
            },
            url = 'http://127.0.0.1:8000/users/' + id +'/';
        fetch(url, {
            method: 'PATCH', // or 'PUT'
            body: JSON.stringify(submitData), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + sessionStorage.getItem('token')
            }
        })
            .then(res => {
                if(res.ok){
                    console.log('user database entry update successful')
                    return res.json
                } else {
                    throw new Error(res.status);
                }
            })
            .then(response => {
                // Saves token to sessionStorage & passes up auth state to trigger rerender
                if (sessionStorage) {
                    sessionStorage.setItem('full_name', values.firstName + ' ' + values.lastName);
                    sessionStorage.setItem('email', values.email);
                    console.log('user sessionStorage update successful')
                    setOpen(true);
                }
            })
            .catch(error => console.error('API error:', error));
        event.preventDefault();
    }

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    return (
        <div>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    id="standard-name"
                    label="First Name"
                    className={classes.textField}
                    value={values.firstName}
                    onChange={handleChange('firstName')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="Last Name"
                    className={classes.textField}
                    value={values.lastName}
                    onChange={handleChange('lastName')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="Email"
                    className={classes.textField}
                    value={values.email}
                    onChange={handleChange('email')}
                    margin="normal"
                />
                <input type="submit" value="Submit"/>
            </form>
            <SimpleSnackbar open={open} handleClose={()=>handleClose()}/>
        </div>
    );
}

function RegisterFields() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
    });

    const [open, setOpen] = React.useState(false);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = event => {
        const submitData = {
            'first_name': values.firstName,
            'last_name' : values.lastName,
            'email' : values.email,
            'username' : values.username,
            'password': values.password
        },
        url = 'http://127.0.0.1:8000/users/';
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(submitData), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                if(res.ok){
                    console.log('user created in database')
                    return res.json
                } else {
                    throw new Error(res.status);
                }
            })
            .catch(error => console.error('API error:', error));
        event.preventDefault();
    }

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    return (
        <div>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    id="standard-name"
                    label="Username"
                    className={classes.textField}
                    value={values.username}
                    onChange={handleChange('username')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="Password"
                    className={classes.textField}
                    value={values.password}
                    onChange={handleChange('password')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="First Name"
                    className={classes.textField}
                    value={values.firstName}
                    onChange={handleChange('firstName')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="Last Name"
                    className={classes.textField}
                    value={values.lastName}
                    onChange={handleChange('lastName')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="Email"
                    className={classes.textField}
                    value={values.email}
                    onChange={handleChange('email')}
                    margin="normal"
                />
                <input type="submit" value="Submit"/>
            </form>
            <SimpleSnackbar open={open} handleClose={()=>handleClose()}/>
        </div>
    );
}

export {TextFields, RegisterFields}
