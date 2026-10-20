// Small dependency-free SVG/CSS charts used by the dashboard

export const COLORS = [
  "#f0345d",
  "#6c63ff",
  "#00b894",
  "#fdcb6e",
  "#0984e3",
  "#e17055",
  "#a29bfe",
  "#636e72",
];

const Empty = () => <div className="dash-chart-empty">No data yet</div>;

/* Horizontal bars: [{ label, value }] */
export const BarChart = ({ data }) => {
  if (!data.length) return <Empty />;
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <div className="dash-bars">
      {data.map((d, i) => (
        <div key={d.label} className="dash-bar-row">
          <span className="dash-bar-label" title={d.label}>
            {d.label}
          </span>
          <div className="dash-bar-track">
            <div
              className="dash-bar-fill"
              style={{
                width: `${(d.value / max) * 100}%`,
                background: COLORS[i % COLORS.length],
              }}
            />
          </div>
          <span className="dash-bar-value">{d.value}</span>
        </div>
      ))}
    </div>
  );
};

/* Donut with legend: [{ label, value }] */
export const DonutChart = ({ data, centerLabel = "total" }) => {
  const items = data.filter((d) => d.value > 0);
  const total = items.reduce((sum, d) => sum + d.value, 0);
  if (!total) return <Empty />;

  const R = 70;
  const C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <div className="dash-donut">
      <svg viewBox="0 0 200 200" role="img" aria-label="Distribution chart">
        <g transform="rotate(-90 100 100)">
          <circle cx="100" cy="100" r={R} fill="none" stroke="#eef1f5" strokeWidth="28" />
          {items.map((d, i) => {
            const length = (d.value / total) * C;
            const circle = (
              <circle
                key={d.label}
                cx="100"
                cy="100"
                r={R}
                fill="none"
                stroke={COLORS[i % COLORS.length]}
                strokeWidth="28"
                strokeDasharray={`${length} ${C - length}`}
                strokeDashoffset={-offset}
              />
            );
            offset += length;
            return circle;
          })}
        </g>
        <text x="100" y="98" textAnchor="middle" className="dash-donut-total">
          {total}
        </text>
        <text x="100" y="118" textAnchor="middle" className="dash-donut-caption">
          {centerLabel}
        </text>
      </svg>

      <ul className="dash-legend">
        {items.map((d, i) => (
          <li key={d.label}>
            <span className="dash-legend-dot" style={{ background: COLORS[i % COLORS.length] }} />
            <span className="dash-legend-label">{d.label}</span>
            <strong>{d.value}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* Line + area: [{ label, value }] */
export const LineChart = ({ data }) => {
  if (!data.length) return <Empty />;

  const W = 520;
  const H = 220;
  const pad = { l: 34, r: 16, t: 16, b: 32 };
  const max = Math.max(1, ...data.map((d) => d.value));
  const stepX = data.length > 1 ? (W - pad.l - pad.r) / (data.length - 1) : 0;
  const x = (i) => pad.l + i * stepX;
  const y = (v) => pad.t + (H - pad.t - pad.b) * (1 - v / max);

  const points = data.map((d, i) => `${x(i)},${y(d.value)}`).join(" ");
  const area = `${x(0)},${y(0)} ${points} ${x(data.length - 1)},${y(0)}`;
  const ticks = [0, Math.ceil(max / 2), max];

  return (
    <svg className="dash-line" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Trend chart">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="#eef1f5" />
          <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" className="dash-axis">
            {t}
          </text>
        </g>
      ))}
      <polygon points={area} fill="rgba(240, 52, 93, 0.12)" />
      <polyline points={points} fill="none" stroke="#f0345d" strokeWidth="2.5" />
      {data.map((d, i) => (
        <g key={d.label}>
          <circle cx={x(i)} cy={y(d.value)} r="4" fill="#fff" stroke="#f0345d" strokeWidth="2" />
          <text x={x(i)} y={H - 10} textAnchor="middle" className="dash-axis">
            {d.label}
          </text>
        </g>
      ))}
    </svg>
  );
};
