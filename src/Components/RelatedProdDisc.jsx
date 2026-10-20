import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { apiGet, getImage, toList } from '../Config/api.js';

const RELATED_COUNT = 4;

export default function RelatedProdDisc({ relatedProducts = [] }) {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [apiProducts, setApiProducts] = useState([]);

    // Tamkeen API: products of the same category as the current product
    // (falls back to other products if the category has none)
    useEffect(() => {
        if (relatedProducts.length > 0 || !productId) return undefined;

        let cancelled = false;

        async function fetchRelated() {
            try {
                const json = await apiGet(`/product/${productId}`);
                const current = json?.data?.product ?? json?.data ?? json;
                const categoryId = current?.category_id ?? current?.category?.id;

                let list = [];
                if (categoryId) {
                    list = toList(await apiGet('/product', { category_id: categoryId })).filter(
                        (p) => String(p.id) !== String(productId)
                    );
                }
                if (list.length === 0) {
                    list = toList(await apiGet('/product')).filter(
                        (p) => String(p.id) !== String(productId)
                    );
                }

                if (!cancelled) setApiProducts(list.slice(0, RELATED_COUNT));
            } catch (error) {
                console.error("Error loading related products:", error);
                if (!cancelled) setApiProducts([]);
            }
        }

        fetchRelated();

        return () => {
            cancelled = true;
        };
    }, [productId, relatedProducts.length]);

    const displayProducts = relatedProducts.length > 0 ? relatedProducts : apiProducts;

    if (displayProducts.length === 0) return null;

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
                                    src={relItem.thumbnail || getImage(relItem)}
                                    alt={relItem.title ?? relItem.name}
                                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                                />
                            </div>
                            <Card.Body className="p-2">
                                <div className="fw-bold text-dark text-truncate" style={{ fontSize: '14px' }}>
                                    {relItem.title ?? relItem.name}
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
