import React, { useState } from "react";

const DEFAULT_CATEGORIES = [
  {
    id: "cat-1",
    label: "Electrician",
    description: "Power, wiring & electrical solutions",
    image: "/images/electrician.jpg",
  },
  {
    id: "cat-2",
    label: "Plumber",
    description: "Reliable plumbing & water solutions",
    image: "/images/plumber.jpg",
  },
  {
    id: "cat-3",
    label: "Carpenter",
    description: "Custom woodwork & craftsmanship",
    image: "/images/carpenter.jpg",
  },
  {
    id: "cat-4",
    label: "Painter",
    description: "Transform spaces with expert finishing",
    image: "/images/painter.jpg",
  },
  {
    id: "cat-5",
    label: "Mason",
    description: "Strong foundations & construction",
    image: "/images/mason.jpg",
  },
];

function Explore({ categories = DEFAULT_CATEGORIES }) {
  const [activeIndex, setActiveIndex] = useState(1);

  const goTo = (index) => {
    setActiveIndex(
      (index + categories.length) % categories.length
    );
  };

  const prev =
    categories[
      (activeIndex - 1 + categories.length) % categories.length
    ];

  const active = categories[activeIndex];

  const next =
    categories[
      (activeIndex + 1) % categories.length
    ];

  return (
    <section id="explore_section">

      {/* Header */}
      <header className="explore_header">
        <span className="explore_eyebrow">
          FIND YOUR EXPERT
        </span>

        <h2>
          Explore{" "}
          <span>Categories</span>
        </h2>

        <p>
          Find skilled artisans across a wide range of
          trades and services. Whatever you need, our
          community has you covered.
        </p>
      </header>


      {/* Carousel */}
      <div className="explore_carousel">

        {/* Previous */}
        <button
          type="button"
          aria-label={`Previous category: ${prev.label}`}
          onClick={() => goTo(activeIndex - 1)}
          className="category_side category_previous"
        >
          <div
            className="category_side_image"
            style={{
              backgroundImage: `url(${prev.image})`,
            }}
          />

          <div className="category_side_overlay" />

          <span>{prev.label}</span>
        </button>


        {/* Active */}
        <div className="category_active">

          <div
            className="category_active_image"
            style={{
              backgroundImage: `url(${active.image})`,
            }}
          />

          <div className="category_active_overlay" />

          <div className="category_active_content">

            <span className="category_number">
              0{activeIndex + 1}
            </span>

            <h3>{active.label}</h3>

            <p>{active.description}</p>

            <button className="explore_button">
              Explore Trade
              <span>→</span>
            </button>

          </div>

        </div>


        {/* Next */}
        <button
          type="button"
          aria-label={`Next category: ${next.label}`}
          onClick={() => goTo(activeIndex + 1)}
          className="category_side category_next"
        >
          <div
            className="category_side_image"
            style={{
              backgroundImage: `url(${next.image})`,
            }}
          />

          <div className="category_side_overlay" />

          <span>{next.label}</span>
        </button>

      </div>


      {/* Pagination */}
      <div className="explore_pagination">

        {categories.map((cat, i) => (
          <button
            key={cat.id}
            type="button"
            aria-label={`Go to ${cat.label}`}
            aria-current={i === activeIndex}
            onClick={() => goTo(i)}
            className={`pagination_dot ${
              i === activeIndex ? "active" : ""
            }`}
          />
        ))}

      </div>

    </section>
  );
}

export default Explore;