import { useState } from "react";
import Map from "./components/Map/Map";

import "./styles/style.css";
import Checkbox from "./components/UI/Inputs/Checkbox";

type LayerState = {
  isVisible: boolean;
  layer: null | string;
};

function App() {
  const [layerState, setLayerState] = useState<LayerState>({
    isVisible: false,
    layer: null,
  });

  const handleLayerChange = (isChecked: boolean, layer: string) => {
    setLayerState({
      isVisible: isChecked,
      layer: isChecked ? layer : null,
    });

    const checkboxes = document.querySelectorAll<HTMLInputElement>('.control-layer input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox.value !== layer) {
        checkbox.checked = false;
      }
    });
  };

  return (
    <main id="main" className="main-container">
      <div className="control-layer">
        <Checkbox label="Population" value="population" onChange={(e) => handleLayerChange(e.target.checked, "population")} />
        <Checkbox label="Density of population" value="density" onChange={(e) => handleLayerChange(e.target.checked, "density")} />
        <Checkbox label="Temperature" value="temperature" onChange={(e) => handleLayerChange(e.target.checked, "temperature")} />
      </div>

      <section id="map-container" className="map-container">
        <Map coordinate={[51.505, -0.09]} layer={layerState} />
      </section>
    </main>
  );
}

export default App;
