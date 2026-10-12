import { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";

import CardProductList from "../Components/CardProductList";
import ProductPagination from "../Components/ProductPagination";
import PageLayout from "../Layouts/PageLayout";
import { ProductService } from "../Services/ProductService";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3); // Adjust base total pages as needed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    ProductService.getProductsByPage(currentPage)
      .then((data) => {
        if (isMounted) {
          setProducts(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load products.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  return (
    <PageLayout>
      <Container className="my-4">
        <h2>Products</h2>

        {loading ? (
          <div className="text-center my-5 py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 text-muted">Loading products...</p>
          </div>
        ) : error ? (
          <Alert variant="danger" className="my-4">
            {error}
          </Alert>
        ) : products.length === 0 ? (
          <Alert variant="info" className="my-4 text-center">
            No products available on page {currentPage}.
          </Alert>
        ) : (
          <>
            {products.map((product) => (
              <CardProductList key={product.id} product={product} />
            ))}

            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        )}
      </Container>
    </PageLayout>
  );
}