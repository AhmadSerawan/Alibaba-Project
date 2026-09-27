import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Heart, HeartFill, StarFill, CartPlus, CheckLg } from 'react-bootstrap-icons';
import Phonee from '../assets/imgs/Phonee.png';
import { useCart } from '../Contexts/CartContext';

/**
 * CardProductGridAlt (Alternative Grid Version)
 * Features a modern floating discount badge, cleaner border radius, 
 * interactive wishlist toggle, and integrated Add to Cart handler.
 */
export default function CardProductGridAlt() {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [added, setAdded] = useState(false);
    const { handleMoveToCart } = useCart();

    const productData = {
        id: 99, // Unique ID for this product
        title: "GoPro HERO6 4K Action Camera - Black",
        price: 99.50,
        img: Phonee,
    };

    const handleAddToCart = () => {
        // Formats object to match context structure
        handleMoveToCart({
            id: productData.id,
            title: productData.title,
            numericPrice: productData.price,
            image: productData.img,
        });

        // Show brief visual confirmation on button click
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <Card 
            className="border-0 shadow-sm position-relative mt-3 h-100" 
            style={{ 
                borderRadius: '16px', 
                overflow: 'hidden', 
                backgroundColor: '#fff',
                transition: 'all 0.25s ease-in-out'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '';
            }}
        >
            {/* Top Badge (e.g., Discount) */}
            <div className="position-absolute top-0 start-0 m-3 z-1">
                <span className="badge bg-danger px-2 py-1" style={{ fontSize: '0.75rem', fontWeight: '600', borderRadius: '6px' }}>
                    -90%
                </span>
            </div>

            {/* Wishlist Button Top-Right */}
            <div className="position-absolute top-0 end-0 m-3 z-1">
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

            {/* Product Image Container */}
            <div className="text-center p-4 bg-light bg-opacity-50" style={{ height: '210px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                    src={productData.img}
                    alt={productData.title}
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                />
            </div>

            <Card.Body className="p-3 d-flex flex-column justify-content-between">
                <div>
                    {/* Ratings & Reviews */}
                    <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="text-warning d-flex align-items-center gap-1">
                            <StarFill size={12} />
                            <span className="text-dark fw-bold ms-1" style={{ fontSize: '0.85rem' }}>4.5</span>
                            <span className="text-muted small" style={{ fontSize: '0.75rem' }}>(120)</span>
                        </div>
                        <span className="text-success fw-semibold" style={{ fontSize: '0.75rem' }}>In Stock</span>
                    </div>

                    {/* Title */}
                    <div 
                        className="fw-semibold text-dark mb-2" 
                        style={{ 
                            fontSize: '0.9rem', 
                            lineHeight: '1.4', 
                            display: '-webkit-box', 
                            WebkitLineClamp: 2, 
                            WebkitBoxOrient: 'vertical', 
                            overflow: 'hidden' 
                        }}
                    >
                        {productData.title}
                    </div>
                </div>

                {/* Price & Add to Cart Section */}
                <div>
                    <div className="d-flex align-items-baseline gap-2 pt-2 border-top border-light mb-3">
                        <span className="fw-bold fs-5 text-primary">${productData.price.toFixed(2)}</span>
                        <span className="text-muted text-decoration-line-through small" style={{ fontSize: '0.85rem' }}>
                            $1,128.00
                        </span>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                        onClick={handleAddToCart}
                        variant={added ? "success" : "primary"}
                        className="w-100 d-flex align-items-center justify-content-center gap-2 fw-semibold"
                        style={{
                            borderRadius: '8px',
                            padding: '8px 0',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s ease'
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
                </div>
            </Card.Body>
        </Card>
    );
}