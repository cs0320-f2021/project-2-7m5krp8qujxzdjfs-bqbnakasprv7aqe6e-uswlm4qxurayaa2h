import {useEffect, useRef} from "react";

function Canvas(props) {
    const canvasRef = useRef(null)

    const coordToXY = (coord, width, height) => {
        const lat = coord[1]
        const lon = coord[0]
        const widthPercent = (lon - props.minLon) / (props.maxLon - props.minLon)
        const heightPercent = (props.maxLat - lat) / (props.maxLat - props.minLat) //(lat - props.minLat) / (props.maxLat - props.minLat)
        const x = width * widthPercent
        const y = height * heightPercent
        return [x, y]
    }

    // { ["name": "Waterman St", "startCoord": [lon, lat], "endCoord": ],
    //   ["name": "Thayer St", "startCoord": [lon, lat], "endCoord": [lon, lat]] }
    const draw = (ctx, canvasWays) => {
        ctx.beginPath()
        ctx.strokeStyle = "#000000"
        // console.log("canvasWays:", canvasWays)
        canvasWays.forEach((way) => {
            const startCoord = [way[2], way[1]]
            const endCoord = [way[4], way[3]]
            console.log(startCoord, endCoord)
            let startXY = coordToXY(startCoord, canvasRef.current.width, canvasRef.current.height)
            let endXY = coordToXY(endCoord, canvasRef.current.width, canvasRef.current.height)
            ctx.moveTo(startXY[0], startXY[1])
            ctx.lineTo(endXY[0], endXY[1])
        })
        ctx.stroke()
    }

    useEffect(() => {
        if (canvasRef) {
            const ctx = canvasRef.current.getContext('2d')
            ctx.fillStyle = "#FFFFFF"
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
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