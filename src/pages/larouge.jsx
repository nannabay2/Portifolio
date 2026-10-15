import { useRef, useState } from "react";
import { assetUrl } from "../asset-url.js";

const laRougeSlides = [
  {
    file: "Encoreshop.svg",
    title: "Shop",
    alt: "LA Rōuge Encore secondhand shop page",
  },
  {
    file: "Encoresælg.svg",
    title: "Sell",
    alt: "LA Rōuge Encore sell page",
  },
  {
    file: "Encoreresale.svg",
    title: "Resale",
    alt: "LA Rōuge Encore secondhand resale page",
  },
  {
    file: "aboutencore.svg",
    title: "About Encore",
    alt: "About the LA Rōuge Encore sub-brand",
  },
];

const laRougePrototypeUrl =
  "https://www.figma.com/proto/edY854sbQHgaH34i7MP5h9/Case-3--design-kocept-og-udvikling?node-id=35-86&p=f&viewport=-815%2C418%2C0.54&t=jaHxXMheoJYRVcuL-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=35%3A86&page-id=35%3A84";
const laRougeMobilePrototypeUrl =
  "https://www.figma.com/proto/edY854sbQHgaH34i7MP5h9/Case-3--design-kocept-og-udvikling?node-id=184-672&p=f&viewport=-815%2C418%2C0.54&t=jaHxXMheoJYRVcuL-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=184%3A672&page-id=35%3A84&show-proto-sidebar=1";

export default function LaRougeCaseStudy({ project }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const boundedIndex = Math.max(0, Math.min(index, laRougeSlides.length - 1));
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
    setActiveIndex(Math.max(0, Math.min(index, laRougeSlides.length - 1)));
  };

  return (
    <section className="project-overview section-pink project-overview--case-study project-overview--la-rouge">
      <div className="project-overview-heading">
        <p className="eyebrow">Project overview</p>
        <h2>
          A closer look at
          <br />
          LA Rōuge: Encore
          <span>.</span>
        </h2>
      </div>
      <div className="fjera-gallery" aria-label="LA Rōuge Encore highlights">
        <div className="fjera-gallery-topline">
          <p className="eyebrow">Encore highlights</p>
          <span>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(laRougeSlides.length).padStart(2, "0")}
          </span>
        </div>
        <div className="fjera-gallery-frame">
          <button
            className="fjera-gallery-arrow fjera-gallery-arrow--previous"
            type="button"
            onClick={() => goToSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous LA Rōuge highlight"
          >
            ←
          </button>
          <div
            className="fjera-gallery-track"
            ref={trackRef}
            onScroll={handleScroll}
          >
            {laRougeSlides.map((slide, index) => (
              <figure className="fjera-gallery-slide" key={slide.file}>
                <img
                  src={assetUrl(`projects/larouge-gallery/${slide.file}`)}
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
            disabled={activeIndex === laRougeSlides.length - 1}
            aria-label="Next LA Rōuge highlight"
          >
            →
          </button>
        </div>
        <div
          className="fjera-gallery-dots"
          aria-label="Choose an LA Rōuge highlight"
        >
          {laRougeSlides.map((slide, index) => (
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
      <a
        className="fjera-github-link la-rouge-branddeck-link"
        href="https://www.figma.com/deck/cyUiEuJ82a6cFzrCtFFPyd/Untitled?node-id=1-42&viewport=15%2C-1%2C0.39&t=LubwHfzaGs5NlQvI-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1"
        target="_blank"
        rel="noopener noreferrer"
      >
        View brand deck <span aria-hidden="true">↗</span>
      </a>
      <div className="project-overview-copy case-study-copy la-rouge-case-study-copy">
        <p className="case-study-lead">
          A rebrand of LA RŌUGE’s secondhand clothing sub-brand.
        </p>
        <p>
          This project explores how a refreshed visual identity can give the
          secondhand sub-brand a more distinctive and cohesive presence within
          LA RŌUGE. The redesign presents pre-owned clothing clearly while
          creating a recognisable visual tone for the brand.
        </p>
        <dl className="case-study-meta">
          <div>
            <dt>My role</dt>
            <dd>
              Creating a distinct identity for the sub-brand that aligns with
              the parent brand
            </dd>
          </div>
          <div>
            <dt>Project</dt>
            <dd>{project.name}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>Secondhand · E-commerce</dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>{project.type}</dd>
          </div>
        </dl>
        <section className="case-study-detail">
          <h3>Rebrand approach</h3>
          <p>
            The redesign considers how brand expression, visual hierarchy, and a
            clear shopping interface can work together. The aim is to make the
            experience feel consistent and memorable while keeping products easy
            to browse.
          </p>
        </section>
      </div>
      <section
        className="la-rouge-prototype la-rouge-prototype--desktop"
        aria-label="Interactive desktop LA Rōuge prototype"
      >
        <div className="to-k-you-prototype-heading">
          <p className="eyebrow">Interactive prototype</p>
          <h3>Explore LA Rōuge Encore</h3>
          <p className="to-k-you-prototype-note">
            Reduce the viewport width to 620 px or less to view the mobile
            prototype.
          </p>
        </div>
        <iframe
          title="LA Rōuge Encore interactive Figma prototype"
          src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(laRougePrototypeUrl)}`}
          allowFullScreen
          loading="lazy"
        />
      </section>
      <section
        className="la-rouge-prototype la-rouge-prototype--mobile"
        aria-label="Interactive mobile LA Rōuge prototype"
      >
        <div className="to-k-you-prototype-heading">
          <p className="eyebrow">Mobile prototype</p>
          <h3>Explore LA Rōuge Encore on mobile</h3>
        </div>
        <iframe
          title="LA Rōuge Encore mobile Figma prototype"
          src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(laRougeMobilePrototypeUrl)}`}
          allowFullScreen
          loading="lazy"
        />
      </section>
      <section className="la-rouge-prototype-followup">
        <h3>But how did we get here?</h3>
        <p>
          LA Rōuge faced a challenge with its secondhand concept, as many
          customers preferred buying pre-loved LA Rōuge pieces through platforms
          like Vinted rather than the brand’s own resale platform.
        </p>
        <p>
          This highlighted a need to rethink the secondhand experience and
          create a more attractive, accessible, and engaging platform that
          encourages customers to buy and resell directly through LA Rōuge.
        </p>
        <h4>Brand identity</h4>
      </section>
      <section className="la-rouge-brand-identity">
        <div className="la-rouge-brand-identity-gallery">
          <figure>
            <img
              src={assetUrl("projects/larouge-gallery/historyvibes.svg")}
              alt="LA Rōuge Encore history-inspired brand identity direction"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              Option 1 · Holiday dream · vintage · elegance · old money
            </figcaption>
          </figure>
          <figure>
            <img
              src={assetUrl(
                "projects/larouge-gallery/Loud-colorfull-youthfull.svg",
              )}
              alt="LA Rōuge Encore bold, colourful and youthful brand identity direction"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Option 2 · Bold · Colorful · Y2K · young</figcaption>
          </figure>
          <figure>
            <img
              src={assetUrl("projects/larouge-gallery/finalmoodboard.svg")}
              alt="Final LA Rōuge Encore brand identity moodboard"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              Chosen option · Scandinavian · timeless · French elegance ·
              luxurious
            </figcaption>
          </figure>
        </div>
        <div className="la-rouge-brand-identity-next">
          <div className="la-rouge-brand-identity-copy">
            <h3>How to name the Brand?</h3>
            <p>
              The sub-brand sells secondhand clothing from LA Rōuge’s own label.
              Its name should feel like a natural extension of LA Rōuge or a
              playful take on the parent brand’s name.
            </p>
            <p>
              This led to the name LA Rōuge: Encore. In French, “encore” means
              “again” or “more”. Here, it represents adding more history to a
              piece of clothing that is already loved.
            </p>
          </div>
          <img
            className="la-rouge-brand-identity-arrow"
            src={assetUrl("projects/larouge-gallery/Arrow.svg")}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
          <h4 className="la-rouge-logo-heading">Logo considerations</h4>
          <div className="la-rouge-brand-logos">
            <figure>
              <img
                src={assetUrl("projects/larouge-gallery/notlogo.svg")}
                alt="First LA Rōuge Encore logo concept"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <figure>
              <img
                src={assetUrl("projects/larouge-gallery/notlogo2.svg")}
                alt="Second LA Rōuge Encore logo concept"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <figure>
              <img
                src={assetUrl("projects/larouge-gallery/notlogo3.svg")}
                alt="Third LA Rōuge Encore logo concept"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <figure>
              <img
                src={assetUrl("projects/larouge-gallery/reallogo.svg")}
                alt="Final LA Rōuge Encore logo"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
          <h4 className="la-rouge-logo-variations-heading">
            FINAL LOGO AND ITS VARIATIONS
          </h4>
          <img
            className="la-rouge-logo-format"
            src={assetUrl("projects/larouge-gallery/Logosformat.svg")}
            alt="LA Rōuge Encore logo format and lockup options"
            loading="lazy"
            decoding="async"
          />
          <p className="la-rouge-logo-format-copy">
            Encore is set in a lipstick-inspired typeface, giving the logo a
            feminine, powerful expression while keeping it elegant.
          </p>
        </div>
        <div className="la-rouge-type-colour-section">
          <article>
            <h3>Typography</h3>
            <img
              className="la-rouge-typography-artwork"
              src={assetUrl("projects/larouge-gallery/typografy.svg")}
              alt="LA Rōuge Encore typography specimen"
              loading="lazy"
              decoding="async"
            />
          </article>
          <article>
            <h3>Colours</h3>
            <p>
              A restrained, timeless palette supports the Scandinavian and
              French-inspired direction, while considered accents keep the
              secondhand brand feeling fresh and distinctive.
            </p>
          </article>
        </div>
      </section>
    </section>
  );
}
