import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { ChatLeftText, Envelope, PersonCircle } from "react-bootstrap-icons";

import SubPageBanner from "./SubPageBanner";
import { getCurrentPhone, getProfile } from "../../profileStorage";

const CONTACT_URL =
  "https://training.tamkeen-dev.com/tamkeenstore/public/api/contact";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user_info") || "null");
  } catch {
    return null;
  }
};

const ContactUSPage = () => {
  const user = readStoredUser();

  // Prefill from the signed-in account's saved profile (if any)
  const saved = getProfile(getCurrentPhone(user)) || {};

  const [name, setName] = useState(saved.name || "");
  const [email, setEmail] = useState(saved.email || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const isEmailValid = EMAIL_REGEX.test(email.trim());
  const canSubmit = isEmailValid && message.trim().length > 0 && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      // Auth is optional for this endpoint
      if (user?.token) headers.Authorization = `Bearer ${user.token}`;

      // The API has no name field, so the name is added to the message
      const fullMessage = name.trim()
        ? `Name: ${name.trim()}\n\n${message.trim()}`
        : message.trim();

      const res = await fetch(CONTACT_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({
          type: "EMAIL",
          email: email.trim(),
          message: fullMessage,
        }),
      });
      const json = await res.json().catch(() => null);

      if (!res.ok || json?.success === false) {
        const validationError = json?.errors
          ? Object.values(json.errors).flat()[0]
          : null;
        throw new Error(
          json?.message || validationError || "Could not send your message."
        );
      }

      setMessage("");
      setSuccessMsg("Your message has been sent. Thank you!");
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="subpage">
      <div className="subpage-card">
        <SubPageBanner title="Contact us page" />

        <Form className="contact-form" onSubmit={handleSubmit} noValidate>
          <Form.Group controlId="contactName" className="contact-field">
            <div className="contact-input-wrap">
              <Form.Control
                type="text"
                value={name}
                placeholder="Name..."
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                aria-label="Name"
              />
              <PersonCircle className="contact-icon" aria-hidden="true" />
            </div>
          </Form.Group>

          <Form.Group controlId="contactEmail" className="contact-field">
            <div className="contact-input-wrap">
              <Form.Control
                type="email"
                value={email}
                isInvalid={email.length > 0 && !isEmailValid}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                aria-label="Email"
              />
              <Envelope className="contact-icon" aria-hidden="true" />
            </div>
            {email.length > 0 && !isEmailValid && (
              <Form.Text className="contact-field-error">
                Please enter a valid email address
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="contactMessage" className="contact-field">
            <div className="contact-input-wrap contact-textarea-wrap">
              <Form.Control
                as="textarea"
                value={message}
                placeholder="Write  message"
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
                aria-label="Message"
              />
              <ChatLeftText className="contact-icon" aria-hidden="true" />
            </div>
          </Form.Group>

          {errorMsg && (
            <div className="alert alert-danger contact-alert" role="alert">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="alert alert-success contact-alert" role="status">
              {successMsg}
            </div>
          )}

          <Button type="submit" className="contact-send" disabled={!canSubmit}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Sending...
              </>
            ) : (
              "Send"
            )}
          </Button>
        </Form>
      </div>
    </main>
  );
};

export default ContactUSPage;
