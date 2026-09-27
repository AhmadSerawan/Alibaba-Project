  import { useState } from "react";
  import { Button, Offcanvas, ListGroup, Badge } from "react-bootstrap";
  import { Trash2, Plus, Minus } from "lucide-react";
  import { ShoppingCart02Icon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/react";
  import { useNavigate } from "react-router"; // Import for navigation
  import { useCart } from "../Contexts/CartContext";

  const CartDrawer = () => {
    const [showCart, setShowCart] = useState(false);
    const navigate = useNavigate();

    // Read shared cart state & handlers from context
    const {
      cartItems,
      totalItemCount,
      handleIncreaseQty,
      handleDecreaseQty,
      handleRemove,
    } = useCart();

    const handleClose = () => setShowCart(false);
    const handleShow = () => setShowCart(true);

    const calculateTotal = () =>
      cartItems
        .reduce((sum, item) => sum + item.price * item.qty, 0)
        .toFixed(2);

    const handleNavigateToCart = () => {
      handleClose();
      navigate("/cart"); // Adjust route path as needed
    };

    // const handleNavigateToCheckout = () => {
    //   handleClose();
    //   navigate("/checkout"); // Adjust route path as needed
    // };

    return (
      <div className="Cart">
        {/* Button to toggle the Cart */}
        <span
          onClick={handleShow}
          className="rel d-flex flex-column align-items-center font12"
          style={{ cursor: "pointer" }}
        >
          <HugeiconsIcon icon={ShoppingCart02Icon} />
          <div className="d-flex align-items-center gap-2 font12">
            My cart
            <Badge bg="light abs" text="dark">
              {totalItemCount}
            </Badge>
          </div>
        </span>

        {/* Cart Drawer with Backdrop */}
        <Offcanvas
          show={showCart}
          onHide={handleClose}
          placement="end"
          backdrop={true}
        >
          <Offcanvas.Header closeButton className="border-bottom">
            <Offcanvas.Title>Your Shopping Cart</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body
            className="d-flex flex-column justify-content-between"
            style={{ paddingTop: "0" }}
          >
            {cartItems.length === 0 ? (
              <p className="text-muted text-center my-auto">
                Your cart is empty.
              </p>
            ) : (
              <>
                {/* Item List */}
                <ListGroup variant="flush" className="overflow-auto">
                  {cartItems.map((item) => (
                    <ListGroup.Item
                      key={item.id}
                      className="d-flex justify-content-between align-items-center py-3"
                    >
                      <div className="d-flex align-items-center gap-2 rel">
                        <img
                          src={item.img}
                          alt={item.title}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />

                        <div className="d-flex flex-column">
                          <div>
                            <h6
                              className="mb-0 text-truncate"
                              style={{ maxWidth: "150px" }}
                            >
                              {item.title}
                            </h6>
                            <small className="text-muted">
                              ${item.price.toFixed(2)} × {item.qty}
                            </small>
                          </div>
                          {/* Quantity Buttons */}
                          <div className="d-flex align-items-center gap-1 PlusMinusColorHoverBorder">
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDecreaseQty(item.id)}
                            >
                              <Minus size={14} className="PlusMinusColorHover" />
                            </span>
                            <span className="mx-1">{item.qty}</span>
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => handleIncreaseQty(item.id)}
                            >
                              <Plus size={14} className="PlusMinusColorHover" />
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <span
                          className="fw-bold ms-2"
                          style={{ color: "#f0345d" }}
                        >
                          ${(item.price * item.qty).toFixed(2)}
                        </span>

                        {/* Remove Button */}
                        <Button
                          variant="link"
                          className="text-danger p-0 ms-2"
                          onClick={() => handleRemove(item.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                {/* Cart Footer */}
                <div className="pt-3 border-top mt-auto">
                  <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
                    <span>SubTotal:</span>
                    <span style={{ color: "#f0345d" }}>${calculateTotal()}</span>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="d-flex flex-column gap-2">
                    <Button
                      variant="outline-secondary"
                      className="w-100 py-2 fw-semibold"
                      onClick={handleNavigateToCart}
                    >
                      View Cart
                    </Button>
                    <Button
                      className="w-100 py-2 fw-semibold"
                      style={{ backgroundColor: "#f0345d", border: "none" }}
                      
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    );
  };

  export default CartDrawer;