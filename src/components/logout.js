import React from 'react';
import Button from '@material-ui/core/Button';


class Logout extends React.Component {


    render() {

        return (
            <div>
                {/*Clears session data when clicked and passes up auth state to trigger rerender*/}
                <Button onClick={this.props.on_logout}>Log out</Button>
            </div>
        );
    }
}

export default Logout