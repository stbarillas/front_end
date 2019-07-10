import React from "react";
import TextFields from "../components/inputs.js"

class UserSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: [],
        }
    }

    componentDidMount() {
        this.apiInstrumentCall()
    }

    // Fetches API data
    apiInstrumentCall() {
        // API call function
        fetch('http://127.0.0.1:8000/instruments/?format=json')
        // Converts API response to json
            .then((response) => {
                return response.json();
            })
            // Extracts and saves data to app state under 'instruments'
            .then((data) => {
                this.updateInstruments(data)
            })
            // Displays error if API call is unsuccessful
            .catch((err) => {
                console.log("API fetch was unsuccessful");
                console.log(err);
            })
    }

    render() {
        return (
            <TextFields/>
        );
    }
}
export default UserSettings