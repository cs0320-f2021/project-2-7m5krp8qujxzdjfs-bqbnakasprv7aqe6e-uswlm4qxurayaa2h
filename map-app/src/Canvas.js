import {useEffect, useRef} from "react";

function Canvas(props) {
    const canvasRef = useRef(null)

    const coordToXY = (coord, width, height) => {
        const lon = coord[0]
        console.log(lon)
        const lat = coord[1]
        console.log(lat)
        const heightOffset = Math.abs(lat - props.minLat) / Math.abs(props.maxLat - props.minLat)
        const widthOffset = Math.abs(lon - props.minLon) / Math.abs(props.maxLon - props.minLon)
        const x = width * widthOffset
        console.log(x)
        const y = height * heightOffset
        console.log(y)
        return [x, y]
    }

    // { ["name": "Waterman St", "startCoord": [lon, lat], "endCoord": ],
    //   ["name": "Thayer St", "startCoord": [lon, lat], "endCoord": [lon, lat]] }
    const draw = (ctx, canvasWays) => {
        ctx.beginPath()
        for (let way in canvasWays) {
            let startXY = coordToXY(way.startCoord, canvasRef.current.width, canvasRef.current.height)
            let endXY = coordToXY(way.endCoord, canvasRef.current.width, canvasRef.current.height)
            console.log("startX:" + startXY[0])
            console.log("startY:" + startXY[1])
            console.log("endX:", endXY[0])
            console.log("endY:", endXY[1])
            ctx.moveTo(startXY[0], startXY[1])
            ctx.lineTo(endXY[0], endXY[1])
        }
        ctx.stroke()
    }

    useEffect(() => {
        if (canvasRef) {
            const ctx = canvasRef.current.getContext('2d')
            // ctx.fillStyle = '#3e3ed3';
            // ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            // ctx.moveTo(0, 0);
            // ctx.lineTo(500, 500);
            // ctx.moveTo(0, 0);
            //
            // ctx.stroke();

            if (props.ways.current.ways) {
                draw(ctx, props.ways.current.ways)
            }
        }
    })

    return (
        <div style={{border:"1px solid black", width:"min-content", height: "min-content"}}>
            <canvas ref={canvasRef} width={500} height={500}/>
        </div>
    );
}

export default Canvas