import screenReader from "../brown-cs-maps-app/src/screenReader.js"

function App() {
    useEffect(() => {
        screenReader()
    }, [])


    return (
        <Maps something={} />
    )
}

export default App;
