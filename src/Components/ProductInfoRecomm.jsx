import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { Check, StarFill, StarHalf } from 'react-bootstrap-icons';
import { apiGet, getImage, toList } from '../Config/api.js';
import { CategoryService } from '../Services/CategoryService';

export default function ProductInfoRecomm() {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('description');
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    // Tamkeen categories (to show the category name of the product)
    useEffect(() => {
        let cancelled = false;
        CategoryService.getCategories().then((list) => {
            if (!cancelled) setCategories(list);
        });
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        let cancelled = false;

        async function fetchInfoAndRecommendations() {
            setLoading(true);
            try {
                // 1. Fetch current product details (Tamkeen API)
                const json = await apiGet(`/product/${productId}`);
                const data = json?.data?.product ?? json?.data ?? json;
                if (!data || data.id === undefined) throw new Error("Failed to fetch product");
                if (cancelled) return;
                setProduct(data);

                // 2. Fetch products of the same category for "You may like"
                const categoryId = data.category_id ?? data.category?.id;
                if (categoryId) {
                    try {
                        const recJson = await apiGet('/product', { category_id: categoryId });
                        if (!cancelled) {
                            // Exclude the current active product
                            setRecommendations(
                                toList(recJson).filter((p) => p.id !== data.id).slice(0, 6)
                            );
                        }
                    } catch (recError) {
                        console.error("Error loading recommendations:", recError);
                    }
                }
            } catch (error) {
                console.error("Error loading product info/recommendations:", error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        if (productId) {
            fetchInfoAndRecommendations();
        }

        return () => {
            cancelled = true;
        };
    }, [productId]);

    if (loading) {
        return (
            <Container className="my-4 text-center py-4">
                <Spinner animation="border" variant="primary" size="sm" />
            </Container>
        );
    }

    if (!product) return null;

    const categoryName =
        (typeof product.category === 'string' ? product.category : product.category?.name) ||
        categories.find((c) => String(c.id) === String(product.category_id))?.name ||
        '';

    const reviews = Array.isArray(product.reviews) ? product.reviews : [];

    // Dynamic specs array built from API data
    const specifications = [
        { label: 'Brand', value: product.brand || 'Generic' },
        { label: 'Category', value: categoryName },
        { label: 'SKU', value: product.sku || 'N/A' },
        { label: 'Weight', value: `${product.weight || 1} kg` },
        { label: 'Dimensions', value: product.dimensions ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm` : 'Standard' },
        { label: 'Min Order Qty', value: `${product.minimumOrderQuantity || 1} pcs` }
    ];

    return (
        <Container className="my-4">
            <Row className="g-4">
                <Col lg={8} md={12}>
                    <Card className="border shadow-sm bg-white p-4" style={{ borderRadius: '8px', borderColor: '#e5e7eb' }}>
                        
                        {/* Navigation Tabs */}
                        <div className="d-flex border-bottom mb-4 gap-4 overflow-auto" style={{ borderColor: '#e5e7eb' }}>
                            {['description', 'reviews', 'shipping', 'about seller'].map((tab) => {
                                const isActive = activeTab === tab;
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className="btn btn-link text-decoration-none px-0 pb-3 text-capitalize fw-semibold flex-shrink-0"
                                        style={{
                                            color: isActive ? '#eb3b5b' : '#6c757d',
                                            fontSize: '1rem',
                                            borderBottom: isActive ? '2px solid #eb3b5b' : '2px solid transparent',
                                            borderRadius: '0',
                                            marginBottom: '-1px'
                                        }}
                                    >
                                        {tab === 'about seller' ? 'About seller' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                );
                            })}
                        </div>

                        {/* TAB 1: Description */}
                        {activeTab === 'description' && (
                            <div>
                                <p className="text-secondary mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
                                    {product.description}
                                </p>

                                {/* Specifications Table */}
                                <div className="border rounded mb-4 overflow-hidden" style={{ borderColor: '#e5e7eb' }}>
                                    {specifications.map((row, idx, arr) => (
                                        <div 
                                            key={row.label} 
                                            className={`row g-0 px-3 py-2 ${idx !== arr.length - 1 ? 'border-bottom' : ''}`}
                                            style={{ backgroundColor: idx % 2 === 0 ? '#f9fafb' : '#fff', borderColor: '#e5e7eb', fontSize: '0.9rem' }}
                                        >
                                            <div className="col-4 text-muted fw-normal">{row.label}</div>
                                            <div className="col-8 text-dark fw-semibold text-capitalize">{row.value}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Feature Bullet Points */}
                                <div className="d-flex flex-column gap-2 text-secondary" style={{ fontSize: '0.9rem' }}>
                                    <div className="d-flex align-items-center gap-2">
                                        <Check size={18} className="text-success" />
                                        <span>Return Policy: {product.returnPolicy || '30 days return policy'}</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <Check size={18} className="text-success" />
                                        <span>Warranty: {product.warrantyInformation || '1 year warranty'}</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <Check size={18} className="text-success" />
                                        <span>Shipping: {product.shippingInformation || 'Free shipping'}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 2: Reviews */}
                        {activeTab === 'reviews' && (
                            <div>
                                <h6 className="fw-bold mb-3">Customer Reviews</h6>
                                {reviews.length > 0 ? (
                                    <div className="d-flex flex-column gap-3">
                                        {reviews.map((rev, idx) => (
                                            <div key={idx} className="border-bottom pb-3">
                                                <div className="d-flex justify-content-between align-items-center mb-1">
                                                    <span className="fw-semibold text-dark">{rev.reviewerName}</span>
                                                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>
                                                        {new Date(rev.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="text-warning mb-1">
                                                    {[...Array(Number(rev.rating) || 0)].map((_, i) => (
                                                        <StarFill key={i} size={12} className="me-1" />
                                                    ))}
                                                </div>
                                                <p className="text-secondary mb-0" style={{ fontSize: '0.875rem' }}>
                                                    {rev.comment}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted">No reviews available yet.</p>
                                )}
                            </div>
                        )}

                        {/* TAB 3: Shipping */}
                        {activeTab === 'shipping' && (
                            <div className="text-secondary" style={{ fontSize: '0.95rem' }}>
                                <p><strong>Shipping Options:</strong> {product.shippingInformation || 'Free shipping'}</p>
                                <p><strong>Handling Time:</strong> Ships within 1-2 business days.</p>
                                <p><strong>Return Policy:</strong> {product.returnPolicy || '30 days return policy'}</p>
                            </div>
                        )}

                        {/* TAB 4: About Seller */}
                        {activeTab === 'about seller' && (
                            <div className="text-secondary" style={{ fontSize: '0.95rem' }}>
                                <p><strong>Verified Supplier:</strong> {product.seller?.name ?? product.user?.name ?? product.brand ?? 'Official Direct Brand'}</p>
                                <p><strong>Location:</strong> Germany, Berlin</p>
                                <p><strong>Rating:</strong> {product.rating ?? 4.5} / 5.0</p>
                            </div>
                        )}

                    </Card>
                </Col>

                {/* RIGHT COLUMN: You May Like Recommendations */}
                <Col lg={4} md={12}>
                    <Card className="border shadow-sm bg-white p-3" style={{ borderRadius: '8px', borderColor: '#e5e7eb' }}>
                        <h5 className="fw-bold text-dark mb-3 px-2" style={{ fontSize: '1.05rem' }}>
                            You may like
                        </h5>

                        <div className="d-flex flex-column gap-3">
                            {recommendations.map((item) => (
                                <div 
                                    key={item.id} 
                                    onClick={() => navigate(`/product/${item.id}`)}
                                    className="d-flex align-items-center gap-3 p-2 rounded transition-all"
                                    style={{ cursor: 'pointer', borderRadius: '6px' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <div 
                                        className="border rounded bg-light d-flex align-items-center justify-content-center p-1 flex-shrink-0"
                                        style={{ width: '64px', height: '64px', borderColor: '#e5e7eb' }}
                                    >
                                        <img 
                                            src={getImage(item)} 
                                            alt={item.title ?? item.name} 
                                            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                                        />
                                    </div>
                                    <div>
                                        <div 
                                            className="text-dark fw-semibold mb-1" 
                                            style={{ 
                                                fontSize: '0.85rem', 
                                                lineHeight: '1.3',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            {item.title ?? item.name}
                                        </div>
                                        <div className="text-danger fw-bold" style={{ fontSize: '0.85rem' }}>
                                            ${item.price}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
