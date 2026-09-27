import  { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { 
    Check, 
    StarFill, 
    StarHalf, 
    ChatSquareText, 
    BagCheck, 
    ShieldCheck, 
    Globe, 
    Heart, 
    HeartFill 
} from 'react-bootstrap-icons';

// Import image placeholder or use sample image URLs matching the style
import Phonee from '../assets/imgs/Phonee.png';

/**
 * ProductDetails Component
 * Replicates the e-commerce product detail page layout from the design reference.
 */
export default function ProductDetails() {
    const thumbnails = [
        Phonee,
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        Phonee
    ];

    const [selectedImage, setSelectedImage] = useState(thumbnails[0]);
    const [isSaved, setIsSaved] = useState(false);

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
                                alt="Mens Long Sleeve T-shirt" 
                                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                            />
                        </div>

                        {/* Thumbnail Row */}
                        <div className="d-flex gap-2 justify-content-between overflow-auto pb-1">
                            {thumbnails.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedImage(img)}
                                    className={`border rounded p-1 bg-white cursor-pointer ${selectedImage === img ? 'border-primary border-2' : ''}`}
                                    style={{ 
                                        width: '54px', 
                                        height: '54px', 
                                        cursor: 'pointer',
                                        borderColor: selectedImage === img ? '#ff3b6b !important' : '#dee2e6' 
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
                        {/* Stock Status */}
                        <div className="d-flex align-items-center text-success mb-2" style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                            <Check size={18} className="me-1 fw-bold" />
                            In stock
                        </div>

                        {/* Title */}
                        <h1 className="h5 fw-bold text-dark mb-2" style={{ lineHeight: '1.4' }}>
                            Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle
                        </h1>

                        {/* Rating Row */}
                        <div className="d-flex align-items-center flex-wrap gap-2 mb-3" style={{ fontSize: '0.85rem' }}>
                            <div className="text-warning d-flex align-items-center gap-1">
                                <StarFill size={13} />
                                <StarFill size={13} />
                                <StarFill size={13} />
                                <StarFill size={13} />
                                <StarHalf size={13} />
                            </div>
                            <span className="fw-bold text-dark ms-1">9.3</span>
                            <span className="text-muted">•</span>
                            <span className="text-secondary d-flex align-items-center gap-1">
                                <ChatSquareText size={13} className="text-muted" /> 32 reviews
                            </span>
                            <span className="text-muted">•</span>
                            <span className="text-secondary d-flex align-items-center gap-1">
                                <BagCheck size={13} className="text-muted" /> 154 sold
                            </span>
                        </div>

                        {/* Tiered Pricing Box */}
                        <div 
                            className="p-3 mb-4 rounded d-flex justify-content-between align-items-center"
                            style={{ backgroundColor: '#fff5f0', border: '1px solid #ffe0d0' }}
                        >
                            <div className="text-center px-2 border-end border-light-subtle flex-fill">
                                <div className="fw-bold text-danger fs-5">$98.00</div>
                                <div className="text-muted" style={{ fontSize: '0.75rem' }}>50-100 pcs</div>
                            </div>
                            <div className="text-center px-2 border-end border-light-subtle flex-fill">
                                <div className="fw-bold text-dark fs-5">$90.00</div>
                                <div className="text-muted" style={{ fontSize: '0.75rem' }}>100-700 pcs</div>
                            </div>
                            <div className="text-center px-2 flex-fill">
                                <div className="fw-bold text-dark fs-5">$78.00</div>
                                <div className="text-muted" style={{ fontSize: '0.75rem' }}>700+ pcs</div>
                            </div>
                        </div>

                        {/* Attributes Table */}
                        <div className="d-flex flex-column gap-2" style={{ fontSize: '0.9rem' }}>
                            <div className="row pb-2 border-bottom border-light">
                                <div className="col-4 text-muted">Price:</div>
                                <div className="col-8 fw-semibold text-dark">Negotiable</div>
                            </div>
                            <div className="row pb-2 border-bottom border-light">
                                <div className="col-4 text-muted">Type:</div>
                                <div className="col-8 fw-semibold text-dark">Classic shoes</div>
                            </div>
                            <div className="row pb-2 border-bottom border-light">
                                <div className="col-4 text-muted">Material:</div>
                                <div className="col-8 fw-semibold text-dark">Plastic material</div>
                            </div>
                            <div className="row pb-2 border-bottom border-light">
                                <div className="col-4 text-muted">Design:</div>
                                <div className="col-8 fw-semibold text-dark">Modern nice</div>
                            </div>
                            <div className="row pb-2 border-bottom border-light">
                                <div className="col-4 text-muted">Customization:</div>
                                <div className="col-8 fw-semibold text-dark">Customized logo and design custom packages</div>
                            </div>
                            <div className="row pb-2 border-bottom border-light">
                                <div className="col-4 text-muted">Protection:</div>
                                <div className="col-8 fw-semibold text-dark">Refund Policy</div>
                            </div>
                            <div className="row pb-2">
                                <div className="col-4 text-muted">Warranty:</div>
                                <div className="col-8 fw-semibold text-dark">2 years full warranty</div>
                            </div>
                        </div>
                    </Col>

                    {/* RIGHT COLUMN: Supplier Info Card */}
                    <Col lg={3} md={12}>
                        <Card className="border shadow-sm p-3 mb-3 bg-white" style={{ borderRadius: '8px', borderColor: '#e5e7eb' }}>
                            {/* Supplier Header */}
                            <div className="d-flex align-items-center gap-3 pb-3 border-bottom border-light">
                                <div 
                                    className="rounded d-flex align-items-center justify-content-center text-info fw-bold fs-4"
                                    style={{ width: '48px', height: '48px', backgroundColor: '#cbe7e3', color: '#20c997' }}
                                >
                                    R
                                </div>
                                <div>
                                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>Supplier</div>
                                    <div className="fw-bold text-dark" style={{ fontSize: '0.95rem' }}>Guanjoi Trading LLC</div>
                                </div>
                            </div>

                            {/* Supplier Metadata */}
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

                            {/* Action Buttons */}
                            <div className="pt-3 d-flex flex-column gap-2">
                                <Button 
                                    className="w-100 text-white border-0 py-2 fw-semibold"
                                    style={{ backgroundColor: '#eb3b5b', borderRadius: '6px' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d92c4b'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#eb3b5b'}
                                >
                                    Send inquiry
                                </Button>
                                <Button 
                                    variant="outline-secondary" 
                                    className="w-100 py-2 fw-semibold text-danger border-danger-subtle bg-white"
                                    style={{ borderRadius: '6px', color: '#eb3b5b', borderColor: '#f8d7da' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#fff5f5';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#fff';
                                    }}
                                >
                                    Seller's profile
                                </Button>
                            </div>
                        </Card>

                        {/* Save for later button */}
                        <div className="text-center mt-2">
                            <button
                                onClick={() => setIsSaved(!isSaved)}
                                className="btn btn-link text-decoration-none d-inline-flex align-items-center gap-2 p-0"
                                style={{ color: '#eb3b5b', fontWeight: 500, fontSize: '0.9rem' }}
                            >
                                {isSaved ? <HeartFill size={16} /> : <Heart size={16} />}
                                Save for later
                            </button>
                        </div>
                    </Col>

                </Row>
            </Card>
        </Container>
    );
}