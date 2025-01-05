import "./App.css";
import Hero from "./components/custom/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTrip from "./create-trip";
import Header from "./components/custom/Header";
import Userpage from "./user";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/user" element={<Userpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
