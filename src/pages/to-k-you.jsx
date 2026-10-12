import { useRef, useState } from "react";
import { assetUrl } from "../asset-url.js";

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

const figmaPrototypeUrl =
  "https://www.figma.com/proto/oLg3wvoglmaAJThFPAL3Rn/Webshop-proces-og-prototype?node-id=46-182&p=f&viewport=164%2C294%2C0.05&t=fG8PzDtYnbm8z0Ol-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=46%3A182&show-proto-sidebar=1&page-id=46%3A181";
const figmaMobilePrototypeUrl =
  "https://www.figma.com/proto/oLg3wvoglmaAJThFPAL3Rn/Webshop-proces-og-prototype?node-id=758-1738&p=f&viewport=371%2C245%2C0.86&t=25ENEIfrDo7iBuHQ-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=758%3A1738&page-id=758%3A1737";

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
      <div className="to-k-you-prototype-description">
        <p>
          The To-K-You prototype brings a bold, high-end fashion concept to
          life through an interactive shopping experience. It explores key
          e-commerce features such as product categories, product detail pages,
          and intuitive navigation, creating a natural flow from discovering
          products to exploring individual items.
        </p>
        <p>
          The user flow is designed to make the shopping experience seamless
          while maintaining the brand’s unconventional visual identity. By
          combining clear information architecture, visual hierarchy, and
          familiar e-commerce conventions, the prototype balances creative
          expression with usability.
        </p>
      </div>
      <section
        className="to-k-you-prototype to-k-you-prototype--desktop"
        aria-label="Interactive desktop webshop prototype"
      >
        <div className="to-k-you-prototype-heading">
          <p className="eyebrow">Interactive prototype</p>
          <h3>Explore the webshop flow</h3>
          <p className="to-k-you-prototype-note">
            Reduce your viewport width to 620 px or less to see the mobile
            prototype.
          </p>
        </div>
        <iframe
          title="To-K-You interactive Figma webshop prototype"
          src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(figmaPrototypeUrl)}`}
          allowFullScreen
          loading="lazy"
        />
      </section>
      <section
        className="to-k-you-prototype to-k-you-prototype--mobile"
        aria-label="Interactive mobile webshop prototype"
      >
        <div className="to-k-you-prototype-heading">
          <p className="eyebrow">Mobile prototype</p>
          <h3>Explore the mobile webshop flow</h3>
          <p className="to-k-you-prototype-note">
            The mobile version is shown automatically at viewport widths of 620
            px or less.
          </p>
        </div>
        <iframe
          title="To-K-You interactive mobile Figma webshop prototype"
          src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(figmaMobilePrototypeUrl)}`}
          allowFullScreen
          loading="lazy"
        />
      </section>
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
                src={assetUrl(`projects/to-k-you-gallery/${slide.file}`)}
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
