// Components/FilterSidebar.jsx
import { useState, useEffect } from 'react';
import { Form, Button, Collapse } from 'react-bootstrap';
import { ChevronUp, ChevronDown, Star, StarFill } from 'react-bootstrap-icons';

export default function FilterSidebar({
  activeCategory = 'All',
  onSelectCategory = () => {},
  onFilterChange = () => {},
}) {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Filter local state
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [condition, setCondition] = useState('Any');
  const [selectedRatings, setSelectedRatings] = useState([]);

  // Fetch dynamic categories using DummyJSON
  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoadingCategories(true);
        const res = await fetch('https://dummyjson.com/products/category-list');
        if (!res.ok) throw new Error('API Response Error');
        const data = await res.json();
        setCategories(['All', ...data]);
      } catch (err) {
        console.warn('Categories API failed, using fallback:', err);
        setCategories(['All', 'smartphones', 'laptops', 'fragrances', 'skincare', 'groceries']);
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  const triggerFilterUpdate = (overrides = {}) => {
    onFilterChange({
      brands: overrides.brands !== undefined ? overrides.brands : selectedBrands,
      minPrice: overrides.minPrice !== undefined ? overrides.minPrice : minPrice,
      maxPrice: overrides.maxPrice !== undefined ? overrides.maxPrice : maxPrice,
      condition: overrides.condition !== undefined ? overrides.condition : condition,
      ratings: overrides.ratings !== undefined ? overrides.ratings : selectedRatings,
    });
  };

  const handleBrandChange = (brand) => {
    const updated = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updated);
    triggerFilterUpdate({ brands: updated });
  };

  const handleRatingChange = (stars) => {
    const updated = selectedRatings.includes(stars)
      ? selectedRatings.filter((s) => s !== stars)
      : [...selectedRatings, stars];
    setSelectedRatings(updated);
    triggerFilterUpdate({ ratings: updated });
  };

  const safeCategory = (activeCategory || 'All').toString().toLowerCase();

  return (
    <div className="bg-white p-3 rounded shadow-sm w-100">
      {/* Category Accordion */}
      <AccordionSection title="Category" defaultOpen>
        <div className="d-flex flex-column gap-2 mb-2">
          {loadingCategories ? (
            <div className="text-muted small">Loading categories...</div>
          ) : (
            categories.map((cat) => {
              const catName = String(cat || '');
              const isSelected = safeCategory === catName.toLowerCase();

              return (
                <button
                  key={catName}
                  type="button"
                  onClick={() => onSelectCategory(catName)}
                  className={`btn btn-link text-start text-decoration-none p-0 small text-capitalize ${
                    isSelected ? 'fw-bold text-primary' : 'text-secondary'
                  }`}
                >
                  {catName.replace('-', ' ')}
                </button>
              );
            })
          )}
        </div>
      </AccordionSection>

      <Divider />

      {/* Brands */}
      <AccordionSection title="Brands" defaultOpen>
        <div className="d-flex flex-column gap-2 mb-2">
          {['Apple', 'Samsung', 'Oppo', 'Huawei', 'Microsoft'].map((brand) => (
            <Form.Check
              key={brand}
              type="checkbox"
              id={`chk-${brand}`}
              label={brand}
              checked={selectedBrands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
            />
          ))}
        </div>
      </AccordionSection>

      <Divider />

      {/* Price Range */}
      <AccordionSection title="Price range" defaultOpen>
        <Form onSubmit={(e) => { e.preventDefault(); triggerFilterUpdate(); }} className="mb-1">
          <div className="d-flex gap-2 mb-2">
            <div className="flex-grow-1">
              <Form.Label className="small text-muted mb-1">Min ($)</Form.Label>
              <Form.Control
                type="number"
                size="sm"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
            </div>
            <div className="flex-grow-1">
              <Form.Label className="small text-muted mb-1">Max ($)</Form.Label>
              <Form.Control
                type="number"
                size="sm"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>
          <Button
            type="submit"
            size="sm"
            style={{ backgroundColor: '#fff', border: '1px solid #e91e8c', color: '#e91e8c' }}
            className="w-100 fw-semibold"
          >
            Apply Price
          </Button>
        </Form>
      </AccordionSection>

      <Divider />

      {/* Condition */}
      <AccordionSection title="Condition" defaultOpen>
        <div className="d-flex flex-column gap-2 mb-1">
          {['Any', 'Refurbished', 'Brand new', 'Old items'].map((cond) => (
            <Form.Check
              key={cond}
              type="radio"
              name="condition"
              id={`cond-${cond}`}
              label={cond}
              checked={condition === cond}
              onChange={() => {
                setCondition(cond);
                triggerFilterUpdate({ condition: cond });
              }}
            />
          ))}
        </div>
      </AccordionSection>

      <Divider />

      {/* Ratings */}
      <AccordionSection title="Ratings" defaultOpen>
        <div className="d-flex flex-column gap-2">
          {[5, 4, 3, 2].map((stars) => (
            <Form.Check
              key={stars}
              type="checkbox"
              id={`rating-${stars}`}
              checked={selectedRatings.includes(stars)}
              onChange={() => handleRatingChange(stars)}
              label={
                <span className="d-inline-flex align-items-center">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < stars ? (
                      <StarFill key={i} size={14} color="#d4af37" className="me-1" />
                    ) : (
                      <Star key={i} size={14} color="#b9c2d0" className="me-1" />
                    )
                  )}
                </span>
              }
            />
          ))}
        </div>
      </AccordionSection>
    </div>
  );
}

function AccordionSection({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="btn d-flex align-items-center justify-content-between w-100 p-0 py-2 bg-transparent border-0"
      >
        <span className="fw-bold">{title}</span>
        {open ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
      </button>
      <Collapse in={open}>
        <div className="pt-2">{children}</div>
      </Collapse>
    </div>
  );
}

function Divider() {
  return <hr className="my-2" style={{ borderColor: '#e5e7eb', opacity: 1 }} />;
}