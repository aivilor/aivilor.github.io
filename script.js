/* ===========================================================
   PORTFOLIO INTERACTIONS
=========================================================== */

// Año del footer
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------------------------------------------------------
   Navbar al hacer scroll
--------------------------------------------------------- */

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("site-header--scrolled");

    } else {

        header.classList.remove("site-header--scrolled");

    }

});

/* ---------------------------------------------------------
   Red del hero: nodos y aristas vienen de dos GeoJSON
   (assets/network-nodes.geojson y assets/network-edges.geojson)
   y se resaltan según la distancia real al cursor
--------------------------------------------------------- */

// Built-in copy of the same two GeoJSON files, used only as a fallback
// when fetch() can't reach assets/ — most commonly because the page was
// opened directly as a file:// URL, which browsers block for fetch/XHR.
// Once the site is served over http(s) (GitHub Pages, a local dev
// server, etc.) the real files in assets/ are used instead, so editing
// them is enough — this fallback is just a safety net.
const FALLBACK_NODES_GEOJSON = {"type":"FeatureCollection","name":"network-nodes","features":[{"type":"Feature","properties":{"id":"n1","hub":false},"geometry":{"type":"Point","coordinates":[-0.414,39.507]}},{"type":"Feature","properties":{"id":"n2","hub":false},"geometry":{"type":"Point","coordinates":[-0.402,39.509]}},{"type":"Feature","properties":{"id":"n3","hub":true},"geometry":{"type":"Point","coordinates":[-0.388,39.504]}},{"type":"Feature","properties":{"id":"n4","hub":false},"geometry":{"type":"Point","coordinates":[-0.373,39.508]}},{"type":"Feature","properties":{"id":"n5","hub":true},"geometry":{"type":"Point","coordinates":[-0.358,39.502]}},{"type":"Feature","properties":{"id":"n6","hub":false},"geometry":{"type":"Point","coordinates":[-0.344,39.506]}},{"type":"Feature","properties":{"id":"n7","hub":false},"geometry":{"type":"Point","coordinates":[-0.33,39.5]}},{"type":"Feature","properties":{"id":"n8","hub":false},"geometry":{"type":"Point","coordinates":[-0.408,39.493]}},{"type":"Feature","properties":{"id":"n9","hub":true},"geometry":{"type":"Point","coordinates":[-0.394,39.489]}},{"type":"Feature","properties":{"id":"n10","hub":false},"geometry":{"type":"Point","coordinates":[-0.38,39.492]}},{"type":"Feature","properties":{"id":"n11","hub":false},"geometry":{"type":"Point","coordinates":[-0.366,39.487]}},{"type":"Feature","properties":{"id":"n12","hub":true},"geometry":{"type":"Point","coordinates":[-0.352,39.491]}},{"type":"Feature","properties":{"id":"n13","hub":false},"geometry":{"type":"Point","coordinates":[-0.338,39.485]}},{"type":"Feature","properties":{"id":"n14","hub":false},"geometry":{"type":"Point","coordinates":[-0.325,39.489]}},{"type":"Feature","properties":{"id":"n15","hub":false},"geometry":{"type":"Point","coordinates":[-0.411,39.477]}},{"type":"Feature","properties":{"id":"n16","hub":false},"geometry":{"type":"Point","coordinates":[-0.397,39.473]}},{"type":"Feature","properties":{"id":"n17","hub":true},"geometry":{"type":"Point","coordinates":[-0.382,39.476]}},{"type":"Feature","properties":{"id":"n18","hub":false},"geometry":{"type":"Point","coordinates":[-0.368,39.471]}},{"type":"Feature","properties":{"id":"n19","hub":true},"geometry":{"type":"Point","coordinates":[-0.354,39.475]}},{"type":"Feature","properties":{"id":"n20","hub":false},"geometry":{"type":"Point","coordinates":[-0.34,39.47]}},{"type":"Feature","properties":{"id":"n21","hub":false},"geometry":{"type":"Point","coordinates":[-0.327,39.474]}},{"type":"Feature","properties":{"id":"n22","hub":false},"geometry":{"type":"Point","coordinates":[-0.405,39.461]}},{"type":"Feature","properties":{"id":"n23","hub":false},"geometry":{"type":"Point","coordinates":[-0.386,39.459]}},{"type":"Feature","properties":{"id":"n24","hub":false},"geometry":{"type":"Point","coordinates":[-0.37,39.463]}},{"type":"Feature","properties":{"id":"n25","hub":false},"geometry":{"type":"Point","coordinates":[-0.355,39.459]}},{"type":"Feature","properties":{"id":"n26","hub":false},"geometry":{"type":"Point","coordinates":[-0.34,39.461]}}]};
const FALLBACK_EDGES_GEOJSON = {"type":"FeatureCollection","name":"network-edges","features":[{"type":"Feature","properties":{"from":"n1","to":"n8"},"geometry":{"type":"LineString","coordinates":[[-0.414,39.507],[-0.408,39.493]]}},{"type":"Feature","properties":{"from":"n2","to":"n8"},"geometry":{"type":"LineString","coordinates":[[-0.402,39.509],[-0.408,39.493]]}},{"type":"Feature","properties":{"from":"n2","to":"n9"},"geometry":{"type":"LineString","coordinates":[[-0.402,39.509],[-0.394,39.489]]}},{"type":"Feature","properties":{"from":"n3","to":"n9"},"geometry":{"type":"LineString","coordinates":[[-0.388,39.504],[-0.394,39.489]]}},{"type":"Feature","properties":{"from":"n3","to":"n10"},"geometry":{"type":"LineString","coordinates":[[-0.388,39.504],[-0.38,39.492]]}},{"type":"Feature","properties":{"from":"n4","to":"n10"},"geometry":{"type":"LineString","coordinates":[[-0.373,39.508],[-0.38,39.492]]}},{"type":"Feature","properties":{"from":"n4","to":"n11"},"geometry":{"type":"LineString","coordinates":[[-0.373,39.508],[-0.366,39.487]]}},{"type":"Feature","properties":{"from":"n5","to":"n11"},"geometry":{"type":"LineString","coordinates":[[-0.358,39.502],[-0.366,39.487]]}},{"type":"Feature","properties":{"from":"n5","to":"n12"},"geometry":{"type":"LineString","coordinates":[[-0.358,39.502],[-0.352,39.491]]}},{"type":"Feature","properties":{"from":"n6","to":"n12"},"geometry":{"type":"LineString","coordinates":[[-0.344,39.506],[-0.352,39.491]]}},{"type":"Feature","properties":{"from":"n6","to":"n13"},"geometry":{"type":"LineString","coordinates":[[-0.344,39.506],[-0.338,39.485]]}},{"type":"Feature","properties":{"from":"n7","to":"n13"},"geometry":{"type":"LineString","coordinates":[[-0.33,39.5],[-0.338,39.485]]}},{"type":"Feature","properties":{"from":"n7","to":"n14"},"geometry":{"type":"LineString","coordinates":[[-0.33,39.5],[-0.325,39.489]]}},{"type":"Feature","properties":{"from":"n1","to":"n2"},"geometry":{"type":"LineString","coordinates":[[-0.414,39.507],[-0.402,39.509]]}},{"type":"Feature","properties":{"from":"n2","to":"n3"},"geometry":{"type":"LineString","coordinates":[[-0.402,39.509],[-0.388,39.504]]}},{"type":"Feature","properties":{"from":"n3","to":"n4"},"geometry":{"type":"LineString","coordinates":[[-0.388,39.504],[-0.373,39.508]]}},{"type":"Feature","properties":{"from":"n4","to":"n5"},"geometry":{"type":"LineString","coordinates":[[-0.373,39.508],[-0.358,39.502]]}},{"type":"Feature","properties":{"from":"n5","to":"n6"},"geometry":{"type":"LineString","coordinates":[[-0.358,39.502],[-0.344,39.506]]}},{"type":"Feature","properties":{"from":"n6","to":"n7"},"geometry":{"type":"LineString","coordinates":[[-0.344,39.506],[-0.33,39.5]]}},{"type":"Feature","properties":{"from":"n8","to":"n9"},"geometry":{"type":"LineString","coordinates":[[-0.408,39.493],[-0.394,39.489]]}},{"type":"Feature","properties":{"from":"n9","to":"n10"},"geometry":{"type":"LineString","coordinates":[[-0.394,39.489],[-0.38,39.492]]}},{"type":"Feature","properties":{"from":"n10","to":"n11"},"geometry":{"type":"LineString","coordinates":[[-0.38,39.492],[-0.366,39.487]]}},{"type":"Feature","properties":{"from":"n11","to":"n12"},"geometry":{"type":"LineString","coordinates":[[-0.366,39.487],[-0.352,39.491]]}},{"type":"Feature","properties":{"from":"n12","to":"n13"},"geometry":{"type":"LineString","coordinates":[[-0.352,39.491],[-0.338,39.485]]}},{"type":"Feature","properties":{"from":"n13","to":"n14"},"geometry":{"type":"LineString","coordinates":[[-0.338,39.485],[-0.325,39.489]]}},{"type":"Feature","properties":{"from":"n8","to":"n15"},"geometry":{"type":"LineString","coordinates":[[-0.408,39.493],[-0.411,39.477]]}},{"type":"Feature","properties":{"from":"n9","to":"n15"},"geometry":{"type":"LineString","coordinates":[[-0.394,39.489],[-0.411,39.477]]}},{"type":"Feature","properties":{"from":"n9","to":"n16"},"geometry":{"type":"LineString","coordinates":[[-0.394,39.489],[-0.397,39.473]]}},{"type":"Feature","properties":{"from":"n10","to":"n16"},"geometry":{"type":"LineString","coordinates":[[-0.38,39.492],[-0.397,39.473]]}},{"type":"Feature","properties":{"from":"n10","to":"n17"},"geometry":{"type":"LineString","coordinates":[[-0.38,39.492],[-0.382,39.476]]}},{"type":"Feature","properties":{"from":"n11","to":"n17"},"geometry":{"type":"LineString","coordinates":[[-0.366,39.487],[-0.382,39.476]]}},{"type":"Feature","properties":{"from":"n11","to":"n18"},"geometry":{"type":"LineString","coordinates":[[-0.366,39.487],[-0.368,39.471]]}},{"type":"Feature","properties":{"from":"n12","to":"n18"},"geometry":{"type":"LineString","coordinates":[[-0.352,39.491],[-0.368,39.471]]}},{"type":"Feature","properties":{"from":"n12","to":"n19"},"geometry":{"type":"LineString","coordinates":[[-0.352,39.491],[-0.354,39.475]]}},{"type":"Feature","properties":{"from":"n13","to":"n19"},"geometry":{"type":"LineString","coordinates":[[-0.338,39.485],[-0.354,39.475]]}},{"type":"Feature","properties":{"from":"n13","to":"n20"},"geometry":{"type":"LineString","coordinates":[[-0.338,39.485],[-0.34,39.47]]}},{"type":"Feature","properties":{"from":"n14","to":"n20"},"geometry":{"type":"LineString","coordinates":[[-0.325,39.489],[-0.34,39.47]]}},{"type":"Feature","properties":{"from":"n14","to":"n21"},"geometry":{"type":"LineString","coordinates":[[-0.325,39.489],[-0.327,39.474]]}},{"type":"Feature","properties":{"from":"n15","to":"n16"},"geometry":{"type":"LineString","coordinates":[[-0.411,39.477],[-0.397,39.473]]}},{"type":"Feature","properties":{"from":"n16","to":"n17"},"geometry":{"type":"LineString","coordinates":[[-0.397,39.473],[-0.382,39.476]]}},{"type":"Feature","properties":{"from":"n17","to":"n18"},"geometry":{"type":"LineString","coordinates":[[-0.382,39.476],[-0.368,39.471]]}},{"type":"Feature","properties":{"from":"n18","to":"n19"},"geometry":{"type":"LineString","coordinates":[[-0.368,39.471],[-0.354,39.475]]}},{"type":"Feature","properties":{"from":"n19","to":"n20"},"geometry":{"type":"LineString","coordinates":[[-0.354,39.475],[-0.34,39.47]]}},{"type":"Feature","properties":{"from":"n20","to":"n21"},"geometry":{"type":"LineString","coordinates":[[-0.34,39.47],[-0.327,39.474]]}},{"type":"Feature","properties":{"from":"n15","to":"n22"},"geometry":{"type":"LineString","coordinates":[[-0.411,39.477],[-0.405,39.461]]}},{"type":"Feature","properties":{"from":"n16","to":"n22"},"geometry":{"type":"LineString","coordinates":[[-0.397,39.473],[-0.405,39.461]]}},{"type":"Feature","properties":{"from":"n16","to":"n23"},"geometry":{"type":"LineString","coordinates":[[-0.397,39.473],[-0.386,39.459]]}},{"type":"Feature","properties":{"from":"n17","to":"n23"},"geometry":{"type":"LineString","coordinates":[[-0.382,39.476],[-0.386,39.459]]}},{"type":"Feature","properties":{"from":"n17","to":"n24"},"geometry":{"type":"LineString","coordinates":[[-0.382,39.476],[-0.37,39.463]]}},{"type":"Feature","properties":{"from":"n18","to":"n24"},"geometry":{"type":"LineString","coordinates":[[-0.368,39.471],[-0.37,39.463]]}},{"type":"Feature","properties":{"from":"n18","to":"n25"},"geometry":{"type":"LineString","coordinates":[[-0.368,39.471],[-0.355,39.459]]}},{"type":"Feature","properties":{"from":"n19","to":"n25"},"geometry":{"type":"LineString","coordinates":[[-0.354,39.475],[-0.355,39.459]]}},{"type":"Feature","properties":{"from":"n19","to":"n26"},"geometry":{"type":"LineString","coordinates":[[-0.354,39.475],[-0.34,39.461]]}},{"type":"Feature","properties":{"from":"n20","to":"n26"},"geometry":{"type":"LineString","coordinates":[[-0.34,39.47],[-0.34,39.461]]}},{"type":"Feature","properties":{"from":"n22","to":"n23"},"geometry":{"type":"LineString","coordinates":[[-0.405,39.461],[-0.386,39.459]]}},{"type":"Feature","properties":{"from":"n23","to":"n24"},"geometry":{"type":"LineString","coordinates":[[-0.386,39.459],[-0.37,39.463]]}},{"type":"Feature","properties":{"from":"n24","to":"n25"},"geometry":{"type":"LineString","coordinates":[[-0.37,39.463],[-0.355,39.459]]}},{"type":"Feature","properties":{"from":"n25","to":"n26"},"geometry":{"type":"LineString","coordinates":[[-0.355,39.459],[-0.34,39.461]]}}]};

const heroSection = document.querySelector(".hero");
const heroNetwork = document.querySelector(".hero__network");

if (heroSection && heroNetwork) {

    const edgeGroup = heroNetwork.querySelector(".network-edge");
    const nodeGroup = heroNetwork.querySelector(".network-node");
    const SVG_NS = "http://www.w3.org/2000/svg";
    const VIEW_W = 1000;
    const VIEW_H = 600;
    const VIEW_PADDING = 40; // keep the network off the very edge of the viewBox
    const HOVER_RADIUS = 130; // in the SVG's own viewBox units

    // Shortest distance from point (px, py) to the segment (x1,y1)-(x2,y2)
    const distanceToSegment = (px, py, x1, y1, x2, y2) => {

        const dx = x2 - x1;
        const dy = y2 - y1;
        const lengthSq = dx * dx + dy * dy;

        let t = lengthSq ? ((px - x1) * dx + (py - y1) * dy) / lengthSq : 0;
        t = Math.max(0, Math.min(1, t));

        const projX = x1 + t * dx;
        const projY = y1 + t * dy;

        return Math.hypot(px - projX, py - projY);

    };

    // Tries to fetch a GeoJSON file; falls back to the built-in copy
    // above if the request fails for any reason (blocked file:// fetch,
    // missing file, network error, etc.) so the hero never ends up empty.
    async function fetchGeoJSON(url, fallback) {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (err) {
            console.warn(`Hero network: couldn't fetch ${url}, using built-in fallback data (${err.message}).`);
            return fallback;
        }
    }

    // Loads both GeoJSON files and draws the network into the SVG
    async function loadNetworkFromGeoJSON() {

        const [nodesGeoJSON, edgesGeoJSON] = await Promise.all([
            fetchGeoJSON("assets/network-nodes.geojson", FALLBACK_NODES_GEOJSON),
            fetchGeoJSON("assets/network-edges.geojson", FALLBACK_EDGES_GEOJSON)
        ]);

        // Work out the lon/lat bounding box across both files so the
        // projection below always fits whatever data is supplied.
        const allCoords = [];

        nodesGeoJSON.features.forEach(f => allCoords.push(f.geometry.coordinates));
        edgesGeoJSON.features.forEach(f => f.geometry.coordinates.forEach(c => allCoords.push(c)));

        const lons = allCoords.map(c => c[0]);
        const lats = allCoords.map(c => c[1]);
        const lonMin = Math.min(...lons), lonMax = Math.max(...lons);
        const latMin = Math.min(...lats), latMax = Math.max(...lats);
        const lonRange = lonMax - lonMin || 1;
        const latRange = latMax - latMin || 1;

        // Simple normalized projection (not a true geographic
        // projection) — just enough to place the GeoJSON coordinates
        // inside the SVG viewBox for decorative purposes.
        const project = ([lon, lat]) => {
            const x = VIEW_PADDING + ((lon - lonMin) / lonRange) * (VIEW_W - VIEW_PADDING * 2);
            const y = VIEW_PADDING + ((latMax - lat) / latRange) * (VIEW_H - VIEW_PADDING * 2);
            return [x, y];
        };

        edgesGeoJSON.features.forEach(feature => {
            const [[x1, y1], [x2, y2]] = feature.geometry.coordinates.map(project);
            const line = document.createElementNS(SVG_NS, "line");
            line.setAttribute("x1", x1.toFixed(2));
            line.setAttribute("y1", y1.toFixed(2));
            line.setAttribute("x2", x2.toFixed(2));
            line.setAttribute("y2", y2.toFixed(2));
            edgeGroup.appendChild(line);
        });

        nodesGeoJSON.features.forEach(feature => {
            const [x, y] = project(feature.geometry.coordinates);
            const circle = document.createElementNS(SVG_NS, "circle");
            circle.setAttribute("cx", x.toFixed(2));
            circle.setAttribute("cy", y.toFixed(2));
            circle.setAttribute("r", feature.properties && feature.properties.hub ? 5 : 4);
            if (feature.properties && feature.properties.hub) {
                circle.classList.add("network-node--hub");
            }
            nodeGroup.appendChild(circle);
        });

    }

    function enableNetworkHighlight() {

        const networkNodes = Array.from(nodeGroup.querySelectorAll("circle"));
        const networkEdges = Array.from(edgeGroup.querySelectorAll("line"));

        const clearHighlight = () => {
            networkNodes.forEach(node => node.style.setProperty("--p", 0));
            networkEdges.forEach(edge => edge.style.setProperty("--p", 0));
        };

        const updateHighlight = (clientX, clientY) => {

            const ctm = heroNetwork.getScreenCTM();
            if (!ctm) return;

            const point = heroNetwork.createSVGPoint();
            point.x = clientX;
            point.y = clientY;

            const loc = point.matrixTransform(ctm.inverse());

            networkNodes.forEach(node => {
                const cx = parseFloat(node.getAttribute("cx"));
                const cy = parseFloat(node.getAttribute("cy"));
                const dist = Math.hypot(loc.x - cx, loc.y - cy);
                const p = Math.max(0, 1 - dist / HOVER_RADIUS);
                node.style.setProperty("--p", p.toFixed(2));
            });

            networkEdges.forEach(edge => {
                const x1 = parseFloat(edge.getAttribute("x1"));
                const y1 = parseFloat(edge.getAttribute("y1"));
                const x2 = parseFloat(edge.getAttribute("x2"));
                const y2 = parseFloat(edge.getAttribute("y2"));
                const dist = distanceToSegment(loc.x, loc.y, x1, y1, x2, y2);
                const p = Math.max(0, 1 - dist / HOVER_RADIUS);
                edge.style.setProperty("--p", p.toFixed(2));
            });

        };

        heroSection.addEventListener("pointermove", (e) => updateHighlight(e.clientX, e.clientY));
        heroSection.addEventListener("pointerleave", clearHighlight);

    }

    loadNetworkFromGeoJSON()
        .then(enableNetworkHighlight)
        .catch(err => {
            // Fails quietly (e.g. opened as a local file:// page, or the
            // GeoJSON files were removed) — the hero still looks fine
            // without the decorative network.
            console.warn("Hero network not loaded:", err);
        });

}

/* ---------------------------------------------------------
   Animación de aparición
--------------------------------------------------------- */

const observer = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},

{
    threshold:.15
});

document.querySelectorAll(

".section, .org-item, .biblio-card, .project-card, .teaching-item"

).forEach(el=>{

    el.classList.add("hidden");

    observer.observe(el);

});

/* ---------------------------------------------------------
   Sección activa del menú
--------------------------------------------------------- */

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".nav__links a");

const menuObserver=new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

navLinks.forEach(link=>{

link.classList.remove("active");

if(

link.getAttribute("href")==="#"+entry.target.id

){

link.classList.add("active");

}

});

}

});

},

{

threshold:.45

}

);

sections.forEach(section=>{

menuObserver.observe(section);

});

/* ---------------------------------------------------------
   Filtro publicaciones
--------------------------------------------------------- */

const tabs=document.querySelectorAll(".tab");

const cards=document.querySelectorAll(".biblio-card");

tabs.forEach(tab=>{

tab.addEventListener("click",()=>{

tabs.forEach(t=>t.classList.remove("is-active"));

tab.classList.add("is-active");

const filter=tab.dataset.filter;

cards.forEach(card=>{

if(

filter==="all" ||

card.dataset.tags.includes(filter)

){

card.classList.remove("is-hidden");

}else{

card.classList.add("is-hidden");

}

});

});

});


