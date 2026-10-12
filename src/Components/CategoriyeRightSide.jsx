// Components/CategoriyeRightSide.jsx
import { useState, useMemo, useEffect } from 'react';
import { Container, Row, Col, Form, Dropdown, ButtonGroup, ToggleButton, Pagination } from 'react-bootstrap';
import { List, Grid3x3Gap } from 'react-bootstrap-icons';
import CardProductList from './CardProductList';
import CardProductGrid from './CardProductGrid';

export default function CategoriyeRightSide({
  products = [],
  category = 'All',
  dropdownOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Best Sellers'],
}) {
  const [isGrid, setIsGrid] = useState(true);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortOption, setSortOption] = useState(dropdownOptions[0]);
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Reset to page 1 whenever category or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [category, products.length]);

  const processedProducts = useMemo(() => {
    let result = [...products];

    if (verifiedOnly) {
      result = result.filter((item) => item.rating >= 4 || item.verified);
    }

    switch (sortOption) {
      case 'Price: Low to High':
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'Price: High to Low':
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'Best Sellers':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'Newest':
      default:
        result.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
    }

    return result;
  }, [products, verifiedOnly, sortOption]);

  // Paginated Subset
  const totalPages = Math.ceil(processedProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedProducts.slice(start, start + itemsPerPage);
  }, [processedProducts, currentPage, itemsPerPage]);

  return (
    <div className="w-100">
      {/* Top Controls Toolbar */}
      <Container fluid className="border rounded py-2 px-3 bg-white mb-3 shadow-sm">
        <Row className="align-items-center">
          <Col xs="auto" className="me-auto d-flex align-items-center">
            <span className="fw-semibold">
              <span className="weight400">{processedProducts.length.toLocaleString()} items in</span>{' '}
              <span className="text-capitalize weight700" style={{ color: '#1c1c1c' }}>
                {category.replace('-', ' ')}
              </span>
            </span>
          </Col>

          <Col xs="auto" className="d-flex align-items-center gap-3">
            <Form.Check
              type="checkbox"
              id="verified-only-check"
              label="Verified only"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
            />

            <Dropdown onSelect={(opt) => setSortOption(opt)}>
              <Dropdown.Toggle
                variant="outline-secondary"
                className="weight400 DropDToll text-dark"
                size="sm"
              >
                {sortOption}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {dropdownOptions.map((opt) => (
                  <Dropdown.Item key={opt} eventKey={opt} active={opt === sortOption}>
                    {opt}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <ButtonGroup>
              <ToggleButton
                type="radio"
                id="toggle-list"
                variant={!isGrid ? 'primary' : 'outline-secondary'}
                size="sm"
                value="list"
                checked={!isGrid}
                onClick={() => setIsGrid(false)}
                style={{
                  backgroundColor: !isGrid ? '#e91e8c' : 'transparent',
                  borderColor: !isGrid ? '#e91e8c' : '#ced4da',
                  color: !isGrid ? '#fff' : '#6c757d',
                }}
              >
                <List size={18} />
              </ToggleButton>
              <ToggleButton
                type="radio"
                id="toggle-grid"
                variant={isGrid ? 'primary' : 'outline-secondary'}
                size="sm"
                value="grid"
                checked={isGrid}
                onClick={() => setIsGrid(true)}
                style={{
                  backgroundColor: isGrid ? '#e91e8c' : 'transparent',
                  borderColor: isGrid ? '#e91e8c' : '#ced4da',
                  color: isGrid ? '#fff' : '#6c757d',
                }}
              >
                <Grid3x3Gap size={18} />
              </ToggleButton>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>

      {/* Grid or List View */}
      {paginatedProducts.length === 0 ? (
        <div className="alert alert-info text-center my-4 bg-white shadow-sm">
          No products match the selected criteria.
        </div>
      ) : isGrid ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {paginatedProducts.map((product) => (
            <div className="col" key={product.id}>
              <CardProductGrid product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {paginatedProducts.map((product) => (
            <CardProductList key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            />
            {Array.from({ length: totalPages }).map((_, idx) => (
              <Pagination.Item
                key={idx + 1}
                active={idx + 1 === currentPage}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
}