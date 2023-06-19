import Map from "./components/Map/Map";
import CustomSelect from "./components/UI/Select/CustomSelect";
import "./styles/style.css";

function App() {
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];
  return (
    <main id="main" className="main-container">
      <CustomSelect options={options} category="test" />
      <section id="map-container" className="map-container">
        <Map />
      </section>
    </main>
  );
}

export default App;
