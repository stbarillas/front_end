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
        console.log(this.props.location.state)
        return (
            <EditInstrumentFields data={this.props.data}/>
        );
    }
}
export default EditInstrument