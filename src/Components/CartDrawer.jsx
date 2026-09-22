import React, { useState } from "react";
import { Button, Offcanvas, ListGroup, Badge } from "react-bootstrap";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { ShoppingCart02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import HeadPhone from "../assets/imgs/HeadPhone.png"
import Cameraa from "../assets/imgs/Cameraa.png"
const CartDrawer = () => {
  const [showCart, setShowCart] = useState(false);

  // Sample cart data
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Wireless Headphones", price: 99.99, quantity: 1, image: HeadPhone },
    { id: 2, name: "Ergonomic Mouse", price: 49.5, quantity: 2, image: Cameraa },
  ]);

  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);

  const calculateTotal = () =>
    cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);

  // إزالة عنصر بالكامل من السلة
  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // زيادة الكمية
  const handleIncreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // تنقيص الكمية (وإذا وصلت 1 ونقصت، تحذف العنصر تلقائيًا)
  const handleDecreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="Cart">
      {/* Button to toggle the Cart */}
      <span
        variant="primary"
        onClick={handleShow}
        className="rel d-flex flex-column align-items-center font12"
      >
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
        backdrop={true}
      >
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title>Your Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="d-flex flex-column justify-content-between " style={{paddingTop:"0"}}>
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
                    <div className="d-flex align-items-center gap-2 rel" >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />

                      {/* Badge لكل عنصر يعرض الكمية */}
                      
                      <div className="d-flex flex-column">
                        <div>
                          <h6 className="mb-0">{item.name}</h6>
                          <small className="text-muted">
                            ${item.price} × {item.quantity}
                          </small>
                        </div>
                        {/* أزرار + / - */}
                        <div className="d-flex align-items-center gap-1  PlusMinusColorHoverBorder" >
                          <span
                            // variant="outline-secondary"
                            size="sm"
                            onClick={() => handleDecreaseQty(item.id)}
                          >
                            <Minus size={14} className="PlusMinusColorHover" />
                          </span>
                          <span className="mx-1">{item.quantity}</span>
                          <span
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleIncreaseQty(item.id)}
                          >
                            <Plus size={14}  className="PlusMinusColorHover" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2">


                      <span className="fw-bold ms-2" style={{color:"#f0345d"}}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      {/* زر الحذف */}
                      <Button
                        variant="link"
                        className="text-danger p-0 ms-2"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {/* Cart Footer / Checkout Summary */}
              <div className="pt-3 border-top mt-auto">
                <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
                  <span>SubTotal:</span>
                  <span style={{color:"#f0345d"}}>${calculateTotal()}</span>
                </div>
                <Button  className="w-100 py-2" style={{backgroundColor:"#f0345d", border:"none"}}>
                 Checkout
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