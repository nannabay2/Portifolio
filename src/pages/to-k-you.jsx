import { useRef, useState } from "react";

const toKYouSlides = [
  {
    file: "tokyoumain.svg",
    title: "Main page",
    alt: "To-K-You webshop main page",
  },
  {
    file: "tokyouproduct.svg",
    title: "Product",
    alt: "To-K-You fashion product page",
  },
  {
    file: "tokyouproductdetail.svg",
    title: "Product detail",
    alt: "To-K-You fashion product detail page",
  },
];

export default function ToKYouCaseStudy({ project }) {
  const projectDisplayName = project.name.replace(/\.+$/, "");

  return (
    <section className="project-overview section-pink project-overview--case-study project-overview--to-k-you">
      <div className="project-overview-heading">
        <p className="eyebrow">Project overview</p>
        <h2>
          A closer look at {projectDisplayName}
          <span>.</span>
        </h2>
      </div>
      <ToKYouCarousel />
      <div className="project-overview-copy case-study-copy">
        <p className="case-study-lead">{project.case_study.lead}</p>
        <p>{project.case_study.description}</p>
        <dl className="case-study-meta">
          <div>
            <dt>My role</dt>
            <dd>{project.case_study.role}</dd>
          </div>
          <div>
            <dt>Tools &amp; formats</dt>
            <dd>{project.case_study.tools}</dd>
          </div>
        </dl>
        <section className="case-study-detail">
          <h3>Design approach</h3>
          <p>{project.case_study.approach}</p>
        </section>
      </div>
    </section>
  );
}

function ToKYouCarousel() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const boundedIndex = Math.max(0, Math.min(index, toKYouSlides.length - 1));
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
    setActiveIndex(Math.max(0, Math.min(index, toKYouSlides.length - 1)));
  };

  return (
    <div className="fjera-gallery" aria-label="To-K-You webshop screens">
      <div className="fjera-gallery-topline">
        <p className="eyebrow">Webshop screens</p>
        <span>
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(toKYouSlides.length).padStart(2, "0")}
        </span>
      </div>
      <div className="fjera-gallery-frame">
        <button
          className="fjera-gallery-arrow fjera-gallery-arrow--previous"
          type="button"
          onClick={() => goToSlide(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous To-K-You screen"
        >
          ←
        </button>
        <div
          className="fjera-gallery-track"
          ref={trackRef}
          onScroll={handleScroll}
        >
          {toKYouSlides.map((slide, index) => (
            <figure className="fjera-gallery-slide" key={slide.file}>
              <img
                src={`/projects/to-k-you-gallery/${slide.file}`}
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
          disabled={activeIndex === toKYouSlides.length - 1}
          aria-label="Next To-K-You screen"
        >
          →
        </button>
      </div>
      <div className="fjera-gallery-dots" aria-label="Choose a To-K-You screen">
        {toKYouSlides.map((slide, index) => (
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
        href="https://github.com/nannabay2/tokyou-eksamen"
        target="_blank"
        rel="noopener noreferrer"
      >
        View more on GitHub <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
