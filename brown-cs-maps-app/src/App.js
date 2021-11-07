import './App.css';
import screenReader from "./screenReader.js"
import {useEffect} from "react";
import Maps from "./Maps.js";
import axios from "axios";

function App() {
    useEffect(() => {
        screenReader()
    }, [])

    const toSend = {
        srclat: 1,
        srclong: 2,
        destlat: 3,
        destlong: 4
    };
    let config = {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
        }
    }
    axios.post("http://localhost:4567/route", toSend, config)
        .then(response => {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });


    return (
        <div className="App">
            <p>testing</p>
            <Maps/>
        </div>
    );
}

export default App;
