import React from "react";
import Button from "@material-ui/core/Button";

class Sandbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };

    }

    handleClick(event) {
        const url = 'http://127.0.0.1:8000/checklist/';
        // var data = {
        //     "username": 'test',
        //     "password": 'second input',
        // }
        fetch(url, {
            method: 'GET',
            // body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + sessionStorage.getItem('token')
            }
        })
        // If response is ok, translate to json. Otherwise, throw Error
            .then(response => {
                if(response.ok){
                    return response.json()
                } else {
                    throw new Error(response.status);
                }
            })
            .then(response => {
                console.log(response)
                let filteredChecklist = response.filter(
                    (listEntry)=> {
                        const userId = String(listEntry.user_pk),
                        instrumentId = listEntry.instrument_pk;
                        // Only returns checklist entries that match user pk
                        return userId.indexOf(sessionStorage.getItem('user_id')) !== -1;
                    })
                return filteredChecklist
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => console.error('API error:', error));
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleClick}>Test Click</Button>
            </div>
        );
    }
}

export default Sandbox