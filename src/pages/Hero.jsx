import React, { useEffect, useState } from "react";

const DEFAULT_CARDS = [
  { id: "card-1", label: "Discover" },
  { id: "card-2", label: "Connect" },
  { id: "card-3", label: "Learn" },
  { id: "card-4", label: "Succeed" },
];

function Hero({ cards = DEFAULT_CARDS }) {
  const [spread, setSpread] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    // small delay so the initial "stacked" state actually paints
    // before we transition to the spread state
    const t = setTimeout(() => setSpread(true), 50);
    return () => clearTimeout(t);
  }, []);

  const mid = (cards.length - 1) / 2;

  return (
    <main id="hero_page">
      <section id="hero_1">
        <div className="img_layer_1">
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>

        <h1>
          <span>Connect With</span>
          <span>Artisans</span>
        </h1>
        <p>
          The community-driven platform where meaningful connections
          begindiscover opportunities, and become part of a growing network of
          people building, learning, and succeeding together.
        </p>
        <div id="my_buttons">
          <button onClick={() => location.assign("https://x.com/FixMate_io")}>
            Join Our Community
          </button>
        </div>
      </section>

      <section
        id="hero_2"
        className="relative flex items-center justify-center w-full md:w-1/2 h-64"
      >
        {cards.map((card, i) => {
          const angle = (i - mid) * 12; // deg between cards, scales with card count
          const gradientIndex = (i % 4) + 1; // cycles through the 4 defined blue gradients

          const baseY = Math.abs(angle) * 1.5;
          const isHovered = hoveredId === card.id;

          // stacked (pre-spread): flat, centered, slightly small, invisible
          // spread: fanned rotation + offset
          // hovered: lifts further above its resting spread position
          const rotate = spread ? angle : 0;
          const translateY = spread ? (isHovered ? baseY - 14 : baseY) : 0;
          const scale = spread ? (isHovered ? 1.06 : 1) : 0.85;
          const opacity = spread ? 1 : 0;

          return (
            <div
              key={card.id}
              className={`af-card af-card-grad-${gradientIndex} absolute w-32 h-40`}
              style={{
                transform: `rotate(${rotate}deg) translateY(${translateY}px) scale(${scale})`,
                transformOrigin: "50% 100%",
                opacity,
                zIndex: isHovered ? 50 : i,
                transition: `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${
                  spread ? i * 0.08 : 0
                }s, opacity 0.3s ease-out ${spread ? i * 0.08 : 0}s`,
              }}
              data-label={card.label}
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Hero;