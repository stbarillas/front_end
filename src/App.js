import React, { Suspense, lazy } from 'react';
import './App.css';
import Homepage from './pages/homepage'
import ButtonAppBar from './components/headers'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditInstrument from "./pages/edit_instrument";

// Lazy route imports
const Register = lazy(() => import('./pages/register'));
const UserSettings = lazy(() => import('./pages/user_settings'));

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            instruments: [],
            searchInput: '',
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
    updateInstruments(data) {
        const instruments = data;
        this.setState({instruments: instruments})
    }
    handleSearchInput(event) {
        this.setState({searchInput: event.target.value})
    }

    render(){
        let filteredInstruments = this.state.instruments.filter(
            (listEntry) => {
                const instrumentName = listEntry.instrument_name,
                    searchInput = this.state.searchInput;
                // Only returns checklist entries that match user pk
                return instrumentName.indexOf(searchInput) !== -1;
            });

        return (
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                        <ButtonAppBar
                            on_login={()=>this.handleLogin()}
                            on_logout={()=> this.handleLogout()}
                            is_auth={this.state.auth}
                            handleSearch={(event)=>this.handleSearchInput(event)}
                        />
                        <Route
                            exact path="/"
                            render={(props) =>
                                <Homepage
                                    is_auth={this.state.auth}
                                    instruments={filteredInstruments}
                                    updateInstruments={(data)=>this.updateInstruments(data)}
                                />}
                        />
                        <Route path="/usersettings" component={UserSettings}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/edit_instrument" component={EditInstrument}/>
                </Suspense>
            </Router>
        );
    }
}

export default App;
