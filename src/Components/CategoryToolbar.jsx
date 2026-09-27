import { useState } from 'react';
import { Container, Row, Col, Form, Dropdown, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { List, Grid3x3Gap } from 'react-bootstrap-icons';
import CardProductList from './CardProductList';
import CardProductGrid from './CardProductGrid';

export default function Toolbar({
  category = 'Mobile accessory',
  count = 12000,
  dropdownOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Best Sellers'],
  onVerifiedChange,
  onDropdownChange,
}) {
  const [isGrid, setIsGrid] = useState(true);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortOption, setSortOption] = useState(dropdownOptions[0]);

  const handleVerifiedChange = (e) => {
    const checked = e.target.checked;
    setVerifiedOnly(checked);
    onVerifiedChange?.(checked);
  };

  const handleDropdownSelect = (option) => {
    setSortOption(option);
    onDropdownChange?.(option);
  };

  return (
    <>
      <Container fluid className="border rounded py-2 px-3 bg-light">
        <Row className="align-items-center">
          {/* Left side */}
          <Col xs="auto" className="me-auto d-flex align-items-center">
            <span className="fw-semibold ">
              <span className="weight400">{count.toLocaleString()} items in</span> <span className=" text-decoration-none weight700" style={{ color: "#1c1c1c" }}>{category}</span>
            </span>
          </Col>

          {/* Right side */}
          <Col xs="auto" className="d-flex align-items-center gap-3">
            <Form.Check
              type="checkbox"
              id="verified-only-check"
              label="Verified only"
              checked={verifiedOnly}
              onChange={handleVerifiedChange}
            />

            <Dropdown onSelect={handleDropdownSelect}>
              <Dropdown.Toggle variant="outline-secondary" className="weight400 DropDToll" style={{ color: "#1c1c1c" }} size="sm">
                {sortOption}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {dropdownOptions.map((option) => (
                  <Dropdown.Item key={option} eventKey={option} active={option === sortOption}>
                    {option}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <ButtonGroup>
              <ToggleButton
                variant={!isGrid ? "primary" : "outline-secondary"}
                size="sm"
                onClick={() => setIsGrid(false)}
                title="List View"
              >
                <List />
              </ToggleButton>
              <ToggleButton
                variant={isGrid ? "primary" : "outline-secondary"}
                size="sm"
                onClick={() => setIsGrid(true)}
                title="Grid View"
              >
                <Grid3x3Gap />
              </ToggleButton>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>
      {isGrid ? 
      <div className="  row row-cols-1 row-cols-md-3 g-4 DeleteLastOne">
        <CardProductGrid />
        <CardProductGrid />
        <CardProductGrid />
        <CardProductGrid />
        <CardProductGrid />
        <CardProductGrid />
      </div>
      :
      <div>
        <CardProductList />
        <CardProductList />
        <CardProductList />
        <CardProductList />
        <CardProductList />
        <CardProductList />
      </div>
      }
    </>
  );
}
// className={isGrid ? "row row-cols-1 row-cols-md-3 g-4 DeleteLastOne"
// "d-flex flex-column gap-3"