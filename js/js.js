async function startPortfolio() {
  const briefResponse = await fetch("/portfolio-brief.json");

  if (!briefResponse.ok) {
    throw new Error("Could not load portfolio-brief.json");
  }

  const brief = await briefResponse.json();
  const sections = Object.fromEntries(
    brief.sections.map((section) => [section.id, section]),
  );
  const contactEmail = sections.contact.email;
  const contactPhone = sections.contact["phone number"];
  const contactPhoneHref = contactPhone.replace(/[^+\d]/g, "");
  const primarySocial = sections.contact.LinkedIn;
  const linkedinUrl = sections.contact["LinkedIn URL"];
  const instagramUrl = "https://www.instagram.com/nannabayjacobsen/";
  const escapeHtml = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[character],
    );

  const projectsMarkup = sections.work.projects_in_order
    .map(
      (project, index) => `
	<article class="project-card reveal" data-project="${index + 1}">
		<div class="project-art project-art--${index + 1}" aria-label="Illustrative ${escapeHtml(project.type)} project preview">
			<div class="project-window">
				<div class="project-window__bar"><i></i><i></i><i></i><span>${escapeHtml(project.name.toLowerCase())}.com</span></div>
				<div class="project-window__content">
					<div class="project-ui-brand">${escapeHtml(project.name)}</div>
					<div class="project-ui-copy"><span></span><span></span><span></span></div>
					<div class="project-ui-button"></div>
					<div class="project-ui-visual"><b></b><b></b><b></b></div>
				</div>
			</div>
			<span class="project-index">0${index + 1}</span>
		</div>
		<div class="project-caption"><span>${escapeHtml(project.name)}</span><small>${escapeHtml(project.category)}</small></div>
	</article>
`,
    )
    .join("");

  const serviceMarkup = sections.services.rows
    .map(
      (service, index) => `
	<article class="service-row reveal ${index % 2 ? "reveal-from-right" : "reveal-from-left"}">
		<span class="service-index">0${index + 1}</span>
    <span class="service-icon" aria-hidden="true"><img src="/SVG/${escapeHtml(service.title.toLowerCase())}.svg" alt="" /></span>
		<h3>${escapeHtml(service.title)}</h3>
		<p>${escapeHtml(service.text)}</p>
		<span class="service-arrow" aria-hidden="true">↗</span>
	</article>
`,
    )
    .join("");

  const statsMarkup = sections.stats.items
    .map(
      (item) => `
	<article class="stat-item reveal">
		<p class="stat-number" data-target="${item.value}" data-suffix="${escapeHtml(item.suffix)}">0</p>
		<p class="stat-label">${escapeHtml(item.label)}</p>
	</article>
`,
    )
    .join("");

  const toolsMarkup = sections.marquee.items
    .map(
      (tool) => `<span>${escapeHtml(tool)}</span><i aria-hidden="true">✳</i>`,
    )
    .join("");
  const lovesMarkup = sections.about_me.loves
    .map(
      (item) => `<li><span aria-hidden="true">♡</span>${escapeHtml(item)}</li>`,
    )
    .join("");
  const socialsMarkup = sections.about_me.socials
    .map((item) =>
      item.startsWith("LinkedIn:")
        ? `<a href="${escapeHtml(linkedinUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item)} <span aria-hidden="true">↗</span></a>`
        : item.startsWith("@")
          ? `<a href="${instagramUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(item)} <span aria-hidden="true">↗</span></a>`
          : `<span>${escapeHtml(item)}</span>`,
    )
    .join("");

  document.querySelector("#app").innerHTML = `
	<header class="site-header" data-site-header>
    <a class="brand" href="#intro" aria-label="Nanna, back to top">nanna</a>
		<nav aria-label="Main navigation">
			<a href="#work">Work</a>
			<a href="#about-me">About</a>
      <a class="nav-contact" href="mailto:${escapeHtml(contactEmail)}?subject=Project%20enquiry"><i></i>Contact me</a>
		</nav>
	</header>
	<main id="main">
		<section class="intro section-purple" id="intro" aria-label="Introduction">
			<div class="intro-words" aria-hidden="true">
				<span class="intro-word intro-word--designer">Designer</span>
				<span class="intro-word intro-word--developer">Developer</span>
				<span class="intro-word intro-word--creator">Creator</span>
				<span class="intro-word intro-word--tutor">Tutor</span>
			</div>
			<div class="badge-drop">
				<span class="lanyard" aria-hidden="true"></span>
				<span class="badge-clip" aria-hidden="true"></span>
        <button class="id-card" type="button" aria-label="Flip Nanna's profile card" aria-pressed="false">
					<span class="id-card__inner">
						<span class="badge-face badge-front">
              <span class="badge-photo-wrap"><img src="/images/Tezza-5566.jpg" alt="Nanna Bay Jacobsen" /><span class="badge-photo-label">UX/UI Designer</span><span class="badge-photo-globe">◎ AVAILABLE WORLDWIDE</span></span>
              <span class="badge-copy"><span class="badge-name">Nanna</span><span class="badge-role">Product and web Designer</span><span class="availability"><i></i>Looking for an internship</span><span class="badge-code"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><small>ID 0001</small></span></span>
						</span>
						<span class="badge-face badge-back">
							<span class="back-kicker">A little about my work</span><span class="back-title">What I do</span>
							<span class="back-service"><b>01 / Designer</b><small>UI/UX, product design, Figma</small></span>
							<span class="back-service"><b>02 / Builder</b><small>Framer, Shopify, WordPress, AI</small></span>
							<span class="back-service"><b>03 / Creator</b><small>AI visuals, tech content</small></span>
							<span class="back-note">Designing things people actually use.</span>
              <span class="back-bottom"><span>NANNA · DESIGN</span><span class="mini-barcode">▥▥▥▥▥</span></span>
						</span>
					</span>
				</button>
			</div>
			<div class="intro-footer"><p class="type-line" data-type-line></p><a href="#about" class="scroll-cue">Scroll <i></i></a></div>
		</section>

		<section class="about section-pink section-pad" id="about">
			<div class="about-collage reveal reveal-from-left">
        <figure class="photo-main"><img src="/images/Tezza-1609.jpg" alt="Nanna Bay Jacobsen" /><figcaption>01 — A little introduction</figcaption></figure>
        <figure class="photo-small"><img src="https://images.unsplash.com/photo-1591382696684-38c427c7547a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Creative workspace" /></figure>
        <span class="hand-note">hi, I'm Nanna</span>
			</div>
			<div class="about-copy reveal reveal-from-right"><p class="eyebrow">A designer who builds</p><h1>${escapeHtml(sections.about.layout.match(/heading '([^']+)'/)?.[1] || "I design things people actually use.")}</h1><p>${escapeHtml(sections.about.copy)}</p><a class="text-link" href="#about-me">A little more about me <span aria-hidden="true">↗</span></a></div>
		</section>

		<section class="services section-purple section-pad" id="services">
			<div class="section-heading reveal"><p class="eyebrow">From first sketch to launch</p><h2>What I do<span>.</span></h2></div>
			<div class="service-list">${serviceMarkup}</div>
		</section>

		<section class="stats section-pink section-pad" aria-label="Experience in numbers"><div class="stats-grid">${statsMarkup}</div></section>

		<section class="tool-strip section-purple" aria-label="Tools I work with"><div class="marquee-track" aria-hidden="true"><div class="marquee-group">${toolsMarkup}</div><div class="marquee-group">${toolsMarkup}</div></div></section>

		<section class="work-section section-pink" id="work">
			<div class="work-pin">
				<div class="work-heading reveal"><p class="eyebrow">A few things I've made</p><h2>Selected work<span>.</span></h2><p>Websites and apps are my proudest work</p></div>
				<div class="work-track" data-work-track>${projectsMarkup}</div>
				<div class="work-progress" aria-label="Project gallery progress"><span data-work-progress></span></div>
			</div>
		</section>

		<section class="about-me section-purple section-pad" id="about-me">
      <div class="about-me-photo reveal"><img src="/images/Tezza-5566.jpg" alt="Temporary portrait placeholder; replace with Nanna's photo" /><span class="photo-caption">NANNA BAY S. JACOBSEN · DENMARK</span></div>
			<div class="about-me-copy reveal reveal-from-right"><p class="eyebrow">The person behind the pixels</p><h2>About me<span>.</span></h2><span class="feature-pill">✳ Multimedia Design Student</span><p class="about-me-intro">${escapeHtml(sections.about_me.copy)}</p><h3>A few things I love</h3><ul class="love-list">${lovesMarkup}</ul><div class="social-links">${socialsMarkup}</div></div>
		</section>

		<section class="contact section-pink section-pad" id="contact">
			<p class="eyebrow reveal">Have a good one in mind?</p><h2 class="reveal">Got an idea?<br />Let's build it<span>.</span></h2>
      <div class="contact-actions reveal"><a class="button button-dark" href="mailto:${escapeHtml(contactEmail)}?subject=Project%20enquiry">Contact me <span aria-hidden="true">↗</span></a><a class="button button-outline" href="tel:${escapeHtml(contactPhoneHref)}">Get a quote <span aria-hidden="true">↗</span></a></div>
      <div class="contact-details"><a href="mailto:${escapeHtml(contactEmail)}"><small>Email</small><span>${escapeHtml(contactEmail)}</span></a><a href="tel:${escapeHtml(contactPhoneHref)}"><small>Phone</small><span>${escapeHtml(contactPhone)}</span></a><a class="contact-social" href="${escapeHtml(linkedinUrl)}" target="_blank" rel="noopener noreferrer"><small>LinkedIn</small><span>${escapeHtml(primarySocial)} ↗</span></a></div>
      <footer class="site-footer"><span>© ${new Date().getFullYear()} Nanna</span><a href="#intro">Back to top ↑</a></footer>
		</section>
	</main>
  <a class="phone-float" data-contact-float href="tel:${escapeHtml(contactPhoneHref)}" aria-label="Call Nanna"><span aria-hidden="true">☎</span></a>
`;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const intro = document.querySelector("#intro");
  const header = document.querySelector("[data-site-header]");
  const contactFloat = document.querySelector("[data-contact-float]");
  const idCard = document.querySelector(".id-card");
  let flipTimer;

  const flipCard = () => {
    const flipped = idCard.classList.toggle("is-flipped");
    idCard.setAttribute("aria-pressed", String(flipped));
  };

  const scheduleFlip = (delay) => {
    window.clearTimeout(flipTimer);
    if (!reducedMotion) {
      flipTimer = window.setTimeout(() => {
        flipCard();
        scheduleFlip(3600);
      }, delay);
    }
  };

  idCard.addEventListener("click", () => {
    flipCard();
    scheduleFlip(3600);
  });
  scheduleFlip(3100);

  const typeLine = document.querySelector("[data-type-line]");
  const typeMessages = [
    "Designing apps people love",
    "Building websites that sell",
    "Creating AI content for brands",
    "Based in Denmark, working worldwide",
  ];
  let messageIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typeNext() {
    const message = typeMessages[messageIndex];
    characterIndex += deleting ? -1 : 1;
    typeLine.textContent = message.slice(0, characterIndex);
    let delay = deleting ? 28 : 48;
    if (!deleting && characterIndex === message.length) {
      deleting = true;
      delay = 1500;
    } else if (deleting && characterIndex === 0) {
      deleting = false;
      messageIndex = (messageIndex + 1) % typeMessages.length;
      delay = 340;
    }
    window.setTimeout(typeNext, delay);
  }

  if (reducedMotion) {
    typeLine.textContent = typeMessages[0];
  } else {
    typeNext();
  }

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

  const statsObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const number = entry.target;
        const target = Number(number.dataset.target);
        const suffix = number.dataset.suffix;
        const startTime = performance.now();
        const duration = reducedMotion ? 0 : 1800;
        const tick = (now) => {
          const progress =
            duration === 0 ? 1 : Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          number.textContent = `${Math.round(target * eased)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.unobserve(number);
      });
    },
    { threshold: 0.6 },
  );

  document
    .querySelectorAll(".stat-number")
    .forEach((number) => statsObserver.observe(number));

  const workSection = document.querySelector(".work-section");
  const workTrack = document.querySelector("[data-work-track]");
  const workProgress = document.querySelector("[data-work-progress]");
  let scrollFrame = 0;

  function sizeWorkSection() {
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
  }

  function updateScrollEffects() {
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
    }
    if (!reducedMotion) {
      const maxScroll = workSection.offsetHeight - window.innerHeight;
      const progress =
        maxScroll > 0
          ? Math.max(
              0,
              Math.min((window.scrollY - workSection.offsetTop) / maxScroll, 1),
            )
          : 0;
      const distance = Math.max(
        0,
        workTrack.scrollWidth - window.innerWidth + 48,
      );
      workTrack.style.transform = `translate3d(${-distance * progress}px, 0, 0)`;
      workProgress.style.transform = `scaleX(${Math.max(progress, 0.025)})`;
    }
  }

  function requestScrollUpdate() {
    const introProgress = Math.min(
      window.scrollY / (intro.offsetHeight * 0.7),
      1,
    );
    header.classList.toggle("is-visible", introProgress >= 1);
    contactFloat.classList.toggle("is-visible", introProgress >= 1);
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollEffects);
  }

  sizeWorkSection();
  updateScrollEffects();
  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", () => {
    sizeWorkSection();
    requestScrollUpdate();
  });
}

startPortfolio().catch((error) => {
  console.error(error);
  document.querySelector("#app").innerHTML =
    '<p class="load-error">The portfolio could not be loaded. Please refresh the page.</p>';
});
