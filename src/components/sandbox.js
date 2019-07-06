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

    handleClick(props) {
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
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.status);
                }
            })
            .then(response => {
                let filteredChecklist = response.filter(
                    (listEntry) => {
                        const userId = String(listEntry.user_pk),
                            instrumentId = String(listEntry.instrument_pk);
                        // console.log(instrumentId)
                        // Only returns checklist entries that match user pk and instrument pk
                        return userId.indexOf(sessionStorage.getItem('user_id')) !== -1 &&
                            instrumentId.indexOf(props.data.id) !== -1;
                    })
                console.log(filteredChecklist)
                return filteredChecklist
            })
            .catch(error => console.error('API error:', error));
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