import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import ReactImageMagnify from "react-image-magnify";


function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProductDetails() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Product not found.");
        }

        const data = await response.json();
        setProduct(data);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError("Unable to load product details. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadProductDetails();

    return () => controller.abort();
  }, [id]);

  if (isLoading) {
    return (
      <main className="container py-5 text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="container py-5">
        <div className="alert alert-warning">Product not found.</div>
      </main>
    );
  }

  const previewImage = product.thumbnail ?? product.images?.[0];
  const highResolutionImage = product.images?.[0] ?? product.thumbnail;

  return (
    <main className="container-fluid py-4 product-details-page">
      <div className="row g-4 align-items-start">
        <div className="col-12 col-lg-3">
          <div className="product-details-image-wrapper bg-white rounded-4 shadow-sm p-4 d-flex align-items-center justify-content-center">
            <img
              src={highResolutionImage}
              alt={product.title}
              className="product-details-image"
            />
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="product-details-content bg-white rounded-4 shadow-sm p-4 product-details-content-box">
            <p className="text-muted mb-2 fw-semibold">Product ID: {product.id}</p>
            <h1 className="product-details-title mb-3">{product.title}</h1>

            <div className="d-flex flex-column gap-2 mb-3">
              <p className="mb-0"><strong>Brand:</strong> {product.brand}</p>
              <p className="mb-0"><strong>Category:</strong> {product.category}</p>
              <p className="mb-0"><strong>Description:</strong> {product.description}</p>
            </div>

            <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
              <span className="fw-bold fs-4 text-dark">₹{product.price}</span>
              <span className="text-success">{product.discountPercentage}% off</span>
            </div>

            <div className="d-flex align-items-center gap-2 mb-3 text-warning">
              <FaStar />
              <span className="text-dark">{product.rating}</span>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-12 col-sm-6">
                <p className="mb-1"><strong>Stock:</strong> {product.stock}</p>
              </div>
              <div className="col-12 col-sm-6">
                <p className="mb-1"><strong>Availability:</strong> {product.availabilityStatus ?? "In Stock"}</p>
              </div>
              <div className="col-12 col-sm-6">
                <p className="mb-1"><strong>SKU:</strong> {product.sku ?? "Not available"}</p>
              </div>
              <div className="col-12 col-sm-6">
                <p className="mb-1"><strong>Warranty:</strong> {product.warrantyInformation ?? "Not available"}</p>
              </div>
              <div className="col-12">
                <p className="mb-1"><strong>Shipping:</strong> {product.shippingInformation ?? "Not available"}</p>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-4">
              <button type="button" className="btn btn-warning px-4">
                Add to Cart
              </button>
              <button type="button" className="btn btn-dark px-4">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="product-details-zoom-column bg-white rounded-4 shadow-sm p-4 d-flex align-items-center justify-content-center product-zoom-box">
            <div className="product-details-zoom-shell">
              <ReactImageMagnify
                className="product-details-zoom-root"
                style={{
                  width: "100%",
                  maxWidth: "450px",
                  overflow: "visible",
                }}
                smallImage={{
                  alt: product.title,
                  isFluidWidth: true,
                  src: previewImage,
                  imageStyle: {
                    width: "100%",
                    maxWidth: "450px",
                    height: "auto",
                    display: "block",
                    objectFit: "contain",
                  },
                }}
                largeImage={{
                  src: highResolutionImage,
                  width: 1000,
                  height: 1000,
                }}
                enlargedImagePosition="beside"
                enlargedImageContainerDimensions={{
                  width: "500px",
                  height: "500px",
                }}
                hoverOffDelayInMs={0}
                hoverDelayInMs={0}
                fadeDurationInMs={0}
                shouldUsePositiveSpaceLens={true}
                lensStyle={{
                  border: "1px solid rgba(0, 0, 0, 0.15)",
                  backgroundColor: "rgba(255, 255, 255, 0.35)",
                  boxShadow: "0 0.25rem 0.75rem rgba(0, 0, 0, 0.15)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
