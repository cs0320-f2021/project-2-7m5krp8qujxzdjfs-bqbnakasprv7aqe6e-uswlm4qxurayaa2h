import {useEffect, useRef, useState} from "react";
import Canvas from "./Canvas";

function Maps() {

    // Code from Galen's video
    // Initial map view
    const INIT_MIN_LON = -71.407971
    const INIT_MIN_LAT = 41.823142
    const INIT_MAX_LON = -71.392231
    const INIT_MAX_LAT = 41.828147

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
        })
    }, [mapView])

    async function requestWays() {
        return new Promise((resolve, reject) => {
            fetch("http://localhost:4567/ways", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    "northwest": [INIT_MAX_LAT, INIT_MIN_LON],
                    "southeast": [INIT_MIN_LAT, INIT_MAX_LON]
                })
            }).then(response => response.json())
                .then(response => {
                    console.log("Reponse:", response)
                    if ("error" in response) {
                        if (response.error === undefined) {
                            alert("An error occurred")
                        } else {
                            alert(response.error)
                        }
                        reject()
                    } else {
                        console.log("ways:", response.ways)
                        resolve({
                            "ways:" : response.ways
                        })
                    }
                })
                .catch((err) => console.log(err))
        })
    }

    
    // const canvasRef = useRef(null)
    //
    // //TODO loop through all of the ways and draw a line for each way
    // useEffect( () => {
    //     // const frame = new Image()
    //     console.log("asdf")
    //     const ctx = canvasRef.current.getContext('2d') // canvas lab
    //     ctx.fillStyle = '#3e3ed3';
    //     ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    //     ctx.moveTo(0, 0);
    //     ctx.lineTo(500, 500);
    //     ctx.stroke();
    //
    //     }, [])

    return (
        <div className="Maps">
            <p>CANVAS below!!!!!!</p>
            <Canvas mapView={mapView} ways={canvasWays} waysFetched={waysFetched} setMapView={setMapView}
                    minLat={INIT_MIN_LAT} maxLon={INIT_MAX_LON} maxLat={INIT_MAX_LAT} minLon={INIT_MAX_LON}/>
        </div>

    );
}

export default Maps;