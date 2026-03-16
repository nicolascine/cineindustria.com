const data = window.cineIndustriaData;

const statsRoot = document.querySelector("#hero-stats");
const manifestoRoot = document.querySelector("#manifesto-grid");
const seriesRoot = document.querySelector("#series-grid");
const filmStageRoot = document.querySelector("#film-stage");
const filmStripRoot = document.querySelector("#film-strip");
const filmCounterRoot = document.querySelector("#film-counter");
const filmPrevButton = document.querySelector("#film-prev");
const filmNextButton = document.querySelector("#film-next");

if (statsRoot) {
  statsRoot.innerHTML = data.stats
    .map(
      (item) => `
        <li>
          <strong>${item.value}</strong>
          <span>${item.label}</span>
        </li>
      `
    )
    .join("");
}

if (manifestoRoot) {
  manifestoRoot.innerHTML = data.manifesto
    .map(
      (item) => `
        <article class="manifesto-card">
          <strong>${item.title}</strong>
          <p>${item.text}</p>
        </article>
      `
    )
    .join("");
}

if (seriesRoot) {
  seriesRoot.innerHTML = data.series
    .map(
      (item) => `
        <article class="series-card">
          <em>${item.tag}</em>
          <strong>${item.title}</strong>
          <p>${item.description}</p>
        </article>
      `
    )
    .join("");
}

if (
  filmStageRoot &&
  filmStripRoot &&
  filmCounterRoot &&
  filmPrevButton &&
  filmNextButton
) {
  filmStageRoot.innerHTML = data.visualMap
    .map(
      (item, index) => `
        <article
          class="film-stage-card ${index === 0 ? "is-active" : ""}"
          id="film-panel-${index}"
          role="tabpanel"
          aria-hidden="${index === 0 ? "false" : "true"}"
          aria-labelledby="film-thumb-${index}"
          aria-label="${item.title}"
          data-film-panel="${index}"
        >
          <div class="film-stage-media">
            <img
              class="film-stage-image"
              src="${item.image}"
              alt="${item.title}"
              loading="${index < 2 ? "eager" : "lazy"}"
              decoding="async"
              fetchpriority="${index === 0 ? "high" : "auto"}"
            />
          </div>

          <div class="film-stage-overlay">
            <div class="film-stage-copy">
              <p class="film-stage-label">${item.label}</p>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
            </div>

            <div class="film-stage-meta">
              <span>${item.director}</span>
              <span>${item.year}</span>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  filmStripRoot.innerHTML = data.visualMap
    .map(
      (item, index) => `
        <button
          class="film-thumb ${index === 0 ? "is-active" : ""}"
          id="film-thumb-${index}"
          type="button"
          role="tab"
          aria-selected="${index === 0 ? "true" : "false"}"
          aria-controls="film-panel-${index}"
          aria-label="${item.title}"
          data-film-thumb="${index}"
        >
          <span class="film-thumb-media">
            <img
              src="${item.thumb || item.image}"
              alt="Fotograma de ${item.title}"
              loading="lazy"
              decoding="async"
            />
          </span>
          <span class="film-thumb-copy">
            <span class="film-thumb-index">${String(index + 1).padStart(2, "0")}</span>
            <strong>${item.title}</strong>
            <span>${item.label}</span>
          </span>
        </button>
      `
    )
    .join("");

  const filmPanels = [...filmStageRoot.querySelectorAll("[data-film-panel]")];
  const filmThumbs = [...filmStripRoot.querySelectorAll("[data-film-thumb]")];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const totalFilms = filmPanels.length;

  let activeFilm = 0;

  const updateFilmCarousel = (nextIndex) => {
    activeFilm = (nextIndex + totalFilms) % totalFilms;

    filmPanels.forEach((panel, index) => {
      const isActive = index === activeFilm;
      panel.classList.toggle("is-active", isActive);
      panel.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    filmThumbs.forEach((thumb, index) => {
      const isActive = index === activeFilm;
      thumb.classList.toggle("is-active", isActive);
      thumb.setAttribute("aria-selected", isActive ? "true" : "false");
      if (isActive) {
        thumb.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "nearest",
          inline: "center"
        });
      }
    });

    filmCounterRoot.textContent = `${String(activeFilm + 1).padStart(2, "0")} / ${String(totalFilms).padStart(2, "0")}`;
  };

  filmThumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      updateFilmCarousel(Number(thumb.dataset.filmThumb));
    });

    thumb.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        const targetIndex = (activeFilm + 1) % totalFilms;
        updateFilmCarousel(targetIndex);
        filmThumbs[targetIndex]?.focus();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        const targetIndex = (activeFilm - 1 + totalFilms) % totalFilms;
        updateFilmCarousel(targetIndex);
        filmThumbs[targetIndex]?.focus();
      }
    });
  });

  filmPrevButton.addEventListener("click", () => {
    updateFilmCarousel(activeFilm - 1);
  });

  filmNextButton.addEventListener("click", () => {
    updateFilmCarousel(activeFilm + 1);
  });

  updateFilmCarousel(0);
}
