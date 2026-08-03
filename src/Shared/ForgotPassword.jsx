import amazonLogo from "../assets/logo-amzon.png";
import { useState } from "react";
import { Error_MSG } from "../constants/error";
import { forgotPassword } from "../services/authservices";
import { isEmailValid } from "../constants/validation";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [hasEmailError, setHasEmailError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const hasValidationError = !isEmailValid(email);
    setHasEmailError(hasValidationError);

    if (hasValidationError) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await forgotPassword({ email });
      setMessage(response.data?.message || "Password reset email sent.");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Unable to send the password reset email. Please try again."
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

      <form
        className="card mx-auto mt-4 p-4"
        style={{ maxWidth: "400px" }}
        onSubmit={handleSubmit}
      >
        <h3>Forgot Password</h3>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {hasEmailError && (
            <small className="text-danger">
              {Error_MSG.FORGOT_PASSWORD.EMAIL}
            </small>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-warning w-100"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>

        {message && (
          <small className="d-block mt-3 text-center text-danger">
            {message}
          </small>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword;
