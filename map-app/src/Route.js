// import './Route.css';

import {useEffect, useState} from "react";
import axios from "axios";
import {AwesomeButton} from "react-awesome-button";
import TextBox from "./TextBox";

function Route(props) {

    const [routeSlat, setRouteSlat] = useState("");
    const [routeSlong, setRouteSlong] = useState("");
    const [routeElat, setRouteElat] = useState("");
    const [routeElong, setRouteElong] = useState("");

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
                <TextBox label={"Source Latitude"} setter={setRouteSlat}/>
                <TextBox label={"Source Longitude"} setter={setRouteSlong}/>
                <TextBox label={"Destination Latitude"} setter={setRouteElat}/>
                <TextBox label={"Destination Longitude"} setter={setRouteElong}/>
                <br/>
                <AwesomeButton type={"primary"} onPress={requestRoute}> Get Route </AwesomeButton>
                <br/>
            </header>
        </div>
    );
}


export default Route;