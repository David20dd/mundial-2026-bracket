const API_BASE_URL = "https://v3.football.api-sports.io";

const API_KEY = process.env.API_FOOTBALL_KEY;
const LEAGUE_ID = process.env.API_FOOTBALL_LEAGUE_ID || "1";
const SEASON = process.env.API_FOOTBALL_SEASON || "2026";

if (!API_KEY) {
  throw new Error("Falta API_FOOTBALL_KEY.");
}

async function apiGet(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "x-apisports-key": API_KEY
    }
  });

  const text = await response.text();

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`La API no devolvió JSON válido: ${text}`);
  }

  console.log("====================================");
  console.log(`Endpoint: ${path}`);
  console.log(`HTTP status: ${response.status}`);
  console.log("Errors:", JSON.stringify(data.errors || {}, null, 2));
  console.log("Results:", data.results);
  console.log("Paging:", JSON.stringify(data.paging || {}, null, 2));
  console.log("Response length:", Array.isArray(data.response) ? data.response.length : "No array");

  if (Array.isArray(data.response)) {
    console.log("Primeros 5 resultados:");
    console.log(JSON.stringify(data.response.slice(0, 5), null, 2));
  }

  return data;
}

async function main() {
  console.log("Probando API-Football...");
  console.log(`LEAGUE_ID usado: ${LEAGUE_ID}`);
  console.log(`SEASON usada: ${SEASON}`);

  await apiGet(`/status`);

  await apiGet(`/leagues?search=World%20Cup`);

  await apiGet(`/leagues?id=${encodeURIComponent(LEAGUE_ID)}`);

  await apiGet(`/fixtures?league=${encodeURIComponent(LEAGUE_ID)}&season=${encodeURIComponent(SEASON)}`);
}

main().catch(error => {
  console.error("ERROR DE DIAGNÓSTICO:");
  console.error(error);
  process.exit(1);
});
