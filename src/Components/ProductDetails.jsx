import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import {
    Check,
    CheckLg,
    StarFill,
    StarHalf,
    ChatSquareText,
    BagCheck,
    ShieldCheck,
    Globe,
    Heart,
    HeartFill,
    CartPlus
} from 'react-bootstrap-icons';
import { useCart } from '../Contexts/CartContext';
import { apiGet, getImage } from '../Config/api.js';
import { CategoryService } from '../Services/CategoryService';

export default function ProductDetails() {
    const { productId } = useParams();
    const navigate = useNavigate();

    // Consume CartContext actions (added handleSaveForLater)
    const { handleMoveToCart, handleSaveForLater } = useCart();

    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState('');
    const [isSaved, setIsSaved] = useState(false);
    const [added, setAdded] = useState(false);

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

    // Tamkeen API: GET /product/{id}
    useEffect(() => {
        let cancelled = false;

        async function fetchProductData() {
            setLoading(true);
            try {
                const json = await apiGet(`/product/${productId}`);
                const data = json?.data?.product ?? json?.data ?? json;
                if (!data || data.id === undefined) throw new Error("Product not found");
                if (cancelled) return;

                setProduct(data);
                setSelectedImage(getImage(data));
            } catch (error) {
                console.error("Error fetching product details:", error);
                if (!cancelled) setProduct(null);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        if (productId) {
            fetchProductData();
        }

        return () => {
            cancelled = true;
        };
    }, [productId]);

    const productName = product ? (product.title ?? product.name ?? '') : '';
    const productPrice = product ? Number(product.price) || 0 : 0;

    const handleAddToCart = () => {
        if (!product) return;

        handleMoveToCart({
            id: product.id,
            title: productName,
            numericPrice: productPrice,
            price: productPrice,
            img: selectedImage || getImage(product),
            image: selectedImage || getImage(product),
        });

        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    const handleToggleSaveForLater = () => {
        if (!product) return;

        if (!isSaved) {
            // Push product object to CartContext savedItems
            handleSaveForLater({
                id: product.id,
                title: productName,
                price: `$${productPrice}`,
                numericPrice: productPrice,
                image: selectedImage || getImage(product),
                img: selectedImage || getImage(product),
            });
            setIsSaved(true);
        } else {
            setIsSaved(false);
        }
    };

    if (loading) {
        return (
            <Container className="my-5 text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3 text-muted">Loading product details...</p>
            </Container>
        );
    }

    if (!product) {
        return (
            <Container className="my-5 text-center py-5">
                <h3>Product Not Found</h3>
                <Button variant="primary" className="mt-3" onClick={() => navigate('/catpage')}>
                    Back to Catalog
                </Button>
            </Container>
        );
    }

    // Gallery: main image + any extra images from the API (no duplicates)
    const extraImages = Array.isArray(product.images)
        ? product.images.map((img) =>
              getImage(typeof img === 'string' ? { image: img } : img, null)
          )
        : [];
    const thumbnails = [...new Set([getImage(product, null), ...extraImages].filter(Boolean))];
    if (thumbnails.length === 0) thumbnails.push(getImage(product));

    const categoryName =
        (typeof product.category === 'string' ? product.category : product.category?.name) ||
        categories.find((c) => String(c.id) === String(product.category_id))?.name ||
        '';

    const stockCount = product.stock ?? product.quantity;
    const supplierName =
        product.seller?.name ?? product.user?.name ?? product.brand ?? "Guanjoi Trading LLC";

    const basePrice = productPrice;
    const tier1 = basePrice.toFixed(2);
    const tier2 = (basePrice * 0.9).toFixed(2);
    const tier3 = (basePrice * 0.8).toFixed(2);

    return (
        <Container className="my-5">
            <Card className="border shadow-sm p-4 bg-white" style={{ borderRadius: '8px', borderColor: '#e5e7eb' }}>
                <Row className="gx-4 gy-4">

                    {/* LEFT COLUMN: Main Image & Gallery */}
                    <Col lg={4} md={12}>
                        <div
                            className="border rounded d-flex align-items-center justify-content-center p-3 mb-3 bg-white"
                            style={{ height: '360px', borderColor: '#e5e7eb' }}
                        >
                            <img
                                src={selectedImage}
                                alt={productName}
                                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                            />
                        </div>

                        {/* Thumbnail Row */}
                        <div className="d-flex gap-2 overflow-auto pb-1">
                            {thumbnails.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedImage(img)}
                                    className={`border rounded p-1 bg-white ${selectedImage === img ? 'border-danger border-2' : ''}`}
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        flexShrink: 0,
                                        cursor: 'pointer',
                                    }}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumb ${idx}`}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </Col>

                    {/* MIDDLE COLUMN: Product Info & Specifications */}
                    <Col lg={5} md={12} className="border-end-lg pe-lg-4">
                        <div className="d-flex align-items-center text-success mb-2" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                            <Check size={18} className="me-1 fw-bold" />
                            {product.availabilityStatus ||
                                (stockCount === undefined || stockCount > 0 ? "In stock" : "Out of stock")}
                        </div>

                        <h1 className="h5 fw-bold text-dark mb-2" style={{ lineHeight: '1.4' }}>
                            {productName}
                        </h1>

                        <div className="d-flex align-items-center flex-wrap gap-2 mb-3" style={{ fontSize: '0.85rem' }}>
                            <div className="text-warning d-flex align-items-center gap-1">
                                <StarFill size={13} />
                                <StarFill size={13} />
                                <StarFill size={13} />
                                <StarFill size={13} />
                                <StarHalf size={13} />
                            </div>
                            <span className="fw-bold text-dark ms-1">{product.rating ?? 4.5}</span>
                            <span className="text-muted">•</span>
                            <span className="text-secondary d-flex align-items-center gap-1">
                                <ChatSquareText size={13} className="text-muted" /> {Array.isArray(product.reviews) ? product.reviews.length : 12} reviews
                            </span>
                            <span className="text-muted">•</span>
                            <span className="text-secondary d-flex align-items-center gap-1">
                                <BagCheck size={13} className="text-muted" /> {stockCount || 154} available
                            </span>
                        </div>

                        <div
                            className="p-3 mb-4 rounded d-flex justify-content-between align-items-center"
                            style={{ backgroundColor: '#fff5f0', border: '1px solid #ffe0d0' }}
                        >
                            <div className="text-center px-2 border-end border-light-subtle flex-fill">
                                <div className="fw-bold text-danger fs-5">${tier1}</div>
                                <div className="text-muted" style={{ fontSize: '0.75rem' }}>50-100 pcs</div>
                            </div>
                            <div className="text-center px-2 border-end border-light-subtle flex-fill">
                                <div className="fw-bold text-dark fs-5">${tier2}</div>
                                <div className="text-muted" style={{ fontSize: '0.75rem' }}>100-700 pcs</div>
                            </div>
                            <div className="text-center px-2 flex-fill">
                                <div className="fw-bold text-dark fs-5">${tier3}</div>
                                <div className="text-muted" style={{ fontSize: '0.75rem' }}>700+ pcs</div>
                            </div>
                        </div>

                        <div className="d-flex flex-column gap-2" style={{ fontSize: '0.9rem' }}>
                            <div className="row pb-2 border-bottom border-light">
                                <div className="col-4 text-muted">Price:</div>
                                <div className="col-8 fw-semibold text-dark">Negotiable (${productPrice})</div>
                            </div>
                            <div className="row pb-2 border-bottom border-light">
                                <div className="col-4 text-muted">Category:</div>
                                <div className="col-8 fw-semibold text-dark text-capitalize">{categoryName}</div>
                            </div>
                            <div className="row pb-2 border-bottom border-light">
                                <div className="col-4 text-muted">Brand:</div>
                                <div className="col-8 fw-semibold text-dark">{product.brand || "Generic"}</div>
                            </div>
                            <div className="row pb-2 border-bottom border-light">
                                <div className="col-4 text-muted">SKU:</div>
                                <div className="col-8 fw-semibold text-dark">{product.sku || "N/A"}</div>
                            </div>
                            <div className="row pb-2 border-bottom border-light">
                                <div className="col-4 text-muted">Description:</div>
                                <div className="col-8 text-secondary" style={{ fontSize: '0.85rem' }}>{product.description}</div>
                            </div>
                            <div className="row pb-2 border-bottom border-light">
                                <div className="col-4 text-muted">Shipping:</div>
                                <div className="col-8 fw-semibold text-dark">{product.shippingInformation || "Free Shipping"}</div>
                            </div>
                            <div className="row pb-2">
                                <div className="col-4 text-muted">Warranty:</div>
                                <div className="col-8 fw-semibold text-dark">{product.warrantyInformation || "1 year warranty"}</div>
                            </div>
                        </div>
                    </Col>

                    {/* RIGHT COLUMN: Supplier Info & Action Buttons */}
                    <Col lg={3} md={12}>
                        <Card className="border shadow-sm p-3 mb-3 bg-white" style={{ borderRadius: '8px', borderColor: '#e5e7eb' }}>
                            <div className="d-flex align-items-center gap-3 pb-3 border-bottom border-light">
                                <div
                                    className="rounded d-flex align-items-center justify-content-center text-info fw-bold fs-4"
                                    style={{ width: '48px', height: '48px', backgroundColor: '#cbe7e3', color: '#20c997' }}
                                >
                                    R
                                </div>
                                <div>
                                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>Supplier</div>
                                    <div className="fw-bold text-dark" style={{ fontSize: '0.95rem' }}>{supplierName}</div>
                                </div>
                            </div>

                            <div className="py-3 border-bottom border-light d-flex flex-column gap-2 text-secondary" style={{ fontSize: '0.85rem' }}>
                                <div className="d-flex align-items-center gap-2">
                                    <span>🇩🇪</span> Germany, Berlin
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <ShieldCheck size={15} className="text-secondary" /> Verified Seller
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <Globe size={15} className="text-secondary" /> Worldwide shipping
                                </div>
                            </div>

                            <div className="pt-3 d-flex flex-column gap-2">
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
                                <Button
                                    className="w-100 text-white border-0 py-2 fw-semibold"
                                    style={{ backgroundColor: '#0d6efd', borderRadius: '6px' }}
                                >
                                    Send inquiry
                                </Button>
                                <Button
                                    variant="outline-secondary"
                                    className="w-100 py-2 fw-semibold text-danger border-danger-subtle bg-white"
                                    style={{ borderRadius: '6px', color: '#eb3b5b', borderColor: '#f8d7da' }}
                                >
                                    Seller's profile
                                </Button>
                            </div>
                        </Card>

                        {/* Save for later toggle button */}
                        <div className="text-center mt-2">
                            <button
                                onClick={handleToggleSaveForLater}
                                className="btn btn-link text-decoration-none d-inline-flex align-items-center gap-2 p-0"
                                style={{ color: '#eb3b5b', fontWeight: 500, fontSize: '0.9rem' }}
                            >
                                {isSaved ? <HeartFill size={16} /> : <Heart size={16} />}
                                {isSaved ? "Saved for later" : "Save for later"}
                            </button>
                        </div>
                    </Col>

                </Row>
            </Card>
        </Container>
    );
}
