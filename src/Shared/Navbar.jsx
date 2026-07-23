import Login from "./Login";
import CreateAccount from "./CreateAccount";

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
              <a href="/" className="nav-link">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a href="/pricing" className="nav-link">
                Pricing
              </a>
            </li>

            <li className="nav-item">
              <a href="/contact-us" className="nav-link">
                Contact US
              </a>
            </li>
          </ul>

          <Login />
          <CreateAccount />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;