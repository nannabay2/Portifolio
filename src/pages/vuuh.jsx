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
            The redesign responds directly to three user insights: users need
            more information, the experience does not feel intuitive, and
            actions lack feedback. A clear visual hierarchy makes essential
            information easier to find, while a guided onboarding flow makes
            the platform easier to navigate step by step. Playful illustrations
            and clear feedback help users understand what is happening and get
            started with confidence.
          </p>
          <ul className="vuuh-design-insights" aria-label="Key user insights">
            <li>
              <span>01</span>
              <span>Lack of information</span>
            </li>
            <li>
              <span>02</span>
              <span>Nothing feels intuitive</span>
            </li>
            <li>
              <span>03</span>
              <span>No feedback</span>
            </li>
          </ul>
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
        <section
          className="vuuh-prototype"
          aria-label="Updated interactive VUUH prototype"
        >
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
      <section className="vuuh-persona-challenge">
        <div className="vuuh-persona-copy">
          <h3>The struggle between two personas</h3>
          <p>
            The main challenge was designing for both an IT-savvy persona and
            someone less confident with technology. The onboarding needed to
            feel quick and efficient for experienced users while providing clear
            guidance and reassurance for those who needed more support. Users
            can either follow the onboarding flow or explore the app on their
            own.
          </p>
        </div>
        <figure className="vuuh-persona-video">
          <video
            autoPlay
            controls
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="VUUH onboarding flow demonstrating support for both personas"
          >
            <source
              src={assetUrl("projects/VUUH-gallery/videomugliheder.mp4")}
              type="video/mp4"
            />
            <a href={assetUrl("projects/VUUH-gallery/videomugliheder.mp4")}>
              View the VUUH onboarding video
            </a>
          </video>
        </figure>
      </section>
      <section className="vuuh-shopify-integration">
        <div className="vuuh-shopify-integration-copy">
          <h3>Integrating with Shopify</h3>
          <p>
            Since many VUUH users rely on Shopify, connecting the two platforms
            should feel like a natural part of getting started. The integration
            process can guide users through connecting their Shopify account,
            choosing the store they want to use, reviewing the requested
            permissions, and confirming the connection. Clear steps and feedback
            at each stage help users understand what is happening and feel
            confident that VUUH is connected to the right store.
          </p>
        </div>
        <figure className="vuuh-shopify-video">
          <video
            autoPlay
            controls
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="VUUH Shopify integration walkthrough"
          >
            <source
              src={assetUrl("projects/VUUH-gallery/Shopify.mp4")}
              type="video/mp4"
            />
            <a href={assetUrl("projects/VUUH-gallery/Shopify.mp4")}>
              View the Shopify integration video
            </a>
          </video>
        </figure>
      </section>
      <section className="vuuh-shopify-demo">
        <figure className="vuuh-shopify-demo-video">
          <video
            autoPlay
            controls
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="VUUH demo product sent to a Shopify store"
          >
            <source
              src={assetUrl("projects/VUUH-gallery/Demo.mp4")}
              type="video/mp4"
            />
            <a href={assetUrl("projects/VUUH-gallery/Demo.mp4")}>
              View the VUUH Shopify demo
            </a>
          </video>
        </figure>
        <div className="vuuh-shopify-demo-copy">
          <h3>Installing a demo to show how VUUH works</h3>
          <p>
            VUUH can send a demo product directly to a seller’s Shopify store,
            giving them a simple, hands-on way to see how the integration works
            and how easy it is to use.
          </p>
        </div>
      </section>
      <section className="vuuh-professional-reflection">
        <div className="vuuh-reflection-heading">
          <p className="eyebrow">Professional reflection</p>
          <h3>What did I consider?</h3>
          <p>
            Key considerations that shaped the redesign and onboarding
            experience.
          </p>
        </div>
        <div className="vuuh-reflection-list">
          <article>
            <span>01</span>
            <div>
              <h4>Redesigning a real product</h4>
              <p>
                Improve usability while preserving the parts of the company’s
                existing identity that customers already recognise.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h4>Applying UX and UI theory</h4>
              <p>
                Use design principles, UX laws, and familiar interface
                conventions to guide hierarchy, consistency, and the amount of
                information shown at each step.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h4>Designing for accessibility</h4>
              <p>
                Consider users with different abilities and levels of digital
                confidence, including people who may find technology
                challenging.
              </p>
            </div>
          </article>
          <article>
            <span>04</span>
            <div>
              <h4>Creating visual appeal</h4>
              <p>
                Use a considered colour palette, soft corners, and balanced
                spacing to make the interface inviting while keeping it clear
                and easy to use.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="vuuh-business-potential">
        <p className="eyebrow">Business potential</p>
        <h3>What could this contribute to VUUH?</h3>
        <p>
          A clearer onboarding experience could help more new customers
          understand the value of VUUH and get started with confidence. A
          reliable Shopify connection could also make the product more useful in
          customers’ existing workflows, supporting adoption and continued use
          over time.
        </p>
      </section>
    </section>
  );
}
