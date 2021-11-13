// import './Route.css';

import {useState} from "react";
import axios from "axios";
import {AwesomeButton} from "react-awesome-button";

function Route(props) {

    function Button(props) {
        return <AwesomeButton type="primary" onPress={props.onPress}> Get Route </AwesomeButton>;
    }
    
    //Hint: The defaults for latitudes and longitudes were 0s. What might the default useState value for a route be?
    const [route, setRoute] = useState(0);

    /**
     * Makes an axios request.
     */
    const requestRoute = () => {
        const toSend = {
            srclat: props.slat,
            srclong: props.slong,
            destlat: props.elat,
            destlong: props.elong
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
                setRoute(response.data["route"]);
            })

            .catch(function (error) {
                console.log(error);

            });
    }

    return (
        <div className="Route">
            <header className="Route-header">
                <Button onPress={requestRoute}/>
                <br></br>
                Route Title! here it is. <br></br>
                {route}
            </header>
        </div>
    );
}


export default Route;
