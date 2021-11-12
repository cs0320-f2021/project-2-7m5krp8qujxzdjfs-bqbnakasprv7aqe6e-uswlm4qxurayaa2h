import {useEffect, useRef} from "react";

function Canvas(props) {
    const canvasRef = useRef(null)

    const coordToXY = (coord, width, height) => {
        const lon = coord[0]
        const lat = coord[1]
        const heightOffset = Math.abs(lat - props.minLat) / Math.abs(props.maxLat - props.minLat)
        const widthOffset = Math.abs(lon - props.minLon) / Math.abs(props.maxLon - props.minLon)
        const x = width * widthOffset
        const y = height * heightOffset
        return [x, y]
    }

    // { ["name": "Waterman St", "startCoord": [lon, lat], "endCoord": ],
    //   ["name": "Thayer St", "startCoord": [lon, lat], "endCoord": [lon, lat]] }
    const draw = (ctx, canvasWays) => {
        let toDraw = canvasWays["ways:"]
        console.log("toDraw:", toDraw)
        ctx.beginPath()
        for (let i = 0; i < toDraw.length; i++) {
            const way = toDraw[i]

            console.log("where there's a will... there's a way:" + way)
            const startCoord = [way[1], way[2]]
            const endCoord = [way[3], way[4]]
            console.log(startCoord, endCoord)
            let startXY = coordToXY(startCoord, canvasRef.current.width, canvasRef.current.height)
            let endXY = coordToXY(endCoord, canvasRef.current.width, canvasRef.current.height)
            ctx.moveTo(startXY[0], startXY[1])
            ctx.lineTo(endXY[0], endXY[1])
        }
        ctx.stroke()
    }

    useEffect(() => {
        if (canvasRef) {
            const ctx = canvasRef.current.getContext('2d')
            if (props.ways) {
                draw(ctx, props.ways)
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