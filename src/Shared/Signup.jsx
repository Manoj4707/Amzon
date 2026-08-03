import amazonLogo from "../assets/logo-amzon.png";
import { useState } from "react";
import { signup } from "../services/authservices";
import { Error_MSG } from "../constants/error";
import { isEmailValid } from "../constants/validation";

function Signup() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [signupErrors, setSignupErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [signupMessage, setSignupMessage] = useState("");

  const updateSignupData = (field) => (event) => {
    setSignupData((currentData) => ({
      ...currentData,
      [field]: event.target.value,
    }));
  };

  const handleSignup = async () => {
    setSignupMessage("");

    const tempErrors = {
      name: signupData.name.length < 3,
      email: !isEmailValid(signupData.email),
      password: signupData.password.length < 7,
    };

    setSignupErrors(tempErrors);

    if (tempErrors.name || tempErrors.email || tempErrors.password) {
      return;
    }

    try {
      await signup(signupData);
      setSignupMessage("Account created successfully!");
    } catch (error) {
      setSignupMessage(
        error.response?.data?.message ||
          error.message ||
          "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <img src={amazonLogo} alt="Amazon Logo" width="150" />
      </div>

      <div className="card mx-auto mt-4 p-4" style={{ maxWidth: "400px" }}>
        <h3>Create Account</h3>

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={signupData.name}
            onChange={updateSignupData("name")}
          />
          {signupErrors.name && (
            <small className="text-danger">
              {Error_MSG.SIGNUP.NAME}
            </small>
          )}
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={signupData.email}
            onChange={updateSignupData("email")}
          />
          {signupErrors.email && (
            <small className="text-danger">
              {Error_MSG.SIGNUP.EMAIL}
            </small>
          )}
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={signupData.password}
            onChange={updateSignupData("password")}
          />
          {signupErrors.password && (
            <small className="text-danger">
              {Error_MSG.SIGNUP.PASSWORD}
            </small>
          )}
        </div>

        <button
          className="btn btn-warning w-100"
          onClick={handleSignup}
        >
          Create Account
        </button>

        {signupMessage && (
          <small className="d-block mt-3 text-center text-danger">
            {signupMessage}
          </small>
        )}
      </div>
    </div>
  );
}

export default Signup;
