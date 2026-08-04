import { Link } from "react-router-dom";

function Footer({ isAuthentication = false }) {
  if (isAuthentication) {
    return (
      <footer className="text-center mt-3">
        <div className="d-flex justify-content-center gap-4">
          <Link to="/login">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>

        <div className="text-center mt-4">
          <div className="d-flex justify-content-center gap-4">
            <a href="#">Conditions of Use</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Help</a>
          </div>

          <p className="mt-3 text-muted">
            &copy; 1996-2024, Amazon.com, Inc. or its affiliates
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer">
      <p>
        &copy; 2024 Your Company. All rights reserved. {" "}
        <Link to="/login">Sign In</Link>{" "}
        <Link to="/signup">Sign Up</Link>
      </p>
    </footer>
  );
}

export default Footer;
