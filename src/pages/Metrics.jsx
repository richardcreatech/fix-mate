import React from "react";

const DEFAULT_METRICS = [
  {
    id: "metric-1",
    label: "Target Growth",
    value: "2600",
    suffix: "+",
  },
  {
    id: "metric-2",
    label: "Support Users",
    value: "700",
    suffix: "+",
  },
  {
    id: "metric-3",
    label: "Market Size",
    value: "90",
    suffix: "%",
  },
];

function Metrics({ metrics = DEFAULT_METRICS }) {
  return (
    <section id="metrics_section">

      <div className="metrics_intro">
        <span>OUR IMPACT</span>
        <p>
          Building a stronger community, one connection at a time.
        </p>
      </div>

      <div className="metrics_grid">

        {metrics.map((metric, index) => (
          <React.Fragment key={metric.id}>

            <div className="metric_item">

              <span className="metric_label">
                {metric.label}
              </span>

              <div className="metric_value">
                <span>{metric.value}</span>
                <small>{metric.suffix}</small>
              </div>

            </div>

            {index < metrics.length - 1 && (
              <div className="metric_divider" />
            )}

          </React.Fragment>
        ))}

      </div>

    </section>
  );
}

export default Metrics;