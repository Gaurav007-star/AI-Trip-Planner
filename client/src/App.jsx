import "./App.css";
import Hero from "./components/custom/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTrip from "./create-trip";
import Header from "./components/custom/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/create-trip" element={<CreateTrip />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
