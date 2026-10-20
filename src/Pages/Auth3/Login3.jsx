import { useContext, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Telephone } from "react-bootstrap-icons";
import { useNavigate } from "react-router";

import { AuthContext } from "../../Contexts/AuthContext";
import { AuthService } from "../../Services/AuthService";
import BorcelleStorelogin from "../../assets/imgs/BorcelleStorelogin.png";
// Put your Borcelle logo (white version, transparent PNG/SVG) in /public

const Login3 = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const { setUser } = useContext(AuthContext);
  const navigateTo = useNavigate();

  const isPhoneValid = phoneNumber.trim().length >= 8;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    AuthService.LoginService(phoneNumber)
      .then((data) => {
        setUser(data);
        localStorage.setItem("user_info", JSON.stringify(data));
        navigateTo("/check-code", { state: { phone: phoneNumber } });
      })
      .catch((err) => {
        setErrorMsg(err.message || "An error occurred during login.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className="login-page">
      <Row className="g-0 login-layout">
        <Col xs={12} lg={6} className="login-brand-panel">
          <div className="login-brand-overlay" />
          <div className="login-brand-content">
            <img
              className="login-logo"
              src={BorcelleStorelogin}
              alt="Borcelle online store"
            />
            <h1>Let’s get started</h1>

            <p>
              Where opportunities meet simplicity! Whether you’re here to fill
              out your cart or to check irresistible offers.
            </p>
          </div>
        </Col>

        <Col
          xs={12}
          lg={6}
          className="login-form-panel d-flex align-items-center justify-content-center"
        >
          <div className="login-form-content">
            <div className="login-form-heading">
              <h2>Welcome!</h2>
              <p>Please Log in to continue</p>
            </div>

            <Form onSubmit={handleFormSubmit} noValidate>
              <Form.Group controlId="formGroupPhone" className="login-field">
                <div className="login-input-wrap">
                  <Form.Control
                    type="tel"
                    value={phoneNumber}
                    isInvalid={
                      !!errorMsg || (phoneNumber.length > 0 && !isPhoneValid)
                    }
                    placeholder="Add number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={loading}
                    aria-label="Phone number"
                  />
                  <Telephone className="login-input-icon" aria-hidden="true" />
                </div>
                {phoneNumber.length > 0 && !isPhoneValid && (
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
                disabled={loading || !isPhoneValid}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Submitting...
                  </>
                ) : (
                  "Log in"
                )}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default Login3;
