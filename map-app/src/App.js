import './App.css';
import Route from './Route.js';
import {useState} from "react";
import {AwesomeButton} from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import Maps from "./Maps";

function App() {
    function TextBox(props) {
        return <input type="text"
                      label={props.label}
                      value={props.value}
                      onChange={(input) => props.setter(input.target.value)}>
        </input>
    }

    const [startLat, setStartLat] = useState(0);
    const [startLon, setStartLon] = useState(0);
    const [endLat, setEndLat] = useState(0);
    const [endLon, setEndLon] = useState(0);

    const [routeSlat, setRouteSlat] = useState(0);
    const [routeSlong, setRouteSlong] = useState(0);
    const [routeElat, setRouteElat] = useState(0);
    const [routeElong, setRouteElong] = useState(0);

    return (
        <div className="App">
            <header className="App-header">
                <Maps />
                <TextBox label="Source Latitude" value={startLat} setter={setStartLat}/>
                <TextBox label="Source Longitude" value={startLon} setter={setStartLon}/>
                <TextBox label="Dest Latitude" value={endLat} setter={setEndLat}/>
                <TextBox label="Dest Longitude" value={endLon} setter={setEndLon}/>
                <Route slat={startLat} slong={startLon} elat={endLat} elong={endLon}/>
            </header>
        </div>
    );
}

export default App;
