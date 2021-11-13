import {useEffect, useRef, useState} from "react";
import Canvas from "./Canvas";

function Maps() {

    // Code from Galen's video
    // Initial map view

    // MAX_LAT MIN_LON MIN_LAT MAX_LON
    const INIT_MAX_LAT = 42 // 41.828147
    const INIT_MIN_LON = -72 // -71.407971
    const INIT_MIN_LAT = 41.8 // 41.823142
    const INIT_MAX_LON = -71.3 // -71.392231

    // ways to pass to the canvas
    const canvasWays = useRef([])

    // stores an object of way boxes
    const [waysCache, setWaysCache] = useState({})

    // whether or not the ways have been fetched yet
    const [waysFetched, setWaysFetched] = useState(false)

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
        return new Promise((resolve, reject) => {
            fetch("http://localhost:4567/ways", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    "lat1" : INIT_MAX_LAT,
                    "lon1" : INIT_MIN_LON,
                    "lat2" : INIT_MIN_LAT,
                    "lon2" : INIT_MAX_LON
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
                        resolve({
                            "ways" : response.ways
                        })
                    }
                })
                .catch((err) => console.log(err))
        })
    }


    return (
        <div className="Maps">
            <p>CANVAS below!!!!!!</p>
            <Canvas mapView={mapView} ways={canvasWays} waysFetched={waysFetched} setMapView={setMapView}
                    minLat={INIT_MIN_LAT} maxLon={INIT_MAX_LON} maxLat={INIT_MAX_LAT} minLon={INIT_MIN_LON}/>
        </div>
    );
}

export default Maps;