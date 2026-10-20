import { useMemo, useState } from "react";
import { Button, Form, Modal, Spinner, Table } from "react-bootstrap";
import { PencilSquare, Plus, Search, Trash } from "react-bootstrap-icons";

import {
  apiDelete,
  apiPostForm,
  apiPut,
  getImage,
  placeholderImage,
  useApiAll,
} from "../Config/api.js";
import {
  ConfirmModal,
  ImagePicker,
  LoadState,
  Notice,
  nameOf,
  useDebounce,
} from "./AdminUI";

/* ---------- Add / edit modal ---------- */

const CategoryFormModal = ({ show, category, onClose, onSaved }) => {
  const isEdit = !!category;
  const [name, setName] = useState(category ? nameOf(category) : "");
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      if (isEdit) {
        if (image) {
          // New image: multipart with method spoofing (Laravel)
          const fd = new FormData();
          fd.append("_method", "PUT");
          fd.append("name", name.trim());
          fd.append("image", image);
          await apiPostForm(`/category/${category.id}`, fd);
        } else {
          await apiPut(`/category/${category.id}`, { name: name.trim() });
        }
      } else {
        const fd = new FormData();
        fd.append("name", name.trim());
        if (image) fd.append("image", image);
        await apiPostForm("/category", fd);
      }
      onSaved(isEdit ? "Category updated." : "Category added.");
    } catch (err) {
      setError(err.message || "Could not save the category.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={saving ? undefined : onClose} centered>
      <Form onSubmit={handleSubmit} noValidate>
        <Modal.Header closeButton={!saving}>
          <Modal.Title className="fs-5">
            {isEdit ? "Edit category" : "Add category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="categoryName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Category name"
              onChange={(e) => setName(e.target.value)}
              disabled={saving}
              autoFocus
            />
          </Form.Group>

          <Form.Group controlId="categoryImage">
            <Form.Label>Image</Form.Label>
            <ImagePicker
              current={isEdit ? getImage(category, null) : null}
              file={image}
              onChange={setImage}
              disabled={saving}
            />
          </Form.Group>

          {error && (
            <div className="text-danger mt-3" role="alert">
              {error}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button type="submit" className="dash-primary-btn" disabled={saving}>
            {saving ? <Spinner animation="border" size="sm" /> : "Save"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

/* ---------- Page ---------- */

const CategoriesAdmin = () => {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);
  const [formState, setFormState] = useState(null); // { category } | null
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [notice, setNotice] = useState(null);

  const categoriesReq = useApiAll("/category", { search: debounced || undefined });
  const productsReq = useApiAll("/product"); // only used for the products count

  const countByCategory = useMemo(() => {
    const counts = {};
    productsReq.items.forEach((p) => {
      const id = p.category_id ?? p.category?.id;
      if (id !== undefined && id !== null) counts[id] = (counts[id] || 0) + 1;
    });
    return counts;
  }, [productsReq.items]);

  const handleSaved = (text) => {
    setFormState(null);
    setNotice({ type: "success", text });
    categoriesReq.reload();
    productsReq.reload();
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await apiDelete(`/category/${toDelete.id}`);
      setNotice({ type: "success", text: `"${nameOf(toDelete)}" was deleted.` });
      setToDelete(null);
      categoriesReq.reload();
    } catch (err) {
      setNotice({ type: "error", text: err.message || "Could not delete the category." });
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section>
      <div className="dash-toolbar">
        <h2>Categories</h2>
        <div className="dash-toolbar-actions">
          <div className="dash-search">
            <Search aria-hidden="true" />
            <input
              type="search"
              value={search}
              placeholder="Search categories..."
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search categories"
            />
          </div>
          <Button className="dash-primary-btn" onClick={() => setFormState({ category: null })}>
            <Plus size={20} aria-hidden="true" /> Add category
          </Button>
        </div>
      </div>

      <Notice notice={notice} onClose={() => setNotice(null)} />

      <div className="dash-card">
        <LoadState
          request={categoriesReq}
          isEmpty={categoriesReq.items.length === 0}
          emptyText="No categories found."
        />

        {!categoriesReq.loading && !categoriesReq.error && categoriesReq.items.length > 0 && (
          <div className="table-responsive">
            <Table hover className="dash-table align-middle mb-0">
              <thead>
                <tr>
                  <th style={{ width: 70 }}>Image</th>
                  <th>Name</th>
                  <th>Products</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categoriesReq.items.map((category) => (
                  <tr key={category.id}>
                    <td>
                      <img
                        className="dash-thumb"
                        src={getImage(category, placeholderImage(nameOf(category)))}
                        alt={nameOf(category)}
                      />
                    </td>
                    <td className="fw-medium">{nameOf(category)}</td>
                    <td>{countByCategory[category.id] ?? 0}</td>
                    <td className="text-end">
                      <Button
                        variant="light"
                        size="sm"
                        className="me-2"
                        onClick={() => setFormState({ category })}
                        aria-label={`Edit ${nameOf(category)}`}
                      >
                        <PencilSquare aria-hidden="true" />
                      </Button>
                      <Button
                        variant="light"
                        size="sm"
                        className="text-danger"
                        onClick={() => setToDelete(category)}
                        aria-label={`Delete ${nameOf(category)}`}
                      >
                        <Trash aria-hidden="true" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>

      {formState && (
        <CategoryFormModal
          show
          key={formState.category?.id ?? "new"}
          category={formState.category}
          onClose={() => setFormState(null)}
          onSaved={handleSaved}
        />
      )}

      <ConfirmModal
        show={!!toDelete}
        title="Delete category"
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setToDelete(null)}
      >
        Are you sure you want to delete <strong>{nameOf(toDelete)}</strong>? This cannot be
        undone.
      </ConfirmModal>
    </section>
  );
};

export default CategoriesAdmin;
