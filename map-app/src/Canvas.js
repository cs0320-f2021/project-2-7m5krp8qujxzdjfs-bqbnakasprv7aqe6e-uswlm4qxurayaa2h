import {useEffect, useRef} from "react";

function Canvas(props) {
    const canvasRef = useRef(null)

    const coordToXY = (coord, width, height) => {}

    const draw = (ctx, canvasRef) => {}

    useEffect(() => {
        if (canvasRef) {
            const ctx = canvasRef.current.getContext('2d')
            if (props.ways.current.ways) {
                draw(ctx, props.ways.current.ways)
            }
        }
    })

    return (
        <div style={{border:"1px solid black", width:"min-content", height: "min-content"}}>
            <canvas ref={canvasRef} width={500} height={500}/>
        </div>
    )
}

export default Canvas