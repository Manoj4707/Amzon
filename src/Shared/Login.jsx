import amazonLogo from "../assets/logo-amzon.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Error_MSG } from "../constants/error";
import Footer from "./Footer";
import { signin } from "../services/authservices";
import { isEmailValid } from "../constants/validation";

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({
    email: false,
    password: false,
  });
  const [loginMessage, setLoginMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateLoginData = (field) => (event) => {
    setLoginData((currentData) => ({
      ...currentData,
      [field]: event.target.value,
    }));
  };

  const handleLogin = async () => {
    setLoginMessage("");

    const tempErrors = {
      email: !isEmailValid(loginData.email),
      password: !loginData.password,
    };

    setLoginErrors(tempErrors);

    if (tempErrors.email || tempErrors.password) {
      return;
    }

    setIsLoading(true);

    try {
      await signin(loginData);
      navigate("/");
    } catch (error) {
      setLoginMessage(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <img src={amazonLogo} alt="Amazon Logo" width="150" />
      </div>

      <div className="card mx-auto mt-4 p-4" style={{ maxWidth: "400px" }}>
        <h3>Login</h3>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={loginData.email}
            onChange={updateLoginData("email")}
          />
          {loginErrors.email && (
            <small className="text-danger">{Error_MSG.LOGIN.EMAIL}</small>
          )}
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={loginData.password}
            onChange={updateLoginData("password")}
          />
          {loginErrors.password && (
            <small className="text-danger">{Error_MSG.LOGIN.PASSWORD}</small>
          )}
          <Link className="d-block mt-2" to="/forgot-password">
            Forgot Password?
          </Link>
        </div>

        <button
          type="button"
          className="btn btn-warning w-100"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {loginMessage && (
          <small className="d-block mt-3 text-center text-danger">
            {loginMessage}
          </small>
        )}
      </div>

      <Footer isAuthentication />
    </div>
  );
}

export default Login;
