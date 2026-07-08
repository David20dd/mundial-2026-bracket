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
    { code: "GHA", name: "Ghana", flag: "🇬🇭", short: "GH" },
    { code: "JPN", name: "Japón", flag: "🇯🇵", short: "JP" }
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
            text: "Simulación moderna con cancha, jugadores tipo silueta, balón, porteros, goles y ganador."
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
            if (!info || !dialog || !dialogTitle || !dialogText) return;

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
    audio.play().catch(() => { });
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

/* =========================================================
   TEAMS
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
        if (left) left.innerHTML = `<div class="loading-message">Cargando bracket...</div>`;
        if (right) right.innerHTML = `<div class="loading-message">Cargando datos...</div>`;
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

    if (!groupsLeft || !groupsRight) return;

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

    if (!container) return;

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

    if (!finalContainer || !thirdContainer) return;

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
      src="https://flagcdn.com/24x18/${flagCode}.png"
      alt="${team.name}"
      loading="lazy"
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

    if (!lastUpdate) return;

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
   DIBUJO MODERNO EN CANVAS
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
   PARTIDO COMPLETO
   ========================================================= */

const fullMatchGame = {
    canvas: null,
    players: [],
    ball: { x: 0, y: 0, r: 16, rotation: 0 },
    running: false,
    minute: 0,
    homeScore: 0,
    awayScore: 0,
    playIndex: 0,
    loopStarted: false,
    actionLock: false,
    maxPlays: 9
};

function initFullMatchGame() {
    fullMatchGame.canvas = document.getElementById("fullMatchCanvas");
    if (!fullMatchGame.canvas) return;

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
    if (fullMatchGame.loopStarted) return;
    fullMatchGame.loopStarted = true;

    function frame(time) {
        drawFullMatchScene(time);
        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

function createFullPlayers() {
    const canvas = fullMatchGame.canvas;
    if (!canvas) return;

    const width = canvas.clientWidth || 1000;
    const height = canvas.clientHeight || 540;

    const coords = [
        { side: "home", keeper: true, x: 0.08, y: 0.56, n: 1 },
        { side: "home", keeper: false, x: 0.18, y: 0.26, n: 2 },
        { side: "home", keeper: false, x: 0.20, y: 0.46, n: 4 },
        { side: "home", keeper: false, x: 0.18, y: 0.72, n: 6 },
        { side: "home", keeper: false, x: 0.35, y: 0.38, n: 8 },
        { side: "home", keeper: false, x: 0.38, y: 0.66, n: 10 },

        { side: "away", keeper: true, x: 0.92, y: 0.56, n: 1 },
        { side: "away", keeper: false, x: 0.82, y: 0.26, n: 2 },
        { side: "away", keeper: false, x: 0.80, y: 0.46, n: 4 },
        { side: "away", keeper: false, x: 0.82, y: 0.72, n: 6 },
        { side: "away", keeper: false, x: 0.65, y: 0.38, n: 8 },
        { side: "away", keeper: false, x: 0.62, y: 0.66, n: 10 }
    ];

    fullMatchGame.players = coords.map((p, index) => ({
        ...p,
        number: p.n,
        baseX: p.x * width,
        baseY: p.y * height,
        x: p.x * width,
        y: p.y * height,
        scale: p.keeper ? 1.08 : 1,
        running: false,
        lean: 0,
        dive: 0,
        jump: false,
        seed: index * 0.8
    }));

    fullMatchGame.ball.x = width / 2;
    fullMatchGame.ball.y = height / 2;
    fullMatchGame.ball.rotation = 0;
}

function resetFullPlayersToBase() {
    fullMatchGame.players.forEach(player => {
        player.x = player.baseX;
        player.y = player.baseY;
        player.running = false;
        player.lean = 0;
        player.dive = 0;
        player.jump = false;
    });

    const canvas = fullMatchGame.canvas;
    if (!canvas) return;

    const width = canvas.clientWidth || 1000;
    const height = canvas.clientHeight || 540;

    fullMatchGame.ball.x = width / 2;
    fullMatchGame.ball.y = height / 2;
    fullMatchGame.ball.rotation = 0;
}

function resetFullMatchGame(showMessage = true) {
    fullMatchGame.running = false;
    fullMatchGame.actionLock = false;
    fullMatchGame.minute = 0;
    fullMatchGame.homeScore = 0;
    fullMatchGame.awayScore = 0;
    fullMatchGame.playIndex = 0;

    createFullPlayers();
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

    if (homeName) homeName.textContent = `${home.flag} ${home.name}`;
    if (awayName) awayName.textContent = `${away.flag} ${away.name}`;
}

function updateFullScoreboard() {
    const homeScore = document.getElementById("fullHomeScore");
    const awayScore = document.getElementById("fullAwayScore");
    const minute = document.getElementById("fullMatchMinute");

    if (homeScore) homeScore.textContent = fullMatchGame.homeScore;
    if (awayScore) awayScore.textContent = fullMatchGame.awayScore;
    if (minute) minute.textContent = `${String(fullMatchGame.minute).padStart(2, "0")}'`;
}

function setFullMessage(message) {
    const el = document.getElementById("fullMatchMessage");
    if (el) el.textContent = message;
}

function getFullPlayersBySide(side) {
    return fullMatchGame.players.filter(player => player.side === side && !player.keeper);
}

function getFullKeeper(side) {
    return fullMatchGame.players.find(player => player.side === side && player.keeper);
}

async function startFullMatchGame() {
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

    playWhistle("start");
    setFullMessage("¡Suena el silbato inicial! Empieza el partido.");

    await wait(1000);

    while (fullMatchGame.running && fullMatchGame.playIndex < fullMatchGame.maxPlays) {
        await playFullSequence();
    }

    finishFullMatchGame();
}

async function playFullSequence() {
    if (fullMatchGame.actionLock) return;

    fullMatchGame.actionLock = true;

    const side = Math.random() > 0.5 ? "home" : "away";
    const attackPlayers = getFullPlayersBySide(side);
    const defenceKeeper = getFullKeeper(side === "home" ? "away" : "home");

    const homeTeam = getTeamByCode(document.getElementById("fullHomeTeam")?.value);
    const awayTeam = getTeamByCode(document.getElementById("fullAwayTeam")?.value);

    const attackTeam = side === "home" ? homeTeam : awayTeam;
    const defendTeam = side === "home" ? awayTeam : homeTeam;

    fullMatchGame.minute += randomInt(6, 12);
    if (fullMatchGame.minute > 90) fullMatchGame.minute = 90;

    updateFullScoreboard();
    resetFullPlayersToBase();

    setFullMessage(`${attackTeam.name} toca el balón y avanza con peligro.`);

    const p1 = attackPlayers[0];
    const p2 = attackPlayers[1];
    const p3 = attackPlayers[2] || attackPlayers[1];

    p1.running = true;
    p2.running = true;
    p3.running = true;

    const canvas = fullMatchGame.canvas;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const laneDir = side === "home" ? 1 : -1;

    await animate(850, t => {
        const e = easeInOut(t);

        p1.x = lerp(p1.baseX, p1.baseX + 70 * laneDir, e);
        p2.x = lerp(p2.baseX, p2.baseX + 55 * laneDir, e);
        p3.x = lerp(p3.baseX, p3.baseX + 85 * laneDir, e);

        fullMatchGame.ball.x = lerp(width / 2, width / 2 + 80 * laneDir, e);
        fullMatchGame.ball.y = lerp(height / 2, height / 2 - 25, e);
        fullMatchGame.ball.rotation += 0.18 * laneDir;
    });

    setFullMessage(`${attackTeam.name} filtra un pase al atacante.`);

    await animate(650, t => {
        const e = easeInOut(t);

        fullMatchGame.ball.x = lerp(width / 2 + 80 * laneDir, width / 2 + 190 * laneDir, e);
        fullMatchGame.ball.y = lerp(height / 2 - 25, height / 2 - 50, e);
        fullMatchGame.ball.rotation += 0.24 * laneDir;
    });

    const isGoal = Math.random() > 0.48;
    setFullMessage(`${attackTeam.name} remata al arco...`);

    if (defenceKeeper) {
        defenceKeeper.dive = isGoal ? -0.22 * laneDir : 0.24 * laneDir;
    }

    await animate(750, t => {
        const e = easeInOut(t);

        if (side === "home") {
            fullMatchGame.ball.x = lerp(width / 2 + 190, isGoal ? width - 26 : width - 110, e);
            fullMatchGame.ball.y = lerp(height / 2 - 50, isGoal ? height * 0.40 : height * 0.50, e);
        } else {
            fullMatchGame.ball.x = lerp(width / 2 - 190, isGoal ? 26 : 110, e);
            fullMatchGame.ball.y = lerp(height / 2 - 50, isGoal ? height * 0.40 : height * 0.50, e);
        }

        fullMatchGame.ball.rotation += 0.36 * laneDir;
    });

    if (isGoal) {
        if (side === "home") {
            fullMatchGame.homeScore++;
        } else {
            fullMatchGame.awayScore++;
        }

        updateFullScoreboard();

        attackPlayers.forEach(player => {
            player.jump = true;
            player.running = true;
            player.lean = randomBetween(-0.08, 0.08);
        });

        setFullMessage(`¡Goooool de ${attackTeam.name}! Excelente definición.`);
        await wait(1000);
    } else {
        setFullMessage(`¡Atajada de ${defendTeam.name}! El portero salva el arco.`);
        await wait(900);
    }

    fullMatchGame.playIndex++;
    fullMatchGame.actionLock = false;

    await wait(700);

    if (fullMatchGame.minute >= 90) {
        fullMatchGame.playIndex = fullMatchGame.maxPlays;
    }
}

function finishFullMatchGame() {
    if (!fullMatchGame.running && fullMatchGame.minute === 90) return;

    fullMatchGame.running = false;
    fullMatchGame.actionLock = false;
    fullMatchGame.minute = 90;

    updateFullScoreboard();
    playWhistle("final");

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

function drawFullMatchScene(time) {
    const canvas = fullMatchGame.canvas;
    if (!canvas) return;

    const { ctx, width, height } = resizeCanvas(canvas);

    drawField(ctx, width, height);

    if (!fullMatchGame.players.length) {
        createFullPlayers();
    }

    const homeCode = document.getElementById("fullHomeTeam")?.value;
    const awayCode = document.getElementById("fullAwayTeam")?.value;

    fullMatchGame.players
        .slice()
        .sort((a, b) => a.y - b.y)
        .forEach(player => {
            const code = player.side === "home" ? homeCode : awayCode;
            const kit = player.keeper
                ? { primary: "#2f89ff", secondary: "#ffffff", shorts: "#1a3d8a", socks: "#ffffff" }
                : getKit(code);

            drawSilhouettePlayer(ctx, player, kit, time);
        });

    drawModernBall(ctx, fullMatchGame.ball);
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
    if (!penaltyGame.canvas) return;

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
    if (penaltyGame.loopStarted) return;

    penaltyGame.loopStarted = true;

    function frame(time) {
        drawPenaltyScene(time);
        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

function resetPenaltyScene() {
    const canvas = penaltyGame.canvas;
    if (!canvas) return;

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

    if (homeName) homeName.textContent = `${home.flag} ${home.name}`;
    if (awayName) awayName.textContent = `${away.flag} ${away.name}`;
}

function setPenaltyMessage(message) {
    const el = document.getElementById("penaltyMessage");
    if (el) el.textContent = message;
}

function renderPenaltyRounds() {
    const homeRounds = document.getElementById("homePenaltyRounds");
    const awayRounds = document.getElementById("awayPenaltyRounds");
    const homeScore = document.getElementById("penaltyHomeScore");
    const awayScore = document.getElementById("penaltyAwayScore");

    if (homeScore) homeScore.textContent = penaltyGame.homeScore;
    if (awayScore) awayScore.textContent = penaltyGame.awayScore;

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

    if (penaltyGame.locked) return;

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
    if (!canvas) return;

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