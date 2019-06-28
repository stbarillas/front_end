import {Route, Link } from "react-router-dom";
import React from "react";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({[name]: target.value});
    }

    handleSubmit(event) {
        const url = 'http://127.0.0.1:8000/api-token-auth/?username=stbarillas?password=xsw2!qAZ';
        var data = {
            "username": 'stbarillas',
            "password": "xsw2!qAZ",
        }
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(response => {
                // Saves token to sessionStorage
                if (sessionStorage) {
                    sessionStorage.setItem('token', response['token'])
                    sessionStorage.setItem('user_id', response['user_id'])
                    sessionStorage.setItem('full_name', response['full_name'])
                    sessionStorage.setItem('email', response['email'])
                }
            })
            .catch(error => console.error('Error Posting Checklist:', error));
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                   User Name:
                    <input type="text" name={'username'} value={this.state.value} onChange={this.handleChange} />
                </label>
                <label>
                    Password:
                    <input type="text" name={'password'} value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default Login