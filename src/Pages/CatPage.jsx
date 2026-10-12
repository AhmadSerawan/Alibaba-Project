// Pages/CatPage.jsx
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import NavBarComp from "../Components/NavBarComp";
import Footer from "../Components/Footer";
import Breadcrumb from "../Components/Breadcrumb";
import FilterSidebar from "../Components/FilterSidebar";
import CategoriyeRightSide from "../Components/CategoriyeRightSide";

export default function CatPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract search & category query parameters from URL
  const activeSearch = searchParams.get("search") || "";
  const activeCategory = searchParams.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 2000,
    brands: [],
    condition: "Any",
    ratings: [],
  });

  // Handler for category changes from Breadcrumb or FilterSidebar
  const handleCategorySelect = (cat) => {
    const newParams = new URLSearchParams(searchParams);
    if (cat && cat !== "All category" && cat !== "All") {
      newParams.set("category", cat);
    } else {
      newParams.delete("category");
    }
    setSearchParams(newParams);
  };

  // Fetch products from API when activeCategory changes
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const isAll = !activeCategory || activeCategory === "All" || activeCategory === "All category";
        const url = isAll
          ? "https://dummyjson.com/products?limit=100"
          : `https://dummyjson.com/products/category/${encodeURIComponent(activeCategory)}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        const rawList = data.products || [];
        const normalized = rawList.map((item) => ({
          ...item,
          image: item.thumbnail || (item.images && item.images[0]) || "",
          rating: item.rating || 4.0,
          verified: item.rating >= 4.2,
        }));

        setProducts(normalized);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [activeCategory]);

  // Real-time local filtering (Search Query + Sidebar Filters)
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // 1. Live Typing Search Filter
      if (activeSearch.trim() !== "") {
        const query = activeSearch.toLowerCase();
        const titleMatch = item.title?.toLowerCase().includes(query);
        const descMatch = item.description?.toLowerCase().includes(query);
        const brandMatch = item.brand?.toLowerCase().includes(query);

        if (!titleMatch && !descMatch && !brandMatch) return false;
      }

      // 2. Price Range Filter
      if (item.price < filters.minPrice || item.price > filters.maxPrice) return false;

      // 3. Brands Filter
      if (filters.brands.length > 0) {
        if (!filters.brands.some((b) => item.brand?.toLowerCase() === b.toLowerCase())) {
          return false;
        }
      }

      // 4. Ratings Filter
      if (filters.ratings.length > 0) {
        const floorRating = Math.floor(item.rating);
        if (!filters.ratings.includes(floorRating)) return false;
      }

      return true;
    });
  }, [products, activeSearch, filters]);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <NavBarComp />

      <Container className="my-3 flex-grow-1">
        {/* Dynamic Breadcrumb synced with category */}
        <Breadcrumb
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
        />

        <Row className="g-4">
          {/* Dynamic Sidebar synced with category */}
          <Col lg={3} md={4}>
            <FilterSidebar
              activeCategory={activeCategory}
              onSelectCategory={handleCategorySelect}
              onFilterChange={(newFilters) => setFilters(newFilters)}
            />
          </Col>

          {/* Product Grid / List view with Real-Time output */}
          <Col lg={9} md={8}>
            {loading ? (
              <div className="text-center py-5 bg-white rounded shadow-sm">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted mb-0">Loading products...</p>
              </div>
            ) : (
              <CategoriyeRightSide
                products={filteredProducts}
                category={activeCategory}
              />
            )}
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}