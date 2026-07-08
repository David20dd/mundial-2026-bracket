import fs from "node:fs/promises";

const DATA_FILE = "data/tournament.json";

const API_KEY = process.env.API_FOOTBALL_KEY;
const LEAGUE_ID = process.env.WORLD_CUP_LEAGUE_ID || "1";
const SEASON = process.env.WORLD_CUP_SEASON || "2026";

if (!API_KEY) {
  console.log("No se encontró API_FOOTBALL_KEY. No se actualizaron datos.");
  process.exit(0);
}

const apiUrl = `https://v3.football.api-sports.io/fixtures?league=${LEAGUE_ID}&season=${SEASON}`;

const response = await fetch(apiUrl, {
  headers: {
    "x-apisports-key": API_KEY
  }
});

if (!response.ok) {
  throw new Error(`Error al consultar la API: ${response.status}`);
}

const apiData = await response.json();
const apiFixtures = apiData.response || [];

const rawTournament = await fs.readFile(DATA_FILE, "utf8");
const tournament = JSON.parse(rawTournament);

let updatedMatches = 0;

for (const match of tournament.matches) {
  const fixture = findFixtureForMatch(match, apiFixtures);

  if (!fixture) {
    continue;
  }

  updateMatchFromFixture(match, fixture);
  updatedMatches++;
}

tournament.meta.updatedAt = new Date().toISOString();

await fs.writeFile(DATA_FILE, JSON.stringify(tournament, null, 2), "utf8");

console.log(`Actualización terminada. Partidos actualizados: ${updatedMatches}`);

function findFixtureForMatch(match, fixtures) {
  if (match.apiFixtureId) {
    return fixtures.find(item => String(item.fixture.id) === String(match.apiFixtureId));
  }

  const homeName = normalize(match.home?.name);
  const awayName = normalize(match.away?.name);

  if (!homeName || !awayName || homeName.includes("ganador") || awayName.includes("ganador")) {
    return null;
  }

  return fixtures.find(item => {
    const apiHome = normalize(item.teams?.home?.name);
    const apiAway = normalize(item.teams?.away?.name);

    const sameOrder = apiHome === homeName && apiAway === awayName;
    const invertedOrder = apiHome === awayName && apiAway === homeName;

    return sameOrder || invertedOrder;
  });
}

function updateMatchFromFixture(match, fixture) {
  const apiHome = fixture.teams.home;
  const apiAway = fixture.teams.away;

  const apiHomeName = normalize(apiHome.name);
  const currentHomeName = normalize(match.home.name);

  const sameOrder = apiHomeName === currentHomeName;

  const homeGoals = fixture.goals.home;
  const awayGoals = fixture.goals.away;

  const mappedStatus = mapStatus(fixture.fixture.status.short);

  match.apiFixtureId = fixture.fixture.id;
  match.status = mappedStatus;
  match.minute = mappedStatus === "live" ? fixture.fixture.status.elapsed : null;
  match.kickoff = fixture.fixture.date;

  if (sameOrder) {
    match.home.name = apiHome.name;
    match.away.name = apiAway.name;
    match.score.home = homeGoals;
    match.score.away = awayGoals;
  } else {
    match.home.name = apiAway.name;
    match.away.name = apiHome.name;
    match.score.home = awayGoals;
    match.score.away = homeGoals;
  }

  match.winner = getWinner(match, fixture, sameOrder);
}

function mapStatus(shortStatus) {
  const liveStatuses = new Set(["1H", "HT", "2H", "ET", "BT", "P", "INT", "LIVE"]);
  const finishedStatuses = new Set(["FT", "AET", "PEN"]);
  const scheduledStatuses = new Set(["TBD", "NS"]);

  if (liveStatuses.has(shortStatus)) {
    return "live";
  }

  if (finishedStatuses.has(shortStatus)) {
    return "finished";
  }

  if (scheduledStatuses.has(shortStatus)) {
    return "scheduled";
  }

  return "scheduled";
}

function getWinner(match, fixture, sameOrder) {
  if (match.status !== "finished") {
    return null;
  }

  const home = match.score.home;
  const away = match.score.away;

  if (typeof home === "number" && typeof away === "number") {
    if (home > away) return "home";
    if (away > home) return "away";
  }

  const penaltyHome = fixture.score?.penalty?.home;
  const penaltyAway = fixture.score?.penalty?.away;

  if (typeof penaltyHome === "number" && typeof penaltyAway === "number") {
    if (sameOrder) {
      if (penaltyHome > penaltyAway) return "home";
      if (penaltyAway > penaltyHome) return "away";
    } else {
      if (penaltyAway > penaltyHome) return "home";
      if (penaltyHome > penaltyAway) return "away";
    }
  }

  return null;
}

function normalize(value = "") {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ");
}