import "./App.css";
import Hero from "./components/custom/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTrip from "./create-trip";
import Header from "./components/custom/Header";
import Userpage from "./user";
import Trip from "./trip";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.user);
  console.log(user);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/user" element={<Userpage />} />
        <Route path="/trip/:id" element={<Trip />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
