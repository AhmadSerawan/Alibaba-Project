import { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Heart, HeartFill, StarFill, CartPlus, CheckLg } from 'react-bootstrap-icons';

import Phonee from '../assets/imgs/Phonee.png';
import { useCart } from '../Contexts/CartContext';

/**
 * CardProductList (Horizontal list version)
 * Integrated with useCart context to dispatch item to cart.
 */
export default function CardProductList() {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const { handleMoveToCart } = useCart();

  const productData = {
    id: 'canon-eos-2000d',
    title: 'Canon Camera EOS 2000, Black 10x zoom',
    price: 998.00,
    numericPrice: 998.00,
    originalPrice: 1128.00,
    img: Phonee,
    image: Phonee,
  };

  const handleAddToCart = () => {
    // Add item to global cart context
    handleMoveToCart(productData);

    // Show temporary visual confirmation
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Card className="border-0 shadow-sm position-relative mt-3" style={{ borderRadius: '12px', overflow: 'hidden' }}>
      <Card.Body className="p-3">
        <Row className="g-3 align-items-center">
          {/* Image */}
          <Col xs="auto" className="text-center">
            <img
              src={productData.img}
              alt={productData.title}
              style={{ width: 120, height: 120, objectFit: 'contain' }}
            />
          </Col>

          {/* Details */}
          <Col>
            <div className="fw-semibold mb-1 me-5">{productData.title}</div>

            <div className="d-flex align-items-baseline gap-2 mb-1">
              <span className="fw-bold fs-5">${productData.price.toFixed(2)}</span>
              <span className="text-muted text-decoration-line-through">${productData.originalPrice.toFixed(2)}</span>
            </div>

            <div className="d-flex align-items-center gap-2 mb-2 small flex-wrap">
              <span className="text-warning d-inline-flex gap-1">
                <StarFill size={12} />
                <StarFill size={12} />
                <StarFill size={12} />
                <StarFill size={12} />
              </span>
              <span className="text-warning fw-semibold">7.5</span>
              <span className="text-muted">•</span>
              <span className="text-muted">154 orders</span>
              <span className="text-muted">•</span>
              <span className="text-success">Free Shipping</span>
            </div>

            <p className="text-muted small mb-3 text-truncate" style={{ maxWidth: '85%' }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>

            {/* Bottom Actions Row */}
            <div className="d-flex align-items-center gap-3">
              <Button
                onClick={handleAddToCart}
                variant={added ? 'success' : 'primary'}
                className="d-inline-flex align-items-center gap-2 fw-medium btn-sm px-3 py-1-5"
                style={{
                  borderRadius: '8px',
                  backgroundColor: added ? undefined : '#e91e8c',
                  borderColor: added ? undefined : '#e91e8c',
                  transition: 'all 0.2s ease',
                }}
              >
                {added ? (
                  <>
                    <CheckLg size={16} /> Added
                  </>
                ) : (
                  <>
                    <CartPlus size={16} /> Add to Cart
                  </>
                )}
              </Button>

              <a href="#" className="text-decoration-none small" style={{ color: '#e91e8c' }}>
                View details
              </a>
            </div>
          </Col>
        </Row>
      </Card.Body>

      {/* Wishlist button */}
      <button
        type="button"
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="btn btn-white rounded-circle position-absolute d-flex align-items-center justify-content-center shadow-sm"
        style={{
          top: 16,
          right: 16,
          width: 38,
          height: 38,
          border: '1px solid #f0f0f0',
          backgroundColor: '#fff',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        }}  
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 4px 10px rgba(233, 30, 140, 0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '';
        }}
      >
        {isWishlisted ? (
          <HeartFill size={16} color="#e91e8c" />
        ) : (
          <Heart size={16} color="#e91e8c" />
        )}
      </button>
    </Card>
  );
}