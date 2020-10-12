import React from 'react';
import './App.css';
import APOD from './API/APOD';
import MarsRover from './API/MarsRover/MarsRover';

function App() {
    return (
        <div className="App">
            <MarsRover />
        </div>
    );
}

export default App;
