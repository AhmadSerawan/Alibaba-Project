import React, { useState } from 'react';
import { Form, Button, Collapse } from 'react-bootstrap';
import { ChevronUp, ChevronDown, Star, StarFill } from 'react-bootstrap-icons';

/**
 * FilterSidebar (static version — design pass only)
 * Accordion sections now expand/collapse. Price range uses a custom
 * dual-thumb slider. TODO: wire up real filter state/handlers once
 * the design is finalized.
 */
export default function FilterSidebar() {
  return (
    <div className="bg-alibabaBack" style={{ width: 280 }}>
      <AccordionSection title="Category" defaultOpen>
        <div className="d-flex flex-column gap-2 mb-2">
          <LinkRow label="Mobile accessory" />
          <LinkRow label="Electronics" />
          <LinkRow label="Smartphones" />
          <LinkRow label="Modern tech" />
        </div>
        <SeeAll />
      </AccordionSection>
      <Divider />

      <AccordionSection title="Brands" defaultOpen>
        <div className="d-flex flex-column gap-2 mb-2">
          <CheckRow label="Samsung" />
          <CheckRow label="Apple" />
          <CheckRow label="Huawei" />
          <CheckRow label="Pocco" />
          <CheckRow label="Lenovo" />
        </div>
        <SeeAll />
      </AccordionSection>
      <Divider />

      <AccordionSection title="Features" defaultOpen>
        <div className="d-flex flex-column gap-2 mb-2">
          <CheckRow label="Metallic" />
          <CheckRow label="Plastic cover" />
          <CheckRow label="8GB Ram" />
          <CheckRow label="Super power" />
          <CheckRow label="Large Memory" />
        </div>
        <SeeAll />
      </AccordionSection>
      <Divider />

      <ProductFilter />
      <Divider />

      <AccordionSection title="Condition" defaultOpen>
        <div className="d-flex flex-column gap-2 mb-1">
          <Form.Check type="radio" name="condition" id="cond-any" label="Any" defaultChecked />
          <Form.Check type="radio" name="condition" id="cond-refurb" label="Refurbished" />
          <Form.Check type="radio" name="condition" id="cond-new" label="Brand new" />
          <Form.Check type="radio" name="condition" id="cond-old" label="Old items" />
        </div>
      </AccordionSection>
      <Divider />

      <AccordionSection title="Ratings" defaultOpen>
        <div className="d-flex flex-column gap-2">
          <RatingRow stars={5} />
          <RatingRow stars={4} />
          <RatingRow stars={3} />
          <RatingRow stars={2} />
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
        aria-expanded={open}
      >
        <span className="fw-bold">{title}</span>
        {open ? <ChevronUp size={16} className="text-muted" /> : <ChevronDown size={16} className="text-muted" />}
      </button>
      <Collapse in={open}>
        <div>{children}</div>
      </Collapse>
    </div>
  );
}

function LinkRow({ label }) {
  return (
    <a href="#" className="text-decoration-none text-secondary small">
      {label}
    </a>
  );
}

function CheckRow({ label }) {
  return <Form.Check type="checkbox" id={`chk-${label}`} label={label} />;
}

function SeeAll() {
  return (
    <a href="#" className="text-decoration-none small d-inline-block mt-1" style={{ color: '#e91e8c' }}>
      See all
    </a>
  );
}

function Divider() {
  return <hr className="my-3" style={{ borderColor: '#e5e7eb', opacity: 1 }} />;
}

function RatingRow({ stars }) {
  return (
    <Form.Check
      type="checkbox"
      id={`rating-${stars}`}
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
  );
}

/**
 * Custom dual-thumb price range slider.
 * Thumbs are 18px, filled track between them is pink/red, outer track is
 * light blue.
 */
function ProductFilter() {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(5000);

  const handleMinInputChange = (e) => {
    const value = e.target.value === '' ? 0 : Number(e.target.value);
    setMinVal(Math.min(value, maxVal - 1));
  };

  const handleMaxInputChange = (e) => {
    const value = e.target.value === '' ? 5000 : Number(e.target.value);
    setMaxVal(Math.max(value, minVal + 1));
  };

  return (
    <AccordionSection title="Price range" defaultOpen>
      <PriceRangeSlider 
        min={0} 
        max={5000} 
        minVal={minVal} 
        maxVal={maxVal} 
        setMinVal={setMinVal} 
        setMaxVal={setMaxVal} 
      />
      <Form className="mb-1">
        <div className="d-flex gap-2 mb-2">
          <div className="flex-grow-1">
            <Form.Label className="small text-muted mb-1">Min</Form.Label>
            <Form.Control 
              type="number" 
              size="sm" 
              value={minVal} 
              onChange={handleMinInputChange} 
            />
          </div>
          <div className="flex-grow-1">
            <Form.Label className="small text-muted mb-1">Max</Form.Label>
            <Form.Control 
              type="number" 
              size="sm" 
              value={maxVal} 
              onChange={handleMaxInputChange} 
            />
          </div>
        </div>
        <Button
          size="sm"
          style={{ backgroundColor: '#fff', border: '1px solid #eee', color: '#e91e8c' }}
          className="w-100 fw-semibold"
        >
          Apply
        </Button>
      </Form>
    </AccordionSection>
  );
}
function PriceRangeSlider({ min = 0, max = 5000, minVal, maxVal, setMinVal, setMaxVal }) {
  const minPct = ((minVal - min) / (max - min)) * 100;
  const maxPct = ((maxVal - min) / (max - min)) * 100;

  const handleMinChange = (e) => {
    const val = Math.min(Number(e.target.value), maxVal - 1);
    setMinVal(val);
  };

  const handleMaxChange = (e) => {
    const val = Math.max(Number(e.target.value), minVal + 1);
    setMaxVal(val);
  };

  return (
    <div className="position-relative mb-4" style={{ height: 24 }}>
      {/* ... keep your existing <style> tag and slider inputs the same ... */}
      <input
        type="range"
        className="price-slider mt-2"
        min={min}
        max={max}
        value={minVal}
        onChange={handleMinChange}
      />
      <input
        type="range"
        className="price-slider mt-2"
        min={min}
        max={max}
        value={maxVal}
        onChange={handleMaxChange}
      />
    </div>
  );
}