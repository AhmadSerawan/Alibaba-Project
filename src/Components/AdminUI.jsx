import { useEffect, useState } from "react";
import { Alert, Button, Modal, Spinner } from "react-bootstrap";

// Success / error banner: notice = { type: "success" | "error", text }
export const Notice = ({ notice, onClose }) =>
  notice ? (
    <Alert
      variant={notice.type === "error" ? "danger" : "success"}
      dismissible
      onClose={onClose}
      className="dash-notice"
    >
      {notice.text}
    </Alert>
  ) : null;

// Loading / error / empty state for a list request
export const LoadState = ({ request, isEmpty, emptyText }) => {
  if (request.loading) {
    return (
      <div className="dash-state">
        <Spinner animation="border" size="sm" className="me-2" />
        Loading...
      </div>
    );
  }
  if (request.error) {
    return (
      <div className="dash-state text-danger" role="alert">
        <div>
          {request.error.status === 401
            ? "Your session has expired. Please log in again."
            : request.error.message || "Could not load data."}
        </div>
        <Button variant="link" className="p-0" onClick={request.reload}>
          Try again
        </Button>
      </div>
    );
  }
  if (isEmpty) return <div className="dash-state">{emptyText}</div>;
  return null;
};

export const ConfirmModal = ({
  show,
  title,
  children,
  confirmLabel = "Delete",
  loading,
  onConfirm,
  onClose,
}) => (
  <Modal show={show} onHide={loading ? undefined : onClose} centered>
    <Modal.Header closeButton={!loading}>
      <Modal.Title className="fs-5">{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    <Modal.Footer>
      <Button variant="light" onClick={onClose} disabled={loading}>
        Cancel
      </Button>
      <Button variant="danger" onClick={onConfirm} disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : confirmLabel}
      </Button>
    </Modal.Footer>
  </Modal>
);

// Image chooser with preview. `current` = existing image URL (when editing)
export const ImagePicker = ({ current, file, onChange, disabled }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return undefined;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const shown = preview || current;

  return (
    <div className="dash-image-picker">
      <div className="dash-image-preview">
        {shown ? <img src={shown} alt="Preview" /> : <span>No image</span>}
      </div>
      <input
        type="file"
        accept="image/*"
        disabled={disabled}
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
    </div>
  );
};

export const useDebounce = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
};

export const nameOf = (item) => item?.name ?? item?.title ?? "";

export const formatPrice = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "—";
};
