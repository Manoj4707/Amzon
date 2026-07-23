import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Shared/Login";
import NavBar from "./Shared/Navbar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<NavBar />} />
    </Routes>
  );
}

export default App;