// Profiles are stored per account, keyed by phone number:
// localStorage["profiles"] = { "0992990128": { name, email, phone, image, nickname }, ... }

const KEY = "profiles";

const readAll = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}") || {};
  } catch {
    return {};
  }
};
export const getProfile = (phone) => {
  if (!phone) return null;
  return readAll()[phone] || null;
};

// Merges `patch` into the saved profile of this phone number
export const saveProfile = (phone, patch) => {
  if (!phone) return null;
  const all = readAll();
  const merged = { ...(all[phone] || {}), ...patch };
  all[phone] = merged;
  try {
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    // storage full (e.g. large image): retry without the image
    all[phone] = { ...merged, image: null };
    try {
      localStorage.setItem(KEY, JSON.stringify(all));
    } catch {
      /* ignore */
    }
  }
  return merged;
};

// Phone of the account that is currently signed in
export const getCurrentPhone = (user) => {
  const fromUser =
    user?.phone || user?.user?.phone || user?.customer?.phone || null;
  return fromUser || localStorage.getItem("current_phone") || null;
};
