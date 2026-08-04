import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Products() {
  const { state } = useLocation();
  const searchResults = state?.searchResults;
  const searchText = state?.searchText;
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [hoveredProductId, setHoveredProductId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=100", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load products.");
        }

        const data = await response.json();
        setProducts(data.products ?? []);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError("Unable to load products. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, []);

  const showSelectionAlert = (product) => {
    window.alert(`You selected: ${product.title}`);
  };

  // SearchBox provides matching products through router state after a selection.
  const displayedProducts = Array.isArray(searchResults) ? searchResults : products;

  return (
    <main className="container px-3 px-md-4 py-4 products-page">
      <h1 className="products-page__title">
        {searchText ? `Search results for "${searchText}"` : "Products"}
      </h1>

      {isLoading && <p>Loading products...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!isLoading && !error && displayedProducts.length === 0 && (
        <p>No products found.</p>
      )}

      {!isLoading && !error && displayedProducts.length > 0 && (
        <div className="row g-4 text-start align-items-stretch">
          {displayedProducts.map((product) => (
            <div className="col-12" key={product.id}>
              <article
                className="product-card card h-100 border-0 rounded-4 overflow-hidden"
                role="button"
                tabIndex={0}
                onClick={() => showSelectionAlert(product)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    showSelectionAlert(product);
                  }
                }}
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
                aria-label={`View product ${product.title}`}
              >
                <div className="product-card__layout d-flex flex-column flex-md-row align-items-center">
                  <div className="product-image-wrapper d-flex align-items-center justify-content-center p-3 bg-light">
                    <img
                      src={product.thumbnail}
                      className="product-image"
                      alt={product.title}
                    />
                  </div>
                  <div className="product-card__details card-body d-flex flex-column p-3 p-md-4">
                    <h2 className="card-title h5 mb-2 product-title">{product.title}</h2>
                    <p className="card-text mb-1 fw-bold">₹{product.price}</p>
                    <p className="card-text mb-3">Rating: {product.rating}</p>
                    <button
                      type="button"
                      className="btn btn-warning mt-auto product-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        showSelectionAlert(product);
                      }}
                    >
                      View Product
                    </button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Products;
