import React from 'react';
import './App.css';
import Homepage from './pages/homepage'
import UserSettings from './pages/user_settings'
import Login from './pages/login'
import ButtonAppBar from './components/headers'
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <ButtonAppBar />

                <Route exact path="/" component={Homepage} />
                <Route path="/usersettings" component={UserSettings} />
                <Route path="/login" component={Login} />
            </div>
        </Router>
    );
}

export default App;
