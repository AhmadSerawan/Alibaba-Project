import { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import LOGO_SRC from "../../assets/imgs/BorcelleStorelogin.png";
import { AuthContext } from "../../Contexts/AuthContext";

const API_URL = "https://training.tamkeen-dev.com/tamkeenstore/public/api";
const VERIFY_URL = `${API_URL}/verify`;
const RESEND_URL = `${API_URL}/resend`;

const OTP_LENGTH = 5;
const RESEND_SECONDS = 60;


const formatTime = (total) => {
  const m = String(Math.floor(total / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
};

// POST JSON and return parsed body; throws Error(message) on failure
const postJson = async (url, body, fallbackMessage) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok || data?.success === false) {
    const validationError = data?.errors
      ? Object.values(data.errors).flat()[0]
      : null;
    throw new Error(data?.message || validationError || fallbackMessage);
  }

  return data;
};

const CheckCode = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(AuthContext);

  // Login3 should navigate here with: navigate("/check-code", { state: { phone } })
  const phone = (location.state?.phone || "").trim();

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [errorMsg, setErrorMsg] = useState(null);
  const [infoMsg, setInfoMsg] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const inputsRef = useRef([]);

  const otp = digits.join("");
  const isComplete = otp.length === OTP_LENGTH;
  const busy = verifying || resending;

  // Countdown
  useEffect(() => {
    if (secondsLeft <= 0) return undefined;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft > 0]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const focusInput = (index) => {
    const el = inputsRef.current[Math.max(0, Math.min(index, OTP_LENGTH - 1))];
    if (el) {
      el.focus();
      el.select();
    }
  };

  const fillFrom = (start, text) => {
    const chars = text
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH - start)
      .split("");
    if (chars.length === 0) return;

    setDigits((prev) => {
      const next = [...prev];
      chars.forEach((c, i) => {
        next[start + i] = c;
      });
      return next;
    });
    focusInput(start + chars.length);
  };

  const handleChange = (index, e) => {
    setErrorMsg(null);
    setInfoMsg(null);
    const value = e.target.value;

    if (!value) {
      setDigits((prev) => {
        const next = [...prev];
        next[index] = "";
        return next;
      });
      return;
    }
    fillFrom(index, value);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      e.preventDefault();
      setDigits((prev) => {
        const next = [...prev];
        next[index - 1] = "";
        return next;
      });
      focusInput(index - 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusInput(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (index, e) => {
    e.preventDefault();
    setErrorMsg(null);
    fillFrom(index, e.clipboardData.getData("text"));
  };

  // POST /verify  { phone, otp }  ->  { data: { token, ... } }
  const handleVerify = async (e) => {
    e.preventDefault();
    if (!isComplete || busy) return;

    setErrorMsg(null);
    setInfoMsg(null);
    setVerifying(true);

    try {
      const response = await postJson(
        VERIFY_URL,
        { phone, otp },
        "Invalid verification code."
      );

      // API wraps the result in `data` (contains the auth token)
      const userData = response?.data ?? response;

      if (!userData?.token) {
        throw new Error("Verification succeeded but no token was returned.");
      }

      setUser(userData);
      localStorage.setItem("user_info", JSON.stringify(userData));
      localStorage.setItem("current_phone", phone); // tells the profile page which account is signed in
      navigateTo("/profile");
    } catch (err) {
      setErrorMsg(err.message || "Verification failed. Please try again.");
      setDigits(Array(OTP_LENGTH).fill(""));
      focusInput(0);
    } finally {
      setVerifying(false);
    }
  };

  // POST /resend  { phone }
  const handleResend = async () => {
    if (secondsLeft > 0 || busy || !phone) return;

    setErrorMsg(null);
    setInfoMsg(null);
    setResending(true);

    try {
      await postJson(RESEND_URL, { phone }, "Could not resend the code.");
      setDigits(Array(OTP_LENGTH).fill(""));
      setSecondsLeft(RESEND_SECONDS);
      setInfoMsg("A new code has been sent.");
      focusInput(0);
    } catch (err) {
      setErrorMsg(err.message || "Could not resend the code.");
    } finally {
      setResending(false);
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

        {/* Verification column */}
        <Col xs={12} lg={6}  className="login-form-panel d-flex align-items-center justify-content-center">
          <div className="login-form-content">
            <div className="login-form-heading otp-heading">
              <h2>Verification</h2>
              <p>Enter the code we send to : {phone}</p>
            </div>

            <Form onSubmit={handleVerify} noValidate>
              <div className="otp-inputs" role="group" aria-label="Verification code">
                {digits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputsRef.current[index] = el)}
                    className={`otp-box ${digit ? "filled" : ""} ${
                      errorMsg ? "invalid" : ""
                    }`}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    placeholder="-"
                    value={digit}
                    disabled={busy}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={(e) => handlePaste(index, e)}
                    onFocus={(e) => e.target.select()}
                    aria-label={`Digit ${index + 1}`}
                  />
                ))}
              </div>

              {!phone && (
                <div className="otp-message otp-error" role="alert">
                  Phone number is missing. Please go back and log in again.
                </div>
              )}
              {errorMsg && (
                <div className="otp-message otp-error" role="alert">
                  {errorMsg}
                </div>
              )}
              {infoMsg && (
                <div className="otp-message otp-info" role="status">
                  {infoMsg}
                </div>
              )}

              <p className="otp-timer">
                Didn’t receive code ?{" "}
                <span>{formatTime(secondsLeft)}</span>
              </p>

              <button
                type="button"
                className="otp-resend"
                onClick={handleResend}
                disabled={secondsLeft > 0 || busy || !phone}
              >
                {resending ? "Sending..." : "Resend Code"}
              </button>

              <Button
                type="submit"
                className="login-submit-button otp-verify"
                disabled={!isComplete || busy || !phone}
              >
                {verifying ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </Form>

            <div className="otp-divider" aria-hidden="true">
              <span>OR</span>
            </div>

            <Button
              type="button"
              className="otp-back-button"
              onClick={() => navigateTo(-1)}
              disabled={verifying}
            >
              Go back
            </Button>
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default CheckCode;
