import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

export default function ProductPagination({
  totalPages = 1,
  currentPage = 1,
  onPageChange,
  onPageSizeChange,
}) {
  const pageSizeOptions = [10, 20, 50];
  const [selectedSize, setSelectedSize] = useState(pageSizeOptions[0]);

  const handlePageSizeSelect = (size) => {
    setSelectedSize(size);
    if (onPageSizeChange) onPageSizeChange(size);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="d-flex justify-content-end align-items-center gap-2 py-3">
      <Dropdown onSelect={(size) => handlePageSizeSelect(Number(size))}>
        <Dropdown.Toggle
          variant="outline-secondary"
          size="sm"
          className="d-flex align-items-center bg-white text-dark"
          style={{ borderColor: "#e5e7eb" }}
        >
          Show {selectedSize}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {pageSizeOptions.map((size) => (
            <Dropdown.Item key={size} eventKey={size} active={size === selectedSize}>
              Show {size}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <PageButton
        icon={<ChevronLeft size={14} />}
        disabled={currentPage <= 1}
        onClick={() => onPageChange && onPageChange(currentPage - 1)}
      />

      {pages.map((page) => (
        <PageButton
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange && onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}

      <PageButton
        icon={<ChevronRight size={14} />}
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange && onPageChange(currentPage + 1)}
      />
    </div>
  );
}

function PageButton({ children, icon, active = false, disabled = false, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="btn btn-sm d-flex align-items-center justify-content-center"
      style={{
        width: 32,
        height: 32,
        border: "1px solid #e5e7eb",
        borderRadius: 6,
        backgroundColor: active ? "#0d6efd" : "#fff",
        color: active ? "#fff" : disabled ? "#ccc" : "#111",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {icon ?? children}
    </button>
  );
}