// Pages/CatPage.jsx
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import NavBarComp from "../Components/NavBarComp";
import Footer from "../Components/Footer";
import Breadcrumb from "../Components/Breadcrumb";
import FilterSidebar from "../Components/FilterSidebar";
import CategoriyeRightSide from "../Components/CategoriyeRightSide";
import { apiGetAll, getImage } from "../Config/api.js";
import { CategoryService } from "../Services/CategoryService";

export default function CatPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract search & category query parameters from URL
  const activeSearch = searchParams.get("search") || "";
  const activeCategory = searchParams.get("category") || "All";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tamkeen categories (used to turn the `category` param - id or name - into a category_id)
  const [categories, setCategories] = useState([]);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);

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

  // Load categories from the Tamkeen API
  useEffect(() => {
    let cancelled = false;
    CategoryService.getCategories().then((list) => {
      if (!cancelled) {
        setCategories(list);
        setCategoriesLoaded(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const isAll =
    !activeCategory || activeCategory === "All" || activeCategory === "All category";
  const isNumeric = /^\d+$/.test(activeCategory);

  const matchedCategory = useMemo(
    () =>
      categories.find(
        (c) =>
          String(c.id) === activeCategory ||
          String(c.name).toLowerCase() === activeCategory.toLowerCase()
      ) || null,
    [categories, activeCategory]
  );

  const categoryId = isAll ? null : isNumeric ? activeCategory : matchedCategory?.id ?? null;
  const waitingForCategories = !isAll && !isNumeric && !categoriesLoaded;
  const categoryLabel = isAll ? "All" : matchedCategory?.name ?? activeCategory;

  // Fetch products from the Tamkeen API when the category changes
  useEffect(() => {
    if (waitingForCategories) return undefined;

    // A category name that doesn't exist in Tamkeen -> nothing to show
    if (!isAll && !categoryId) {
      setProducts([]);
      setLoading(false);
      return undefined;
    }

    let cancelled = false;

    async function fetchProducts() {
      setLoading(true);
      try {
        const rawList = await apiGetAll(
          "/product",
          categoryId ? { category_id: categoryId } : {}
        );

        const normalized = rawList.map((item) => ({
          ...item,
          title: item.title ?? item.name,
          price: Number(item.price),
          image: getImage(item, ""),
          rating: item.rating || 4.0,
          verified: item.rating >= 4.2,
        }));

        if (!cancelled) setProducts(normalized);
      } catch (err) {
        console.error("Error fetching products:", err);
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, [categoryId, isAll, waitingForCategories]);

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
          activeCategory={categoryLabel}
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
                category={categoryLabel}
              />
            )}
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}
