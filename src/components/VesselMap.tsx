import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Real-world coords (lat, lng)
const VESSEL: L.LatLngTuple = [51.24527, 4.40851];     // Loodglansstraat 5, 2030 Antwerpen (Nominatim)
const CENTRAAL: L.LatLngTuple = [51.21733, 4.42099];   // Antwerpen-Centraal
const LUCHTBAL: L.LatLngTuple = [51.24437, 4.42490];   // Antwerpen-Luchtbal NMBS (OSM station node)
const KINEPOLIS: L.LatLngTuple = [51.24717, 4.41970];  // Kinepolis (kept only to frame the map bounds)

// Real De Lijn tram geometries (from OpenStreetMap relations 10409862, 11199)
const TRAM1_PATH: L.LatLngTuple[] = [
  [51.21366,4.41124],[51.21386,4.41152],[51.21437,4.41219],[51.21442,4.41227],[51.21446,4.41235],
  [51.21453,4.41247],[51.21460,4.41259],[51.21535,4.41359],[51.21544,4.41370],[51.21553,4.41379],
  [51.21561,4.41385],[51.21572,4.41392],[51.21763,4.41511],[51.21778,4.41520],[51.21791,4.41525],
  [51.21799,4.41528],[51.21815,4.41532],[51.21831,4.41536],[51.21846,4.41542],[51.21862,4.41549],
  [51.21877,4.41557],[51.21890,4.41566],[51.21904,4.41576],[51.21918,4.41587],[51.21936,4.41596],
  [51.21961,4.41606],[51.21976,4.41611],[51.21988,4.41617],[51.22005,4.41623],[51.22082,4.41653],
  [51.22092,4.41656],[51.22100,4.41657],[51.22111,4.41657],[51.22122,4.41654],[51.22240,4.41611],
  [51.22441,4.41536],[51.22467,4.41526],[51.22612,4.41473],[51.22639,4.41463],[51.22937,4.41350],
  [51.22962,4.41335],[51.22990,4.41325],[51.23055,4.41301],[51.23074,4.41296],[51.23082,4.41297],
  [51.23094,4.41305],[51.23113,4.41324],[51.23152,4.41366],[51.23164,4.41390],[51.23169,4.41416],
  [51.23169,4.41658],[51.23168,4.41836],[51.23169,4.41947],[51.23154,4.42001],[51.23155,4.42033],
  [51.23167,4.42055],[51.23185,4.42063],[51.23204,4.42059],[51.23493,4.42060],[51.23526,4.42060],
  [51.23591,4.42057],[51.23690,4.42053],[51.23919,4.42051],[51.24132,4.42051],[51.24186,4.42049],
  [51.24264,4.42045],[51.24335,4.42044],[51.24438,4.42043],[51.24463,4.42040],[51.24476,4.42039],
  [51.24503,4.42036],[51.24692,4.42037],[51.24837,4.42037],[51.25007,4.42037],[51.25182,4.42037],
  [51.25467,4.42037],
];
const TRAM6_PATH: L.LatLngTuple[] = [
  [51.21502,4.42044],[51.21664,4.42047],[51.21852,4.42068],[51.22131,4.42088],[51.22225,4.42152],
  [51.22262,4.42267],[51.22317,4.42731],[51.22371,4.42951],[51.22431,4.43191],[51.22630,4.43640],
  [51.22701,4.43808],[51.22780,4.43992],[51.22863,4.44142],[51.22949,4.44225],[51.23034,4.44257],
  [51.23224,4.44286],[51.23350,4.44302],[51.23377,4.44307],[51.23399,4.44310],[51.23424,4.44313],
  [51.23489,4.44298],[51.23581,4.44255],[51.23677,4.44169],[51.23726,4.44130],[51.23782,4.44090],
  [51.23801,4.44074],[51.23809,4.44067],[51.23863,4.44006],[51.23898,4.43963],[51.23920,4.43938],
  [51.23934,4.43920],[51.23946,4.43899],[51.23957,4.43879],[51.23968,4.43859],[51.23978,4.43838],
  [51.23991,4.43809],[51.24001,4.43781],[51.24006,4.43763],[51.24014,4.43737],[51.24025,4.43708],
  [51.24035,4.43685],[51.24043,4.43668],[51.24052,4.43653],[51.24060,4.43641],[51.24073,4.43616],
  [51.24131,4.43481],[51.24157,4.43420],[51.24219,4.43278],[51.24238,4.43231],[51.24250,4.43200],
  [51.24269,4.43157],[51.24301,4.43084],[51.24327,4.43027],[51.24360,4.42947],[51.24375,4.42914],
  [51.24405,4.42843],[51.24418,4.42813],[51.24428,4.42781],[51.24436,4.42747],[51.24444,4.42710],
  [51.24455,4.42641],[51.24459,4.42608],[51.24463,4.42570],[51.24465,4.42547],[51.24470,4.42456],
  [51.24471,4.42419],[51.24470,4.42379],[51.24470,4.42247],[51.24469,4.42080],[51.24469,4.42057],
  [51.24472,4.42044],[51.24478,4.42036],[51.24485,4.42033],[51.24503,4.42031],[51.24788,4.42032],
  [51.24845,4.42032],[51.25074,4.42031],[51.25449,4.42032],
];
// Real NMBS L25 rail geometry, Centraal → Luchtbal (OSM ways, clipped + monotonic north)
const TRAIN_PATH: L.LatLngTuple[] = [
  CENTRAAL,
  [51.21861,4.42122],[51.22208,4.42147],[51.22407,4.42167],[51.22498,4.42192],[51.22579,4.42227],
  [51.22655,4.42272],[51.22877,4.42426],[51.22972,4.42481],[51.23031,4.42506],[51.23100,4.42526],
  [51.23176,4.42539],[51.23261,4.42541],[51.23494,4.42524],[51.23602,4.42516],[51.23963,4.42489],
  LUCHTBAL,
];
// Walk from the Luchtbal transit hub west to the Vessel (~10 min)
const WALK_PATH: L.LatLngTuple[] = [
  LUCHTBAL,
  [51.24500, 4.41850],
  [51.24560, 4.41300],
  VESSEL,
];

// Dot-only divIcon; name shows in a hover tooltip
const makeDot = (accent: string) =>
  L.divIcon({
    className: "v2-map-dot",
    iconSize: [10, 10],
    iconAnchor: [5, 5],
    html: `<span class="v2-map-dot-inner" style="--pin:${accent}"></span>`,
  });

// Vessel marker = dot + logo + address, all in one divIcon (so layout is ours, not Leaflet's)
const VESSEL_PIN = L.divIcon({
  className: "v2-map-vessel",
  iconSize: [14, 14],
  iconAnchor: [7, 7],
  html: `
    <span class="v2-map-vessel-dot"></span>
    <span class="v2-map-vessel-label">
      <img src="/vessel/vessel-logo.png" alt="The Vessel" class="v2-map-vessel-logo" />
      <span class="v2-map-vessel-addr">Loodglansstraat 5<br/>2030 Antwerpen</span>
    </span>
  `,
});

export default function VesselMap() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;

    const map = L.map(ref.current, {
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: false,
      minZoom: 12,
      maxZoom: 16,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    const GMAPS_URL =
      "https://www.google.com/maps/place/Loodglansstraat+5,+2030+Antwerpen";
    const openMaps = () => window.open(GMAPS_URL, "_blank", "noopener,noreferrer");
    map.on("click", openMaps);
    ref.current.style.cursor = "pointer";

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
      {
        subdomains: "abcd",
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    ).addTo(map);

    const routeStyle = (color: string, dashed = false, weight = 3): L.PolylineOptions => ({
      color,
      weight,
      opacity: 0.95,
      lineCap: "round",
      lineJoin: "round",
      dashArray: dashed ? "2 6" : undefined,
    });

    const routes = [
      { path: TRAIN_PATH, color: "#6fb1ff", label: "NMBS · Centraal → Luchtbal", weight: 4.5 },
      { path: TRAM6_PATH, color: "#e6007e", label: "Tram 6 · Olympiade ↔ Luchtbal", weight: 3 },
      { path: TRAM1_PATH, color: "#8c2b87", label: "Tram 1 · Zuid ↔ Luchtbal", weight: 3 },
      { path: WALK_PATH, color: "#7be0c2", label: "Walk · ~10 min", dashed: true, weight: 3 },
    ];

    for (const r of routes) {
      L.polyline(r.path, routeStyle(r.color, r.dashed, r.weight))
        .addTo(map)
        .bindTooltip(r.label, { sticky: true, direction: "top", className: "v2-map-tip" })
        .on("click", openMaps);
    }

    // Only the two stations that matter for wayfinding — no intermediate pips.
    const stops: { coord: L.LatLngTuple; name: string; sub?: string; accent: string }[] = [
      { coord: CENTRAAL, name: "Antwerpen-Centraal", sub: "NMBS / Tram", accent: "#cfd6e0" },
      { coord: LUCHTBAL, name: "Luchtbal", sub: "NMBS · Tram 1 · Tram 6", accent: "#6fb1ff" },
    ];

    for (const s of stops) {
      L.marker(s.coord, { icon: makeDot(s.accent), zIndexOffset: 200 })
        .addTo(map)
        .bindTooltip(
          `<span class="v2-map-tip-name">${s.name}</span>${
            s.sub ? `<span class="v2-map-tip-sub">${s.sub}</span>` : ""
          }`,
          { direction: "top", offset: [0, -6], className: "v2-map-tip" }
        )
        .on("click", openMaps);
    }

    L.marker(VESSEL, { icon: VESSEL_PIN, zIndexOffset: 1000 })
      .addTo(map)
      .on("click", openMaps);

    // Permanent floating tags: Centraal + Tram lines
    const makeTag = (
      label: string,
      variant?: "tram1" | "tram6" | "nmbs" | "station" | "walk",
      side: "right" | "left" = "right",
    ) =>
      L.divIcon({
        className: `v2-map-tag v2-map-tag-${side}${variant ? ` v2-map-tag-${variant}` : ""}`,
        iconSize: [1, 1],
        iconAnchor: [0, 14],
        html: `<span class="v2-map-tag-inner">${label}</span>`,
      });

    // Permanent line labels — each on an open stretch of its own line,
    // spread apart vertically and kept clear of the Luchtbal junction.
    L.marker(CENTRAAL, { icon: makeTag("Antwerpen-Centraal", "station"), zIndexOffset: 600, interactive: false }).addTo(map);
    L.marker([51.22850, 4.41250], { icon: makeTag("Tram 1", "tram1", "left"), zIndexOffset: 500, interactive: false }).addTo(map);
    L.marker([51.23650, 4.42500], { icon: makeTag("NMBS · L25", "nmbs", "right"), zIndexOffset: 550, interactive: false }).addTo(map);
    L.marker([51.22650, 4.43200], { icon: makeTag("Tram 6", "tram6", "right"), zIndexOffset: 500, interactive: false }).addTo(map);
    L.marker(LUCHTBAL, { icon: makeTag("Luchtbal", "station", "right"), zIndexOffset: 600, interactive: false }).addTo(map);
    L.marker([51.24585, 4.41550], { icon: makeTag("10 min walk", "walk", "left"), zIndexOffset: 550, interactive: false }).addTo(map);

    map.fitBounds(
      L.latLngBounds([VESSEL, CENTRAAL, LUCHTBAL, KINEPOLIS]),
      { padding: [50, 50] }
    );

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="v2-map-wrap">
      <div ref={ref} className="v2-map-canvas" aria-label="Map of routes to The Vessel" />
      <ul className="v2-map-legend" aria-label="Route legend">
        <li><span className="v2-map-chip" style={{ background: "#6fb1ff" }} aria-hidden="true" />NMBS · Luchtbal</li>
        <li><span className="v2-map-chip" style={{ background: "#e6007e" }} aria-hidden="true" />Tram 6 · Olympiade ↔ Luchtbal</li>
        <li><span className="v2-map-chip" style={{ background: "#8c2b87" }} aria-hidden="true" />Tram 1 · Zuid ↔ Luchtbal</li>
        <li><span className="v2-map-chip v2-map-chip-dashed" style={{ background: "#7be0c2" }} aria-hidden="true" />Walk · ~10 min</li>
      </ul>
    </div>
  );
}
