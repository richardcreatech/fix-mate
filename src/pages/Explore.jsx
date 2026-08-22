import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const DEFAULT_CARDS = [
  { id: "card-1", label: "Discover" },
  { id: "card-2", label: "Connect" },
  { id: "card-3", label: "Learn" },
  { id: "card-4", label: "Succeed" },
];

const CYCLE_WORDS = ["Specialists", "Professionals", "Artisans"];

// generates a wavy underline path scaled to a given width
function buildSquigglePath(width, height = 10, waves = 3) {
  const seg = width / waves;
  let d = `M0 ${height / 2}`;
  for (let i = 0; i < waves; i++) {
    const cx = seg * i + seg / 2;
    const cy = i % 2 === 0 ? 0 : height;
    const ex = seg * (i + 1);
    d += ` Q${cx} ${cy} ${ex} ${height / 2}`;
  }
  return d;
}

function WordCycler({ words = CYCLE_WORDS, interval = 2200 }) {
  const [index, setIndex] = useState(0);
  const wordRef = useRef(null);
  const wrapRef = useRef(null);
  const pathRef = useRef(null);

  // redraw underline + slide word whenever index changes
  useEffect(() => {
    const wordEl = wordRef.current;
    const pathEl = pathRef.current;
    if (!wordEl || !pathEl) return;

    const width = wordEl.getBoundingClientRect().width;
    pathEl.setAttribute("d", buildSquigglePath(width));

    const length = pathEl.getTotalLength();
    gsap.set(pathEl, { strokeDasharray: length, strokeDashoffset: length });

    const tl = gsap.timeline();

    // word slides up into place
    tl.fromTo(
      wordEl,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    );

    // squiggle draws itself in right after
    tl.to(
      pathEl,
      { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" },
      "-=0.2"
    );

    return () => tl.kill();
  }, [index]);

  // rotate through the word list
  useEffect(() => {
    const id = setInterval(() => {
      const wordEl = wordRef.current;
      const pathEl = pathRef.current;
      const length = pathEl.getTotalLength();

      // undraw + slide current word out, then advance index
      const tl = gsap.timeline({
        onComplete: () => setIndex((i) => (i + 1) % words.length),
      });
      tl.to(pathEl, { strokeDashoffset: length, duration: 0.3, ease: "power1.in" });
      tl.to(
        wordEl,
        { yPercent: -100, opacity: 0, duration: 0.35, ease: "power3.in" },
        "-=0.15"
      );
    }, interval);

    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className="word_cycler" ref={wrapRef}>
      <span className="word_cycler_mask">
        <span className="word_cycler_word" ref={wordRef}>
          {words[index]}
        </span>
      </span>
      <svg className="word_cycler_underline" preserveAspectRatio="none">
        <path ref={pathRef} fill="none" />
      </svg>
    </span>
  );
}

function Hero({ cards = DEFAULT_CARDS }) {
  const [spread, setSpread] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

  const headingRef = useRef(null);
  const paraRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setSpread(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // split heading into chars for the "handwriting" reveal
      const headingSplit = SplitText.create(headingRef.current, {
        type: "chars",
        charsClass: "hw_char",
      });

      // split paragraph into chars for the typewriter reveal
      const paraSplit = SplitText.create(paraRef.current, {
        type: "chars",
        charsClass: "tw_char",
      });

      gsap.set(paraSplit.chars, { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.2 });

      // 1. handwriting: each char pops in with a slight rotation/offset,
      // like it's being scrawled quickly rather than typed
      tl.from(headingSplit.chars, {
        opacity: 0,
        y: () => gsap.utils.random(-6, 10),
        rotate: () => gsap.utils.random(-14, 14),
        duration: 0.35,
        ease: "back.out(3)",
        stagger: { each: 0.045, from: "start" },
      });

      // 2. typewriter: paragraph chars snap in one by one
      tl.to(
        paraSplit.chars,
        {
          opacity: 1,
          duration: 0.01,
          stagger: { each: 0.015, from: "start" },
          ease: "none",
        },
        "-=0.1"
      );

      return () => {
        headingSplit.revert();
        paraSplit.revert();
      };
    }, [headingRef, paraRef]);

    return () => ctx.revert();
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
          <span className="handwrite_heading" ref={headingRef}>
            Connect With
          </span>
          <span className="cycling_heading">
            <WordCycler />
          </span>
        </h1>

        <p ref={paraRef}>
          The community-driven platform where meaningful connections begin,
          discover opportunities, and become part of a growing network of
          people building, learning, and succeeding together.
        </p>

        <div id="my_buttons">
          <button onClick={() => location.assign("https://fixmate-ashy.vercel.app")}>
            Join Our Community
          </button>
        </div>
      </section>

      <section
        id="hero_2"
        className="relative flex items-center justify-center w-full md:w-1/2 h-64"
      >
        {cards.map((card, i) => {
          const angle = (i - mid) * 12;
          const gradientIndex = (i % 4) + 1;
          const baseY = Math.abs(angle) * 1.5;
          const isHovered = hoveredId === card.id;

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