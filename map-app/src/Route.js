// import './Route.css';

import {useEffect, useState} from "react";
import axios from "axios";
import {AwesomeButton} from "react-awesome-button";

function Route(props) {
    function TextBox(props) {
        return <input type="text"
                      placeholder={props.label}
                      value={props.value}
                      onChange={(input) => props.setter(input.target.value)}>
        </input>
    }

    const [routeSlat, setRouteSlat] = useState("");
    const [routeSlong, setRouteSlong] = useState("");
    const [routeElat, setRouteElat] = useState("");
    const [routeElong, setRouteElong] = useState("");

    function Button(props) {
        return <AwesomeButton type="primary" onPress={props.onPress}> Get Route </AwesomeButton>;
    }
    
    //Hint: The defaults for latitudes and longitudes were 0s. What might the default useState value for a route be?


    /**
     * Makes an axios request.
     */
    const requestRoute = () => {
        props.setRoute([]);
        props.setRouteFetched(false);
        const toSend = {
            srclat: routeSlat,
            srclong: routeSlong,
            destlat: routeElat,
            destlong: routeElong
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
                props.setRoute(response.data["route"]);
                props.setRouteFetched(true);
            })

            .catch(function (error) {
                console.log(error);

            });
    }


    return (
        <div className="Route">
            <header className="Route-header">
                <TextBox label="Source Latitude" value={routeSlat} setter={setRouteSlat}/><br/>
                <TextBox label="Source Longitude" value={routeSlong} setter={setRouteSlong}/>  <br/>
                <TextBox label="Dest Latitude" value={routeElat} setter={setRouteElat}/> <br/>
                <TextBox label="Dest Longitude" value={routeElong} setter={setRouteElong}/> <br/>
                <br/>
                <Button onPress={requestRoute}/>
                <br/>
            </header>
        </div>
    );
}


export default Route;