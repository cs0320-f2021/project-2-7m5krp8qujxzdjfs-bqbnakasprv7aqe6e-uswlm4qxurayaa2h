function Maps() {
    const canvas = document.getElementById('#myCanvas')[0]; // get reference to the <canvas> element
    canvas.width = 500;
    canvas.height = 300;


    return (
        <canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;">

        </canvas>
    );
}

export default Maps;