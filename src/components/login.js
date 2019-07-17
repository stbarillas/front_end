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
        const url = 'http://127.0.0.1:8000/api-token-auth/';
        var data = {
            "username": this.state.username,
            "password": this.state.password,
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
                    sessionStorage.setItem('username', this.state.username)
                    sessionStorage.setItem('full_name', response['full_name']);
                    sessionStorage.setItem('email', response['email']);
                    this.props.on_login();
                }
            })
            .catch(error => console.error('API error:', error));
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" name={'username'} value={this.state.value} onChange={this.handleChange} placeholder={'username'} />
                </label>
                <label>
                    <input type="text" name={'password'} value={this.state.value} onChange={this.handleChange} placeholder={'password'}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

export default Login