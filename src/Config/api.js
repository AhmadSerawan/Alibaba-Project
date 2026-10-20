import { useEffect, useState } from "react";

export const API_URL = "https://training.tamkeen-dev.com/tamkeenstore/public/api";

// Used to turn relative image paths from the API into full URLs
const ASSET_BASE = "https://training.tamkeen-dev.com/tamkeenstore/public/";

const getToken = () => {
  try {
    return JSON.parse(localStorage.getItem("user_info") || "null")?.token || null;
  } catch {
    return null;
  }
};

const buildHeaders = (hasJsonBody) => {
  const headers = { Accept: "application/json" };
  if (hasJsonBody) headers["Content-Type"] = "application/json";
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

const handleResponse = async (res) => {
  const json = await res.json().catch(() => null);

  if (!res.ok || json?.success === false) {
    const validationError = json?.errors
      ? Object.values(json.errors).flat()[0]
      : null;
    const error = new Error(
      json?.message || validationError || `Request failed (${res.status})`
    );
    error.status = res.status;
    throw error;
  }
  return json;
};

export const apiGet = async (path, params) => {
  const url = new URL(`${API_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });
  }
  const res = await fetch(url, { headers: buildHeaders(false) });
  return handleResponse(res);
};

export const apiPost = async (path, body) => {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: buildHeaders(true),
    body: JSON.stringify(body),
  });
  return handleResponse(res);
};

// Finds the array in different response shapes: [..], {data:[..]}, {data:{data:[..]}} ...
export const toList = (json) => {
  const data = json?.data ?? json;
  if (Array.isArray(data)) return data;

  const keys = ["data", "items", "products", "categories", "sliders", "cities", "results"];
  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key];
  }
  return [];
};

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif|svg)(\?.*)?$/i;
const IMAGE_KEY =
  /(image|img|photo|picture|thumbnail|thumb|avatar|cover|banner|logo|file|media|gallery|attachment)/i;

// Searches an API item (nested objects / arrays too) for an image path or URL
const findImage = (value, keyHint = false, depth = 0) => {
  if (value == null || depth > 3) return null;

  if (typeof value === "string") {
    const text = value.trim();
    if (!text || /\s/.test(text) || /^\d+$/.test(text)) return null;
    return IMAGE_EXT.test(text) || (keyHint && text.length > 3) ? text : null;
  }

  if (Array.isArray(value)) {
    for (const entry of value) {
      const found = findImage(entry, keyHint, depth + 1);
      if (found) return found;
    }
    return null;
  }

  if (typeof value === "object") {
    const keys = Object.keys(value);
    const ordered = [
      ...keys.filter((k) => IMAGE_KEY.test(k)),
      ...keys.filter((k) => !IMAGE_KEY.test(k)),
    ];
    for (const key of ordered) {
      const found = findImage(value[key], keyHint || IMAGE_KEY.test(key), depth + 1);
      if (found) return found;
    }
  }
  return null;
};

// Neutral placeholder (first letter of the name) instead of a repeated stock photo
export const placeholderImage = (label = "") => {
  const letter = (String(label).trim()[0] || "?").toUpperCase();
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>` +
    `<rect width='100%' height='100%' fill='#eef1f5'/>` +
    `<text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' ` +
    `font-family='Arial' font-size='72' fill='#c0c6cf'>${letter}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

let warnedMissingImage = false;

// getImage(item)            -> image from the API, or a letter placeholder
// getImage(item, fallback)  -> image from the API, or `fallback` (can be null)
export const getImage = (item, fallback) => {
  const raw = findImage(item);

  if (!raw) {
    if (!warnedMissingImage && item && typeof item === "object") {
      warnedMissingImage = true;
      // eslint-disable-next-line no-console
      console.warn("[getImage] no image field found in this API item:", item);
    }
    return fallback !== undefined
      ? fallback
      : placeholderImage(item?.name ?? item?.title);
  }

  if (/^(https?:|data:)/i.test(raw)) return raw;
  return new URL(raw.replace(/^\/+/, ""), ASSET_BASE).href;
};

// Fisher-Yates shuffle (returns a new array)
export const shuffle = (list) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// GET hook: { data, loading, error, reload }
export const useApi = (path, params = null, enabled = true) => {
  const [state, setState] = useState({ data: null, loading: enabled, error: null });
  const [tick, setTick] = useState(0);
  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    if (!enabled) {
      setState({ data: null, loading: false, error: null });
      return undefined;
    }

    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    apiGet(path, params)
      .then((data) => {
        // Dev helper: shows what the API really returns (open the browser console)
        if (import.meta.env?.DEV) {
          // eslint-disable-next-line no-console
          console.log(`[api] ${path}`, params || "", "first item:", toList(data)[0] ?? data);
        }
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((error) => {
        if (!cancelled) setState({ data: null, loading: false, error });
      });

    return () => {
      cancelled = true;
    };
  }, [path, paramsKey, enabled, tick]); // eslint-disable-line react-hooks/exhaustive-deps

  return { ...state, reload: () => setTick((t) => t + 1) };
};

/* ---------------- write helpers (admin pages) ---------------- */

export const apiPut = async (path, body) => {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: buildHeaders(true),
    body: JSON.stringify(body),
  });
  return handleResponse(res);
};

export const apiDelete = async (path) => {
  const res = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
    headers: buildHeaders(false),
  });
  return handleResponse(res);
};

// Multipart upload (files). No Content-Type header: the browser adds the boundary
export const apiPostForm = async (path, formData) => {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: buildHeaders(false),
    body: formData,
  });
  return handleResponse(res);
};

// Loads every page of a paginated list (stops if the API gives no page info)
export const apiGetAll = async (path, params = {}, maxPages = 30) => {
  const byId = new Map();
  const noId = [];
  let page = 1;

  while (page <= maxPages) {
    const json = await apiGet(path, { ...params, page });
    const list = toList(json);
    if (list.length === 0) break;

    list.forEach((item) => {
      if (item?.id !== undefined) byId.set(item.id, item);
      else noId.push(item);
    });

    const data = json?.data;
    const lastPage =
      json?.meta?.last_page ??
      data?.meta?.last_page ??
      data?.last_page ??
      json?.last_page ??
      json?.pagination?.last_page ??
      null;

    if (lastPage === null || page >= lastPage) break;
    page += 1;
  }

  return [...byId.values(), ...noId];
};

// Same as useApi but returns the full list: { items, loading, error, reload }
export const useApiAll = (path, params = null, enabled = true) => {
  const [state, setState] = useState({ items: [], loading: enabled, error: null });
  const [tick, setTick] = useState(0);
  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    if (!enabled) {
      setState({ items: [], loading: false, error: null });
      return undefined;
    }

    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    apiGetAll(path, params || {})
      .then((items) => {
        if (!cancelled) setState({ items, loading: false, error: null });
      })
      .catch((error) => {
        if (!cancelled) setState({ items: [], loading: false, error });
      });

    return () => {
      cancelled = true;
    };
  }, [path, paramsKey, enabled, tick]); // eslint-disable-line react-hooks/exhaustive-deps

  return { ...state, reload: () => setTick((t) => t + 1) };
};
