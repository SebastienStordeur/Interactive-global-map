import Map from "./components/Map/Map";
import List from "./components/UI/List/List";
import "./styles/style.css";

function App() {
  return (
    <main id="main" className="main-container">
      <List />
      <section id="map-container" className="map-container">
        <Map />
      </section>
    </main>
  );
}

export default App;
