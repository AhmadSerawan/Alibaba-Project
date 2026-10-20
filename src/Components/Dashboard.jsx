import { useContext, useEffect, useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import {
  BoxArrowRight,
  BoxSeam,
  Cart3,
  Speedometer2,
  Tags,
  Cash,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router";

import { AuthContext } from "../Contexts/AuthContext";
import { useApiAll } from "../Config/api.js";
import { BarChart, DonutChart, LineChart } from "./Charts";
import { LoadState, formatPrice, nameOf } from "./AdminUI";
import ProductsAdmin from "./ProductsAdmin";
import CategoriesAdmin from "./CategoriesAdmin";

const LOGIN_ROUTE = "/login3"; // where logout / unauthenticated users are sent

const VIEWS = [
  { key: "overview", label: "Dashboard", Icon: Speedometer2 },
  { key: "products", label: "Products", Icon: BoxSeam },
  { key: "categories", label: "Categories", Icon: Tags },
];

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user_info") || "null");
  } catch {
    return null;
  }
};

/* ---------- Overview (statistics + charts) ---------- */

const StatCard = ({ Icon, label, value, loading }) => (
  <div className="dash-stat">
    <span className="dash-stat-icon">
      <Icon aria-hidden="true" />
    </span>
    <div>
      <div className="dash-stat-value">{loading ? "…" : value}</div>
      <div className="dash-stat-label">{label}</div>
    </div>
  </div>
);

const Overview = () => {
  const productsReq = useApiAll("/product");
  const myProductsReq = useApiAll("/product", { mine: 1 });
  const categoriesReq = useApiAll("/category");
  const ordersReq = useApiAll("/order");

  const products = productsReq.items;
  const categories = categoriesReq.items;

  const categoryNameOf = (product) =>
    product.category?.name ??
    categories.find((c) => String(c.id) === String(product.category_id))?.name ??
    "Uncategorized";

  const stats = useMemo(() => {
    const prices = products.map((p) => Number(p.price)).filter(Number.isFinite);
    const average = prices.length
      ? prices.reduce((sum, n) => sum + n, 0) / prices.length
      : 0;

    // Products per category (top 8)
    const counts = {};
    products.forEach((p) => {
      const label = categoryNameOf(p);
      counts[label] = (counts[label] || 0) + 1;
    });
    const perCategory = Object.entries(counts)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);

    // Price ranges (4 buckets between min and max)
    let priceRanges = [];
    if (prices.length) {
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      if (min === max) {
        priceRanges = [{ label: formatPrice(min), value: prices.length }];
      } else {
        const step = (max - min) / 4;
        priceRanges = Array.from({ length: 4 }, (_, i) => {
          const from = min + step * i;
          const to = i === 3 ? max : min + step * (i + 1);
          return {
            label: `${Math.round(from)} – ${Math.round(to)}`,
            value: prices.filter((p) => p >= from && (i === 3 ? p <= to : p < to)).length,
          };
        });
      }
    }

    // Products added per month (last 6 months)
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      return {
        key: `${d.getFullYear()}-${d.getMonth()}`,
        label: d.toLocaleString("en", { month: "short" }),
        value: 0,
      };
    });
    products.forEach((p) => {
      const d = new Date(p.created_at);
      if (Number.isNaN(d.getTime())) return;
      const month = months.find((m) => m.key === `${d.getFullYear()}-${d.getMonth()}`);
      if (month) month.value += 1;
    });

    return { average, perCategory, priceRanges, monthly: months };
  }, [products, categories]); // eslint-disable-line react-hooks/exhaustive-deps

  // Most expensive products
  const topProducts = useMemo(
    () =>
      [...products]
        .sort((a, b) => Number(b.price) - Number(a.price))
        .slice(0, 5),
    [products]
  );

  return (
    <section>
      <div className="dash-toolbar">
        <h2>Dashboard</h2>
      </div>

      <div className="dash-stats">
        <StatCard
          Icon={BoxSeam}
          label="Total products"
          value={products.length}
          loading={productsReq.loading}
        />
        <StatCard
          Icon={Cart3}
          label="My products"
          value={myProductsReq.error ? "—" : myProductsReq.items.length}
          loading={myProductsReq.loading}
        />
        <StatCard
          Icon={Tags}
          label="Categories"
          value={categories.length}
          loading={categoriesReq.loading}
        />
        <StatCard
          Icon={Cash}
          label="Average price"
          value={formatPrice(stats.average)}
          loading={productsReq.loading}
        />
        <StatCard
          Icon={Cart3}
          label="Orders"
          value={ordersReq.error ? "—" : ordersReq.items.length}
          loading={ordersReq.loading}
        />
      </div>

      <LoadState
        request={productsReq}
        isEmpty={false}
        emptyText=""
      />

      <div className="dash-grid">
        <div className="dash-card">
          <h3>Products per category</h3>
          <BarChart data={stats.perCategory} />
        </div>
        <div className="dash-card">
          <h3>Price ranges</h3>
          <DonutChart data={stats.priceRanges} centerLabel="products" />
        </div>
        <div className="dash-card dash-card-wide">
          <h3>Products added (last 6 months)</h3>
          <LineChart data={stats.monthly} />
        </div>
        <div className="dash-card dash-card-wide">
          <h3>Top priced products</h3>
          {topProducts.length === 0 ? (
            <div className="dash-chart-empty">No data yet</div>
          ) : (
            <ul className="dash-top-list">
              {topProducts.map((p) => (
                <li key={p.id}>
                  <span>{nameOf(p)}</span>
                  <strong>{formatPrice(p.price)}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

/* ---------- Layout ---------- */

const Dashboard = () => {
  const navigateTo = useNavigate();
  const auth = useContext(AuthContext);
  const user = auth?.user || readStoredUser();
  const isLoggedIn = !!user?.token;

  const [view, setView] = useState("overview");

  useEffect(() => {
    if (!isLoggedIn) navigateTo(LOGIN_ROUTE, { replace: true });
  }, [isLoggedIn, navigateTo]);

  const handleLogout = () => {
    localStorage.removeItem("user_info");
    localStorage.removeItem("current_phone");
    auth?.setUser?.(null);
    navigateTo(LOGIN_ROUTE, { replace: true });
  };

  if (!isLoggedIn) return null;

  const displayName = user?.name || user?.user?.name || "Admin";

  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <div className="dash-brand">Borcelle</div>
        <nav className="dash-nav" aria-label="Dashboard">
          {VIEWS.map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              className={`dash-nav-item ${view === key ? "active" : ""}`}
              onClick={() => setView(key)}
              aria-current={view === key ? "page" : undefined}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="dash-sidebar-footer">
          <div className="dash-user">{displayName}</div>
          <Button variant="outline-light" className="dash-logout" onClick={handleLogout}>
            <BoxArrowRight aria-hidden="true" /> Logout
          </Button>
        </div>
      </aside>

      <main className="dash-content">
        {view === "overview" && <Overview />}
        {view === "products" && <ProductsAdmin />}
        {view === "categories" && <CategoriesAdmin />}
      </main>
    </div>
  );
};

export default Dashboard;
