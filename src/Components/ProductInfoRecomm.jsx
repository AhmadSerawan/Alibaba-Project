import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Check } from 'react-bootstrap-icons';

// Sample placeholder images for recommendations
import Phonee from '../assets/imgs/Phonee.png';

/**
 * ProductInfoRecomm Component
 * Replicates the e-commerce product description tabs and recommendation sidebar layout.
 */
export default function ProductInfoRecomm() {
    const [activeTab, setActiveTab] = useState('description');

    const recommendations = [
        {
            title: "Men Blazers Sets Elegant Formal",
            price: "$7.00 - $99.50",
            img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop&q=60"
        },
        {
            title: "Men Shirt Sleeve Polo Contrast",
            price: "$7.00 - $99.50",
            img: Phonee
        },
        {
            title: "Apple Watch Series Space Gray",
            price: "$7.00 - $99.50",
            img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60"
        },
        {
            title: "Basketball Crew Socks Long Stuff",
            price: "$7.00 - $99.50",
            img: "https://images.unsplash.com/photo-1586350977771-b3b0af50c8fd?w=500&auto=format&fit=crop&q=60"
        },
        {
            title: "New Summer Men's castrol T-Shirts",
            price: "$7.00 - $99.50",
            img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60"
        }
    ];

    return (
        <Container className="my-4">
            <Row className="g-4">
                {/* LEFT COLUMN: Description / Specs & Features */}
                <Col lg={8} md={12}>
                    <Card className="border shadow-sm bg-white p-4" style={{ borderRadius: '8px', borderColor: '#e5e7eb' }}>
                        
                        {/* Navigation Tabs */}
                        <div className="d-flex border-bottom mb-4 gap-4" style={{ borderColor: '#e5e7eb' }}>
                            {['description', 'reviews', 'shipping', 'about seller'].map((tab) => {
                                const isActive = activeTab === tab;
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className="btn btn-link text-decoration-none px-0 pb-3 position-of-relative text-capitalize fw-semibold"
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

                        {/* Tab Content: Description */}
                        {activeTab === 'description' && (
                            <div>
                                <p className="text-secondary mb-3" style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                </p>
                                <p className="text-secondary mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.7' }}>
                                    Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                </p>

                                {/* Specifications Table */}
                                <div className="border rounded mb-4 overflow-hidden" style={{ borderColor: '#e5e7eb' }}>
                                    {[
                                        { label: 'Model', value: '#8786867' },
                                        { label: 'Style', value: 'Classic style' },
                                        { label: 'Certificate', value: 'ISO-89891212' },
                                        { label: 'Size', value: '34mm x 450mm x 19mm' },
                                        { label: 'Memory', value: '36GB RAM' }
                                    ].map((row, idx, arr) => (
                                        <div 
                                            key={row.label} 
                                            className={`row g-0 px-3 py-2 ${idx !== arr.length - 1 ? 'border-bottom' : ''}`}
                                            style={{ backgroundColor: idx % 2 === 0 ? '#f9fafb' : '#fff', borderColor: '#e5e7eb', fontSize: '0.9rem' }}
                                        >
                                            <div className="col-4 text-muted fw-normal">{row.label}</div>
                                            <div className="col-8 text-dark fw-semibold">{row.value}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Checklist Features */}
                                <div className="d-flex flex-column gap-2 text-secondary" style={{ fontSize: '0.9rem' }}>
                                    {[
                                        "Some great feature name here",
                                        "Lorem ipsum dolor sit amet, consectetur",
                                        "Duis aute irure dolor in reprehenderit",
                                        "Some great feature name here"
                                    ].map((feature, i) => (
                                        <div key={i} className="d-flex align-items-center gap-2">
                                            <Check size={18} className="text-secondary" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab !== 'description' && (
                            <div className="py-5 text-center text-muted">
                                Content for {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} coming soon...
                            </div>
                        )}
                    </Card>
                </Col>

                {/* RIGHT COLUMN: You may like Recommendations */}
                <Col lg={4} md={12}>
                    <Card className="border shadow-sm bg-white p-3" style={{ borderRadius: '8px', borderColor: '#e5e7eb' }}>
                        <h5 className="fw-bold text-dark mb-3 px-2" style={{ fontSize: '1.05rem' }}>
                            You may like
                        </h5>

                        <div className="d-flex flex-column gap-3">
                            {recommendations.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="d-flex align-items-center gap-3 p-2 rounded cursor-pointer transition-all"
                                    style={{ borderRadius: '6px' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <div 
                                        className="border rounded bg-light d-flex align-items-center justify-content-center p-1 flex-shrink-0"
                                        style={{ width: '64px', height: '64px', borderColor: '#e5e7eb' }}
                                    >
                                        <img 
                                            src={item.img} 
                                            alt={item.title} 
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
                                            {item.title}
                                        </div>
                                        <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                                            {item.price}
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