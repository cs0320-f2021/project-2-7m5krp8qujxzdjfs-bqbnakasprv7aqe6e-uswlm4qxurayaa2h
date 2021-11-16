import './App.css';
import {useEffect, useRef, useState} from "react";
import {AwesomeButton} from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import Maps from "./Maps";
import ScreenReader from "./ScreenReader";

function App() {
    // function TextBox(props) {
    //     return <input type="text"
    //                   label={props.label}
    //                   value={props.value}
    //                   onChange={(input) => props.setter(input.target.value)}>
    //     </input>
    // }

    // const [startLat, setStartLat] = useState(0);
    // const [startLon, setStartLon] = useState(0);
    // const [endLat, setEndLat] = useState(0);
    // const [endLon, setEndLon] = useState(0);

    return (
        <div className="App">
            <header className="App-header">
                <ScreenReader/>
                <Maps/>
            </header>
        </div>
    );
}

export default App;
