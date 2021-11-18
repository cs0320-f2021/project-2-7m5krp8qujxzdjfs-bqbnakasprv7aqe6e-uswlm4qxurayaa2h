import {useEffect, useRef} from "react";

function Canvas(props) {
    const canvasRef = useRef(null)

    const HEIGHT = 500
    const WIDTH = 500

    const coordToXY = (coord) => {
        const lat = coord[1]
        console.log("lat", lat)
        const lon = coord[0]
        console.log("lon", lon)
        const widthPercent = (lon - props.minLon) / (props.maxLon - props.minLon)
        console.log("widthPercent ", widthPercent)
        const heightPercent = (props.maxLat - lat) / (props.maxLat - props.minLat) //(lat - props.minLat) / (props.maxLat - props.minLat)
        // const heightPercent = (lat - props.minLat) / (props.maxLat - props.minLat)
        console.log("heightPercent ", heightPercent)
        const x = WIDTH * widthPercent
        const y = HEIGHT * heightPercent
        return [x, y]
    }

    // {["id": , "startCoord": [lat, lon], "endCoord": [lat, lon]],
    //   ["id": , "startCoord": [lat, lon], "endCoord": [lat, lon]] }
    const draw = (ctx, canvasWays) => {
        ctx.beginPath()
        ctx.strokeStyle = "#000000"
        ctx.lineWidth = 1
        // console.log("canvasWays:", canvasWays)
        canvasWays.forEach((way) => {
            const startCoord = [way[2], way[1]]
            const endCoord = [way[4], way[3]]
            let startXY = coordToXY(startCoord)
            let endXY = coordToXY(endCoord)
            ctx.moveTo(startXY[0], startXY[1])
            ctx.lineTo(endXY[0], endXY[1])
        })
        ctx.stroke()
        console.log("canvas drawn")
    }

    // draw a route on the canvas
    const drawRoute = (ctx, route) => {
        ctx.beginPath()
        ctx.strokeStyle = "#ff00d7"
        ctx.lineWidth = 3
        route.forEach((w) => {
            // [sLon sLat eLon eLat]
            const startCoord = [w[0], w[1]]
            const endCoord = [w[2], w[3]]
            console.log(startCoord, endCoord)
            let startXY = coordToXY(startCoord)
            let endXY = coordToXY(endCoord)
            ctx.moveTo(startXY[0], startXY[1])
            ctx.lineTo(endXY[0], endXY[1])
        })
        ctx.stroke()
    }

    const drawAllWays = () => {
        if (canvasRef) {
            const ctx = canvasRef.current.getContext('2d')
            ctx.fillStyle = "#FFFFFF"
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
            if (props.ways.current.ways) {
                draw(ctx, props.ways.current.ways)
            }
        }
    }

    useEffect(() => {
        drawAllWays()
    }, [props.waysFetched])

    useEffect(() => {
        drawAllWays()
        if (canvasRef) {
            const ctx = canvasRef.current.getContext('2d')
            drawRoute(ctx, props.route)
        }
    }, [props.routeFetched])

    return (
        <div style={{border: "1px solid black", width: "min-content", height: "min-content"}}>
            <canvas ref={canvasRef} width={WIDTH} height={HEIGHT}/>
        </div>
    );
}

export default Canvas