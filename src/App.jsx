import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Shared/Login";
import ForgotPassword from "./Shared/ForgotPassword";
import NavBar from "./Shared/Navbar";
import Signup from "./Shared/Signup";
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/create-account" element={<Signup />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NavBar />} />

    </Routes>
  );
}

export default App;
