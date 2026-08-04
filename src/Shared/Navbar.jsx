import { Link } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const phones = [
  "iPhone 16 Pro Max",
  "iPhone 15",
  "Samsung Galaxy S25 Ultra",
  "Samsung Galaxy S24",
  "Google Pixel 9 Pro",
  "OnePlus 13",
  "OnePlus Nord CE 4",
  "Nothing Phone 3",
  "Xiaomi 15",
  "Redmi Note 14 Pro",
  "Realme GT 7",
  "Vivo X200",
  "Oppo Find X8",
  "Motorola Edge 60 Pro",
  "IQOO Neo 10",
  "POCO F7",
];

function NavBar() {
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = phones.filter((phone) =>
    phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm((currentTerm) => currentTerm.trim());
    setShowSuggestions(Boolean(searchTerm.trim()));
  };

  const selectSuggestion = (phone) => {
    setSearchTerm(phone);
    setShowSuggestions(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container d-flex flex-wrap align-items-center gap-2">
        <Link className="navbar-brand fw-bold" to="/">
          AMZON
        </Link>

        <form
          className="order-3 order-lg-2 flex-grow-1 mx-lg-3"
          onSubmit={handleSearch}
        >
          <div className="input-group position-relative">
            <select
              className="form-select w-auto"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Search category"
            >
              <option>All</option>
              <option>Mobiles</option>
              <option>Laptops</option>
              <option>Accessories</option>
              <option>Tablets</option>
            </select>
            <input
              type="search"
              className="form-control"
              placeholder="Search phones"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              aria-label="Search"
            />
            <button className="btn btn-warning" type="submit" aria-label="Search">
              <FaSearch />
            </button>

            {showSuggestions && searchTerm && suggestions.length > 0 && (
              <div className="position-absolute top-100 start-0 end-0 z-3 mt-1 list-group shadow-sm">
                {suggestions.map((phone) => (
                  <button
                    key={phone}
                    type="button"
                    className="list-group-item list-group-item-action text-start"
                    onClick={() => selectSuggestion(phone)}
                  >
                    {phone}
                  </button>
                ))}
              </div>
            )}
          </div>
        </form>

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
