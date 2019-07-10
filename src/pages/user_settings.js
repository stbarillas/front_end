import React from "react";
import TextFields from "../components/inputs.js"

class UserSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
        }
    }

    updateUserData(){
        let name  = sessionStorage.getItem('full_name'),
            firstName = name.split(' ')[0],
            lastName = name.split(' ')[1],
            email = sessionStorage.getItem('email'),
            output = [
                {'firstName':firstName, 'lastName':lastName, 'email':email}
            ]
        this.setState({userData: output})
    }

    componentWillMount() {
        this.updateUserData();
    }

    render() {
        return (
            <TextFields userData={this.state.userData}/>
        );
    }
}
export default UserSettings