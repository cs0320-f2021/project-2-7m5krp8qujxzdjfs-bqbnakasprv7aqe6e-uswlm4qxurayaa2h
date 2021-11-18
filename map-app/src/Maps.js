import {useEffect, useRef, useState} from "react";
import Canvas from "./Canvas";
import Route from "./Route";
import {AwesomeButton} from "react-awesome-button";

function Maps() {

    // Code from Galen's video
    // Initial map view

    // MAX_LAT MIN_LON MIN_LAT MAX_LON
    // let INIT_MAX_LAT = 41.828147
    // let INIT_MIN_LON = -71.407971
    // let INIT_MIN_LAT = 41.823142
    // let INIT_MAX_LON = -71.392231

    const zoom = 0.5

    let INIT_MAX_LAT = (41.828147 + 41.823142) * zoom
    let INIT_MIN_LON = -71.407971
    let INIT_MIN_LAT = 41.823142
    let INIT_MAX_LON = (-71.392231 + -71.407971) * zoom


    // ways to pass to the canvas
    const canvasWays = useRef([])

    // stores an object of way boxes
    const [waysCache, setWaysCache] = useState({})

    // whether or not the ways have been fetched yet
    const [waysFetched, setWaysFetched] = useState(false)

    // the route being fetched
    const [route, setRoute] = useState([]);

    // whether or not the ways have been fetched yet
    const [routeFetched, setRouteFetched] = useState(false)

    // whether or not there are ways loading
    const [loading, setLoading] = useState(true)


    // the current map view
    const [mapView, setMapView] = useState({
        "northwest" : [INIT_MAX_LAT, INIT_MIN_LON],
        "southeast" : [INIT_MIN_LAT, INIT_MAX_LON]
    })

    useEffect(() => {
        requestWays().then(ways => {
            canvasWays.current = ways
            setWaysFetched(true)
        })
    }, [mapView])

    async function requestWays() {
        console.log(mapView)
        return new Promise((resolve, reject) => {
            fetch("http://localhost:4567/ways", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    // "northwest" : [INIT_MAX_LAT, INIT_MIN_LON],
                    // "southeast" : [INIT_MIN_LAT, INIT_MAX_LON]
                    "lat1" : mapView.northwest[0],
                    "lon1" : mapView.northwest[1],
                    "lat2" : mapView.southeast[0],
                    "lon2" : mapView.southeast[1]
                    // double lat1 = data.getDouble("lat1");
                    // double lon1 = data.getDouble("lon1");
                    // double lat2 = data.getDouble("lat2");
                    // double lon2 = data.getDouble("lon2");
                    // "northwest": [INIT_MAX_LAT, INIT_MIN_LON],
                    // "southeast": [INIT_MIN_LAT, INIT_MAX_LON]
                })
            }).then(response => response.json())
                .then(response => {
                    if ("error" in response) {
                        if (response.error === undefined) {
                            alert("An error occurred")
                        } else {
                            alert(response.error)
                        }
                        reject()
                    } else {
                        console.log(response.ways)
                        resolve({
                            "ways" : response.ways
                        })
                    }
                })
                .catch((err) => console.log(err))
        })
    }

    async function panOver(direction) {
        setWaysFetched(false)
        const lat_increment = 0.0015
        const lon_increment = 0.0005

        if (direction === "N") {
            INIT_MIN_LAT += lat_increment
            INIT_MAX_LAT += lat_increment
        } else if (direction === "S") {
            INIT_MIN_LAT -= lat_increment
            INIT_MAX_LAT -= lat_increment
        } else if (direction === "E") {
            INIT_MIN_LON += lon_increment
            INIT_MAX_LON += lon_increment
        } else if (direction === "W") {
            INIT_MIN_LON -= lon_increment
            INIT_MAX_LON -= lon_increment
        }
        setMapView({"northwest": [INIT_MAX_LAT, INIT_MIN_LON], "southeast": [INIT_MIN_LAT, INIT_MAX_LON]})
    }

    return (
        <div className="Maps">
            <Canvas mapView={mapView} ways={canvasWays} waysFetched={waysFetched} setMapView={setMapView}
                    minLat={INIT_MIN_LAT} maxLon={INIT_MAX_LON} maxLat={INIT_MAX_LAT} minLon={INIT_MIN_LON}
                    routeFetched={routeFetched} route={route}/>
            <Route setRouteFetched={setRouteFetched} setRoute={setRoute}/>
            <AwesomeButton type="primary" onPress={() => panOver("N")}> North </AwesomeButton>
            <AwesomeButton type="primary" onPress={() => panOver("S")}> South </AwesomeButton>
            <AwesomeButton type="primary" onPress={() => panOver("E")}> East </AwesomeButton>
            <AwesomeButton type="primary" onPress={() => panOver("W")}> West </AwesomeButton>
        </div>
    );
}

export default Maps;