import {useEffect, useRef} from "react";

function Maps() {
    const canvasRef = useRef(null)

    //TODO loop through all of the ways and draw a line for each way
    useEffect( () => {
        // const frame = new Image()
        console.log("asdf")
        const ctx = canvasRef.current.getContext('2d') // canvas lab
        ctx.fillStyle = '#3e3ed3';
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.moveTo(0, 0);
        ctx.lineTo(500, 500);
        ctx.stroke();

        }, [])

    return (
        <div className="Maps">
            <p>CANVAS below!!!!!!</p>
            <canvas ref={canvasRef} width={500} height={500} />
        </div>

    );
}

export default Maps;