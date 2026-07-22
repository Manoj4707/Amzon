function Navbar() {
  return (
    <nav className="bg-light border-bottom">
      <div className="container-fluid ">
        <ul className="nav justify-content-end py-1">
          <li className="nav-item">
            <a className="nav-link active" href="/">
              Home
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/about">
              About
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/contact">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;