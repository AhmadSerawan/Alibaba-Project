import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ListGroup from "react-bootstrap/ListGroup";
import CartDrawer from "./CartDrawer";
import Logo from "../assets/imgs/Alibaba_Logo.png";
import {
  UserCircleIcon,
  MessageSquareMoreIcon,
  InLoveIcon,
  Menu01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function NavBarComp() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "All category";

  const [searchQuery, setSearchQuery] = useState(currentSearch);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Live Suggestion State
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const searchContainerRef = useRef(null);

  useEffect(() => {
    setSearchQuery(currentSearch);
  }, [currentSearch]);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoadingCategories(true);
        const res = await fetch("https://dummyjson.com/products/category-list");
        if (!res.ok) throw new Error("Failed to load categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([
          "smartphones",
          "laptops",
          "fragrances",
          "skincare",
          "groceries",
          "home-decoration",
        ]);
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  // Fetch live product suggestions when typing
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setLoadingSuggestions(true);
        try {
          const res = await fetch(
            `https://dummyjson.com/products/search?q=${encodeURIComponent(
              searchQuery
            )}&limit=6`
          );
          const data = await res.json();
          setSuggestions(data.products || []);
          setShowSuggestions(true);
        } catch (err) {
          console.error("Error fetching suggestions:", err);
        } finally {
          setLoadingSuggestions(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 250); // Debounce delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Hide suggestions dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update query & URL live
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const newParams = new URLSearchParams(searchParams);
    if (query.trim()) {
      newParams.set("search", query);
    } else {
      newParams.delete("search");
    }

    if (window.location.pathname !== "/catpage") {
      navigate(`/catpage?${newParams.toString()}`);
    } else {
      setSearchParams(newParams, { replace: true });
    }
  };

  const handleSelectSuggestion = (product) => {
    setShowSuggestions(false);
    navigate(`/product/${product.id}`);
  };

  const handleCategorySelect = (cat) => {
    const newParams = new URLSearchParams(searchParams);
    if (cat && cat !== "All category" && cat !== "All") {
      newParams.set("category", cat);
    } else {
      newParams.delete("category");
    }

    if (window.location.pathname !== "/catpage") {
      navigate(`/catpage?${newParams.toString()}`);
    } else {
      setSearchParams(newParams);
    }
  };

  return (
    <Navbar expand="lg" className="NAV flex-column">
      <Container style={{ height: "86px" }} className="d-flex align-items-center">
        <Navbar.Brand onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "86px", height: "62px", overflow: "hidden" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {/* Wrapper Search Container with Relative Position for Dropdown */}
          <div
            className="wrapperSearch mx-auto style-position-relative"
            ref={searchContainerRef}
            style={{ position: "relative" }}
          >
            <Form
              className="d-flex justify-content-between align-items-center"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="search"
                placeholder="Search products..."
                className="searchField"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
              />

              <NavDropdown
                title={currentCategory.replace("-", " ")}
                id="navbarScrollingDropdown"
                className="CatClass text-capitalize"
              >
                <NavDropdown.Item onClick={() => handleCategorySelect("All category")}>
                  All category
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {loadingCategories ? (
                  <NavDropdown.Item disabled>Loading categories...</NavDropdown.Item>
                ) : (
                  categories.map((cat) => (
                    <NavDropdown.Item
                      key={cat}
                      className="text-capitalize"
                      onClick={() => handleCategorySelect(cat)}
                    >
                      {cat.replace("-", " ")}
                    </NavDropdown.Item>
                  ))
                )}
              </NavDropdown>

              <Button
                type="button"
                variant="outline-success"
                className="searchButton"
                onClick={() => handleCategorySelect(currentCategory)}
              >
                Search
              </Button>
            </Form>

            {/* REAL-TIME LIVE SEARCH SUGGESTIONS DROPDOWN */}
            {showSuggestions && (
              <ListGroup
                className="shadow-lg position-absolute w-100 bg-white"
                style={{
                  top: "105%",
                  left: 0,
                  zIndex: 1050,
                  maxHeight: "360px",
                  overflowY: "auto",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                }}
              >
                {loadingSuggestions ? (
                  <ListGroup.Item className="text-muted p-3">
                    Searching products...
                  </ListGroup.Item>
                ) : suggestions.length > 0 ? (
                  suggestions.map((item) => (
                    <ListGroup.Item
                      key={item.id}
                      action
                      onClick={() => handleSelectSuggestion(item)}
                      className="d-flex align-items-center gap-3 py-2 px-3 border-bottom"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                      <div className="flex-grow-1 overflow-hidden">
                        <div
                          className="fw-semibold text-truncate text-dark"
                          style={{ fontSize: "14px" }}
                        >
                          {item.title}
                        </div>
                        <span className="text-muted" style={{ fontSize: "12px" }}>
                          ${item.price} •{" "}
                          <span className="text-capitalize">{item.category}</span>
                        </span>
                      </div>
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item className="text-muted p-3">
                    No matching products found.
                  </ListGroup.Item>
                )}
              </ListGroup>
            )}
          </div>

          <Nav className="NavNav ms-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link onClick={() => navigate("/profile")}>
              <div className="d-flex align-items-center flex-column">
                <HugeiconsIcon icon={UserCircleIcon} />
                <span className="font12">Profile</span>
              </div>
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/messages")}>
              <div className="d-flex align-items-center flex-column">
                <HugeiconsIcon icon={MessageSquareMoreIcon} />
                <span className="font12">Messages</span>
              </div>
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/orders")}>
              <div className="d-flex align-items-center flex-column">
                <HugeiconsIcon icon={InLoveIcon} />
                <span className="font12">Orders</span>
              </div>
            </Nav.Link>
            <Nav.Link as="div">
              <div className="d-flex align-items-center flex-column">
                <CartDrawer />
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <div className="breakUnder" />

      <Container>
        <div
          className="wrapUnderNav w-100 justify-content-between d-flex"
          style={{ height: "56px", alignItems: "center" }}
        >
          <div className="leftSideNavUnder">
            <Navbar expand="lg" className="align-items-center flex">
              <button className="navbtton" onClick={() => navigate("/catpage")}>
                <HugeiconsIcon icon={Menu01Icon} />
                <span className="ms-1 inter">All category</span>
              </button>

              <Nav className="me-auto NavCatNav">
                <Nav.Link onClick={() => navigate("/catpage")} style={{ color: "#1c1c1c", fontWeight: "500" }}>
                  Hot offers
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/catpage")} style={{ color: "#1c1c1c", fontWeight: "500" }}>
                  Gift boxes
                </Nav.Link>
                <Nav.Link onClick={() => navigate("/about")} style={{ color: "#1c1c1c", fontWeight: "500" }}>
                  About Us
                </Nav.Link>
              </Nav>
            </Navbar>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}