import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const query = searchText.trim();

    // Empty inputs do not make a request.
    if (!query) {
      return undefined;
    }

    const controller = new AbortController();

    // Wait briefly for the user to pause typing before searching.
    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      setError("");
      setHasSearched(false);

      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Unable to search products.");
        }

        const data = await response.json();
        setProducts(data.products ?? []);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setProducts([]);
          setError("Unable to load products. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
          setHasSearched(true);
        }
      }
    }, 300);

    // Cancel the pending request when the user types again or leaves the page.
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [searchText]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setProducts([]);
    setIsLoading(false);
    setError("");
    setHasSearched(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchText((currentText) => currentText.trim());
  };

  const selectProduct = (product) => {
    navigate("/products", {
      state: {
        selectedProduct: product,
      },
    });
  };

  const shouldShowSuggestions = Boolean(searchText.trim());

  return (
    <form
      className="order-3 order-lg-2 flex-grow-1 mx-lg-3"
      onSubmit={handleSubmit}
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
          value={searchText}
          onChange={handleSearchChange}
          aria-label="Search"
        />
        <button className="btn btn-warning" type="submit" aria-label="Search">
          <FaSearch />
        </button>

        {shouldShowSuggestions && (
          <div className="position-absolute top-100 start-0 end-0 z-3 mt-1 list-group shadow-sm">
            {isLoading && <div className="list-group-item text-start">Loading...</div>}

            {!isLoading && error && (
              <div className="list-group-item text-start text-danger">{error}</div>
            )}

            {!isLoading && !error && hasSearched && products.length === 0 && (
              <div className="list-group-item text-start">No products found.</div>
            )}

            {!isLoading && !error && products.map((product) => (
              <button
                key={product.id}
                type="button"
                className="list-group-item list-group-item-action text-start d-flex align-items-center gap-2"
                onClick={() => selectProduct(product)}
              >
                <img
                  src={product.thumbnail}
                  alt=""
                  width="40"
                  height="40"
                  className="rounded object-fit-contain"
                />
                <span>{product.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}

export default SearchBox;
