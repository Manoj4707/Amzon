import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Shared/Login";
import NavBar from "./Shared/Navbar";
import Signup from "./Shared/Signup";
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<Signup />} />
      <Route path="*" element={<NavBar />} />

    </Routes>
  );
}

export default App;