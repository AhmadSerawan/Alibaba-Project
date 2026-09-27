import  { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { ArrowLeft, Lock, MessageSquare, Truck, ShoppingCart } from "lucide-react";
import { useCart } from "../Contexts/CartContext";


export default function CartViewComp() {
  const {
    cartItems,
    savedItems,
    handleQtyChange,
    handleRemove,
    handleRemoveAll,
    handleSaveForLater,
    handleMoveToCart,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const discount = cartItems.length > 0 ? 60.0 : 0.0;
  const tax = cartItems.length > 0 ? 14.0 : 0.0;
  const total = Math.max(0, subtotal - discount + tax);

  return (
    <div style={{ backgroundColor: "#f7fafc", minHeight: "100vh", padding: "2rem 0" }}>
      <Container style={{ maxWidth: "1140px" }}>
        <h3 className="fw-bold mb-4 d-flex align-items-center gap5"  style={{ color: "#1c1c1c", fontSize: "1.5rem" }}>
         <div> My cart</div> <div className="CartNumSt">{cartItems.length}</div>
        </h3>

        <Row className="g-4">
          <Col lg={8}>
            <Card className="border-0 shadow-sm p-4 mb-4" style={{ borderRadius: "8px" }}>
              {cartItems.length === 0 ? (
                <div className="text-center py-5">
                  <h5 className="text-muted mb-3">Your cart is currently empty</h5>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div key={item.id}>
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start py-3">
                      <div className="d-flex gap-3 align-items-start mb-3 mb-sm-0 w-100 me-2">
                        <div
                          className="border rounded d-flex align-items-center justify-content-center flex-shrink-0"
                          style={{
                            width: "80px",
                            height: "80px",
                            backgroundColor: "#f8f9fa",
                            borderColor: "#e5e7eb",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={item.img}
                            alt={item.title}
                            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
                          />
                        </div>

                        <div className="flex-grow-1">
                          <h6
                            className="fw-semibold mb-1"
                            style={{ color: "#1c1c1c", fontSize: "0.95rem", lineHeight: "1.3" }}
                          >
                            {item.title}
                          </h6>
                          <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                            Size: {item.size}, Color: {item.color}, Material: {item.material}
                          </div>
                          <div className="text-muted mb-2" style={{ fontSize: "0.85rem" }}>
                            Seller: {item.seller}
                          </div>

                          <div className="d-flex gap-2">
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="px-2 py-1"
                              style={{
                                color: "#fa3434",
                                borderColor: "#e5e7eb",
                                backgroundColor: "#fff",
                                fontSize: "0.78rem",
                                fontWeight: "500",
                              }}
                              onClick={() => handleRemove(item.id)}
                            >
                              Remove
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="px-2 py-1"
                              style={{
                                color: "#fa3434",
                                borderColor: "#e5e7eb",
                                backgroundColor: "#fff",
                                fontSize: "0.78rem",
                                fontWeight: "500",
                              }}
                              onClick={() => handleSaveForLater(item)}
                            >
                              Save for later
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div
                        className="d-flex flex-sm-column align-items-end justify-content-between w-100 w-sm-auto text-end"
                        style={{ minWidth: "110px" }}
                      >
                        <span className="fw-semibold mb-2" style={{ color: "#1c1c1c", fontSize: "1rem" }}>
                          ${item.price.toFixed(2)}
                        </span>

                        <Form.Select
                          size="sm"
                          value={item.qty}
                          onChange={(e) => handleQtyChange(item.id, Number(e.target.value))}
                          style={{
                            width: "90px",
                            borderColor: "#e5e7eb",
                            fontSize: "0.85rem",
                            color: "#1c1c1c",
                            cursor: "pointer",
                          }}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <option key={n} value={n}>
                              Qty: {n}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                    </div>

                    {index < cartItems.length - 1 && (
                      <hr style={{ color: "#e5e7eb", margin: "0.75rem 0" }} />
                    )}
                  </div>
                ))
              )}

              {cartItems.length > 0 && (
                <div
                  className="d-flex justify-content-between align-items-center pt-3 mt-2 border-top"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <Button
                    className="d-flex align-items-center gap-2 fw-semibold border-0 text-white px-3 py-2"
                    style={{
                      backgroundColor: "#0d6efd",
                      borderRadius: "6px",
                      fontSize: "0.88rem",
                    }}
                  >
                    <ArrowLeft size={16} /> Back to shop
                  </Button>

                  <Button
                    variant="outline-danger"
                    className="fw-semibold px-3 py-2"
                    style={{
                      color: "#0d6efd",
                      borderColor: "#e5e7eb",
                      backgroundColor: "#fff",
                      borderRadius: "6px",
                      fontSize: "0.88rem",
                    }}
                    onClick={handleRemoveAll}
                  >
                    Remove all
                  </Button>
                </div>
              )}
            </Card>

            {/* Badges */}
            <Row className="mt-4 pt-2 g-3">
              <Col md={4}>
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: "48px", height: "48px", backgroundColor: "#e2e8f0" }}
                  >
                    <Lock size={20} className="text-secondary" />
                  </div>
                  <div>
                    <h6 className="fw-semibold mb-0" style={{ fontSize: "0.92rem", color: "#1c1c1c" }}>
                      Secure payment
                    </h6>
                    <p className="text-muted mb-0" style={{ fontSize: "0.82rem" }}>
                      Have you ever finally just
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: "48px", height: "48px", backgroundColor: "#e2e8f0" }}
                  >
                    <MessageSquare size={20} className="text-secondary" />
                  </div>
                  <div>
                    <h6 className="fw-semibold mb-0" style={{ fontSize: "0.92rem", color: "#1c1c1c" }}>
                      Customer support
                    </h6>
                    <p className="text-muted mb-0" style={{ fontSize: "0.82rem" }}>
                      Have you ever finally just
                    </p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: "48px", height: "48px", backgroundColor: "#e2e8f0" }}
                  >
                    <Truck size={20} className="text-secondary" />
                  </div>
                  <div>
                    <h6 className="fw-semibold mb-0" style={{ fontSize: "0.92rem", color: "#1c1c1c" }}>
                      Free delivery
                    </h6>
                    <p className="text-muted mb-0" style={{ fontSize: "0.82rem" }}>
                      Have you ever finally just
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>

          {/* Right Sidebar */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm p-3 mb-3" style={{ borderRadius: "8px" }}>
              <div className="text-muted mb-2" style={{ fontSize: "0.88rem", fontWeight: "500" }}>
                Have a coupon?
              </div>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Add coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderColor: "#e5e7eb",
                    fontSize: "0.88rem",
                  }}
                />
                <Button
                  variant="outline-primary"
                  className="fw-semibold px-3"
                  style={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderColor: "#e5e7eb",
                    fontSize: "0.88rem",
                  }}
                >
                  Apply
                </Button>
              </div>
            </Card>

            <Card className="border-0 shadow-sm p-3" style={{ borderRadius: "8px" }}>
              <div className="d-flex justify-content-between mb-2 text-muted" style={{ fontSize: "0.9rem" }}>
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 text-danger" style={{ fontSize: "0.9rem" }}>
                <span>Discount:</span>
                <span>- ${discount.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 text-success" style={{ fontSize: "0.9rem" }}>
                <span>Tax:</span>
                <span>+ ${tax.toFixed(2)}</span>
              </div>
              <hr className="my-2" style={{ borderColor: "#e5e7eb" }} />
              <div
                className="d-flex justify-content-between mb-3 fw-bold"
                style={{ fontSize: "1.1rem", color: "#1c1c1c" }}
              >
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Button
                className="w-100 fw-bold py-2 border-0"
                style={{
                  backgroundColor: "#00b517",
                  borderRadius: "6px",
                  fontSize: "1rem",
                }}
                disabled={cartItems.length === 0}
              >
                Checkout
              </Button>
            </Card>
          </Col>
        </Row>

        {/* Saved For Later */}
        {savedItems.length > 0 && (
          <div className="mt-5">
            <h5 className="fw-bold mb-3" style={{ color: "#1c1c1c" }}>
              Saved for later
            </h5>
            <Row className="g-3">
              {savedItems.map((item) => (
                <Col key={item.id} xs={12} sm={6} md={3}>
                  <Card className="border-0 shadow-sm h-100 p-3" style={{ borderRadius: "8px" }}>
                    <div
                      className="d-flex align-items-center justify-content-center mb-3 rounded"
                      style={{ height: "160px", backgroundColor: "#f8f9fa", overflow: "hidden" }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <h6 className="fw-bold mb-1" style={{ fontSize: "0.95rem", color: "#1c1c1c" }}>
                      {item.price}
                    </h6>
                    <p className="text-muted mb-3" style={{ fontSize: "0.85rem", lineHeight: "1.3" }}>
                      {item.title}
                    </p>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="mt-auto d-flex align-items-center justify-content-center gap-2 fw-semibold"
                      onClick={() => handleMoveToCart(item)}
                      style={{ borderRadius: "6px", fontSize: "0.82rem" }}
                    >
                      <ShoppingCart size={15} /> Move to cart
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
}