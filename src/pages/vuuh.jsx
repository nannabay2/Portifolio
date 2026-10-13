import { useRef, useState } from "react";
import { assetUrl } from "../asset-url.js";

const vuuhSlides = [
  {
    file: "Vuuhmain.svg",
    title: "Welcome",
    alt: "VUUH onboarding welcome screen",
  },
  {
    file: "Front pageconnectvuuh.svg",
    title: "Connect",
    alt: "VUUH onboarding connection screen",
  },
  {
    file: "connectedVUUH.svg",
    title: "Connected",
    alt: "VUUH connected account screen",
  },
  {
    file: "SuccessideVuuh.svg",
    title: "Success",
    alt: "VUUH onboarding success screen",
  },
];

const figmaPrototypeUrl =
  "https://www.figma.com/proto/FZNTrqToDfjYlKVa3ePIXZ/Case-2--Prototype---forarbejde?node-id=214-697&p=f&viewport=-54%2C399%2C0.04&t=rxtVczFahYWzL6QU-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=214%3A697&page-id=214%3A534";
const figmaOriginalPrototypeUrl =
  "https://www.figma.com/proto/FZNTrqToDfjYlKVa3ePIXZ/Case-2--Prototype---forarbejde?node-id=1-4&p=f&viewport=517%2C178%2C0.02&t=SQIsaUq5R2XGCwvP-1&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1";

export default function VUUHCaseStudy({ project }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const boundedIndex = Math.max(0, Math.min(index, vuuhSlides.length - 1));
    track.scrollTo({
      left: boundedIndex * track.clientWidth,
      behavior: "smooth",
    });
    setActiveIndex(boundedIndex);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    setActiveIndex(Math.max(0, Math.min(index, vuuhSlides.length - 1)));
  };

  return (
    <section className="project-overview section-pink project-overview--case-study project-overview--vuuh">
      <div className="project-overview-heading">
        <p className="eyebrow">Project overview</p>
        <h2>
          A closer look at {project.name.replace(/\.+$/, "")}
          <span>.</span>
        </h2>
      </div>
      <div className="fjera-gallery" aria-label="VUUH onboarding screens">
        <div className="fjera-gallery-topline">
          <p className="eyebrow">Onboarding screens</p>
          <span>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(vuuhSlides.length).padStart(2, "0")}
          </span>
        </div>
        <div className="fjera-gallery-frame">
          <button
            className="fjera-gallery-arrow fjera-gallery-arrow--previous"
            type="button"
            onClick={() => goToSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous VUUH screen"
          >
            ←
          </button>
          <div
            className="fjera-gallery-track"
            ref={trackRef}
            onScroll={handleScroll}
          >
            {vuuhSlides.map((slide, index) => (
              <figure className="fjera-gallery-slide" key={slide.file}>
                <img
                  src={assetUrl(`projects/VUUH-gallery/${slide.file}`)}
                  alt={slide.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                <figcaption>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {slide.title}
                </figcaption>
              </figure>
            ))}
          </div>
          <button
            className="fjera-gallery-arrow fjera-gallery-arrow--next"
            type="button"
            onClick={() => goToSlide(activeIndex + 1)}
            disabled={activeIndex === vuuhSlides.length - 1}
            aria-label="Next VUUH screen"
          >
            →
          </button>
        </div>
        <div className="fjera-gallery-dots" aria-label="Choose a VUUH screen">
          {vuuhSlides.map((slide, index) => (
            <button
              className={index === activeIndex ? "is-active" : ""}
              type="button"
              key={slide.file}
              onClick={() => goToSlide(index)}
              aria-label={`Show ${slide.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
      </div>
      <div className="project-overview-copy case-study-copy vuuh-case-study-copy">
        <p className="case-study-lead">An onboarding flow concept for VUUH.</p>
        <p>
          This project explores VUUH through a focused onboarding-flow concept.
          The company struggles to get new customers to use the app. Therefore,
          it needs an onboarding flow to guide them.
        </p>
        <dl className="case-study-meta">
          <div>
            <dt>My role</dt>
            <dd>Designing an onboarding flow</dd>
          </div>
          <div>
            <dt>Project</dt>
            <dd>{project.name}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{project.category}</dd>
          </div>
          <div>
            <dt>Format &amp; tools</dt>
            <dd>{project.type} · Figma</dd>
          </div>
        </dl>
        <section className="vuuh-design-approach">
          <h3>Design approach</h3>
          <p>
            By combining a clean layout, clear visual hierarchy, and playful
            illustrations, the redesign creates a welcoming, approachable
            interface. A guided onboarding flow introduces users to the platform
            step by step, reducing confusion and helping them get started with
            confidence.
          </p>
        </section>
      </div>
      <a
        className="fjera-github-link vuuh-audit-link"
        href="https://docs.google.com/document/d/1qyzyEcn3M1SvJG83chtBwg1iO6UUJlb1buvsUFIHto4/edit?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
      >
        View UX Audit Summary <span aria-hidden="true">↗</span>
      </a>
      <div className="vuuh-prototype-heading">
        <p className="eyebrow">Interactive prototypes</p>
        <h3>Explore the old and new prototypes to experience the difference</h3>
      </div>
      <div className="vuuh-prototype-pair">
        <section
          className="vuuh-prototype vuuh-prototype--original"
          aria-label="Original interactive VUUH prototype"
        >
          <iframe
            title="Original VUUH Figma prototype"
            src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(figmaOriginalPrototypeUrl)}`}
            allowFullScreen
            loading="lazy"
          />
          <p className="vuuh-prototype-label">Old prototype</p>
        </section>
        <section className="vuuh-prototype" aria-label="Updated interactive VUUH prototype">
          <iframe
            title="VUUH interactive Figma prototype"
            src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(figmaPrototypeUrl)}`}
            allowFullScreen
            loading="lazy"
          />
          <p className="vuuh-prototype-label">New prototype</p>
        </section>
      </div>
      <img
        className="vuuh-prompt-artwork"
        src={assetUrl("projects/VUUH-gallery/promtfotoVUUh.svg")}
        alt="VUUH prompt artwork"
        loading="lazy"
        decoding="async"
      />
    </section>
  );
}
