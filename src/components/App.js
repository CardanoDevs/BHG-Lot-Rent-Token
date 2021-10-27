import React, {Component} from 'react';
import TopNav from './TopNav.js';
import './App.css'
import Main from './Main.js';
import {
    BrowserRouter as Router,
} from "react-router-dom";

class App extends Component {
    async componentWillMount() {     
    }

    render () {
        return (
            <div>
                <Router>
                    <TopNav />
                    <Main />
                </Router>
            </div>
        );
    }
}

export default App;