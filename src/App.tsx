import Map from "./components/Map/Map";
import "./styles/style.css";

function App() {
  return (
    <main id="main" className="main-container">
      <section id="map-container" className="map-container">
        <Map />
      </section>
    </main>
  );
}

export default App;
