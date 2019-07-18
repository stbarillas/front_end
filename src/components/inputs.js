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

function EditInstrumentFields(props) {
    let data = props.data
    const classes = useStyles();
    const [values, setValues] = React.useState({
        instrument_type : data.instrument_type,
        instrument_status : data.instrument_status,
        ip_address : data.ip_address,
        ip_address_2 : data.ip_address_2,
        instrument_name : data.instrument_name,
        instrument_connection : data.instrument_connection,
        instrument_detector_1 : data.instrument_detector_1,
        instrument_detector_2 : data.instrument_detector_2,
        instrument_detector_3 : data.instrument_detector_3,
        instrument_sampler_1 : data.instrument_sampler_1,
        instrument_sampler_2 : data.instrument_sampler_2,
        instrument_pump : data.instrument_pump,
        instrument_column_compartment : data.instrument_column_compartment,
    });

    const [open, setOpen] = React.useState(false);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSubmit = event => {
        const  submitData = {
                'instrument_type' : values.instrument_type,
                'instrument_status' :values.instrument_status,
                'ip_address' : values.ip_address,
                'ip_address_2' :values.ip_address_2,
                'instrument_name' :values.instrument_name,
                'instrument_connection' : values.instrument_connection,
                'instrument_detector_1' : values.instrument_detector_1,
                'instrument_detector_2' : values.instrument_detector_2,
                'instrument_detector_3' : values.instrument_detector_3,
                'instrument_sampler_1' : values.instrument_sampler_1,
                'instrument_sampler_2' : values.instrument_sampler_2,
                'instrument_pump' : values.instrument_pump,
                'instrument_column_compartment' : values.instrument_column_compartment,
            },
            url = 'http://127.0.0.1:8000/instruments/' + data.id + '/';
        console.log(submitData)
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
                console.log('Instrument update successful');
                setOpen(true);
                }
            )
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
                    label="instrument_type"
                    className={classes.textField}
                    value={values.instrument_type}
                    onChange={handleChange('instrument_type')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="instrument_status"
                    className={classes.textField}
                    value={values.instrument_status}
                    onChange={handleChange('instrument_status')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="ip_address"
                    className={classes.textField}
                    value={values.ip_address}
                    onChange={handleChange('ip_address')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="ip_address_2"
                    className={classes.textField}
                    value={values.ip_address_2}
                    onChange={handleChange('ip_address_2')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="instrument_name"
                    className={classes.textField}
                    value={values.instrument_name}
                    onChange={handleChange('instrument_name')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="instrument_connection"
                    className={classes.textField}
                    value={values.instrument_connection}
                    onChange={handleChange('instrument_connection')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="instrument_detector_1"
                    className={classes.textField}
                    value={values.instrument_detector_1}
                    onChange={handleChange('instrument_detector_1')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="instrument_detector_2"
                    className={classes.textField}
                    value={values.instrument_detector_2}
                    onChange={handleChange('instrument_detector_2')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="instrument_detector_3"
                    className={classes.textField}
                    value={values.instrument_detector_3}
                    onChange={handleChange('instrument_detector_3')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="instrument_sampler_1"
                    className={classes.textField}
                    value={values.instrument_sampler_1}
                    onChange={handleChange('instrument_sampler_1')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="instrument_sampler_2"
                    className={classes.textField}
                    value={values.instrument_sampler_2}
                    onChange={handleChange('instrument_sampler_2')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="instrument_pump"
                    className={classes.textField}
                    value={values.instrument_pump}
                    onChange={handleChange('instrument_pump')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="instrument_column_compartment"
                    className={classes.textField}
                    value={values.instrument_column_compartment}
                    onChange={handleChange('instrument_column_compartment')}
                    margin="normal"
                />
                <input type="submit" value="Submit"/>
            </form>
            <SimpleSnackbar open={open} handleClose={()=>handleClose()}/>
        </div>
    );
}

export {TextFields, RegisterFields, EditInstrumentFields}

