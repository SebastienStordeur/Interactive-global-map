import { useState } from "react";
import Map from "./components/Map/Map";

import "./styles/style.css";
import Checkbox from "./components/UI/Inputs/Checbox";

function App() {
  const [layerState, setLayerState] = useState({
    isVisible: false,
    layer: null as null | string,
  });

  const handleLayerChange = (isChecked: boolean, layer: string) => {
    if (isChecked) {
      setLayerState({
        isVisible: true,
        layer: layer,
      });
    } else {
      setLayerState({
        isVisible: false,
        layer: null,
      });
    }
  };

  return (
    <main id="main" className="main-container">
      <div className="control-layer">
        <Checkbox label="Population" onChange={(e) => handleLayerChange(e.target.checked, "population")} />
        <Checkbox label="Density of population" onChange={(e) => handleLayerChange(e.target.checked, "density")} />
        <Checkbox label="Temperature" onChange={(e) => handleLayerChange(e.target.checked, "temperature")} />
      </div>

      <section id="map-container" className="map-container">
        <Map coordinate={[51.505, -0.09]} layer={layerState} />
      </section>
    </main>
  );
}

export default App;
