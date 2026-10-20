import { useCallback, useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";

import SubPageBanner from "./SubPageBanner";

const TERMS_URL =
  "https://training.tamkeen-dev.com/tamkeenstore/public/api/setting/terms_and_conditions";

const getToken = () => {
  try {
    return JSON.parse(localStorage.getItem("user_info") || "null")?.token || null;
  } catch {
    return null;
  }
};

const stripHtml = (html) => {
  const withBreaks = String(html).replace(
    /<\/(p|div|li|h[1-6])>|<br\s*\/?>/gi,
    "\n"
  );
  const doc = new DOMParser().parseFromString(withBreaks, "text/html");
  return doc.body.textContent || "";
};

const toLines = (text) =>
  stripHtml(text)
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

// Plain text -> sections: a short line without end punctuation is a heading
const parseText = (text) => {
  const sections = [];
  let current = null;

  toLines(text).forEach((line) => {
    const isTitle = line.length <= 60 && !/[.!?:؛،]$/.test(line);
    if (isTitle) {
      current = { title: line, body: [] };
      sections.push(current);
    } else {
      if (!current) {
        current = { title: "", body: [] };
        sections.push(current);
      }
      current.body.push(line);
    }
  });

  return sections;
};

const pickText = (obj) =>
  obj?.value ??
  obj?.content ??
  obj?.description ??
  obj?.body ??
  obj?.text ??
  obj?.terms_and_conditions ??
  null;

// Accepts: array of {title, description}, an object with text, or a plain string
const normalize = (json) => {
  const data = json?.data ?? json;

  if (Array.isArray(data)) {
    return data
      .map((item) => ({
        title: item?.title ?? item?.name ?? item?.heading ?? "",
        body: toLines(String(pickText(item) ?? "")),
      }))
      .filter((s) => s.title || s.body.length);
  }

  const text = typeof data === "string" ? data : pickText(data);
  return typeof text === "string" ? parseText(text) : [];
};

// Shown only while the server has no "terms_and_conditions" setting (404) or it is empty.
// Replace this placeholder text with your real terms.
const DEFAULT_SECTIONS = [
  {
    title: "Acceptance of Terms",
    body: [
      "By using this application, you acknowledge that you have read, understood, and agree to fully comply with these terms. If you do not agree with these terms, please do not use the application. The application management reserves the right to modify these terms at any time, and you will be notified of updates when necessary.",
    ],
  },
  {
    title: "Account Creation and Use",
    body: [
      "You are responsible for providing accurate information when creating an account and for keeping your login details and verification codes private. You are responsible for all activity that takes place under your account.",
    ],
  },
  {
    title: "Orders and Payments",
    body: [
      "Prices, availability and delivery times may change without prior notice. By placing an order you agree to pay the total shown at checkout using the payment method you selected.",
    ],
  },
  {
    title: "Intellectual Property Rights",
    body: [
      "All content in this application, including logos, text, images and design, belongs to the application owner and may not be copied or reused without written permission.",
    ],
  },
  {
    title: "Contact",
    body: [
      "If you have any questions about these terms, please reach out through the Contact us page.",
    ],
  },
];

const TermsAndCon = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const loadTerms = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const headers = { Accept: "application/json" };
      const token = getToken();
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(TERMS_URL, { headers });
      const json = await res.json().catch(() => null);

      // The setting row doesn't exist on the server yet (Laravel's "No query results
      // for model [Setting]", sometimes sent with a status other than 404)
      const notFound =
        res.status === 404 || /no query results/i.test(json?.message || "");

      if (notFound) {
        setSections(DEFAULT_SECTIONS);
        return;
      }

      if (!res.ok) {
        throw new Error(json?.message || "Could not load the terms.");
      }

      const parsed = normalize(json);
      setSections(parsed.length ? parsed : DEFAULT_SECTIONS);
    } catch (err) {
      setErrorMsg(err.message || "Could not load the terms.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTerms();
  }, [loadTerms]);

  return (
    <main className="subpage subpage--terms">
      <div className="subpage-card terms-card">
        <SubPageBanner title="Terms and condition" />

        <div className="terms-scroll">
          {loading && (
            <div className="terms-status">
              <Spinner animation="border" size="sm" className="me-2" />
              Loading...
            </div>
          )}

          {!loading && errorMsg && (
            <div className="terms-status terms-status-error" role="alert">
              <p>{errorMsg}</p>
              <Button className="terms-retry" onClick={loadTerms}>
                Try again
              </Button>
            </div>
          )}

          {!loading && !errorMsg && sections.length === 0 && (
            <div className="terms-status">No terms available yet.</div>
          )}

          {!loading &&
            !errorMsg &&
            sections.map((section, index) => (
              <section className="terms-section" key={index}>
                {section.title && <h2>{section.title}</h2>}
                {section.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </section>
            ))}
        </div>
      </div>
    </main>
  );
};

export default TermsAndCon;
