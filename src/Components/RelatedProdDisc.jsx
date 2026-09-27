import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

/**
 * RelatedProdDisc Component
 * Displays a 'Related products' section with 6 items in a responsive grid
 * followed by a promotional gradient discount banner.
 */
export default function RelatedProdDisc() {
    const relatedProducts = [
        {
            title: "Xiaomi Redmi 8 Original",
            price: "$32.00-$40.00",
            img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=60" // Wallet
        },
        {
            title: "Xiaomi Redmi 8 Original",
            price: "$32.00-$40.00",
            img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60" // Smartwatch
        },
        {
            title: "Xiaomi Redmi 8 Original",
            price: "$32.00-$40.00",
            img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60" // Headphones
        },
        {
            title: "Xiaomi Redmi 8 Original",
            price: "$32.00-$40.00",
            img: "https://images.unsplash.com/photo-1542272604-787c963535d3?w=500&auto=format&fit=crop&q=60" // Shorts
        },
        {
            title: "Xiaomi Redmi 8 Original",
            price: "$32.00-$40.00",
            img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60" // Kettle / Appliance
        },
        {
            title: "Xiaomi Redmi 8 Original",
            price: "$32.00-$40.00",
            img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60" // Organizer
        }
    ];

    return (
        <Container className="my-5">
            {/* Related Products Card Container */}
            <Card className="border shadow-sm p-4 bg-white mb-4" style={{ borderRadius: '8px', borderColor: '#e5e7eb' }}>
                <h5 className="fw-bold text-dark mb-4" style={{ fontSize: '1.15rem' }}>
                    Related products
                </h5>

                <Row className="g-3">
                    {relatedProducts.map((item, index) => (
                        <Col key={index} xs={6} sm={4} md={3} lg={2}>
                            <div className="d-flex flex-column h-100">
                                {/* Light grey background image box */}
                                <div 
                                    className="border rounded d-flex align-items-center justify-content-center p-3 mb-2" 
                                    style={{ 
                                        backgroundColor: '#f1f3f5', 
                                        height: '160px', 
                                        borderColor: '#e5e7eb' 
                                    }}
                                >
                                    <img 
                                        src={item.img} 
                                        alt={item.title} 
                                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                                    />
                                </div>
                                {/* Product Title */}
                                <div 
                                    className="text-secondary mb-1" 
                                    style={{ 
                                        fontSize: '0.85rem', 
                                        lineHeight: '1.3',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {item.title}
                                </div>
                                {/* Price Range */}
                                <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                                    {item.price}
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Card>

            {/* Promotional Banner */}
            <div 
                className="rounded p-4 d-flex flex-column flex-md-row align-items-center justify-content-between text-white shadow-sm position-relative overflow-hidden"
                style={{ 
                    background: 'linear-gradient(135deg, #e94057 0%, #8a2387 100%)',
                    borderRadius: '8px',
                    minHeight: '110px'
                }}
            >
                <div className="mb-3 mb-md-0 z-1">
                    <h4 className="fw-bold mb-1" style={{ fontSize: '1.35rem' }}>
                        Super discount on more than 100 USD
                    </h4>
                    <p className="mb-0 text-white-50" style={{ fontSize: '0.9rem' }}>
                        Have you ever finally just write dummy info
                    </p>
                </div>

                <div className="z-1">
                    <Button 
                        className="fw-semibold px-4 py-2 border-0 shadow-sm"
                        style={{ backgroundColor: '#ffa726', color: '#fff', borderRadius: '6px', fontSize: '0.95rem' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fb8c00'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffa726'}
                    >
                        Shop now
                    </Button>
                </div>
            </div>
        </Container>
    );
}