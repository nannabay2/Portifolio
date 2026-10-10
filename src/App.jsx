import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import FjeraCaseStudy from "./pages/fjera.jsx";
import MellemrumCaseStudy from "./pages/mellemrum.jsx";
import ToKYouCaseStudy from "./pages/to-k-you.jsx";

const INSTAGRAM_URL = "https://www.instagram.com/nannabayjacobsen/";

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return reducedMotion;
}

function App() {
  const [brief, setBrief] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/portfolio-brief.json", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Could not load portfolio data");
        return response.json();
      })
      .then(setBrief)
      .catch((error) => {
        if (error.name !== "AbortError") setLoadError(true);
      });

    return () => controller.abort();
  }, []);

  if (loadError) {
    return (
      <p className="load-error">
        The portfolio could not be loaded. Please refresh the page.
      </p>
    );
  }

  if (!brief) return <div className="loading-mark">NANNA</div>;

  const sections = Object.fromEntries(
    brief.sections.map((section) => [section.id, section]),
  );
  const projects = sections.work.projects_in_order;

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage sections={sections} projects={projects} />}
      />
      <Route
        path="/projects/:slug"
        element={<ProjectPage projects={projects} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function HomePage({ sections, projects }) {
  const reducedMotion = useReducedMotion();
  const location = useLocation();
  const [flipped, setFlipped] = useState(false);
  const [typedText, setTypedText] = useState("");
  const flipTimer = useRef(null);

  const scheduleFlip = (delay) => {
    window.clearTimeout(flipTimer.current);
    if (!reducedMotion) {
      flipTimer.current = window.setTimeout(() => {
        setFlipped((current) => !current);
        scheduleFlip(3600);
      }, delay);
    }
  };

  useEffect(() => {
    document.title = "Nanna — Designer, Developer, Creator";
    if (location.hash === "#work") {
      window.setTimeout(
        () => document.querySelector("#work")?.scrollIntoView(),
        0,
      );
    } else if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.key, location.hash]);

  useEffect(() => {
    scheduleFlip(3100);
    return () => window.clearTimeout(flipTimer.current);
  }, [reducedMotion]);

  useEffect(() => {
    const messages = [
      "Designing apps people love",
      "Building websites that sell",
      "Creating prototypes for brands",
      "Creating brand identities",
      "Based in Denmark, working worldwide",
    ];

    if (reducedMotion) {
      setTypedText(messages[0]);
      return undefined;
    }

    let messageIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timer;

    const typeNext = () => {
      const message = messages[messageIndex];
      characterIndex += deleting ? -1 : 1;
      setTypedText(message.slice(0, characterIndex));
      let delay = deleting ? 28 : 48;

      if (!deleting && characterIndex === message.length) {
        deleting = true;
        delay = 1500;
      } else if (deleting && characterIndex === 0) {
        deleting = false;
        messageIndex = (messageIndex + 1) % messages.length;
        delay = 340;
      }

      timer = window.setTimeout(typeNext, delay);
    };

    typeNext();
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    document.querySelectorAll(".reveal").forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
      revealObserver.observe(element);
    });

    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const pendingFrames = new Set();
    const statObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const number = entry.target;
          const target = Number(number.dataset.target);
          const suffix = number.dataset.suffix;
          const startedAt = performance.now();
          const duration = reducedMotion ? 0 : 1800;
          let animationFrame;

          const tick = (now) => {
            pendingFrames.delete(animationFrame);
            const progress =
              duration === 0 ? 1 : Math.min((now - startedAt) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            number.textContent = `${Math.round(target * eased)}${suffix}`;
            if (progress < 1) {
              animationFrame = requestAnimationFrame(tick);
              pendingFrames.add(animationFrame);
            }
          };

          animationFrame = requestAnimationFrame(tick);
          pendingFrames.add(animationFrame);
          observer.unobserve(number);
        });
      },
      { threshold: 0.6 },
    );

    document
      .querySelectorAll(".stat-number")
      .forEach((number) => statObserver.observe(number));
    return () => {
      statObserver.disconnect();
      pendingFrames.forEach((frame) => cancelAnimationFrame(frame));
    };
  }, [reducedMotion]);

  useEffect(() => {
    const intro = document.querySelector("#intro");
    const header = document.querySelector("[data-site-header]");
    const contactFloat = document.querySelector("[data-contact-float]");
    const workSection = document.querySelector(".work-section");
    const workTrack = document.querySelector("[data-work-track]");
    const workProgress = document.querySelector("[data-work-progress]");
    let scrollFrame = 0;

    const sizeWorkSection = () => {
      if (reducedMotion) {
        workSection.style.height = "auto";
        workTrack.style.transform = "none";
        return;
      }
      const distance = Math.max(
        0,
        workTrack.scrollWidth - window.innerWidth + 48,
      );
      workSection.style.height = `${window.innerHeight + distance}px`;
    };

    const updateScrollEffects = () => {
      scrollFrame = 0;
      const introProgress = Math.min(
        window.scrollY / (intro.offsetHeight * 0.7),
        1,
      );
      header.classList.toggle("is-visible", introProgress >= 1);
      contactFloat.classList.toggle("is-visible", introProgress >= 1);

      if (!reducedMotion) {
        document.querySelectorAll(".intro-word").forEach((word, index) => {
          word.style.transform = `translate3d(0, ${window.scrollY * (0.045 + index * 0.012)}px, 0)`;
          word.style.opacity = String(Math.max(0.18, 1 - introProgress * 0.85));
        });

        const maxScroll = workSection.offsetHeight - window.innerHeight;
        const progress =
          maxScroll > 0
            ? Math.max(
                0,
                Math.min(
                  (window.scrollY - workSection.offsetTop) / maxScroll,
                  1,
                ),
              )
            : 0;
        const distance = Math.max(
          0,
          workTrack.scrollWidth - window.innerWidth + 48,
        );
        workTrack.style.transform = `translate3d(${-distance * progress}px, 0, 0)`;
        workProgress.style.transform = `scaleX(${Math.max(progress, 0.025)})`;
      }
    };

    const requestScrollUpdate = () => {
      const introProgress = Math.min(
        window.scrollY / (intro.offsetHeight * 0.7),
        1,
      );
      header.classList.toggle("is-visible", introProgress >= 1);
      contactFloat.classList.toggle("is-visible", introProgress >= 1);
      if (!scrollFrame)
        scrollFrame = requestAnimationFrame(updateScrollEffects);
    };

    sizeWorkSection();
    updateScrollEffects();
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", sizeWorkSection);

    return () => {
      window.removeEventListener("scroll", requestScrollUpdate);
      window.removeEventListener("resize", sizeWorkSection);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
    };
  }, [reducedMotion, projects.length]);

  const aboutHeading =
    sections.about.layout.match(/heading '([^']+)'/)?.[1] ||
    "I design things people actually use.";

  return (
    <>
      <header className="site-header" data-site-header>
        <a className="brand" href="#intro" aria-label="Nanna, back to top">
          nanna
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about-me">About</a>
          <a
            className="nav-contact"
            href={`mailto:${sections.contact.email}?subject=Project%20enquiry`}
          >
            <i />
            Contact me
          </a>
        </nav>
      </header>
      <main id="main">
        <section
          className="intro section-purple"
          id="intro"
          aria-label="Introduction"
        >
          <div className="intro-words" aria-hidden="true">
            <span className="intro-word intro-word--designer">Designer</span>
            <span className="intro-word intro-word--developer">Developer</span>
            <span className="intro-word intro-word--creator">Creator</span>
            <span className="intro-word intro-word--tutor">Tutor</span>
          </div>
          <div className="badge-drop">
            <span className="lanyard" aria-hidden="true" />
            <span className="badge-clip" aria-hidden="true" />
            <button
              className={`id-card${flipped ? " is-flipped" : ""}`}
              type="button"
              aria-label="Flip Nanna's profile card"
              aria-pressed={flipped}
              onClick={() => {
                setFlipped((current) => !current);
                scheduleFlip(3600);
              }}
            >
              <span className="id-card__inner">
                <span className="badge-face badge-front">
                  <span className="badge-photo-wrap">
                    <img
                      src="/images/Tezza-5566.jpg"
                      alt="Nanna Bay Jacobsen"
                    />
                    <span className="badge-photo-label">UX/UI Designer</span>
                    <span className="badge-photo-globe">
                      ◎ AVAILABLE WORLDWIDE
                    </span>
                  </span>
                  <span className="badge-copy">
                    <span className="badge-name">Nanna</span>
                    <span className="badge-role">Product and web Designer</span>
                    <span className="availability">
                      <i />
                      Looking for an internship
                    </span>
                    <span className="badge-code">
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                      <small>ID 0001</small>
                    </span>
                  </span>
                </span>
                <span className="badge-face badge-back">
                  <span className="back-kicker">A little about my work</span>
                  <span className="back-title">What I do</span>
                  <span className="back-service">
                    <b>01 / Designer</b>
                    <small>UI/UX, product design, Figma</small>
                  </span>
                  <span className="back-service">
                    <b>02 / Builder</b>
                    <small>Framer, Shopify, WordPress, AI</small>
                  </span>
                  <span className="back-service">
                    <b>03 / Creator</b>
                    <small>AI visuals, tech content</small>
                  </span>
                  <span className="back-note">
                    Designing things people actually use.
                  </span>
                  <span className="back-bottom">
                    <span>NANNA · DESIGN</span>
                    <span className="mini-barcode">▥▥▥▥▥</span>
                  </span>
                </span>
              </span>
            </button>
          </div>
          <div className="intro-footer">
            <p className="type-line" data-type-line>
              {typedText}
            </p>
            <a href="#about" className="scroll-cue">
              Scroll <i />
            </a>
          </div>
        </section>

        <section className="about section-pink section-pad" id="about">
          <div className="about-collage reveal reveal-from-left">
            <figure className="photo-main">
              <img src="/images/Tezza-1609.jpg" alt="Nanna Bay Jacobsen" />
              <figcaption>01 — A little introduction</figcaption>
            </figure>
            <figure className="photo-small">
              <img
                src="https://images.unsplash.com/photo-1591382696684-38c427c7547a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Creative workspace"
              />
            </figure>
            <span className="hand-note">hi, I'm Nanna</span>
          </div>
          <div className="about-copy reveal reveal-from-right">
            <p className="eyebrow">A designer who builds</p>
            <h1>{aboutHeading}</h1>
            <p>{sections.about.copy}</p>
            <a className="text-link" href="#about-me">
              A little more about me <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="services section-purple section-pad" id="services">
          <div className="section-heading reveal">
            <p className="eyebrow">From first sketch to launch</p>
            <h2>
              What I do<span>.</span>
            </h2>
          </div>
          <div className="service-list">
            {sections.services.rows.map((service, index) => (
              <article
                className={`service-row reveal ${index % 2 ? "reveal-from-right" : "reveal-from-left"}`}
                key={service.title}
              >
                <span className="service-index">0{index + 1}</span>
                <span className="service-icon" aria-hidden="true">
                  <img src={`/SVG/${service.title.toLowerCase()}.svg`} alt="" />
                </span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className="service-arrow" aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
          </div>
        </section>

        <section
          className="stats section-pink section-pad"
          aria-label="Experience in numbers"
        >
          <div className="stats-grid">
            {sections.stats.items.map((item) => (
              <article className="stat-item reveal" key={item.label}>
                <p
                  className="stat-number"
                  data-target={item.value}
                  data-suffix={item.suffix}
                >
                  0
                </p>
                <p className="stat-label">{item.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="tool-strip section-purple"
          aria-label="Tools I work with"
        >
          <div className="marquee-track" aria-hidden="true">
            {[0, 1].map((group) => (
              <div className="marquee-group" key={group}>
                {sections.marquee.items.map((tool, index) => (
                  <span className="marquee-item" key={`${tool}-${index}`}>
                    {tool}
                    <i aria-hidden="true">✳</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="work-section section-pink" id="work">
          <div className="work-pin">
            <div className="work-heading reveal">
              <p className="eyebrow">A few things I've made</p>
              <h2>
                Selected work<span>.</span>
              </h2>
              <p>Websites and apps are my proudest work</p>
            </div>
            <div className="work-track" data-work-track>
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  index={index}
                />
              ))}
            </div>
            <div
              className="work-progress"
              aria-label="Project gallery progress"
            >
              <span data-work-progress />
            </div>
          </div>
        </section>

        <AboutMeSection sections={sections} />

        <section className="contact section-pink section-pad" id="contact">
          <p className="eyebrow reveal">Have a good one in mind?</p>
          <h2 className="reveal">
            Got an idea?
            <br />
            Let's build it<span>.</span>
          </h2>
          <div className="contact-actions reveal">
            <a
              className="button button-dark"
              href={`mailto:${sections.contact.email}?subject=Project%20enquiry`}
            >
              Contact me <span aria-hidden="true">↗</span>
            </a>
            <a
              className="button button-outline"
              href={`tel:${sections.contact["phone number"].replace(/[^+\d]/g, "")}`}
            >
              Get a quote <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="contact-details">
            <a href={`mailto:${sections.contact.email}`}>
              <small>Email</small>
              <span>{sections.contact.email}</span>
            </a>
            <a
              href={`tel:${sections.contact["phone number"].replace(/[^+\d]/g, "")}`}
            >
              <small>Phone</small>
              <span>{sections.contact["phone number"]}</span>
            </a>
            <a
              className="contact-social"
              href={sections.contact["LinkedIn URL"]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <small>LinkedIn</small>
              <span>{sections.contact.LinkedIn} ↗</span>
            </a>
          </div>
          <footer className="site-footer">
            <span>© {new Date().getFullYear()} Nanna</span>
            <a href="#intro">Back to top ↑</a>
          </footer>
        </section>
      </main>
      <a
        className="phone-float"
        data-contact-float
        href={`tel:${sections.contact["phone number"].replace(/[^+\d]/g, "")}`}
        aria-label="Call Nanna"
      >
        <span aria-hidden="true">☎</span>
      </a>
    </>
  );
}

function ProjectCard({ project, index }) {
  return (
    <Link
      className="project-card reveal"
      to={`/projects/${slugify(project.name)}`}
      aria-label={`View ${project.name} project details`}
    >
      <ProjectArtwork project={project} index={index} />
      <div className="project-caption">
        <span>{project.name}</span>
        <small>{project.category}</small>
      </div>
    </Link>
  );
}

function ProjectArtwork({ project, index }) {
  const isFjera = slugify(project.name) === "fjera";
  const isToKYou = slugify(project.name) === "to-k-you";
  const isMellemrum = slugify(project.name) === "mellemrum";

  return (
    <div
      className={`project-art project-art--${index + 1}${isFjera ? " project-art--fjera" : ""}${isToKYou ? " project-art--to-k-you" : ""}${isMellemrum ? " project-art--mellemrum" : ""}`}
      aria-label={`${project.type} project preview`}
    >
      {isFjera || isToKYou || isMellemrum ? (
        <img
          className="project-art-image"
          src={
            isFjera
              ? "/projects/fjera7.svg"
              : isToKYou
                ? "/projects/to-k-you.svg"
                : "/projects/mellem-gallery/muckup-mellemrum.svg"
          }
          alt={
            isFjera
              ? "Fjera-app vist på to mobiltelefoner"
              : isToKYou
                ? "To-K-You fashion webshop design"
                : "Mellemrum social event website main page"
          }
        />
      ) : (
        <div className="project-window">
          <div className="project-window__bar">
            <i />
            <i />
            <i />
            <span>{slugify(project.name)}.com</span>
          </div>
          <div className="project-window__content">
            <div className="project-ui-brand">{project.name}</div>
            <div className="project-ui-copy">
              <span />
              <span />
              <span />
            </div>
            <div className="project-ui-button" />
            <div className="project-ui-visual">
              <b />
              <b />
              <b />
            </div>
          </div>
        </div>
      )}
      <span className="project-index">0{index + 1}</span>
    </div>
  );
}

function AboutMeSection({ sections }) {
  return (
    <section className="about-me section-purple section-pad" id="about-me">
      <div className="about-me-photo reveal">
        <img src="/images/Tezza-5566.jpg" alt="Nanna Bay Jacobsen" />
        <span className="photo-caption">NANNA BAY S. JACOBSEN · DENMARK</span>
      </div>
      <div className="about-me-copy reveal reveal-from-right">
        <p className="eyebrow">The person behind the pixels</p>
        <h2>
          About me<span>.</span>
        </h2>
        <span className="feature-pill">✳ Multimedia Design Student</span>
        <p className="about-me-intro">{sections.about_me.copy}</p>
        <h3>A few things I love</h3>
        <ul className="love-list">
          {sections.about_me.loves.map((item) => (
            <li key={item}>
              <span aria-hidden="true">♡</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="social-links">
          {sections.about_me.socials.map((item) =>
            item.startsWith("LinkedIn:") ? (
              <a
                href={sections.contact["LinkedIn URL"]}
                target="_blank"
                rel="noopener noreferrer"
                key={item}
              >
                {item} <span aria-hidden="true">↗</span>
              </a>
            ) : item.startsWith("@") ? (
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                key={item}
              >
                {item} <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span key={item}>{item}</span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectPage({ projects }) {
  const { slug } = useParams();
  const projectIndex = projects.findIndex(
    (project) => slugify(project.name) === slug,
  );
  const project = projects[projectIndex];
  const location = useLocation();

  useEffect(() => {
    if (!project) return;
    document.title = `${project.name} — Nanna Bay Jacobsen`;
    window.scrollTo(0, 0);
    return () => {
      document.title = "Nanna — Designer, Developer, Creator";
    };
  }, [project, location.key]);

  if (!project) return <NotFoundPage />;

  const previousProject =
    projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const projectDisplayName = project.name.replace(/\.+$/, "");
  const projectArticle = /^[aeiou]/i.test(project.type) ? "an" : "a";

  return (
    <div className="project-detail-page">
      <header className="detail-header">
        <Link className="brand" to="/" aria-label="Nanna, home">
          nanna
        </Link>
        <Link className="detail-back" to="/#work">
          ← Back to selected work
        </Link>
      </header>
      <main className="project-detail-main">
        <section className="project-detail-hero">
          <p className="eyebrow">Selected work · 0{projectIndex + 1}</p>
          <h1>
            {projectDisplayName}
            <span>.</span>
          </h1>
          <p className="detail-subtitle">
            {project.category} <span aria-hidden="true">/</span> {project.type}
          </p>
          <div className="detail-art-shell">
            <ProjectArtwork project={project} index={projectIndex} />
          </div>
        </section>
        {slugify(project.name) === "mellemrum" ? (
          <MellemrumCaseStudy project={project} />
        ) : slugify(project.name) === "to-k-you" ? (
          <ToKYouCaseStudy project={project} />
        ) : project.case_study ? (
          <FjeraCaseStudy project={project} />
        ) : (
          <section className="project-overview section-pink">
            <div className="project-overview-heading">
              <p className="eyebrow">Project overview</p>
              <h2>
                A closer look at {projectDisplayName}
                <span>.</span>
              </h2>
            </div>
            <p className="project-overview-copy">
              {projectDisplayName} is {projectArticle}{" "}
              {project.type.toLowerCase()} project in the {project.category}{" "}
              category.
            </p>
            <dl className="project-facts">
              <div>
                <dt>Project</dt>
                <dd>{project.name}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{project.category}</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>{project.type}</dd>
              </div>
            </dl>
          </section>
        )}
        <section className="project-detail-contact section-purple">
          <p className="eyebrow">More selected work</p>
          <h2>
            Have a project in mind<span>?</span>
          </h2>
          <div className="project-pagination">
            <Link to={`/projects/${slugify(previousProject.name)}`}>
              ← {previousProject.name}
            </Link>
            <Link to="/#work">All projects</Link>
            <Link to={`/projects/${slugify(nextProject.name)}`}>
              {nextProject.name} →
            </Link>
          </div>
          <a
            className="button button-outline"
            href="mailto:nbnnannabay@gmail.com?subject=Project%20enquiry"
          >
            Contact me <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>
    </div>
  );
}

function NotFoundPage() {
  return (
    <main className="project-not-found section-purple">
      <p className="eyebrow">Page not found</p>
      <h1>
        This project isn't here<span>.</span>
      </h1>
      <Link className="button button-outline" to="/#work">
        Back to selected work <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}

export default App;
