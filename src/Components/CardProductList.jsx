// Components/CardProductList.jsx
import { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Heart, HeartFill, StarFill, CartPlus, CheckLg } from 'react-bootstrap-icons';
import Phonee from '../assets/imgs/Phonee.png';
import { useCart } from '../Contexts/CartContext';
import { useNavigate } from "react-router";

export default function CardProductList({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  // Safely extract cart handler from context (fallback if context unavailable)
  const cartContext = useCart ? useCart() : {};
  const handleMoveToCart = cartContext?.handleMoveToCart || cartContext?.addToCart || (() => { });

  // Fallback data normalization
  const productData = {
    id: product?.id || 99,
    title: product?.title || product?.name || "GoPro HERO6 4K Action Camera - Black",
    price: typeof product?.price === 'number' ? product.price : parseFloat(product?.price) || 99.50,
    originalPrice: product?.originalPrice ? (typeof product.originalPrice === 'number' ? product.originalPrice : parseFloat(product.originalPrice)) : null,
    img: product?.image || product?.img || Phonee,
    rating: product?.rating || 4.5,
    ordersCount: product?.ordersCount || 120,
    description: product?.description || "High performance product with advanced features and premium durability.",
    categoryName: product?.categoryName || product?.category?.name || null
  };

  const handleAddToCart = () => {
    handleMoveToCart({
      id: productData.id,
      title: productData.title,
      price: productData.price,
      numericPrice: productData.price,
      image: productData.img,
      quantity: 1,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Card
      className="border-0 shadow-sm position-relative mb-3 w-100"
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: '#fff',
        transition: 'all 0.25s ease-in-out'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      <Row className="g-0 align-items-center">
        {/* Left Column: Image Container */}
        <Col md={3} className="position-relative bg-light bg-opacity-50 text-center p-3 d-flex align-items-center justify-content-center" style={{ minHeight: '180px' }}>
          {/* Discount Badge */}
          <span
            className="badge bg-danger position-absolute top-0 start-0 m-2 px-2 py-1"
            style={{ fontSize: '0.75rem', fontWeight: '600', borderRadius: '6px', zIndex: 1 }}
          >
            -15%
          </span>

          <img
            src={productData.img}
            alt={productData.title}
            className="img-fluid"
            onClick={() => navigate(`/product/${product.id}`)}

            style={{ maxHeight: '140px', objectFit: 'contain' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = Phonee;
            }}
          />
        </Col>

        {/* Middle Column: Details & Description */}
        <Col md={6} className="p-3">
          {productData.categoryName && (
            <span className="badge bg-secondary bg-opacity-10 text-secondary mb-2 px-2 py-1" style={{ fontSize: '0.75rem' }}>
              {productData.categoryName}
            </span>
          )}

          <h5
            className="fw-semibold text-dark mb-2"
            style={{
              fontSize: '1rem',
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {productData.title}
          </h5>

          {/* Rating */}
          <div className="d-flex align-items-center gap-2 mb-2">
            <div className="text-warning d-flex align-items-center gap-1">
              <StarFill size={13} />
              <span className="text-dark fw-bold ms-1" style={{ fontSize: '0.85rem' }}>
                {productData.rating}
              </span>
            </div>
            <span className="text-muted small" style={{ fontSize: '0.8rem' }}>
              ({productData.ordersCount} orders)
            </span>
            <span className="text-success fw-semibold ms-2" style={{ fontSize: '0.8rem' }}>
              In Stock
            </span>
          </div>

          {/* Description */}
          <p
            className="text-muted small mb-0"
            style={{
              fontSize: '0.85rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {productData.description}
          </p>
        </Col>

        {/* Right Column: Pricing & Actions */}
        <Col md={3} className="p-3 border-start border-light d-flex flex-column justify-content-between h-100">
          {/* Wishlist Button */}
          <div className="d-flex justify-content-end mb-2">
            <button
              type="button"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="btn rounded-circle p-0 d-flex align-items-center justify-content-center bg-white shadow-sm"
              style={{
                width: 34,
                height: 34,
                border: '1px solid #eee',
                transition: 'transform 0.15s ease'
              }}
            >
              {isWishlisted ? (
                <HeartFill size={15} color="#e91e8c" />
              ) : (
                <Heart size={15} color="#6c757d" />
              )}
            </button>
          </div>

          {/* Price Display */}
          <div className="mb-3">
            <div className="d-flex align-items-baseline gap-2">
              <span className="fw-bold fs-4 text-primary">
                ${productData.price.toFixed(2)}
              </span>
              <span className="text-muted text-decoration-line-through small" style={{ fontSize: '0.85rem' }}>
                ${(productData.originalPrice || productData.price * 1.2).toFixed(2)}
              </span>
            </div>
            <span className="text-success small fw-semibold" style={{ fontSize: '0.75rem' }}>
              Free Shipping
            </span>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            variant={added ? "success" : "primary"}
            className="w-100 d-flex align-items-center justify-content-center gap-2 fw-semibold"
            style={{
              borderRadius: '8px',
              padding: '9px 0',
              fontSize: '0.875rem',
              transition: 'all 0.2s ease',
              backgroundColor: added ? undefined : '#e91e8c',
              borderColor: added ? undefined : '#e91e8c'
            }}
          >
            {added ? (
              <>
                <CheckLg size={16} /> Added to Cart
              </>
            ) : (
              <>
                <CartPlus size={16} /> Add to Cart
              </>
            )}
          </Button>
        </Col>
      </Row>
    </Card>
  );
}