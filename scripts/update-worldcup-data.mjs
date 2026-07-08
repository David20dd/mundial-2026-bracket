import fs from "node:fs/promises";

const API_BASE_URL = "https://v3.football.api-sports.io";
const DATA_FILE = "data/tournament.json";

const API_KEY = process.env.API_FOOTBALL_KEY;
const LEAGUE_ID = process.env.API_FOOTBALL_LEAGUE_ID;
const SEASON = process.env.API_FOOTBALL_SEASON || "2026";

if (!API_KEY) {
  throw new Error("Falta API_FOOTBALL_KEY en GitHub Secrets.");
}

const statusMap = {
  TBD: "scheduled",
  NS: "scheduled",
  PST: "scheduled",
  CANC: "scheduled",
  ABD: "scheduled",
  "1H": "live",
  HT: "live",
  "2H": "live",
  ET: "live",
  BT: "live",
  P: "live",
  SUSP: "live",
  INT: "live",
  FT: "finished",
  AET: "finished",
  PEN: "finished"
};

const teamAliases = {
  MEX: ["mexico", "méxico"],
  RSA: ["south africa", "sudafrica", "sudáfrica"],
  KOR: ["korea republic", "south korea", "corea del sur"],
  CAN: ["canada", "canadá"],
  BRA: ["brazil", "brasil"],
  MAR: ["morocco", "marruecos"],
  USA: ["usa", "united states", "estados unidos"],
  AUS: ["australia"],
  PAR: ["paraguay"],
  GER: ["germany", "alemania"],
  CIV: ["cote d'ivoire", "ivory coast", "costa de marfil"],
  ECU: ["ecuador"],
  CUW: ["curacao", "curaçao", "curazao"],
  NED: ["netherlands", "holanda", "paises bajos", "países bajos"],
  JPN: ["japan", "japón"],
  SWE: ["sweden", "suecia"],
  TUN: ["tunisia", "túnez"],
  BEL: ["belgium", "bélgica"],
  EGY: ["egypt", "egipto"],
  IRN: ["iran", "irán"],
  NZL: ["new zealand", "nueva zelanda"],
  ESP: ["spain", "españa"],
  CPV: ["cabo verde", "cape verde"],
  URU: ["uruguay"],
  KSA: ["saudi arabia", "arabia saudita"],
  FRA: ["france", "francia"],
  NOR: ["norway", "noruega"],
  SEN: ["senegal"],
  ARG: ["argentina"],
  AUT: ["austria"],
  ALG: ["algeria", "argelia"],
  JOR: ["jordan", "jordania"],
  COL: ["colombia"],
  POR: ["portugal"],
  COD: ["dr congo", "congo dr", "rd congo", "republica democratica del congo"],
  UZB: ["uzbekistan", "uzbekistán"],
  ENG: ["england", "inglaterra"],
  CRO: ["croatia", "croacia"],
  GHA: ["ghana"],
  PAN: ["panama", "panamá"]
};

async function main() {
  const tournament = await readTournamentData();

  if (!LEAGUE_ID) {
    throw new Error("Falta API_FOOTBALL_LEAGUE_ID en GitHub Secrets. Después lo agregaremos.");
  }

  const fixtures = await fetchFixtures(LEAGUE_ID, SEASON);
  const result = updateTournamentWithFixtures(tournament, fixtures);

  tournament.meta = {
    ...(tournament.meta || {}),
    updatedAt: new Date().toISOString(),
    source: "API-Football",
    leagueId: LEAGUE_ID,
    season: SEASON,
    matchedFixtures: result.matched,
    totalApiFixtures: fixtures.length
  };

  await fs.writeFile(DATA_FILE, JSON.stringify(tournament, null, 2) + "\n", "utf8");

  console.log(`Archivo actualizado: ${DATA_FILE}`);
  console.log(`Partidos encontrados en API: ${fixtures.length}`);
  console.log(`Partidos actualizados en bracket: ${result.matched}`);
}

async function readTournamentData() {
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(raw);
}

async function apiGet(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "x-apisports-key": API_KEY
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error API-Football ${response.status}: ${text}`);
  }

  const data = await response.json();

  if (data.errors && Object.keys(data.errors).length > 0) {
    console.log("Advertencias API:", data.errors);
  }

  return data;
}

async function fetchFixtures(leagueId, season) {
  const data = await apiGet(
    `/fixtures?league=${encodeURIComponent(leagueId)}&season=${encodeURIComponent(season)}`
  );

  return data.response || [];
}

function updateTournamentWithFixtures(tournament, fixtures) {
  let matched = 0;

  if (!Array.isArray(tournament.matches)) {
    tournament.matches = [];
  }

  for (const match of tournament.matches) {
    const fixture = findFixtureForMatch(match, fixtures);

    if (!fixture) {
      continue;
    }

    applyFixtureToMatch(match, fixture);
    matched++;
  }

  return { matched };
}

function findFixtureForMatch(match, fixtures) {
  if (match.apiFixtureId) {
    return fixtures.find(item => String(item.fixture?.id) === String(match.apiFixtureId));
  }

  if (isPlaceholderTeam(match.home) || isPlaceholderTeam(match.away)) {
    return null;
  }

  const localHomeTokens = getTeamTokens(match.home);
  const localAwayTokens = getTeamTokens(match.away);

  return fixtures.find(item => {
    const apiHome = item.teams?.home;
    const apiAway = item.teams?.away;

    if (!apiHome || !apiAway) {
      return false;
    }

    const apiHomeName = normalizeText(apiHome.name);
    const apiAwayName = normalizeText(apiAway.name);

    const direct =
      tokensContainName(localHomeTokens, apiHomeName) &&
      tokensContainName(localAwayTokens, apiAwayName);

    const inverted =
      tokensContainName(localHomeTokens, apiAwayName) &&
      tokensContainName(localAwayTokens, apiHomeName);

    return direct || inverted;
  });
}

function applyFixtureToMatch(match, fixture) {
  const apiHome = fixture.teams?.home;
  const apiAway = fixture.teams?.away;

  const localHomeTokens = getTeamTokens(match.home);
  const localAwayTokens = getTeamTokens(match.away);

  const apiHomeName = normalizeText(apiHome?.name || "");
  const apiAwayName = normalizeText(apiAway?.name || "");

  const sameOrder =
    tokensContainName(localHomeTokens, apiHomeName) &&
    tokensContainName(localAwayTokens, apiAwayName);

  const statusShort = fixture.fixture?.status?.short || "NS";
  const mappedStatus = statusMap[statusShort] || "scheduled";

  const goalsHome = fixture.goals?.home;
  const goalsAway = fixture.goals?.away;

  const penaltyHome = fixture.score?.penalty?.home;
  const penaltyAway = fixture.score?.penalty?.away;

  const localHomeGoals = sameOrder ? goalsHome : goalsAway;
  const localAwayGoals = sameOrder ? goalsAway : goalsHome;

  const localHomePenalties = sameOrder ? penaltyHome : penaltyAway;
  const localAwayPenalties = sameOrder ? penaltyAway : penaltyHome;

  match.apiFixtureId = fixture.fixture?.id || match.apiFixtureId;
  match.status = mappedStatus;
  match.kickoff = fixture.fixture?.date || match.kickoff || null;

  if (mappedStatus === "live") {
    match.minute = fixture.fixture?.status?.elapsed || null;
  } else {
    delete match.minute;
  }

  match.score = {
    home: localHomeGoals ?? null,
    away: localAwayGoals ?? null
  };

  if (localHomePenalties !== null && localHomePenalties !== undefined) {
    match.penalties = {
      home: localHomePenalties,
      away: localAwayPenalties
    };
  }

  match.winner = getWinnerFromScore(
    match.score.home,
    match.score.away,
    match.penalties?.home,
    match.penalties?.away,
    mappedStatus
  );

  match.apiStatusShort = statusShort;
  match.apiStatusLong = fixture.fixture?.status?.long || "";
}

function getWinnerFromScore(home, away, penHome, penAway, status) {
  if (status !== "finished") {
    return null;
  }

  if (Number.isFinite(penHome) && Number.isFinite(penAway)) {
    if (penHome > penAway) return "home";
    if (penAway > penHome) return "away";
  }

  if (Number.isFinite(home) && Number.isFinite(away)) {
    if (home > away) return "home";
    if (away > home) return "away";
  }

  return null;
}

function isPlaceholderTeam(team) {
  if (!team) {
    return true;
  }

  const code = String(team.code || "").toUpperCase();
  const name = normalizeText(team.name || "");

  return (
    !code ||
    code === "TBD" ||
    code.startsWith("W") ||
    code.startsWith("RU") ||
    code.startsWith("P") ||
    name.includes("por definir") ||
    name.includes("winner") ||
    name.includes("play off") ||
    name.includes("playoff")
  );
}

function getTeamTokens(team) {
  const code = String(team?.code || "").toUpperCase();
  const name = normalizeText(team?.name || "");
  const aliases = teamAliases[code] || [];

  return [
    normalizeText(code),
    name,
    ...aliases.map(normalizeText)
  ].filter(Boolean);
}

function tokensContainName(tokens, name) {
  const normalizedName = normalizeText(name);

  return tokens.some(token => {
    if (!token) return false;
    return token === normalizedName || token.includes(normalizedName) || normalizedName.includes(token);
  });
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\p{Letter}\p{Number}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
