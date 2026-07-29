import Login from "./Login";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">
          MyTodos
        </a>

        <div className="ms-auto d-flex align-items-center">
          <ul className="navbar-nav me-3">
            <li className="nav-item">
              <a href="/login" className="nav-link">
                Login
              </a>
            </li>

            <li className="nav-item">
              <a href="/create-account" className="nav-link">
                Create Account
              </a>
            </li>

            <li className="nav-item">
              <a href="/contact-us" className="nav-link">
                Contact US
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;