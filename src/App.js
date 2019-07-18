import React from 'react';
import './App.css';
import Homepage from './pages/homepage'
import UserSettings from './pages/user_settings'
import Register from './pages/register'
// import EditInstrument from './pages/edit_instrument'
import ButtonAppBar from './components/headers'
import { BrowserRouter as Router, Route } from "react-router-dom";
import EditInstrument from "./pages/edit_instrument";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            auth: false,
        };
    }
    handleLogin() {
        this.setState({auth: true});
    }
    handleLogout() {
        this.setState({auth:false});
        sessionStorage.clear();
    }
    componentWillMount() {
        if (sessionStorage.getItem('token')){
            this.setState({auth: true});
        }
    }
    render(){
        return (
            <Router>
                <div>
                    <ButtonAppBar
                        on_login={()=>this.handleLogin()}
                        on_logout={()=> this.handleLogout()}
                        is_auth={this.state.auth}
                    />
                    <Route
                        exact path="/"
                        render={(props) => <Homepage is_auth={this.state.auth}/>}
                    />
                    <Route path="/usersettings" component={UserSettings}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/edit_instrument" component={EditInstrument}/> }
                    />
                </div>
            </Router>
        );
    }
}

export default App;
