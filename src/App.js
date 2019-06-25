import React from 'react';
import './App.css';
import Homepage from './pages/homepage'
import UserSettings from './pages/user_settings'
import Logout from './pages/logout'
import ButtonAppBar from './components/headers'
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <ButtonAppBar />

                <Route exact path="/" component={Homepage} />
                <Route path="/usersettings" component={UserSettings} />
                <Route path="/logout" component={Logout} />
            </div>
        </Router>
    );
}

export default App;
