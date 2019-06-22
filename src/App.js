import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.apiCall()
    }
  // Fetches API data
    apiCall() {
    // API call function
        fetch('http://127.0.0.1:8000/users/?format=json')
        // Converts API response to json
            .then((response) => {
              return response.json();
            })
            // Extracts and saves data to app state under 'students'
            .then((data) => {
              console.log(data);
            })
            // Displays error if API call is unsuccessful
            .catch((err) => {
              console.log("API fetch was unsuccessful");
              console.log(err);
            })
    }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
    );
  }
}

export default App;
