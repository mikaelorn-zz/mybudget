import React, { Component } from 'react';
import './App.css';
import NewHouse from './NewHouse.js';
import Savings from './Savings';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Flytthjälpen
        </header>
        <NewHouse/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Savings/>
        <footer className="App-footer">
          Copyright Flabolan solutions 2019
        </footer>
      </div>
    );
  }
}

export default App;
