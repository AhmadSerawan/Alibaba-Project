import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';

export default function RelatedProdDisc({ relatedProducts = [] }) {
    const navigate = useNavigate();

    // Fallback static products if no dynamic API list is passed
    const defaultProducts = [
        { id: 101, title: 'Xiaomi Redmi Note 11 Pro', price: 199.00, thumbnail: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60' },
        { id: 102, title: 'Smart Watch Series 7 GPS', price: 299.00, thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60' },
        { id: 103, title: 'Headphones Wireless Noise Cancelling', price: 89.50, thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60' },
        { id: 104, title: 'Leather Casual Sneakers Sports', price: 55.00, thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60' },
    ];

    const displayProducts = relatedProducts.length > 0 ? relatedProducts : defaultProducts;

    return (
        <Container className="my-5">
            <h5 className="fw-bold mb-3 text-dark">Related Products</h5>
            <Row className="g-3">
                {displayProducts.map((relItem) => (
                    <Col key={relItem.id} lg={3} md={4} sm={6}>
                        <Card
                            className="h-100 border shadow-sm p-2 bg-white cursor-pointer hover-card"
                            style={{ cursor: 'pointer', borderRadius: '8px', borderColor: '#e5e7eb' }}
                            onClick={() => navigate(`/product/${relItem.id}`)}
                        >
                            <div
                                className="d-flex align-items-center justify-content-center p-2"
                                style={{ height: '160px' }}
                            >
                                <img
                                    src={relItem.thumbnail || relItem.img}
                                    alt={relItem.title}
                                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                                />
                            </div>
                            <Card.Body className="p-2">
                                <div className="fw-bold text-dark text-truncate" style={{ fontSize: '14px' }}>
                                    {relItem.title}
                                </div>
                                <div className="text-danger fw-bold mt-1">
                                    ${relItem.price}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}