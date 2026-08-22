import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const sectionRef = useRef(null);
  const valueRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      metrics.forEach((metric, index) => {
        const el = valueRefs.current[index];
        if (!el) return;

        const target = parseFloat(metric.value.replace(/,/g, ""));
        const counter = { val: 0 };

        gsap.to(counter, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            // markers: true, // uncomment while debugging
          },
          onUpdate: () => {
            el.textContent = Math.round(counter.val).toLocaleString();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [metrics]);

  return (
    <section id="metrics_section" ref={sectionRef}>
      <div className="metrics_intro">
        <span>OUR IMPACT</span>
        <p>Building a stronger community, one connection at a time.</p>
      </div>

      <div className="metrics_grid">
        {metrics.map((metric, index) => (
          <React.Fragment key={metric.id}>
            <div className="metric_item">
              <span className="metric_label">{metric.label}</span>

              <div className="metric_value">
                <span ref={(el) => (valueRefs.current[index] = el)}>0</span>
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