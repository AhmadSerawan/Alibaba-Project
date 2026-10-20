import { useMemo, useState } from "react";
import { Button, Form, Modal, Pagination, Spinner, Table } from "react-bootstrap";
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
  formatPrice,
  nameOf,
  useDebounce,
} from "./AdminUI";

const PAGE_SIZE = 10;

const categoryNameOf = (product, categories) =>
  product.category?.name ??
  categories.find((c) => String(c.id) === String(product.category_id))?.name ??
  "—";

/* ---------- Add / edit modal ---------- */

const ProductFormModal = ({ show, product, categories, onClose, onSaved }) => {
  const isEdit = !!product;
  const [form, setForm] = useState({
    name: product ? nameOf(product) : "",
    description: product?.description ?? "",
    price: product?.price ?? "",
    category_id: product?.category_id ?? product?.category?.id ?? "",
  });
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const setField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) return setError("Product name is required.");
    if (!(Number(form.price) > 0)) return setError("Enter a valid price.");
    if (!form.category_id) return setError("Please choose a category.");

    setSaving(true);
    setError(null);

    const fields = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: form.price,
      category_id: form.category_id,
    };

    try {
      if (isEdit && !image) {
        await apiPut(`/product/${product.id}`, fields);
      } else {
        const fd = new FormData();
        Object.entries(fields).forEach(([key, value]) => fd.append(key, value));
        if (image) fd.append("image", image);

        if (isEdit) {
          // New image: multipart with method spoofing (Laravel)
          fd.append("_method", "PUT");
          await apiPostForm(`/product/${product.id}`, fd);
        } else {
          await apiPostForm("/product", fd);
        }
      }
      onSaved(isEdit ? "Product updated." : "Product added.");
    } catch (err) {
      setError(err.message || "Could not save the product.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={saving ? undefined : onClose} centered>
      <Form onSubmit={handleSubmit} noValidate>
        <Modal.Header closeButton={!saving}>
          <Modal.Title className="fs-5">
            {isEdit ? "Edit product" : "Add product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={form.name}
              placeholder="Product name"
              onChange={setField("name")}
              disabled={saving}
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={form.description}
              placeholder="Describe the product"
              onChange={setField("description")}
              disabled={saving}
            />
          </Form.Group>

          <div className="row g-3 mb-3">
            <Form.Group className="col-6" controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="any"
                value={form.price}
                placeholder="0"
                onChange={setField("price")}
                disabled={saving}
              />
            </Form.Group>
            <Form.Group className="col-6" controlId="productCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={form.category_id}
                onChange={setField("category_id")}
                disabled={saving}
              >
                <option value="">Select...</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {nameOf(c)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>

          <Form.Group controlId="productImage">
            <Form.Label>Image</Form.Label>
            <ImagePicker
              current={isEdit ? getImage(product, null) : null}
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

const ProductsAdmin = () => {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [onlyMine, setOnlyMine] = useState(true);
  const [page, setPage] = useState(1);

  const [formState, setFormState] = useState(null); // { product } | null
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [notice, setNotice] = useState(null);

  const categoriesReq = useApiAll("/category");
  const productsReq = useApiAll("/product", {
    search: debounced || undefined,
    category_id: categoryFilter || undefined,
    mine: onlyMine ? 1 : undefined,
  });

  const categories = categoriesReq.items;
  const products = productsReq.items;
  const pageCount = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = useMemo(
    () => products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [products, currentPage]
  );

  const handleSaved = (text) => {
    setFormState(null);
    setNotice({ type: "success", text });
    productsReq.reload();
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await apiDelete(`/product/${toDelete.id}`);
      setNotice({ type: "success", text: `"${nameOf(toDelete)}" was deleted.` });
      setToDelete(null);
      productsReq.reload();
    } catch (err) {
      setNotice({ type: "error", text: err.message || "Could not delete the product." });
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section>
      <div className="dash-toolbar">
        <h2>Products</h2>
        <div className="dash-toolbar-actions">
          <div className="dash-search">
            <Search aria-hidden="true" />
            <input
              type="search"
              value={search}
              placeholder="Search products..."
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              aria-label="Search products"
            />
          </div>
          <Form.Select
            className="dash-select"
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            aria-label="Filter by category"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {nameOf(c)}
              </option>
            ))}
          </Form.Select>
          <Form.Check
            type="switch"
            id="only-mine"
            label="My products"
            checked={onlyMine}
            onChange={(e) => {
              setOnlyMine(e.target.checked);
              setPage(1);
            }}
          />
          <Button className="dash-primary-btn" onClick={() => setFormState({ product: null })}>
            <Plus size={20} aria-hidden="true" /> Add product
          </Button>
        </div>
      </div>

      <Notice notice={notice} onClose={() => setNotice(null)} />

      <div className="dash-card">
        <LoadState
          request={productsReq}
          isEmpty={products.length === 0}
          emptyText="No products found."
        />

        {!productsReq.loading && !productsReq.error && products.length > 0 && (
          <>
            <div className="table-responsive">
              <Table hover className="dash-table align-middle mb-0">
                <thead>
                  <tr>
                    <th style={{ width: 70 }}>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img
                          className="dash-thumb"
                          src={getImage(product, placeholderImage(nameOf(product)))}
                          alt={nameOf(product)}
                        />
                      </td>
                      <td className="fw-medium">{nameOf(product)}</td>
                      <td>{categoryNameOf(product, categories)}</td>
                      <td>{formatPrice(product.price)}</td>
                      <td className="text-end">
                        <Button
                          variant="light"
                          size="sm"
                          className="me-2"
                          onClick={() => setFormState({ product })}
                          aria-label={`Edit ${nameOf(product)}`}
                        >
                          <PencilSquare aria-hidden="true" />
                        </Button>
                        <Button
                          variant="light"
                          size="sm"
                          className="text-danger"
                          onClick={() => setToDelete(product)}
                          aria-label={`Delete ${nameOf(product)}`}
                        >
                          <Trash aria-hidden="true" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {pageCount > 1 && (
              <Pagination className="dash-pagination justify-content-end mt-3 mb-0">
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => setPage(currentPage - 1)}
                />
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                  <Pagination.Item key={n} active={n === currentPage} onClick={() => setPage(n)}>
                    {n}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  disabled={currentPage === pageCount}
                  onClick={() => setPage(currentPage + 1)}
                />
              </Pagination>
            )}
          </>
        )}
      </div>

      {formState && (
        <ProductFormModal
          show
          key={formState.product?.id ?? "new"}
          product={formState.product}
          categories={categories}
          onClose={() => setFormState(null)}
          onSaved={handleSaved}
        />
      )}

      <ConfirmModal
        show={!!toDelete}
        title="Delete product"
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

export default ProductsAdmin;
