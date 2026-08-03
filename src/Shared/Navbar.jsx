import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          MyTodos
        </Link>

        <div className="ms-auto d-flex align-items-center">
          <ul className="navbar-nav me-3">
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/create-account" className="nav-link">
                Create Account
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/contact-us" className="nav-link">
                Contact US
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
