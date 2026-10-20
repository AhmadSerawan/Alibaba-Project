import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router";

import { AuthContext } from "../Contexts/AuthContext";
import { getCurrentPhone, getProfile, saveProfile } from "../../profileStorage";

const API_URL = "https://training.tamkeen-dev.com/tamkeenstore/public/api";

// Change the paths to match your router
const SETTINGS_LINKS = [
  { label: "Wishlist page", to: "/wishlist" },
  { label: "About us page", to: "/about" },
  { label: "Contact us page", to: "/contact" },
  { label: "FAQ page", to: "/faq" },
  { label: "Terms and condition", to: "/terms" },
  { label: "Privacy Policy page", to: "/privacy" },
];

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user_info") || "null");
  } catch {
    return null;
  }
};

const Profile = () => {
  const navigateTo = useNavigate();
  const auth = useContext(AuthContext);
  const user = auth?.user || readStoredUser();

  const phone = getCurrentPhone(user);

  const [profile, setProfile] = useState(() => getProfile(phone) || {});
  const [fullName, setFullName] = useState(profile.name || "");
  const [nickName, setNickName] = useState(profile.nickname || "");

  // Refresh from the API (GET /customer) when a token exists; local data stays as fallback
  useEffect(() => {
    const token = user?.token;
    if (!phone || !token) return undefined;

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`${API_URL}/customer`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) return;

        const json = await res.json().catch(() => null);
        const api = json?.data?.customer ?? json?.data ?? {};

        const patch = {};
        if (api.name) patch.name = api.name;
        if (api.email) patch.email = api.email;
        if (api.image) patch.image = api.image;
        if (Object.keys(patch).length === 0 || cancelled) return;

        const merged = saveProfile(phone, patch);
        setProfile(merged);
        if (patch.name) setFullName(patch.name);
      } catch {
        /* offline / API error: keep local data */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [phone, user?.token]); // eslint-disable-line react-hooks/exhaustive-deps

  const persistField = (patch) => {
    if (!phone) return;
    setProfile(saveProfile(phone, patch));
  };

  if (!phone) {
    return (
      <main className="profile-page">
        <div className="profile-card profile-empty">
          <p>You need to log in to see your profile.</p>
          <Button className="profile-login-button" onClick={() => navigateTo("/login")}>
            Log in
          </Button>
        </div>
      </main>
    );
  }

  const displayName = profile.name || "Your name";
  const displaySub = profile.email || phone;
  const initial = (profile.name || "?").trim().charAt(0).toUpperCase();

  return (
    <main className="profile-page">
      <div className="profile-card">
        <div className="profile-banner" />

        <div className="profile-body">
          <div className="profile-header">
            {profile.image ? (
              <img className="profile-avatar" src={profile.image} alt={displayName} />
            ) : (
              <span className="profile-avatar profile-avatar-fallback" aria-hidden="true">
                {initial}
              </span>
            )}
            <div>
              <h1 className="profile-name">{displayName}</h1>
              <p className="profile-email">{displaySub}</p>
            </div>
          </div>
            <Button className="btn-primary outline-secondery font25 width22  " as={Link} to="/">Shopping</Button>
          <div className="profile-fields">
            <Form.Group controlId="profileFullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={fullName}
                placeholder="Your First Name"
                onChange={(e) => setFullName(e.target.value)}
                onBlur={() => {
                  const value = fullName.trim();
                  if (value && value !== profile.name) persistField({ name: value });
                }}
              />
            </Form.Group>

            <Form.Group controlId="profileNickName">
              <Form.Label>Nick Name</Form.Label>
              <Form.Control
                type="text"
                value={nickName}
                placeholder="Your Nick Name"
                onChange={(e) => setNickName(e.target.value)}
                onBlur={() => {
                  const value = nickName.trim();
                  if (value !== (profile.nickname || "")) persistField({ nickname: value });
                }}
              />
            </Form.Group>
          </div>

          <h2 className="profile-section-title">Settings</h2>

          <div className="profile-links">
            {SETTINGS_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                className="profile-link"
                onClick={() => navigateTo(link.to)}
              >
                <span>{link.label}</span>
                <i className="profile-link-arrow" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
