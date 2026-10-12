import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";

import { AuthContext } from "../../Contexts/AuthContext";
import { AuthService } from "../../Services/AuthService";

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
        navigateTo("/product");
      })
      .catch((err) => {
        setErrorMsg(err.message || "An error occurred during login.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
      <Container>
        <Row className="my-5">
          <Col lg={{ span: 4, offset: 4 }}>
            <h1>Login Form</h1>

            <Form className="my-4" onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3" controlId="formGroupPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  value={phoneNumber}
                  isInvalid={!!errorMsg || (phoneNumber.length > 0 && !isPhoneValid)}
                  placeholder="Enter your phone number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={loading}
                />
                {phoneNumber.length > 0 && !isPhoneValid && (
                  <Form.Text className="text-danger">
                    رقم الهاتف يجب أن يتكون من 8 أرقام على الأقل
                  </Form.Text>
                )}
              </Form.Group>

              {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

              <Button
                type="submit"
                variant="primary"
                className="w-100"
                disabled={loading || !isPhoneValid}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
  );
};

export default Login3;