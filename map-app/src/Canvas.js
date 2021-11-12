import {useEffect, useRef} from "react";

function Canvas(props) {
    const canvasRef = useRef(null)

    const coordToXY = (coord, width, height) => {
        const lat = coord[0]
        const lon = coord[1]
        // const heightOffset = Math.abs(props.maxLat - lat) / Math.abs(props.maxLat - props.minLat)
        // const widthOffset = Math.abs(lon - props.minLon) / Math.abs(props.maxLon - props.minLon)
        const widthPercent = (lon - props.minLon) / (props.maxLon - props.minLon)
        const heightPercent = (lat - props.minLat) / (props.maxLat - props.minLat)
        const x = width * widthPercent
        const y = height * heightPercent
        return [x, y]
    }

    // { ["name": "Waterman St", "startCoord": [lon, lat], "endCoord": ],
    //   ["name": "Thayer St", "startCoord": [lon, lat], "endCoord": [lon, lat]] }
    const draw = (ctx, canvasWays) => {
        ctx.beginPath()
        ctx.strokeStyle = "#000000"
        ctx.fillStyle = "#FFFFFF"
        console.log("canvasWays:", canvasWays)
        canvasWays.forEach((way) => {
            console.log("holy shoot y'all")
            const startCoord = [way[1], way[2]]
            const endCoord = [way[3], way[4]]
            let startXY = coordToXY(startCoord, canvasRef.current.width, canvasRef.current.height)
            let endXY = coordToXY(endCoord, canvasRef.current.width, canvasRef.current.height)
            console.log("coordxys", startXY, endXY)
            ctx.moveTo(startXY[0], startXY[1])
            ctx.lineTo(endXY[0], endXY[1])
        })
        ctx.stroke()
    }

    useEffect(() => {
        if (canvasRef) {
            const ctx = canvasRef.current.getContext('2d')
            if (props.ways.current.ways) {
                draw(ctx, props.ways.current.ways)
            }

        }
    }, [props.waysFetched])

    return (
        <div style={{border: "1px solid black", width: "min-content", height: "min-content"}}>
            <canvas ref={canvasRef} width={500} height={500}/>
        </div>
    );
}

export default Canvas