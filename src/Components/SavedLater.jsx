import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { ShoppingCart } from "lucide-react";

/**
 * SavedLater Component
 * Displays items that the user saved for later with a 'Move to cart' action button.
 */
export default function SavedLater({ onMoveToCart }) {
  const [savedItems, setSavedItems] = useState([
    {
      id: 1,
      title: "GoPro HERO6 4K Action Camera - Black",
      price: "$99.50",
      numericPrice: 99.5,
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60", // Tablet / Pad
    },
    {
      id: 2,
      title: "GoPro HERO6 4K Action Camera - Black",
      price: "$99.50",
      numericPrice: 99.5,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60", // Smartphone
    },
    {
      id: 3,
      title: "GoPro HERO6 4K Action Camera - Black",
      price: "$99.50",
      numericPrice: 99.5,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60", // Smartwatch
    },
    {
      id: 4,
      title: "GoPro HERO6 4K Action Camera - Black",
      price: "$99.50",
      numericPrice: 99.5,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60", // Laptop
    },
  ]);

  const handleMoveToCart = (item) => {
    // Remove from saved list
    setSavedItems((prev) => prev.filter((i) => i.id !== item.id));

    // Optional callback if parent component handles adding to cart
    if (onMoveToCart) {
      onMoveToCart(item);
    }
  };

  return (
    <Container className="my-4">
      <Card
        className="p-4 bg-white border-1 shadow-sm"
        style={{ borderRadius: "8px", borderColor: "#e5e7eb" }}
      >
        {/* Section Header */}
        <h5 className="fw-bold text-dark mb-4" style={{ fontSize: "1.15rem" }}>
          Saved for later
        </h5>

        {/* Saved Items Grid */}
        {savedItems.length === 0 ? (
          <p className="text-muted mb-0">No items saved for later.</p>
        ) : (
          <Row className="g-3">
            {savedItems.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={3}>
                <div className="d-flex flex-column h-100">
                  {/* Light Gray Image Container */}
                  <div
                    className="rounded d-flex align-items-center justify-content-center p-3 mb-3"
                    style={{
                      backgroundColor: "#f1f3f5",
                      height: "200px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  {/* Price */}
                  <div
                    className="fw-bold text-dark mb-1"
                    style={{ fontSize: "1.1rem" }}
                  >
                    {item.price}
                  </div>

                  {/* Title */}
                  <p
                    className="text-secondary mb-3 flex-grow-1"
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: "1.35",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.title}
                  </p>

                  {/* Move to Cart Button */}
                  <div>
                    <Button
                      variant="outline-light"
                      onClick={() => handleMoveToCart(item)}
                      className="d-flex align-items-center justify-content-center gap-2 border bg-white shadow-sm px-3 py-1.5"
                      style={{
                        borderColor: "#dee2e6",
                        color: "#f0345d",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        borderRadius: "6px",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#fff5f7";
                        e.currentTarget.style.borderColor = "#f0345d";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#ffffff";
                        e.currentTarget.style.borderColor = "#dee2e6";
                      }}
                    >
                      <ShoppingCart size={16} style={{ color: "#f0345d" }} />
                      Move to cart
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Card>
    </Container>
  );
}