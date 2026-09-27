
import { Dropdown } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons';

/**
 * ProductPagination (static version — design pass only)
 * Sits below the product list, right-aligned: "Show N" page-size dropdown
 * + prev arrow / page numbers / next arrow.
 * TODO: wire up page-size change, page navigation, and active-page state
 * once the design is finalized.
 */
export default function ProductPagination() {
  const pageSizeOptions = [10, 20, 50];
  const pages = [1, 2, 3];
  const activePage = 1;

  return (
    <div className="d-flex justify-content-end align-items-center gap-2 py-3">
      <Dropdown>
        <Dropdown.Toggle
          variant="outline-secondary"
          size="sm"
          className="d-flex align-items-center bg-white text-dark"
          style={{ borderColor: '#e5e7eb' }}
        >
          Show {pageSizeOptions[0]}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {pageSizeOptions.map((size) => (
            <Dropdown.Item key={size} eventKey={size}>
              Show {size}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <PageButton icon={<ChevronLeft size={14} />} />

      {pages.map((page) => (
        <PageButton key={page} active={page === activePage}>
          {page}
        </PageButton>
      ))}

      <PageButton icon={<ChevronRight size={14} />} />
    </div>
  );
}

function PageButton({ children, icon, active = false }) {
  return (
    <button
      type="button"
      className="btn btn-sm d-flex align-items-center justify-content-center"
      style={{
        width: 32,
        height: 32,
        border: '1px solid #e5e7eb',
        borderRadius: 6,
        backgroundColor: active ? '#f0f1f4' : '#fff',
        color: active ? '#9ca3af' : '#111',
      }}
    >
      {icon ?? children}
    </button>
  );
}
