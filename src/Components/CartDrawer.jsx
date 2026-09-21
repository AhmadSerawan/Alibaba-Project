import React, { useState } from "react";
import { Button, Offcanvas, ListGroup, Badge } from "react-bootstrap";
import { ShoppingBag, Trash2 } from "lucide-react";
import { ShoppingCart02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const CartDrawer = () => {
  const [showCart, setShowCart] = useState(false);

  // Sample cart data
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Wireless Headphones", price: 99.99, quantity: 1 },
    { id: 2, name: "Ergonomic Mouse", price: 49.5, quantity: 2 },
  ]);

  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);

  const calculateTotal = () =>
    cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);

  return (
    <div className="Cart">
      {/* Button to toggle the Cart */}
      <span
        variant="primary"
        onClick={handleShow}
        className="rel d-flex flex-column align-items-center font12"
      >
        {/* <ShoppingBag size={18} /> */}
        <HugeiconsIcon icon={ShoppingCart02Icon} />
        <div className="d-flex align-items-center gap-2 font12">
            My cart
        <Badge bg="light abs" text="dark">
          {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        </Badge>
        </div>
      </span>

      {/* Cart Drawer with Backdrop */}
      <Offcanvas
        show={showCart}
        onHide={handleClose}
        placement="end"
        backdrop={true} // Creates the light black background overlay
      >
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title>Your Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="d-flex flex-column justify-content-between">
          {cartItems.length === 0 ? (
            <p className="text-muted text-center my-auto">
              Your cart is empty.
            </p>
          ) : (
            <>
              {/* Item List */}
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    className="d-flex justify-content-between align-items-center py-3"
                  >
                    <div>
                      <h6 className="mb-0">{item.name}</h6>
                      <small className="text-muted">
                        Qty: {item.quantity} x ${item.price}
                      </small>
                    </div>
                    <span className="fw-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {/* Cart Footer / Checkout Summary */}
              <div className="pt-3 border-top mt-auto">
                <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
                  <span>Total:</span>
                  <span>${calculateTotal()}</span>
                </div>
                <Button variant="success" className="w-100 py-2">
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default CartDrawer;
