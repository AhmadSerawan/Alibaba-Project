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
import { apiGet, apiGetAll, getImage, toList } from "../Config/api.js";

const nameOf = (item) => item?.name ?? item?.title ?? "";

export default function NavBarComp() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  // The `category` URL param holds the Tamkeen category id ("" = all categories)
  const currentCategoryId = searchParams.get("category") || "";

  const [searchQuery, setSearchQuery] = useState(currentSearch);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState(false);

  // Live Suggestion State
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const searchContainerRef = useRef(null);

  const currentCategoryName =
    nameOf(categories.find((c) => String(c.id) === currentCategoryId)) ||
    "All category";

  const categoryNameOfProduct = (product) =>
    product.category?.name ??
    nameOf(
      categories.find((c) => String(c.id) === String(product.category_id)),
    );

  useEffect(() => {
    setSearchQuery(currentSearch);
  }, [currentSearch]);

  // Fetch categories (Tamkeen API)
  useEffect(() => {
    let cancelled = false;

    async function fetchCategories() {
      try {
        setLoadingCategories(true);
        setCategoriesError(false);
        const data = await apiGetAll("/category");
        if (!cancelled) setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        if (!cancelled) {
          setCategories([]);
          setCategoriesError(true);
        }
      } finally {
        if (!cancelled) setLoadingCategories(false);
      }
    }
    fetchCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch live product suggestions when typing (Tamkeen API)
  useEffect(() => {
    let cancelled = false;

    const timer = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setLoadingSuggestions(true);
        try {
          const json = await apiGet("/product", {
            search: searchQuery.trim(),
            category_id: currentCategoryId || undefined,
          });
          if (!cancelled) {
            setSuggestions(toList(json).slice(0, 6));
            setShowSuggestions(true);
          }
        } catch (err) {
          console.error("Error fetching suggestions:", err);
          if (!cancelled) {
            setSuggestions([]);
            setShowSuggestions(true);
          }
        } finally {
          if (!cancelled) setLoadingSuggestions(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 250); // Debounce delay

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [searchQuery, currentCategoryId]);

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

  // categoryId: Tamkeen category id, or "" for all categories
  const handleCategorySelect = (categoryId) => {
    const newParams = new URLSearchParams(searchParams);
    if (categoryId) {
      newParams.set("category", String(categoryId));
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
      <Container
        style={{ height: "86px" }}
        className="d-flex align-items-center"
      >
        <Navbar.Brand
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
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
            className="wrapperSearch mx-auto "
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
                onFocus={() =>
                  searchQuery.trim().length > 1 && setShowSuggestions(true)
                }
              />

              <NavDropdown
                title={currentCategoryName}
                id="navbarScrollingDropdown"
                className="CatClass text-capitalize"
              >
                <NavDropdown.Item onClick={() => handleCategorySelect("")}>
                  All category
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {loadingCategories ? (
                  <NavDropdown.Item disabled>
                    Loading categories...
                  </NavDropdown.Item>
                ) : categoriesError ? (
                  <NavDropdown.Item disabled>
                    Could not load categories
                  </NavDropdown.Item>
                ) : (
                  categories.map((cat) => (
                    <NavDropdown.Item
                      key={cat.id}
                      className="text-capitalize"
                      active={String(cat.id) === currentCategoryId}
                      onClick={() => handleCategorySelect(cat.id)}
                    >
                      {nameOf(cat)}
                    </NavDropdown.Item>
                  ))
                )}
              </NavDropdown>

              <Button
                type="button"
                variant="outline-success"
                className="searchButton"
                onClick={() => handleCategorySelect(currentCategoryId)}
              >
                Search
              </Button>
            </Form>

            {/* REAL-TIME LIVE SEARCH SUGGESTIONS DROPDOWN */}
            {/* REAL-TIME LIVE SEARCH SUGGESTIONS DROPDOWN */}
            {showSuggestions && (
              <>
                <style>{`
      .wrapperSearch .sugg-box {
        position: absolute !important;
        top: calc(100% + 6px) !important;
        left: 0 !important;
        right: 0 !important;
        width: auto !important;
        min-width: 0 !important;
        max-height: 400px;
        overflow-y: auto;
        background: #fff !important;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        z-index: 1050;
        text-align: left;
      }
      .wrapperSearch .sugg-item {
        display: flex !important;
        align-items: center;
        gap: 12px;
        width: 100% !important;
        padding: 10px 14px;
        background: #fff !important;
        color: #212529 !important;
        border: 0;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        text-align: left;
      }
      .wrapperSearch .sugg-item:last-child { border-bottom: 0; }
      .wrapperSearch .sugg-item:hover { background: #f5f5f5 !important; }
      .wrapperSearch .sugg-img {
        width: 48px;
        height: 48px;
        object-fit: cover;
        border-radius: 4px;
        flex-shrink: 0;
      }
      .wrapperSearch .sugg-text { flex: 1; min-width: 0; }
      .wrapperSearch .sugg-name {
        font-size: 14px;
        font-weight: 600;
        color: #212529 !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .wrapperSearch .sugg-meta {
        font-size: 12px;
        color: #6c757d !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .wrapperSearch .sugg-empty {
        padding: 14px;
        color: #6c757d;
        background: #fff;
      }
    `}</style>

                <div className="sugg-box">
                  {loadingSuggestions ? (
                    <div className="sugg-empty">Searching products...</div>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        className="sugg-item"
                        onClick={() => handleSelectSuggestion(item)}
                      >
                        <img
                          className="sugg-img"
                          src={getImage(item)}
                          alt={nameOf(item)}
                        />
                        <div className="sugg-text">
                          <div className="sugg-name">{nameOf(item)}</div>
                          <div className="sugg-meta">
                            ${item.price}
                            {categoryNameOfProduct(item) && (
                              <>
                                {" • "}
                                <span className="text-capitalize">
                                  {categoryNameOfProduct(item)}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="sugg-empty">
                      No matching products found.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <Nav
            className="NavNav ms-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
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
                <Nav.Link
                  onClick={() => navigate("/catpage")}
                  style={{ color: "#1c1c1c", fontWeight: "500" }}
                >
                  Hot offers
                </Nav.Link>
                <Nav.Link
                  onClick={() => navigate("/catpage")}
                  style={{ color: "#1c1c1c", fontWeight: "500" }}
                >
                  Gift boxes
                </Nav.Link>
                <Nav.Link
                  onClick={() => navigate("/about")}
                  style={{ color: "#1c1c1c", fontWeight: "500" }}
                >
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
