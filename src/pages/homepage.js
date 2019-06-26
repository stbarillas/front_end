import React from "react";
import Grid from "@material-ui/core/Grid";
import InstrumentCard from "../components/cards";

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            instruments: [],
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
            // Extracts and saves data to app state under 'students'
            .then((data) => {
                console.log(data);
                this.updateInstruments(data)
            })
            // Displays error if API call is unsuccessful
            .catch((err) => {
                console.log("API fetch was unsuccessful");
                console.log(err);
            })
    }

    // Updates Instrument State
    updateInstruments(data) {
        const instruments = data;
        this.setState({instruments: instruments})
    }

    render() {
        return (
            <Grid container spacing={3}>
                {this.state.instruments.map((instrument)=>{
                    return (
                        <Grid item>
                            <InstrumentCard data={instrument}/>
                        </Grid>
                    )
                })}
            </Grid>
        );
    }
}
export default Homepage