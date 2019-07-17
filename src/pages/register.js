import React from "react";
import {RegisterFields} from "../components/inputs.js"

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
        }
    }

    // updateUserData(){
    //     let name  = sessionStorage.getItem('full_name'),
    //         firstName = name.split(' ')[0],
    //         lastName = name.split(' ')[1],
    //         email = sessionStorage.getItem('email'),
    //         output = [
    //             {'firstName':firstName, 'lastName':lastName, 'email':email}
    //         ];
    //     this.setState({userData: output})
    // }
    //
    // componentWillMount() {
    //     this.updateUserData();
    // }

    render() {
        return (
            <RegisterFields userData={this.state.userData}/>
        );
    }
}
export default Register