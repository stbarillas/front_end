import React from "react";
import Button from "@material-ui/core/Button";

class LeaveQueue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: '',
        };

    }

    handleClick(event) {
        const url = 'http://127.0.0.1:8000/checklist/';
        fetch(url, {
            method: 'GET',
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
                let filteredChecklist = response.filter(
                    (listEntry)=> {
                        const userId = String(listEntry.user_pk),
                            instrumentId = listEntry.instrument_pk;
                        // Only returns checklist entries that match user pk
                        return userId.indexOf(sessionStorage.getItem('user_id')) !== -1;
                    })
                return filteredChecklist
            })
            .then(entry => {
                console.log(entry)
                const id = entry[0].id,
                    url = 'http://127.0.0.1:8000/checklist/' + id + '/';
                console.log(id)
                console.log(url)
                fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + sessionStorage.getItem('token')
                    }
                })
                // If response is ok, translate to json. Otherwise, throw Error
                    .then(response => {
                        if (response.ok) {
                            return console.log(response);
                        } else {
                            throw new Error(response.status);
                        }
                    })
                    .catch(error => console.error('API error:', error));

            })
            .catch(error => console.error('API error:', error));
        event.preventDefault();
    }

    render() {
        return (
            <Button size="small" color="primary" onClick={()=>this.handleClick}>
                Leave Waitlist
            </Button>
        );
    }
}

export default LeaveQueue