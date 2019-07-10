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
    return (
        <form className={classes.container} noValidate autoComplete="off">
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
        </form>
    );
}
