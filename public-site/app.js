const data = window.cineIndustriaData;

const signalCopyRoot = document.querySelector("#signal-copy");
const statsRoot = document.querySelector("#hero-stats");
const frameWallRoot = document.querySelector("#frame-wall-grid");
const manifestoRoot = document.querySelector("#manifesto-grid");
const seriesRoot = document.querySelector("#series-grid");
const calendarRoot = document.querySelector("#calendar-grid");
const referenceRoot = document.querySelector("#reference-grid");

if (signalCopyRoot && Array.isArray(data.signalFeed) && data.signalFeed.length > 0) {
  let signalIndex = 0;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  signalCopyRoot.textContent = data.signalFeed[signalIndex];

  if (!reduceMotion && data.signalFeed.length > 1) {
    window.setInterval(() => {
      signalCopyRoot.classList.add("is-updating");

      window.setTimeout(() => {
        signalIndex = (signalIndex + 1) % data.signalFeed.length;
        signalCopyRoot.textContent = data.signalFeed[signalIndex];
        signalCopyRoot.classList.remove("is-updating");
      }, 180);
    }, 4200);
  }
}

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

if (frameWallRoot) {
  frameWallRoot.innerHTML = data.frameWall
    .map(
      (item, index) => `
        <a class="frame-wall-card" href="${item.url}" target="_blank" rel="noreferrer">
          <img class="frame-wall-media" src="${item.image}" alt="${item.title}" loading="${index < 2 ? "eager" : "lazy"}" decoding="async" fetchpriority="${index === 0 ? "high" : "auto"}" />
          <div class="frame-wall-copy">
            <span>${item.label}</span>
            <strong>${item.title}</strong>
            <p>${item.text}</p>
          </div>
        </a>
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

if (calendarRoot) {
  calendarRoot.innerHTML = data.calendarPreview
    .map(
      (item) => `
        <article class="calendar-card">
          <header>
            <strong>${item.format}</strong>
            <time>${item.day}</time>
          </header>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
          <span class="calendar-cta">${item.cta}</span>
        </article>
      `
    )
    .join("");
}

if (referenceRoot) {
  referenceRoot.innerHTML = data.references
    .map(
      (item, index) => `
        <a class="reference-card" href="${item.url}" target="_blank" rel="noreferrer">
          <img class="reference-thumb" src="${item.image}" alt="${item.title}" loading="lazy" decoding="async" />
          <span class="reference-index">Ref ${String(index + 1).padStart(2, "0")}</span>
          <h3>${item.title}</h3>
          <p>${item.note}</p>
        </a>
      `
    )
    .join("");
}
