import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
}));

export default function TextFields(props) {
    const classes = useStyles();
    const data = props.userData[0];
    const [values, setValues] = React.useState({
        firstName: data.firstName,
        LastName: data.lastName,
        email: data.email,
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = event => {
        const id = sessionStorage.getItem('user_id'),
            submitData = {
                'firstName': values.firstName,
                'lastName' : values.LastName,
                'email' : values.email
            },
            url = 'http://127.0.0.1:8000/users/' + id +'/';
        console.log(id)
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
                    sessionStorage.setItem('full_name', values.firstName + ' ' + values.LastName);
                    sessionStorage.setItem('email', values.email);
                    console.log('user sessionStorage update successful')
                }
            })
            .catch(error => console.error('API error:', error));
        event.preventDefault();
    }

    return (
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
                value={values.LastName}
                onChange={handleChange('LastName')}
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
    );
}
