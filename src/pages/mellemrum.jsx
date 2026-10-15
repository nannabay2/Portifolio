import { useRef, useState } from "react";
import { assetUrl } from "../asset-url.js";

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
];

export default function MellemrumCaseStudy({ project }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const boundedIndex = Math.max(
      0,
      Math.min(index, mellemrumSlides.length - 1),
    );
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
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
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
                  src={assetUrl(`projects/mellem-gallery/${slide.file}`)}
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
        <div
          className="fjera-gallery-dots"
          aria-label="Choose a Mellemrum page"
        >
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
            href="https://github.com/nannabay2/forbedring-af-Mellem."
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div className="mellemrum-edits-heading">
        <p className="eyebrow">What did I change?</p>
        <h3>Selected edits and changes</h3>
        <p className="mellemrum-readme-note">
          All changes are documented in the README.md file.
        </p>
      </div>
      <section className="mellemrum-reservation-edits">
        <h4>Registration form</h4>
        <div className="mellemrum-reservation-comparison">
          <figure>
            <img
              src={assetUrl("projects/mellem-gallery/førresever.svg")}
              alt="Reservation form before the visual update"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Before</figcaption>
          </figure>
          <figure>
            <img
              src={assetUrl("projects/mellem-gallery/efterresever.svg")}
              alt="Reservation form after the visual update"
              loading="lazy"
              decoding="async"
            />
            <figcaption>After</figcaption>
          </figure>
        </div>
        <div className="mellemrum-reservation-copy">
          <p>
            I redesigned the registration form to improve usability and create a
            more consistent user experience.
          </p>
          <p>
            Previously, users could register by entering only one name. I
            introduced a separate last name field to make the required
            information clearer.
          </p>
          <p>
            I also refined the layout and button design to create a cleaner,
            more cohesive interface, focusing on{" "}
            <strong>
              usability, visual consistency, and intuitive interaction.
            </strong>
          </p>
        </div>
      </section>
      <div className="project-overview-copy case-study-copy">
        <p className="case-study-lead">
          A React prototype for discovering local culture and events in Aarhus.
        </p>
        <p>
          Mellemrum helps visitors find concerts, talks and workshops through
          searchable event listings and category filters. Each event brings
          together the practical details, availability and a clear sign-up flow,
          while organisers can review registrations grouped by event.
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
        <section className="mellemrum-loader-feature">
          <section className="case-study-detail">
            <h3>Design approach</h3>
            <p>
              I refined the visual design of the sign-up website, adding more
              breathing room between letters and updating the overall look to
              create a clearer, more spacious experience. Alongside these
              visible changes, I also optimised and refactored the underlying
              code—work that happens behind the scenes and is not immediately
              visible to users.
            </p>
          </section>
          <figure className="mellemrum-loader-figure">
            <img
              src={assetUrl("projects/mellem-gallery/mellemrumloader.gif")}
              alt="Mellemrum loading animation"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Loading animation</figcaption>
          </figure>
        </section>
      </div>
      <section className="mellemrum-registration-site-edits">
        <h4>Registration site</h4>
        <div className="mellemrum-reservation-comparison">
          <figure>
            <img
              src={assetUrl("projects/mellem-gallery/førtilmelding.svg")}
              alt="Registration site before the redesign"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Before</figcaption>
          </figure>
          <figure>
            <img
              src={assetUrl("projects/mellem-gallery/eftertilmeldinger.svg")}
              alt="Registration site after the redesign"
              loading="lazy"
              decoding="async"
            />
            <figcaption>After</figcaption>
          </figure>
        </div>
        <div className="mellemrum-reservation-copy">
          <p>
            Previously, all registrations were displayed in one table, making it
            difficult to distinguish between events and their participants.
          </p>
          <p>
            I redesigned the layout by creating individual cards for each event,
            displaying participant names and email addresses in a more
            structured way.
          </p>
          <p>
            This improves{" "}
            <strong>visual hierarchy, readability, and navigation</strong>,
            making it easier for administrators to manage registrations and
            quickly find relevant information.
          </p>
        </div>
      </section>
      <section className="mellemrum-next-steps">
        <div className="mellemrum-next-steps-heading">
          <p className="eyebrow">Future improvements</p>
          <h3>What are the next steps?</h3>
          <p>
            These are ideas for future development and have not been implemented
            in the current version.
          </p>
        </div>
        <div className="mellemrum-next-steps-list">
          <article>
            <span>01</span>
            <div>
              <h4>Protect participant information</h4>
              <p>
                Organisers should only be able to view registrations for their
                own events. Other users and visitors should not be able to see
                who is registered. This requires authentication, a clear link
                between each organiser and their events, and Supabase Row Level
                Security (RLS) policies that protect the data in the database,
                not just hide it in the interface.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h4>Strengthen the Supabase data model</h4>
              <p>
                Explore Supabase Auth and Row Level Security, and connect each
                registration to an event ID instead of relying only on the event
                title. This would provide a more reliable foundation for
                fetching participants and enforcing organiser access.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h4>Improve the footer navigation</h4>
              <p>
                Review which links matter most to visitors and organisers, then
                adjust their order and mobile presentation to make the footer
                easier to navigate.
              </p>
            </div>
          </article>
          <article>
            <span>04</span>
            <div>
              <h4>Investigate lazy loading</h4>
              <p>
                Load event images and other non-essential content only when
                needed to reduce the initial page load time.
              </p>
            </div>
          </article>
        </div>
      </section>
    </section>
  );
}
