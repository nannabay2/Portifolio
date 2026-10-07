import { useRef, useState } from "react";

const fjeraSlides = [
  { file: "mainpagefjera.svg", title: "Main page", alt: "Fjera app main page" },
  { file: "friendsfjera.svg", title: "Friends", alt: "Fjera friends screen" },
  {
    file: "emptygymfjera.svg",
    title: "Not connected to health app",
    alt: "Fjera screen showing the app is not connected to a health app",
  },
  {
    file: "fullgymfjera.svg",
    title: "Connected to health app",
    alt: "Fjera screen showing a connection to a health app",
  },
  {
    file: "health1fjera.svg",
    title: "Health detail",
    alt: "Fjera health detail screen",
  },
  {
    file: "health2fjera.svg",
    title: "Health details",
    alt: "Fjera health details screen",
  },
];

export default function FjeraCaseStudy({ project }) {
  const projectDisplayName = project.name.replace(/\.+$/, "");

  return (
    <section className="project-overview section-pink project-overview--case-study">
      <div className="project-overview-heading">
        <p className="eyebrow">Project overview</p>
        <h2>
          A closer look at {projectDisplayName}
          <span>.</span>
        </h2>
      </div>
      <FjeraCarousel />
      <div className="project-overview-copy case-study-copy">
        <p className="case-study-lead">{project.case_study.lead}</p>
        <p>{project.case_study.description}</p>
        <dl className="case-study-meta">
          <div>
            <dt>My role</dt>
            <dd>{project.case_study.role}</dd>
          </div>
          <div>
            <dt>Tools</dt>
            <dd>{project.case_study.tools}</dd>
          </div>
        </dl>
        <section className="case-study-detail">
          <h3>Research &amp; iteration</h3>
          <p>{project.case_study.research}</p>
        </section>
        <section className="case-study-detail case-study-result">
          <h3>Result</h3>
          <p>{project.case_study.result}</p>
        </section>
      </div>
    </section>
  );
}

function FjeraCarousel() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const boundedIndex = Math.max(0, Math.min(index, fjeraSlides.length - 1));
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
    setActiveIndex(Math.max(0, Math.min(index, fjeraSlides.length - 1)));
  };

  return (
    <div className="fjera-gallery" aria-label="Fjera app screens">
      <div className="fjera-gallery-topline">
        <p className="eyebrow">App screens</p>
        <span>
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(fjeraSlides.length).padStart(2, "0")}
        </span>
      </div>
      <div className="fjera-gallery-frame">
        <button
          className="fjera-gallery-arrow fjera-gallery-arrow--previous"
          type="button"
          onClick={() => goToSlide(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous Fjera screen"
        >
          ←
        </button>
        <div
          className="fjera-gallery-track"
          ref={trackRef}
          onScroll={handleScroll}
        >
          {fjeraSlides.map((slide, index) => (
            <figure className="fjera-gallery-slide" key={slide.file}>
              <img
                src={`/projects/fjera-gallery/${slide.file}`}
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
          disabled={activeIndex === fjeraSlides.length - 1}
          aria-label="Next Fjera screen"
        >
          →
        </button>
      </div>
      <div className="fjera-gallery-dots" aria-label="Choose a Fjera screen">
        {fjeraSlides.map((slide, index) => (
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
      <a
        className="fjera-github-link"
        href="https://github.com/nannabay2/Web-App-Eksamen"
        target="_blank"
        rel="noopener noreferrer"
      >
        View more on GitHub <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
