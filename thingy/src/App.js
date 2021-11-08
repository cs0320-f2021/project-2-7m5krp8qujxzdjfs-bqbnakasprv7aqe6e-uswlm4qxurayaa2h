import './App.css';
import screenReader from "./screenReader.js"
import {useEffect} from "react";
import Maps from "./Maps.js"

function App() {
    useEffect(() => {
        screenReader()
    }, [])

    //TODO write a function that selects from sql database ways within a range
    /* sql pseudocode
    SELECT * FROM way
        join node ON node.id==way.start
        join node ON node.id==way.stop //TODO look up this kinda double join
    WHERE
        ...

     */


    return (
        <div className="App">
            <p>testing</p>
            <Maps />
        </div>
    );
}

export default App;