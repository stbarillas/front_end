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
                'Authorization': 'Token d8708a35be5cb39e0f2ad24c38d2f54c33887ea0'
            }
        })
            .then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
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