import { Link } from "react-router-dom";
import SearchBox from "../Products/SearchBox";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container d-flex flex-wrap align-items-center gap-2">
        <Link className="navbar-brand fw-bold" to="/">
          AMZON
        </Link>

        <SearchBox />

        <div className="order-2 order-lg-3 ms-lg-auto d-flex align-items-center">
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
