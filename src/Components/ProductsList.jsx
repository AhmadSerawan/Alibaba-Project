import { useEffect, useState } from 'react';
import ProductPagination from './ProductPagination';
import { API_Config } from '../Config/API_Config';
import CardProductList from './CardProductList';

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = (page) => {
    setLoading(true);
    // Dynamic URL matching /product/1, /product/2, etc.
    const url = `${API_Config.BASE_URL}/product/${page}?_format=json`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || data);
        // Set total pages from backend response if available, or calculate dynamically
        if (data.total_pages) setTotalPages(data.total_pages);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      {/* Product items rendering here */}
      <CardProductList/>
      {/* Pagination Component */}
      <ProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage) => setCurrentPage(newPage)}
        onPageSizeChange={(pageSize) => {
          // Re-fetch or adjust endpoint based on items per page if required
          console.log("Selected page size:", pageSize);
        }}
      />
    </div>
  );
}