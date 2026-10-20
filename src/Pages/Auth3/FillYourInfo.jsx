import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Envelope, PersonCircle, Telephone } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router";
import LOGO_SRC from "../../assets/imgs/BorcelleStorelogin.png";
import { saveProfile } from "../../../profileStorage.js"; 

// react-bootstrap-icons has no Aperture icon, so it's drawn inline
const ApertureIcon = (props) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="24" cy="24" r="20" />
    <circle cx="24" cy="24" r="3.5" fill="currentColor" />
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      const b = a + Math.PI / 3;
      return (
        <line
          key={i}
          x1={24 + 7 * Math.cos(a)}
          y1={24 + 7 * Math.sin(a)}
          x2={24 + 20 * Math.cos(b)}
          y2={24 + 20 * Math.sin(b)}
        />
      );
    })}
  </svg>
);

const REGISTER_URL =
  "https://training.tamkeen-dev.com/tamkeenstore/public/api/register";

const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // 2MB upload limit
const MAX_STORED_IMAGE_BYTES = 700 * 1024; // keep localStorage small

// Put your Borcelle logo (white version, transparent PNG/SVG) in /public


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fileToDataUrl = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });

const FillYourInfo = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(location.state?.phone || "");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  // Free the preview URL when it changes / on unmount
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const isNameValid = name.trim().length > 0;
  const isEmailValid = email.trim() === "" || EMAIL_REGEX.test(email.trim());
  const isPhoneValid = phone.trim().length >= 8;
  const canSubmit = isNameValid && isEmailValid && isPhoneValid && !loading;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please choose an image file.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setErrorMsg("Image must be 2MB or smaller.");
      return;
    }

    setErrorMsg(null);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // POST /register (multipart/form-data) -> save profile -> go to code check
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setErrorMsg(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("phone", phone.trim());
      if (email.trim()) formData.append("email", email.trim());
      if (imageFile) formData.append("image", imageFile);

      // Don't set Content-Type: the browser adds the multipart boundary
      const res = await fetch(REGISTER_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const response = await res.json().catch(() => null);

      if (!res.ok || response?.success === false) {
        const validationError = response?.errors
          ? Object.values(response.errors).flat()[0]
          : null;
        throw new Error(
          response?.message || validationError || "Registration failed."
        );
      }

      // Image: prefer URL from the API, otherwise a small local copy
      const created = response?.data ?? {};
      let image = created.image || null;
      if (!image && imageFile && imageFile.size <= MAX_STORED_IMAGE_BYTES) {
        image = await fileToDataUrl(imageFile);
      }

      // Saved per account (keyed by phone) so the profile page can read it later
      saveProfile(phone.trim(), {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        image,
      });

      navigateTo("/check-code", { state: { phone: phone.trim() } });
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <Row className="g-0 login-layout">
        {/* Brand column */}
        <Col xs={12} lg={6} className="login-brand-panel">
          <div className="login-brand-overlay" />
          <div className="login-brand-content">
            <img
              className="login-logo"
              src={LOGO_SRC}
              alt="Borcelle online store"
            />
            <h1>Let’s get started</h1>
            <p>
              Where opportunities meet simplicity! Whether you’re here to fill
              out your cart or to check irresistible offers.
            </p>
          </div>
        </Col>

        {/* Info column */}
        <Col xs={12} lg={6}  className="login-form-panel d-flex align-items-center justify-content-center">
          <div className="login-form-content">
            <div className="login-form-heading info-heading">
              <h2>Fill your information</h2>
              <p>Enter your details</p>
            </div>

            <Form onSubmit={handleSubmit} noValidate>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="info-file-input"
                onChange={handleImageChange}
                disabled={loading}
              />
              <button
                type="button"
                className="info-photo-box"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                aria-label="Add photo"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Selected profile" />
                ) : (
                  <>
                    <ApertureIcon className="info-photo-icon" aria-hidden="true" />
                    <span>Add photo</span>
                  </>
                )}
              </button>

              <Form.Group controlId="fillName" className="login-field">
                <div className="login-input-wrap">
                  <Form.Control
                    type="text"
                    value={name}
                    placeholder="Name..."
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    aria-label="Name"
                  />
                  <PersonCircle className="login-input-icon" aria-hidden="true" />
                </div>
              </Form.Group>

              <Form.Group controlId="fillEmail" className="login-field">
                <div className="login-input-wrap">
                  <Form.Control
                    type="email"
                    value={email}
                    isInvalid={email.length > 0 && !isEmailValid}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    aria-label="Email"
                  />
                  <Envelope className="login-input-icon" aria-hidden="true" />
                </div>
                {email.length > 0 && !isEmailValid && (
                  <Form.Text className="login-field-error">
                    Please enter a valid email address
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="fillPhone" className="login-field">
                <div className="login-input-wrap">
                  <Form.Control
                    type="tel"
                    value={phone}
                    isInvalid={phone.length > 0 && !isPhoneValid}
                    placeholder="Add number"
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={loading}
                    aria-label="Phone number"
                  />
                  <Telephone className="login-input-icon" aria-hidden="true" />
                </div>
                {phone.length > 0 && !isPhoneValid && (
                  <Form.Text className="login-field-error">
                    رقم الهاتف يجب أن يتكون من 8 أرقام على الأقل
                  </Form.Text>
                )}
              </Form.Group>

              {errorMsg && (
                <div className="alert alert-danger login-alert" role="alert">
                  {errorMsg}
                </div>
              )}

              <Button
                type="submit"
                className="login-submit-button"
                disabled={!canSubmit}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default FillYourInfo;
