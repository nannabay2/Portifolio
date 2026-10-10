import { useRef, useState } from "react";

const mellemrumSlides = [
  {
    file: "mainmellem.svg",
    title: "Main page",
    alt: "Mellemrum website main page",
  },
  {
    file: "Tilmeldmellem.svg",
    title: "Sign-up",
    alt: "Mellemrum sign-up page",
  },
  {
    file: "resevermellemrum.svg",
    title: "Reservation",
    alt: "Mellemrum reservation page",
  },
  {
    file: "mellemrumloader.gif",
    title: "Loading animation",
    alt: "Mellemrum loading animation shown while the page responds",
  },
];

export default function MellemrumCaseStudy({ project }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const boundedIndex = Math.max(0, Math.min(index, mellemrumSlides.length - 1));
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
    setActiveIndex(Math.max(0, Math.min(index, mellemrumSlides.length - 1)));
  };

  return (
    <section className="project-overview section-pink project-overview--case-study project-overview--mellemrum">
      <div className="project-overview-heading">
        <p className="eyebrow">Project overview</p>
        <h2>
          A closer look at {project.name.replace(/\.+$/, "")}
          <span>.</span>
        </h2>
      </div>
      <div className="fjera-gallery" aria-label="Mellemrum website pages">
        <div className="fjera-gallery-topline">
          <p className="eyebrow">Website pages</p>
          <span>
            {String(activeIndex + 1).padStart(2, "0")} / {" "}
            {String(mellemrumSlides.length).padStart(2, "0")}
          </span>
        </div>
        <div className="fjera-gallery-frame">
          <button
            className="fjera-gallery-arrow fjera-gallery-arrow--previous"
            type="button"
            onClick={() => goToSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous Mellemrum page"
          >
            ←
          </button>
          <div
            className="fjera-gallery-track"
            ref={trackRef}
            onScroll={handleScroll}
          >
            {mellemrumSlides.map((slide, index) => (
              <figure className="fjera-gallery-slide" key={slide.file}>
                <img
                  src={`/projects/mellem-gallery/${slide.file}`}
                  alt={slide.alt}
                  loading="lazy"
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
            disabled={activeIndex === mellemrumSlides.length - 1}
            aria-label="Next Mellemrum page"
          >
            →
          </button>
        </div>
        <div className="fjera-gallery-dots" aria-label="Choose a Mellemrum page">
          {mellemrumSlides.map((slide, index) => (
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
      <div className="mellemrum-case-study-links">
        <a
          className="mellemrum-case-study-link"
          href="https://nannabay2.github.io/forbedring-af-Mellem./"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Mellemrum <span aria-hidden="true">↗</span>
        </a>
        <a
          className="mellemrum-case-study-link"
          href="https://github.com/nannabay2/forbedring-af-Mellem"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="project-overview-copy case-study-copy">
        <p className="case-study-lead">
          A React prototype for discovering local culture and events in Aarhus.
        </p>
        <p>
          Mellemrum helps visitors find concerts, talks and workshops through
          searchable event listings and category filters. Each event brings
          together the practical details, availability and a clear sign-up
          flow, while organisers can review registrations grouped by event.
        </p>
        <dl className="case-study-meta">
          <div>
            <dt>My role</dt>
            <dd>Optimising and refactoring existing code</dd>
          </div>
          <div>
            <dt>Project</dt>
            <dd>{project.name}</dd>
          </div>
          <div>
            <dt>Tools &amp; format</dt>
            <dd>Website · VS Code · Supabase</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{project.category}</dd>
          </div>
        </dl>
        <section className="case-study-detail">
          <h3>Design approach</h3>
          <p>
            I refined the visual design of the sign-up website, adding more
            breathing room between letters and updating the overall look to
            create a clearer, more spacious experience. Alongside these visible
            changes, I also optimised and refactored the underlying code—work
            that happens behind the scenes and is not immediately visible to
            users.
          </p>
        </section>
      </div>
    </section>
  );
}