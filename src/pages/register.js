import React from "react";
import {RegisterFields} from "../components/inputs.js"

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
        }
    }

    render() {
        return (
            <RegisterFields userData={this.state.userData}/>
        );
    }
}
export default Register