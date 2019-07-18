import React from "react";
import {EditInstrumentFields} from "../components/inputs.js"

class EditInstrument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
        }
    }

    render() {
        return (
            <EditInstrumentFields data={this.props.location.state.data}/>
        );
    }
}
export default EditInstrument