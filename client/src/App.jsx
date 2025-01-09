import "./App.css";
import Hero from "./components/custom/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTrip from "./create-trip";
import Header from "./components/custom/Header";
import Userpage from "./user";
import Trip from "./trip";
import { useSelector } from "react-redux";
import Error from "./error";
import Footer from "./components/custom/Footer";

function App() {
  const user = useSelector((state) => state.user.user);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        {user && Object.keys(user).length > 0 && (
          <>
            {" "}
            <Route path="/user" element={<Userpage />} />{" "}
            <Route path="/trip/:id" element={<Trip />} />
          </>
        )}

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
