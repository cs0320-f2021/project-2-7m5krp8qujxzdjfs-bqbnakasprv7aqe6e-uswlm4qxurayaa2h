import logo from './logo.svg';
import './App.css';
import screenReader from "./screenReader.js"
import {useEffect} from "react";
import Maps from "./Maps.js"

function App() {
    useEffect(() => {
        screenReader()
      }, [])

  return (
    <div className="App">
        <p>testing</p>
      <Maps />
    </div>
  );
}

export default App;
