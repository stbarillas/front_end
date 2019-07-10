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
    const [values, setValues] = React.useState({
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
    const data = props.userData[0];
    return (
        <form className={classes.container} noValidate autoComplete="off">
            <TextField
                id="standard-name"
                label="Username"
                className={classes.textField}
                value={data.firstName}
                onChange={handleChange('name')}
                margin="normal"
            />
            <TextField
                id="standard-name"
                label="First Name"
                className={classes.textField}
                value={data.firstName}
                onChange={handleChange('name')}
                margin="normal"
            />
            <TextField
                id="standard-name"
                label="Last Name"
                className={classes.textField}
                value={data.lastName}
                onChange={handleChange('name')}
                margin="normal"
            />
            <TextField
                id="standard-name"
                label="Email"
                className={classes.textField}
                value={data.email}
                onChange={handleChange('name')}
                margin="normal"
            />
        </form>
    );
}
