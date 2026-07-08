const DATA_URL = "data/tournament.json";

const state = {
  tournament: null
};

const roundLabels = {
  r32: "Ronda 32",
  r16: "Octavos",
  qf: "Cuartos",
  sf: "Semifinal"
};

const flagCodeMap = {
  MEX: "mx",
  RSA: "za",
  KOR: "kr",
  CZE: "cz",
  SUI: "ch",
  CAN: "ca",
  BIH: "ba",
  QAT: "qa",
  BRA: "br",
  MAR: "ma",
  SCO: "gb-sct",
  HAI: "ht",
  USA: "us",
  AUS: "au",
  PAR: "py",
  TUR: "tr",
  GER: "de",
  CIV: "ci",
  ECU: "ec",
  CUW: "cw",
  NED: "nl",
  JPN: "jp",
  SWE: "se",
  TUN: "tn",
  BEL: "be",
  EGY: "eg",
  IRN: "ir",
  NZL: "nz",
  ESP: "es",
  CPV: "cv",
  URU: "uy",
  KSA: "sa",
  FRA: "fr",
  NOR: "no",
  SEN: "sn",
  IRQ: "iq",
  ARG: "ar",
  AUT: "at",
  ALG: "dz",
  JOR: "jo",
  COL: "co",
  POR: "pt",
  COD: "cd",
  UZB: "uz",
  ENG: "gb-eng",
  CRO: "hr",
  GHA: "gh",
  PAN: "pa",
  TBD: ""
};

const fallbackTeams = [
  { code: "MEX", name: "México", flag: "🇲🇽", short: "MX" },
  { code: "RSA", name: "Sudáfrica", flag: "🇿🇦", short: "ZA" },
  { code: "BRA", name: "Brasil", flag: "🇧🇷", short: "BR" },
  { code: "ARG", name: "Argentina", flag: "🇦🇷", short: "AR" },
  { code: "ENG", name: "Inglaterra", flag: "🏴", short: "EN" },
  { code: "FRA", name: "Francia", flag: "🇫🇷", short: "FR" },
  { code: "ESP", name: "España", flag: "🇪🇸", short: "ES" },
  { code: "GER", name: "Alemania", flag: "🇩🇪", short: "DE" },
  { code: "BEL", name: "Bélgica", flag: "🇧🇪", short: "BE" },
  { code: "POR", name: "Portugal", flag: "🇵🇹", short: "PT" },
  { code: "USA", name: "Estados Unidos", flag: "🇺🇸", short: "US" },
  { code: "CRO", name: "Croacia", flag: "🇭🇷", short: "HR" },
  { code: "SUI", name: "Suiza", flag: "🇨🇭", short: "CH" },
  { code: "COL", name: "Colombia", flag: "🇨🇴", short: "CO" },
  { code: "MAR", name: "Marruecos", flag: "🇲🇦", short: "MA" },
  { code: "JPN", name: "Japón", flag: "🇯🇵", short: "JP" },
  { code: "CAN", name: "Canadá", flag: "🇨🇦", short: "CA" },
  { code: "NED", name: "Países Bajos", flag: "🇳🇱", short: "NL" },
  { code: "NOR", name: "Noruega", flag: "🇳🇴", short: "NO" },
  { code: "EGY", name: "Egipto", flag: "🇪🇬", short: "EG" },
  { code: "SEN", name: "Senegal", flag: "🇸🇳", short: "SN" },
  { code: "GHA", name: "Ghana", flag: "🇬🇭", short: "GH" }
];

const teamKits = {
  MEX: { primary: "#0b7a45", secondary: "#ffffff", shorts: "#0a5531", socks: "#ffffff" },
  RSA: { primary: "#0c7a3d", secondary: "#f4d33b", shorts: "#12562f", socks: "#ffffff" },
  BRA: { primary: "#f1cc21", secondary: "#1d5ed1", shorts: "#2254c9", socks: "#ffffff" },
  ARG: { primary: "#89d0ff", secondary: "#ffffff", shorts: "#ffffff", socks: "#ffffff" },
  ENG: { primary: "#ffffff", secondary: "#d62839", shorts: "#1f3f95", socks: "#ffffff" },
  FRA: { primary: "#1c3f95", secondary: "#ffffff", shorts: "#ffffff", socks: "#e33d52" },
  ESP: { primary: "#c81f2e", secondary: "#f1d044", shorts: "#183c94", socks: "#101010" },
  GER: { primary: "#f4f4f4", secondary: "#111111", shorts: "#111111", socks: "#ffffff" },
  BEL: { primary: "#d62839", secondary: "#f4d33b", shorts: "#111111", socks: "#ffffff" },
  POR: { primary: "#a82132", secondary: "#1f7b43", shorts: "#0f6333", socks: "#ffffff" },
  USA: { primary: "#ffffff", secondary: "#2d5ed1", shorts: "#1f3f95", socks: "#ffffff" },
  CRO: { primary: "#ffffff", secondary: "#d62839", shorts: "#1f3f95", socks: "#ffffff" },
  SUI: { primary: "#d62839", secondary: "#ffffff", shorts: "#d62839", socks: "#ffffff" },
  COL: { primary: "#f4d33b", secondary: "#1d5ed1", shorts: "#d62839", socks: "#ffffff" },
  MAR: { primary: "#a61c2d", secondary: "#137146", shorts: "#137146", socks: "#ffffff" },
  JPN: { primary: "#1f3f95", secondary: "#ffffff", shorts: "#ffffff", socks: "#1f3f95" },
  CAN: { primary: "#d62839", secondary: "#ffffff", shorts: "#d62839", socks: "#ffffff" },
  NED: { primary: "#ff6d00", secondary: "#ffffff", shorts: "#ffffff", socks: "#ff6d00" },
  NOR: { primary: "#d62839", secondary: "#1f3f95", shorts: "#ffffff", socks: "#ffffff" },
  EGY: { primary: "#d62839", secondary: "#ffffff", shorts: "#111111", socks: "#ffffff" },
  SEN: { primary: "#0b7a45", secondary: "#f1cc21", shorts: "#ffffff", socks: "#ffffff" },
  GHA: { primary: "#ffffff", secondary: "#111111", shorts: "#f1cc21", socks: "#ffffff" },
  DEFAULT: { primary: "#2d7be5", secondary: "#ffffff", shorts: "#1d2b4f", socks: "#ffffff" }
};

const ballTexture = new Image();
ballTexture.src = "assets/ball-trionda.png";

const fullFlagCache = {};

document.addEventListener("DOMContentLoaded", () => {
  bindModeCards();
  bindRefreshButton();

  populateGameSelectors();
  initFullMatchGame();
  initPenaltyGame();

  loadTournament();

  setInterval(() => {
    loadTournament(false);
  }, 60000);

  window.addEventListener("resize", () => {
    resetFullMatchGame(false);
    resetPenaltyScene();
  });
});

/* =========================================================
   GENERAL
   ========================================================= */

function bindModeCards() {
  const dialog = document.getElementById("modeDialog");
  const closeDialog = document.getElementById("closeDialog");
  const dialogTitle = document.getElementById("dialogTitle");
  const dialogText = document.getElementById("dialogText");

  const modeInfo = {
    full: {
      title: "Partido completo",
      text: "Simulación moderna con círculos, banderas, balón libre, goles y ganador."
    },
    penalties: {
      title: "Penales",
      text: "Tanda de penales moderna con portero, cobrador, tiros, goles y fallos."
    }
  };

  document.querySelectorAll(".mode-card").forEach(card => {
    card.addEventListener("click", () => {
      const mode = card.dataset.mode;

      if (mode === "full") {
        document.getElementById("fullMatchGame")?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
        return;
      }

      if (mode === "penalties") {
        document.getElementById("penalesGame")?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
        return;
      }

      const info = modeInfo[mode];

      if (!info || !dialog || !dialogTitle || !dialogText) {
        return;
      }

      dialogTitle.textContent = info.title;
      dialogText.textContent = info.text;
      dialog.showModal();
    });
  });

  closeDialog?.addEventListener("click", () => {
    dialog?.close();
  });
}

function bindRefreshButton() {
  document.getElementById("refreshBtn")?.addEventListener("click", () => {
    loadTournament(true);
  });
}

function playWhistle(type) {
  const file = type === "final"
    ? "assets/silbato-final.wav"
    : "assets/silbato-inicio.wav";

  const audio = new Audio(file);
  audio.volume = 0.9;
  audio.play().catch(() => {});
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(randomBetween(min, max + 1));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeInOut(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function animate(duration, update) {
  return new Promise(resolve => {
    const start = performance.now();

    function frame(now) {
      const raw = Math.min(1, (now - start) / duration);
      update(raw);

      if (raw < 1) {
        requestAnimationFrame(frame);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(frame);
  });
}

function resizeCanvas(canvas) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(300, rect.width);
  const height = Math.max(250, rect.height);

  if (
    canvas.width !== Math.round(width * dpr) ||
    canvas.height !== Math.round(height * dpr)
  ) {
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
  }

  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  return { ctx, width, height };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

/* =========================================================
   EQUIPOS
   ========================================================= */

function getSelectableTeams() {
  const teams = [];

  if (state.tournament?.groups) {
    state.tournament.groups.forEach(group => {
      group.teams.forEach(team => {
        if (!teams.some(item => item.code === team.code)) {
          teams.push({
            code: team.code,
            name: team.name,
            flag: team.flag || "⚽",
            short: team.short || team.code
          });
        }
      });
    });
  }

  return teams.length ? teams : fallbackTeams;
}

function getTeamByCode(code) {
  return getSelectableTeams().find(team => team.code === code) || getSelectableTeams()[0] || fallbackTeams[0];
}

function getKit(code) {
  return teamKits[code] || teamKits.DEFAULT;
}

function populateGameSelectors() {
  const selectors = [
    document.getElementById("fullHomeTeam"),
    document.getElementById("fullAwayTeam"),
    document.getElementById("penaltyHomeTeam"),
    document.getElementById("penaltyAwayTeam")
  ].filter(Boolean);

  const teams = getSelectableTeams();

  selectors.forEach((select, index) => {
    const previous = select.value;

    select.innerHTML = teams.map(team => {
      return `<option value="${team.code}">${team.code} - ${team.name}</option>`;
    }).join("");

    if (previous && teams.some(team => team.code === previous)) {
      select.value = previous;
    } else if (index === 1 || index === 3) {
      select.selectedIndex = Math.min(1, teams.length - 1);
    } else {
      select.selectedIndex = 0;
    }
  });

  updateFullLabels();
  updatePenaltyLabels();
}

/* =========================================================
   BRACKET
   ========================================================= */

async function loadTournament(showManualMessage = false) {
  try {
    showLoading();

    const response = await fetch(`${DATA_URL}?v=${Date.now()}`);

    if (!response.ok) {
      throw new Error("No se pudo cargar el archivo de datos del bracket.");
    }

    const data = await response.json();
    state.tournament = data;

    renderTournament();

    if (showManualMessage) {
      console.log("Bracket actualizado manualmente.");
    }
  } catch (error) {
    showError(error.message);
    populateGameSelectors();
  }
}

function showLoading() {
  const left = document.getElementById("bracketLeft");
  const right = document.getElementById("bracketRight");

  if (!state.tournament) {
    if (left) {
      left.innerHTML = `<div class="loading-message">Cargando bracket...</div>`;
    }

    if (right) {
      right.innerHTML = `<div class="loading-message">Cargando datos...</div>`;
    }
  }
}

function showError(message) {
  const left = document.getElementById("bracketLeft");

  if (left) {
    left.innerHTML = `<div class="error-message">${message}</div>`;
  }
}

function renderTournament() {
  renderGroups();
  renderBracketSide("left", ["r32", "r16", "qf", "sf"]);
  renderBracketSide("right", ["sf", "qf", "r16", "r32"]);
  renderCenterMatches();
  renderLastUpdate();
  populateGameSelectors();
}

function renderGroups() {
  const groupsLeft = document.getElementById("groupsLeft");
  const groupsRight = document.getElementById("groupsRight");

  if (!groupsLeft || !groupsRight) {
    return;
  }

  const groups = state.tournament.groups || [];

  groupsLeft.innerHTML = groups.slice(0, 6).map(groupTemplate).join("");
  groupsRight.innerHTML = groups.slice(6, 12).map(groupTemplate).join("");
}

function groupTemplate(group) {
  return `
    <article class="group-card" style="--group-color: ${group.color}">
      <div class="group-teams">
        ${group.teams.map(team => `
          <div class="group-team" title="${team.name}">
            ${flagTemplate(team)}
            <span class="group-team-code">${team.code}</span>
          </div>
        `).join("")}
      </div>
      <h3>GROUP ${group.id}</h3>
    </article>
  `;
}

function renderBracketSide(side, rounds) {
  const containerId = side === "left" ? "bracketLeft" : "bracketRight";
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  const matches = state.tournament.matches || [];

  container.innerHTML = rounds.map(round => {
    const roundMatches = matches.filter(match => match.side === side && match.round === round);

    return `
      <div class="round-column" data-round="${round}">
        <div class="round-title">${roundLabels[round]}</div>
        ${roundMatches.map(matchTemplate).join("")}
      </div>
    `;
  }).join("");
}

function renderCenterMatches() {
  const finalContainer = document.getElementById("finalMatch");
  const thirdContainer = document.getElementById("thirdPlaceMatch");

  if (!finalContainer || !thirdContainer) {
    return;
  }

  const matches = state.tournament.matches || [];
  const finalMatch = matches.find(match => match.round === "final");
  const thirdPlaceMatch = matches.find(match => match.round === "third");

  finalContainer.innerHTML = finalMatch ? matchTemplate(finalMatch) : "";
  thirdContainer.innerHTML = thirdPlaceMatch ? matchTemplate(thirdPlaceMatch) : "";
}

function matchTemplate(match) {
  const status = getStatusLabel(match);
  const homeWinner = match.winner === "home";
  const awayWinner = match.winner === "away";

  return `
    <article class="match-card ${match.status}">
      <div class="match-top">
        <span>${match.id}</span>
        <span class="match-status">${status}</span>
      </div>
      ${teamRowTemplate(match.home, match.score?.home, match.penalties?.home, homeWinner)}
      ${teamRowTemplate(match.away, match.score?.away, match.penalties?.away, awayWinner)}
    </article>
  `;
}

function teamRowTemplate(team, score, penaltyScore, isWinner) {
  const currentTeam = team || {
    name: "Por definir",
    code: "TBD",
    flag: "⚽"
  };

  const shownScore = score === null || score === undefined ? "" : score;
  const shownPenalty = penaltyScore === null || penaltyScore === undefined
    ? ""
    : `<small class="penalty-score">(${penaltyScore})</small>`;

  return `
    <div class="team-row ${isWinner ? "winner" : ""}">
      ${flagTemplate(currentTeam)}
      <span class="team-code" title="${currentTeam.name}">
        ${currentTeam.code || currentTeam.name}
      </span>
      <span class="score">${shownPenalty}${shownScore}</span>
    </div>
  `;
}

function flagTemplate(team) {
  const flagCode = flagCodeMap[team.code];

  if (!flagCode) {
    return `<span class="flag-emoji">${team.flag || "⚽"}</span>`;
  }

  return `
    <img
      class="flag-img"
      src="https://flagcdn.com/w80/${flagCode}.png"
      srcset="
        https://flagcdn.com/w40/${flagCode}.png 1x,
        https://flagcdn.com/w80/${flagCode}.png 2x,
        https://flagcdn.com/w160/${flagCode}.png 3x
      "
      alt="${team.name}"
      loading="lazy"
      decoding="async"
      onerror="this.style.display='none'; this.insertAdjacentHTML('afterend', '<span class=&quot;flag-emoji&quot;>${team.flag || "⚽"}</span>');"
    />
  `;
}

function getStatusLabel(match) {
  if (match.status === "live") {
    return match.minute ? `${match.minute}'` : "EN VIVO";
  }

  if (match.status === "finished") {
    return "Finalizado";
  }

  if (match.kickoffLabel) {
    return match.kickoffLabel;
  }

  if (match.kickoff) {
    return formatKickoff(match.kickoff);
  }

  return "Por jugar";
}

function formatKickoff(isoDate) {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return "Por jugar";
  }

  return date.toLocaleDateString("es-HN", {
    day: "2-digit",
    month: "short"
  });
}

function renderLastUpdate() {
  const lastUpdate = document.getElementById("lastUpdate");

  if (!lastUpdate) {
    return;
  }

  const updatedAt = state.tournament.meta?.updatedAt;

  if (!updatedAt) {
    lastUpdate.textContent = "Última actualización: datos iniciales";
    return;
  }

  const date = new Date(updatedAt);

  if (Number.isNaN(date.getTime())) {
    lastUpdate.textContent = "Última actualización: datos iniciales";
    return;
  }

  lastUpdate.textContent = `Última actualización: ${date.toLocaleString("es-HN")}`;
}

/* =========================================================
   DIBUJO GENERAL CANVAS
   ========================================================= */

function drawField(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);

  const grassGradient = ctx.createLinearGradient(0, 0, 0, height);
  grassGradient.addColorStop(0, "#16753a");
  grassGradient.addColorStop(0.5, "#1a8241");
  grassGradient.addColorStop(1, "#115b2e");

  ctx.fillStyle = grassGradient;
  ctx.fillRect(0, 0, width, height);

  const stripeWidth = width / 12;

  for (let i = 0; i < 12; i++) {
    ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)";
    ctx.fillRect(i * stripeWidth, 0, stripeWidth, height);
  }

  const glow = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, width * 0.55);
  glow.addColorStop(0, "rgba(255,255,255,0.13)");
  glow.addColorStop(1, "rgba(0,0,0,0.22)");

  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(255,255,255,0.92)";
  ctx.lineWidth = 3;

  ctx.strokeRect(8, 8, width - 16, height - 16);

  ctx.beginPath();
  ctx.moveTo(width / 2, 8);
  ctx.lineTo(width / 2, height - 8);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(width / 2, height / 2, 72, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeRect(8, height * 0.30, width * 0.12, height * 0.40);
  ctx.strokeRect(width - 8 - width * 0.12, height * 0.30, width * 0.12, height * 0.40);

  ctx.strokeRect(8, height * 0.42, width * 0.045, height * 0.16);
  ctx.strokeRect(width - 8 - width * 0.045, height * 0.42, width * 0.045, height * 0.16);
}

function drawGoalArea(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);

  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, "#0d3d22");
  bg.addColorStop(1, "#061e11");

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 1;

  for (let x = 0; x < width; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y < height; y += 42) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(255,255,255,0.96)";
  ctx.lineWidth = 8;
  ctx.strokeRect(8, 8, width - 16, height - 16);

  const glow = ctx.createRadialGradient(width / 2, height * 0.75, 10, width / 2, height * 0.75, width * 0.45);
  glow.addColorStop(0, "rgba(255,255,255,0.11)");
  glow.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);
}

function drawModernBall(ctx, ball) {
  ctx.save();
  ctx.translate(ball.x, ball.y);
  ctx.rotate(ball.rotation || 0);

  const r = ball.r || 16;

  if (ballTexture.complete && ballTexture.naturalWidth > 0) {
    ctx.drawImage(ballTexture, -r, -r, r * 2, r * 2);
  } else {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#111";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  ctx.restore();
}

function drawSilhouettePlayer(ctx, player, kit, time) {
  const skin = "#d1a27c";
  const dark = "#111111";
  const step = player.running ? Math.sin(time / 110 + player.seed) : 0;
  const lean = player.lean || 0;
  const jump = player.jump ? Math.sin(time / 90) * 3 : 0;

  ctx.save();
  ctx.translate(player.x, player.y + jump);
  ctx.rotate(lean);

  if (player.dive) {
    ctx.rotate(player.dive);
  }

  ctx.scale(player.scale || 1, player.scale || 1);

  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.beginPath();
  ctx.ellipse(0, 9, 19, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.strokeStyle = dark;
  ctx.lineWidth = 7;

  ctx.beginPath();
  ctx.moveTo(-7, -4);
  ctx.lineTo(-8 + step * 2, 16);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(7, -4);
  ctx.lineTo(9 - step * 2, 16);
  ctx.stroke();

  ctx.strokeStyle = kit.socks;
  ctx.lineWidth = 6;

  ctx.beginPath();
  ctx.moveTo(-8 + step * 2, 16);
  ctx.lineTo(-10 + step * 3, 27);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(9 - step * 2, 16);
  ctx.lineTo(11 - step * 3, 27);
  ctx.stroke();

  roundBox(ctx, -15 + step * 3, 25, 13, 5, 3, "#050505");
  roundBox(ctx, 3 - step * 3, 25, 13, 5, 3, "#050505");

  roundBox(ctx, -12, -15, 24, 16, 6, kit.shorts);

  const torsoGradient = ctx.createLinearGradient(0, -46, 0, -12);
  torsoGradient.addColorStop(0, kit.primary);
  torsoGradient.addColorStop(1, shadeColor(kit.primary, -18));
  roundBox(ctx, -16, -47, 32, 35, 10, torsoGradient);

  roundBox(ctx, -4, -43, 8, 14, 4, kit.secondary);

  ctx.strokeStyle = kit.primary;
  ctx.lineWidth = 8;

  ctx.beginPath();
  ctx.moveTo(-14, -39);
  ctx.lineTo(-27, -27 - step * 5);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(14, -39);
  ctx.lineTo(27, -27 + step * 5);
  ctx.stroke();

  ctx.strokeStyle = skin;
  ctx.lineWidth = 6;

  ctx.beginPath();
  ctx.moveTo(-27, -27 - step * 5);
  ctx.lineTo(-33, -15 - step * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(27, -27 + step * 5);
  ctx.lineTo(33, -15 + step * 2);
  ctx.stroke();

  roundBox(ctx, -5, -54, 10, 8, 4, skin);

  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.arc(0, -66, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#3b261a";
  ctx.beginPath();
  ctx.arc(0, -70, 12, Math.PI, 0);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#151515";
  ctx.beginPath();
  ctx.arc(-4, -66, 1.3, 0, Math.PI * 2);
  ctx.arc(4, -66, 1.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#7b4e37";
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.arc(0, -61, 3.8, 0, Math.PI);
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.94)";
  ctx.font = "bold 10px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(player.number), 0, -28);

  ctx.restore();
}

function roundBox(ctx, x, y, w, h, r, fillStyle) {
  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();
}

function shadeColor(color, percent) {
  const safe = color || "#2d7be5";
  const num = parseInt(safe.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);

  const r = Math.min(255, Math.max(0, (num >> 16) + amt));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));

  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

/* =========================================================
   PARTIDO COMPLETO CON CÍRCULOS Y BANDERAS
   ========================================================= */

const fullMatchGame = {
  canvas: null,
  players: [],
  ball: {
    x: 0,
    y: 0,
    r: 16,
    vx: 0,
    vy: 0,
    rotation: 0
  },
  running: false,
  minute: 0,
  homeScore: 0,
  awayScore: 0,
  possession: "home",
  lastFrameTime: 0,
  loopStarted: false,
  goalCooldown: false,
  messageCooldown: 0
};

function initFullMatchGame() {
  fullMatchGame.canvas = document.getElementById("fullMatchCanvas");

  if (!fullMatchGame.canvas) {
    return;
  }

  document.getElementById("startFullMatch")?.addEventListener("click", startFullMatchGame);
  document.getElementById("resetFullMatch")?.addEventListener("click", resetFullMatchGame);

  document.getElementById("fullHomeTeam")?.addEventListener("change", () => {
    updateFullLabels();
    resetFullMatchGame(false);
  });

  document.getElementById("fullAwayTeam")?.addEventListener("change", () => {
    updateFullLabels();
    resetFullMatchGame(false);
  });

  resetFullMatchGame(false);
  startFullMatchLoop();
}

function startFullMatchLoop() {
  if (fullMatchGame.loopStarted) {
    return;
  }

  fullMatchGame.loopStarted = true;

  function frame(time) {
    drawFullMatchScene(time);
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function startFullMatchGame() {
  const homeCode = document.getElementById("fullHomeTeam")?.value;
  const awayCode = document.getElementById("fullAwayTeam")?.value;

  if (homeCode === awayCode) {
    setFullMessage("Elige dos equipos diferentes.");
    return;
  }

  if (fullMatchGame.running) {
    setFullMessage("El partido ya está en juego.");
    return;
  }

  resetFullMatchGame(false);

  fullMatchGame.running = true;
  fullMatchGame.lastFrameTime = performance.now();

  playWhistle("start");
  setFullMessage("¡Suena el silbato inicial! El balón está en movimiento.");
}

function resetFullMatchGame(showMessage = true) {
  fullMatchGame.running = false;
  fullMatchGame.minute = 0;
  fullMatchGame.homeScore = 0;
  fullMatchGame.awayScore = 0;
  fullMatchGame.possession = "home";
  fullMatchGame.goalCooldown = false;
  fullMatchGame.messageCooldown = 0;

  createCirclePlayers();
  resetBallToCenter();

  updateFullLabels();
  updateFullScoreboard();

  if (showMessage) {
    setFullMessage("Selecciona dos equipos para jugar.");
  }
}

function updateFullLabels() {
  const home = getTeamByCode(document.getElementById("fullHomeTeam")?.value);
  const away = getTeamByCode(document.getElementById("fullAwayTeam")?.value);

  const homeName = document.getElementById("fullHomeName");
  const awayName = document.getElementById("fullAwayName");

  if (homeName) {
    homeName.textContent = `${home.flag || ""} ${home.name}`;
  }

  if (awayName) {
    awayName.textContent = `${away.flag || ""} ${away.name}`;
  }
}

function updateFullScoreboard() {
  const homeScore = document.getElementById("fullHomeScore");
  const awayScore = document.getElementById("fullAwayScore");
  const minute = document.getElementById("fullMatchMinute");

  if (homeScore) {
    homeScore.textContent = fullMatchGame.homeScore;
  }

  if (awayScore) {
    awayScore.textContent = fullMatchGame.awayScore;
  }

  if (minute) {
    minute.textContent = `${String(Math.floor(fullMatchGame.minute)).padStart(2, "0")}'`;
  }
}

function setFullMessage(message) {
  const el = document.getElementById("fullMatchMessage");

  if (el) {
    el.textContent = message;
  }
}

function createCirclePlayers() {
  const canvas = fullMatchGame.canvas;

  if (!canvas) {
    return;
  }

  const width = canvas.clientWidth || 1000;
  const height = canvas.clientHeight || 540;

  const homeCode = document.getElementById("fullHomeTeam")?.value || "MEX";
  const awayCode = document.getElementById("fullAwayTeam")?.value || "RSA";

  const homePositions = [
    { role: "GK", number: 1, x: 0.08, y: 0.50 },
    { role: "DEF", number: 2, x: 0.20, y: 0.25 },
    { role: "DEF", number: 4, x: 0.20, y: 0.75 },
    { role: "MID", number: 6, x: 0.36, y: 0.38 },
    { role: "MID", number: 8, x: 0.36, y: 0.62 },
    { role: "FWD", number: 10, x: 0.48, y: 0.50 }
  ];

  const awayPositions = [
    { role: "GK", number: 1, x: 0.92, y: 0.50 },
    { role: "DEF", number: 2, x: 0.80, y: 0.25 },
    { role: "DEF", number: 4, x: 0.80, y: 0.75 },
    { role: "MID", number: 6, x: 0.64, y: 0.38 },
    { role: "MID", number: 8, x: 0.64, y: 0.62 },
    { role: "FWD", number: 10, x: 0.52, y: 0.50 }
  ];

  const players = [];

  homePositions.forEach((item, index) => {
    players.push(makeCirclePlayer({
      ...item,
      id: `home-${index}`,
      side: "home",
      code: homeCode,
      baseX: item.x * width,
      baseY: item.y * height,
      color: "#2ee66f"
    }));
  });

  awayPositions.forEach((item, index) => {
    players.push(makeCirclePlayer({
      ...item,
      id: `away-${index}`,
      side: "away",
      code: awayCode,
      baseX: item.x * width,
      baseY: item.y * height,
      color: "#ff4164"
    }));
  });

  fullMatchGame.players = players;
}

function makeCirclePlayer(config) {
  return {
    id: config.id,
    side: config.side,
    code: config.code,
    role: config.role,
    number: config.number,
    x: config.baseX,
    y: config.baseY,
    baseX: config.baseX,
    baseY: config.baseY,
    vx: 0,
    vy: 0,
    r: config.role === "GK" ? 25 : 23,
    color: config.color,
    pulse: Math.random() * Math.PI * 2
  };
}

function resetBallToCenter() {
  const canvas = fullMatchGame.canvas;

  if (!canvas) {
    return;
  }

  const width = canvas.clientWidth || 1000;
  const height = canvas.clientHeight || 540;

  fullMatchGame.ball.x = width / 2;
  fullMatchGame.ball.y = height / 2;
  fullMatchGame.ball.vx = fullMatchGame.possession === "home" ? 3.4 : -3.4;
  fullMatchGame.ball.vy = randomBetween(-1.1, 1.1);
  fullMatchGame.ball.rotation = 0;
}

function drawFullMatchScene(time) {
  const canvas = fullMatchGame.canvas;

  if (!canvas) {
    return;
  }

  const { ctx, width, height } = resizeCanvas(canvas);

  if (!fullMatchGame.players.length) {
    createCirclePlayers();
  }

  if (fullMatchGame.running) {
    updateFullMatchPhysics(time, width, height);
  }

  drawField(ctx, width, height);
  drawFullMatchRadar(ctx, width, height);
  drawGoalHighlights(ctx, width, height);

  fullMatchGame.players
    .slice()
    .sort((a, b) => a.y - b.y)
    .forEach(player => drawFlagCirclePlayer(ctx, player, time));

  drawModernBall(ctx, fullMatchGame.ball);
}

function updateFullMatchPhysics(time, width, height) {
  const last = fullMatchGame.lastFrameTime || time;
  const delta = Math.min(0.035, (time - last) / 1000 || 0.016);

  fullMatchGame.lastFrameTime = time;

  if (fullMatchGame.goalCooldown) {
    return;
  }

  fullMatchGame.minute += delta * 8.6;

  if (fullMatchGame.minute >= 90) {
    fullMatchGame.minute = 90;
    finishFullMatchGame();
    return;
  }

  if (fullMatchGame.messageCooldown > 0) {
    fullMatchGame.messageCooldown -= delta;
  }

  updatePlayerMovement(width, height, delta);
  updateBallMovement(width, height);
  detectPlayerBallTouches(width, height);
  detectGoals(width, height);
  updateFullScoreboard();
}

function updatePlayerMovement(width, height, delta) {
  const ball = fullMatchGame.ball;

  fullMatchGame.players.forEach(player => {
    const isKeeper = player.role === "GK";
    const attacking = player.side === fullMatchGame.possession;

    let targetX = player.baseX;
    let targetY = player.baseY;

    if (isKeeper) {
      const ownGoalX = player.side === "home" ? width * 0.055 : width * 0.945;
      targetX = ownGoalX;
      targetY = clamp(ball.y, height * 0.34, height * 0.66);
    } else if (attacking) {
      const attackDirection = player.side === "home" ? 1 : -1;
      const distanceToBall = distance(player.x, player.y, ball.x, ball.y);

      if (distanceToBall < 250 || player.role === "FWD") {
        targetX = ball.x - attackDirection * randomBetween(28, 74);
        targetY = ball.y + randomBetween(-76, 76);
      } else {
        targetX = player.baseX + attackDirection * 92;
        targetY = player.baseY + Math.sin(performance.now() / 500 + player.pulse) * 32;
      }
    } else {
      const defendDirection = player.side === "home" ? -1 : 1;
      targetX = lerp(player.baseX, ball.x + defendDirection * 82, 0.45);
      targetY = lerp(player.baseY, ball.y, 0.38);
    }

    targetX = clamp(targetX, 34, width - 34);
    targetY = clamp(targetY, 34, height - 34);

    const speed = isKeeper ? 5.4 : attacking ? 6.8 : 5.7;
    const dx = targetX - player.x;
    const dy = targetY - player.y;

    player.vx += dx * speed * delta;
    player.vy += dy * speed * delta;

    player.vx *= 0.88;
    player.vy *= 0.88;

    player.x += player.vx;
    player.y += player.vy;

    player.x = clamp(player.x, player.r + 8, width - player.r - 8);
    player.y = clamp(player.y, player.r + 8, height - player.r - 8);
  });
}

function updateBallMovement(width, height) {
  const ball = fullMatchGame.ball;
  const goalTop = height * 0.39;
  const goalBottom = height * 0.61;

  ball.x += ball.vx;
  ball.y += ball.vy;
  ball.rotation += ball.vx * 0.025;

  ball.vx *= 0.992;
  ball.vy *= 0.992;

  if (Math.abs(ball.vx) < 0.25) {
    ball.vx += fullMatchGame.possession === "home" ? 0.18 : -0.18;
  }

  if (Math.abs(ball.vy) < 0.15) {
    ball.vy += randomBetween(-0.12, 0.12);
  }

  if (ball.y < ball.r + 10) {
    ball.y = ball.r + 10;
    ball.vy *= -0.78;
  }

  if (ball.y > height - ball.r - 10) {
    ball.y = height - ball.r - 10;
    ball.vy *= -0.78;
  }

  const inGoalMouth = ball.y >= goalTop && ball.y <= goalBottom;

  if (ball.x < ball.r + 10 && !inGoalMouth) {
    ball.x = ball.r + 10;
    ball.vx *= -0.68;
    fullMatchGame.possession = "home";
  }

  if (ball.x > width - ball.r - 10 && !inGoalMouth) {
    ball.x = width - ball.r - 10;
    ball.vx *= -0.68;
    fullMatchGame.possession = "away";
  }

  if (Math.random() < 0.006) {
    ball.vy += randomBetween(-1.4, 1.4);
  }

  if (Math.random() < 0.004) {
    ball.vx += fullMatchGame.possession === "home"
      ? randomBetween(0.5, 1.1)
      : randomBetween(-1.1, -0.5);
  }
}

function detectPlayerBallTouches(width, height) {
  const ball = fullMatchGame.ball;

  for (const player of fullMatchGame.players) {
    const d = distance(player.x, player.y, ball.x, ball.y);
    const touchDistance = player.r + ball.r + 4;

    if (d > touchDistance) {
      continue;
    }

    const attackDirection = player.side === "home" ? 1 : -1;
    const goalX = player.side === "home" ? width - 20 : 20;
    const goalY = height / 2 + randomBetween(-58, 58);

    const towardGoalX = goalX - player.x;
    const towardGoalY = goalY - player.y;
    const len = Math.max(1, Math.hypot(towardGoalX, towardGoalY));

    const power = player.role === "FWD"
      ? randomBetween(6.8, 9.0)
      : player.role === "MID"
        ? randomBetween(5.4, 7.2)
        : player.role === "DEF"
          ? randomBetween(4.4, 6.1)
          : randomBetween(5.2, 7.4);

    ball.vx = (towardGoalX / len) * power;
    ball.vy = (towardGoalY / len) * power + randomBetween(-1.1, 1.1);

    ball.x = player.x + (towardGoalX / len) * touchDistance;
    ball.y = player.y + (towardGoalY / len) * touchDistance;

    fullMatchGame.possession = player.side;

    if (fullMatchGame.messageCooldown <= 0) {
      const team = getTeamByCode(
        player.side === "home"
          ? document.getElementById("fullHomeTeam")?.value
          : document.getElementById("fullAwayTeam")?.value
      );

      setFullMessage(`${team.name} mueve el balón con intensidad.`);
      fullMatchGame.messageCooldown = 2.4;
    }

    if (Math.random() < 0.12) {
      ball.vy += randomBetween(-3.4, 3.4);
    }

    if (player.role === "GK") {
      ball.vx = Math.abs(ball.vx) * attackDirection;
      ball.vy += randomBetween(-2.2, 2.2);
    }

    break;
  }
}

function detectGoals(width, height) {
  const ball = fullMatchGame.ball;
  const goalTop = height * 0.39;
  const goalBottom = height * 0.61;

  const leftGoal = ball.x <= ball.r + 8 && ball.y >= goalTop && ball.y <= goalBottom;
  const rightGoal = ball.x >= width - ball.r - 8 && ball.y >= goalTop && ball.y <= goalBottom;

  if (!leftGoal && !rightGoal) {
    return;
  }

  if (leftGoal) {
    fullMatchGame.awayScore++;
    fullMatchGame.possession = "home";
    announceGoal("away");
  }

  if (rightGoal) {
    fullMatchGame.homeScore++;
    fullMatchGame.possession = "away";
    announceGoal("home");
  }

  updateFullScoreboard();
  fullMatchGame.goalCooldown = true;

  setTimeout(() => {
    resetBallToCenter();
    createCirclePlayers();
    fullMatchGame.goalCooldown = false;
  }, 1600);
}

function announceGoal(side) {
  const team = getTeamByCode(
    side === "home"
      ? document.getElementById("fullHomeTeam")?.value
      : document.getElementById("fullAwayTeam")?.value
  );

  setFullMessage(`¡Goooool de ${team.name}! El balón cruza la línea.`);
}

function finishFullMatchGame() {
  if (!fullMatchGame.running) {
    return;
  }

  fullMatchGame.running = false;
  fullMatchGame.goalCooldown = false;

  playWhistle("final");
  updateFullScoreboard();

  const home = getTeamByCode(document.getElementById("fullHomeTeam")?.value);
  const away = getTeamByCode(document.getElementById("fullAwayTeam")?.value);

  if (fullMatchGame.homeScore > fullMatchGame.awayScore) {
    setFullMessage(`¡Final del partido! ${home.name} gana ${fullMatchGame.homeScore}-${fullMatchGame.awayScore}.`);
  } else if (fullMatchGame.awayScore > fullMatchGame.homeScore) {
    setFullMessage(`¡Final del partido! ${away.name} gana ${fullMatchGame.awayScore}-${fullMatchGame.homeScore}.`);
  } else {
    setFullMessage(`¡Final del partido! Empate ${fullMatchGame.homeScore}-${fullMatchGame.awayScore}.`);
  }
}

function drawFullMatchRadar(ctx, width, height) {
  const gradient = ctx.createRadialGradient(
    width / 2,
    height / 2,
    20,
    width / 2,
    height / 2,
    width * 0.55
  );

  gradient.addColorStop(0, "rgba(255,255,255,0.10)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function drawGoalHighlights(ctx, width, height) {
  const goalTop = height * 0.39;
  const goalHeight = height * 0.22;

  ctx.save();

  ctx.fillStyle = "rgba(255,255,255,0.10)";
  ctx.fillRect(0, goalTop, 8, goalHeight);
  ctx.fillRect(width - 8, goalTop, 8, goalHeight);

  ctx.shadowColor = "rgba(255,255,255,0.50)";
  ctx.shadowBlur = 12;
  ctx.strokeStyle = "rgba(255,255,255,0.86)";
  ctx.lineWidth = 3;

  ctx.strokeRect(2, goalTop, 20, goalHeight);
  ctx.strokeRect(width - 22, goalTop, 20, goalHeight);

  ctx.restore();
}

function drawFlagCirclePlayer(ctx, player, time) {
  const flagImage = getFullFlagImage(player.code);
  const pulse = Math.sin(time / 250 + player.pulse) * 1.5;
  const radius = player.r + pulse;

  ctx.save();
  ctx.translate(player.x, player.y);

  ctx.shadowColor = player.side === "home"
    ? "rgba(46,230,111,0.55)"
    : "rgba(255,65,100,0.55)";
  ctx.shadowBlur = 14;

  ctx.beginPath();
  ctx.arc(0, 0, radius + 4, 0, Math.PI * 2);
  ctx.fillStyle = player.side === "home"
    ? "rgba(46,230,111,0.28)"
    : "rgba(255,65,100,0.28)";
  ctx.fill();

  ctx.shadowBlur = 0;

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(0, 0, radius - 3, 0, Math.PI * 2);
  ctx.clip();

  if (flagImage && flagImage.complete && flagImage.naturalWidth > 0) {
    ctx.drawImage(flagImage, -radius, -radius, radius * 2, radius * 2);
  } else {
    const team = getTeamByCode(player.code);

    ctx.fillStyle = "#202026";
    ctx.fillRect(-radius, -radius, radius * 2, radius * 2);

    ctx.font = `bold ${radius}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(team.flag || "⚽", 0, 1);
  }

  ctx.restore();

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.lineWidth = 3;
  ctx.strokeStyle = player.side === "home" ? "#2ee66f" : "#ff4164";
  ctx.stroke();

  ctx.fillStyle = "rgba(0,0,0,0.72)";
  ctx.beginPath();
  ctx.arc(radius * 0.52, radius * 0.52, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 9px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(player.role, radius * 0.52, radius * 0.52);

  ctx.restore();
}

function getFullFlagImage(code) {
  const flagCode = flagCodeMap[code];

  if (!flagCode) {
    return null;
  }

  if (fullFlagCache[code]) {
    return fullFlagCache[code];
  }

  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = `https://flagcdn.com/w160/${flagCode}.png`;

  fullFlagCache[code] = image;

  return image;
}

/* =========================================================
   PENALES
   ========================================================= */

const penaltyGame = {
  canvas: null,
  homeScore: 0,
  awayScore: 0,
  homeResults: [],
  awayResults: [],
  round: 0,
  active: false,
  locked: false,
  shooter: { x: 0, y: 0, running: false, scale: 1, seed: 99 },
  keeper: { x: 0, y: 0, dive: 0, scale: 1.12, seed: 100 },
  ball: { x: 0, y: 0, r: 18, rotation: 0 },
  loopStarted: false,
  currentShooterSide: "home"
};

function initPenaltyGame() {
  penaltyGame.canvas = document.getElementById("penaltyCanvas");

  if (!penaltyGame.canvas) {
    return;
  }

  document.getElementById("startPenaltyGame")?.addEventListener("click", startPenaltyGame);
  document.getElementById("resetPenaltyGame")?.addEventListener("click", resetPenaltyGame);

  document.querySelectorAll(".penalty-btn").forEach(btn => {
    btn.addEventListener("click", () => takePenalty(btn.dataset.shot));
  });

  document.getElementById("penaltyHomeTeam")?.addEventListener("change", updatePenaltyLabels);
  document.getElementById("penaltyAwayTeam")?.addEventListener("change", updatePenaltyLabels);

  resetPenaltyGame(false);
  startPenaltyLoop();
}

function startPenaltyLoop() {
  if (penaltyGame.loopStarted) {
    return;
  }

  penaltyGame.loopStarted = true;

  function frame(time) {
    drawPenaltyScene(time);
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function resetPenaltyScene() {
  const canvas = penaltyGame.canvas;

  if (!canvas) {
    return;
  }

  const width = canvas.clientWidth || 900;
  const height = canvas.clientHeight || 450;

  penaltyGame.shooter.x = width / 2;
  penaltyGame.shooter.y = height - 34;
  penaltyGame.shooter.running = false;

  penaltyGame.keeper.x = width / 2;
  penaltyGame.keeper.y = height * 0.56;
  penaltyGame.keeper.dive = 0;

  penaltyGame.ball.x = width / 2;
  penaltyGame.ball.y = height - 62;
  penaltyGame.ball.rotation = 0;
}

function startPenaltyGame() {
  const home = document.getElementById("penaltyHomeTeam")?.value;
  const away = document.getElementById("penaltyAwayTeam")?.value;

  if (home === away) {
    setPenaltyMessage("Elige dos equipos diferentes.");
    return;
  }

  resetPenaltyGame(false);

  penaltyGame.active = true;
  penaltyGame.currentShooterSide = "home";

  playWhistle("start");
  setPenaltyMessage("¡Comienza la tanda de penales!");
}

function resetPenaltyGame(showMessage = true) {
  penaltyGame.homeScore = 0;
  penaltyGame.awayScore = 0;
  penaltyGame.homeResults = [];
  penaltyGame.awayResults = [];
  penaltyGame.round = 0;
  penaltyGame.active = false;
  penaltyGame.locked = false;
  penaltyGame.currentShooterSide = "home";

  resetPenaltyScene();
  updatePenaltyLabels();
  renderPenaltyRounds();

  if (showMessage) {
    setPenaltyMessage("Elige dos países e inicia la tanda.");
  }
}

function updatePenaltyLabels() {
  const home = getTeamByCode(document.getElementById("penaltyHomeTeam")?.value);
  const away = getTeamByCode(document.getElementById("penaltyAwayTeam")?.value);

  const homeName = document.getElementById("penaltyHomeName");
  const awayName = document.getElementById("penaltyAwayName");

  if (homeName) {
    homeName.textContent = `${home.flag} ${home.name}`;
  }

  if (awayName) {
    awayName.textContent = `${away.flag} ${away.name}`;
  }
}

function setPenaltyMessage(message) {
  const el = document.getElementById("penaltyMessage");

  if (el) {
    el.textContent = message;
  }
}

function renderPenaltyRounds() {
  const homeRounds = document.getElementById("homePenaltyRounds");
  const awayRounds = document.getElementById("awayPenaltyRounds");
  const homeScore = document.getElementById("penaltyHomeScore");
  const awayScore = document.getElementById("penaltyAwayScore");

  if (homeScore) {
    homeScore.textContent = penaltyGame.homeScore;
  }

  if (awayScore) {
    awayScore.textContent = penaltyGame.awayScore;
  }

  if (homeRounds) {
    homeRounds.innerHTML = buildPenaltyCircles(penaltyGame.homeResults);
  }

  if (awayRounds) {
    awayRounds.innerHTML = buildPenaltyCircles(penaltyGame.awayResults);
  }
}

function buildPenaltyCircles(list) {
  let html = "";

  for (let i = 0; i < 5; i++) {
    const item = list[i];

    if (item === "goal") {
      html += `<span class="penalty-circle goal">✓</span>`;
    } else if (item === "miss") {
      html += `<span class="penalty-circle miss">X</span>`;
    } else {
      html += `<span class="penalty-circle"></span>`;
    }
  }

  return html;
}

async function takePenalty(direction) {
  if (!penaltyGame.active) {
    setPenaltyMessage("Primero inicia la tanda.");
    return;
  }

  if (penaltyGame.locked) {
    return;
  }

  if (penaltyGame.round >= 5) {
    finishPenaltyGame();
    return;
  }

  penaltyGame.locked = true;
  penaltyGame.currentShooterSide = "home";

  const homeTeam = getTeamByCode(document.getElementById("penaltyHomeTeam")?.value);
  const keeperGuess = ["left", "center", "right"][randomInt(0, 2)];
  const scored = direction !== keeperGuess;

  resetPenaltyScene();
  penaltyGame.shooter.running = true;

  setPenaltyMessage(`${homeTeam.name} toma carrera...`);

  await animatePenaltyShot(direction, keeperGuess);

  penaltyGame.homeResults.push(scored ? "goal" : "miss");

  if (scored) {
    penaltyGame.homeScore++;
    setPenaltyMessage(`¡Gol de ${homeTeam.name}!`);
  } else {
    setPenaltyMessage("¡Atajó el portero!");
  }

  renderPenaltyRounds();
  await wait(850);

  await cpuPenaltyTurn();
}

async function cpuPenaltyTurn() {
  const awayTeam = getTeamByCode(document.getElementById("penaltyAwayTeam")?.value);
  const shot = ["left", "center", "right"][randomInt(0, 2)];
  const keeperGuess = ["left", "center", "right"][randomInt(0, 2)];
  const scored = shot !== keeperGuess;

  penaltyGame.currentShooterSide = "away";

  resetPenaltyScene();
  penaltyGame.shooter.running = true;

  setPenaltyMessage(`${awayTeam.name} ejecuta su penal...`);

  await animatePenaltyShot(shot, keeperGuess);

  penaltyGame.awayResults.push(scored ? "goal" : "miss");

  if (scored) {
    penaltyGame.awayScore++;
    setPenaltyMessage(`Gol de ${awayTeam.name}.`);
  } else {
    setPenaltyMessage(`${awayTeam.name} falla el penal.`);
  }

  penaltyGame.round++;
  renderPenaltyRounds();

  await wait(850);

  penaltyGame.locked = false;
  penaltyGame.currentShooterSide = "home";

  if (penaltyGame.round >= 5) {
    finishPenaltyGame();
  }
}

async function animatePenaltyShot(direction, keeperGuess) {
  const canvas = penaltyGame.canvas;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  await animate(450, t => {
    const e = easeInOut(t);

    penaltyGame.shooter.y = lerp(height - 34, height - 78, e);
    penaltyGame.shooter.x = lerp(
      width / 2,
      direction === "left"
        ? width * 0.46
        : direction === "right"
          ? width * 0.54
          : width / 2,
      e
    );
  });

  penaltyGame.keeper.dive =
    keeperGuess === "left"
      ? -0.55
      : keeperGuess === "right"
        ? 0.55
        : 0;

  await animate(620, t => {
    const e = easeInOut(t);

    penaltyGame.ball.x = lerp(
      width / 2,
      direction === "left"
        ? width * 0.27
        : direction === "right"
          ? width * 0.73
          : width * 0.50,
      e
    );

    penaltyGame.ball.y = lerp(height - 62, height * 0.24, e);
    penaltyGame.ball.rotation += direction === "left" ? -0.28 : 0.28;

    penaltyGame.keeper.x = lerp(
      width / 2,
      keeperGuess === "left"
        ? width * 0.34
        : keeperGuess === "right"
          ? width * 0.66
          : width * 0.5,
      e
    );
  });
}

function finishPenaltyGame() {
  penaltyGame.active = false;
  penaltyGame.locked = false;

  playWhistle("final");

  const home = getTeamByCode(document.getElementById("penaltyHomeTeam")?.value);
  const away = getTeamByCode(document.getElementById("penaltyAwayTeam")?.value);

  if (penaltyGame.homeScore > penaltyGame.awayScore) {
    setPenaltyMessage(`¡Final de la tanda! ${home.name} gana ${penaltyGame.homeScore}-${penaltyGame.awayScore}.`);
  } else if (penaltyGame.awayScore > penaltyGame.homeScore) {
    setPenaltyMessage(`¡Final de la tanda! ${away.name} gana ${penaltyGame.awayScore}-${penaltyGame.homeScore}.`);
  } else {
    setPenaltyMessage(`¡Final de la tanda! Empate ${penaltyGame.homeScore}-${penaltyGame.awayScore}.`);
  }
}

function drawPenaltyScene(time) {
  const canvas = penaltyGame.canvas;

  if (!canvas) {
    return;
  }

  const { ctx, width, height } = resizeCanvas(canvas);

  drawGoalArea(ctx, width, height);

  const shooterCode = penaltyGame.currentShooterSide === "home"
    ? document.getElementById("penaltyHomeTeam")?.value
    : document.getElementById("penaltyAwayTeam")?.value;

  const shooterKit = getKit(shooterCode);

  drawSilhouettePlayer(ctx, {
    x: penaltyGame.shooter.x,
    y: penaltyGame.shooter.y,
    number: 9,
    running: penaltyGame.shooter.running,
    scale: 1.02,
    lean: 0,
    dive: 0,
    jump: false,
    seed: 44
  }, shooterKit, time);

  drawSilhouettePlayer(ctx, {
    x: penaltyGame.keeper.x,
    y: penaltyGame.keeper.y,
    number: 1,
    running: false,
    scale: 1.16,
    lean: 0,
    dive: penaltyGame.keeper.dive,
    jump: false,
    seed: 77
  }, {
    primary: "#2f89ff",
    secondary: "#ffffff",
    shorts: "#1a3d8a",
    socks: "#ffffff"
  }, time);

  drawModernBall(ctx, penaltyGame.ball);
}
