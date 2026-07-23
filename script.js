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
const FALLBACK_NODES_GEOJSON = {"type":"FeatureCollection","name":"network-nodes","features":[{"type":"Feature","properties":{"id":"1836_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.384289,39.495246]}},{"type":"Feature","properties":{"id":"833_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.393603,39.481094]}},{"type":"Feature","properties":{"id":"359_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.392086,39.481841]}},{"type":"Feature","properties":{"id":"1688_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.363258,39.462152]}},{"type":"Feature","properties":{"id":"409_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.391574,39.479315]}},{"type":"Feature","properties":{"id":"717_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.373749,39.462052]}},{"type":"Feature","properties":{"id":"1854_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.365723,39.461202]}},{"type":"Feature","properties":{"id":"1783_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.386037,39.459712]}},{"type":"Feature","properties":{"id":"645_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.368995,39.459046]}},{"type":"Feature","properties":{"id":"1895_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.351892,39.480903]}},{"type":"Feature","properties":{"id":"1775_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.360412,39.467213]}},{"type":"Feature","properties":{"id":"1168_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.328632,39.463021]}},{"type":"Feature","properties":{"id":"1384_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.335122,39.466689]}},{"type":"Feature","properties":{"id":"559_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.390129,39.456838]}},{"type":"Feature","properties":{"id":"2041_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.356675,39.456799]}},{"type":"Feature","properties":{"id":"1012_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.341477,39.440472]}},{"type":"Feature","properties":{"id":"1861_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.373253,39.493237]}},{"type":"Feature","properties":{"id":"268_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.382372,39.491103]}},{"type":"Feature","properties":{"id":"886_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.368119,39.460196]}},{"type":"Feature","properties":{"id":"1784_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.386074,39.460752]}},{"type":"Feature","properties":{"id":"344_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.381175,39.482865]}},{"type":"Feature","properties":{"id":"248_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.370315,39.498886]}},{"type":"Feature","properties":{"id":"695_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.388091,39.474909]}},{"type":"Feature","properties":{"id":"732_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.363891,39.463481]}},{"type":"Feature","properties":{"id":"555_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.388655,39.463783]}},{"type":"Feature","properties":{"id":"1038_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.396416,39.463549]}},{"type":"Feature","properties":{"id":"227_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.355236,39.471768]}},{"type":"Feature","properties":{"id":"623_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.375158,39.455064]}},{"type":"Feature","properties":{"id":"2343_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.373876,39.447757]}},{"type":"Feature","properties":{"id":"426_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.394022,39.472407]}},{"type":"Feature","properties":{"id":"1940_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.368505,39.441754]}},{"type":"Feature","properties":{"id":"705_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.382953,39.467153]}},{"type":"Feature","properties":{"id":"1330_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.397393,39.495536]}},{"type":"Feature","properties":{"id":"748_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.391952,39.473818]}},{"type":"Feature","properties":{"id":"1538_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.35206,39.460173]}},{"type":"Feature","properties":{"id":"2213_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.356463,39.475373]}},{"type":"Feature","properties":{"id":"2378_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.335726,39.444719]}},{"type":"Feature","properties":{"id":"1464_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.379444,39.449412]}},{"type":"Feature","properties":{"id":"975_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.389185,39.450061]}},{"type":"Feature","properties":{"id":"1442_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.387099,39.446686]}},{"type":"Feature","properties":{"id":"2224_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.335806,39.447563]}},{"type":"Feature","properties":{"id":"1591_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.336111,39.458817]}},{"type":"Feature","properties":{"id":"621_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.375718,39.45228]}},{"type":"Feature","properties":{"id":"582_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.391526,39.433275]}},{"type":"Feature","properties":{"id":"734_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.366396,39.467122]}},{"type":"Feature","properties":{"id":"1240_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.357019,39.48703]}},{"type":"Feature","properties":{"id":"338_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.371386,39.478985]}},{"type":"Feature","properties":{"id":"1428_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.361174,39.463472]}},{"type":"Feature","properties":{"id":"2409_bus","hub":true},"geometry":{"type":"Point","coordinates":[-0.382441,39.439851]}},{"type":"Feature","properties":{"id":"816_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.381016,39.466582]}},{"type":"Feature","properties":{"id":"793_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.384058,39.474994]}},{"type":"Feature","properties":{"id":"354_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.386217,39.484974]}},{"type":"Feature","properties":{"id":"694_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.386225,39.472273]}},{"type":"Feature","properties":{"id":"592_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.385993,39.447303]}},{"type":"Feature","properties":{"id":"2206_bus","hub":true},"geometry":{"type":"Point","coordinates":[-0.365756,39.470751]}},{"type":"Feature","properties":{"id":"1696_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.384442,39.458996]}},{"type":"Feature","properties":{"id":"2052_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.350418,39.453057]}},{"type":"Feature","properties":{"id":"739_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.383476,39.466117]}},{"type":"Feature","properties":{"id":"1118_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.350251,39.468317]}},{"type":"Feature","properties":{"id":"2050_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.346681,39.452005]}},{"type":"Feature","properties":{"id":"1754_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.334218,39.472422]}},{"type":"Feature","properties":{"id":"1283_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.34536,39.479418]}},{"type":"Feature","properties":{"id":"1537_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.358566,39.463026]}},{"type":"Feature","properties":{"id":"668_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.362505,39.432682]}},{"type":"Feature","properties":{"id":"407_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.393489,39.481652]}},{"type":"Feature","properties":{"id":"1132_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.37441,39.497057]}},{"type":"Feature","properties":{"id":"1057_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.356003,39.474961]}},{"type":"Feature","properties":{"id":"867_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.351531,39.4778]}},{"type":"Feature","properties":{"id":"1210_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.335639,39.470618]}},{"type":"Feature","properties":{"id":"2067_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.398906,39.478674]}},{"type":"Feature","properties":{"id":"325_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.374399,39.491506]}},{"type":"Feature","properties":{"id":"1263_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.369154,39.471053]}},{"type":"Feature","properties":{"id":"155_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.356195,39.476726]}},{"type":"Feature","properties":{"id":"243_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.37891,39.490916]}},{"type":"Feature","properties":{"id":"358_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.389646,39.482951]}},{"type":"Feature","properties":{"id":"2066_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.40282,39.478455]}},{"type":"Feature","properties":{"id":"324_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.374026,39.491593]}},{"type":"Feature","properties":{"id":"1619_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.348177,39.464572]}},{"type":"Feature","properties":{"id":"164_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.365188,39.479095]}},{"type":"Feature","properties":{"id":"588_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.391246,39.433988]}},{"type":"Feature","properties":{"id":"1646_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.362766,39.456812]}},{"type":"Feature","properties":{"id":"11_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.32805,39.469407]}},{"type":"Feature","properties":{"id":"439_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.388482,39.464863]}},{"type":"Feature","properties":{"id":"749_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.391335,39.47452]}},{"type":"Feature","properties":{"id":"1592_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.3395,39.458999]}},{"type":"Feature","properties":{"id":"1756_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.335356,39.466323]}},{"type":"Feature","properties":{"id":"194_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.363244,39.484218]}},{"type":"Feature","properties":{"id":"169_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.3548,39.47591]}},{"type":"Feature","properties":{"id":"966_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.357542,39.483994]}},{"type":"Feature","properties":{"id":"1682_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.373439,39.491784]}},{"type":"Feature","properties":{"id":"153_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.352945,39.474231]}},{"type":"Feature","properties":{"id":"1733_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.393192,39.452218]}},{"type":"Feature","properties":{"id":"1151_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.37255,39.494705]}},{"type":"Feature","properties":{"id":"1819_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.374982,39.455583]}},{"type":"Feature","properties":{"id":"157_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.357645,39.477156]}},{"type":"Feature","properties":{"id":"9_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.328598,39.465628]}},{"type":"Feature","properties":{"id":"436_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.384422,39.459151]}},{"type":"Feature","properties":{"id":"635_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.367031,39.446145]}},{"type":"Feature","properties":{"id":"168_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.3569,39.476319]}},{"type":"Feature","properties":{"id":"2404_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.369861,39.473989]}},{"type":"Feature","properties":{"id":"1225_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.403967,39.456564]}},{"type":"Feature","properties":{"id":"373_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.394758,39.484368]}},{"type":"Feature","properties":{"id":"1430_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.360562,39.467973]}},{"type":"Feature","properties":{"id":"1042_bus","hub":true},"geometry":{"type":"Point","coordinates":[-0.363196,39.462789]}},{"type":"Feature","properties":{"id":"1584_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.386502,39.484536]}},{"type":"Feature","properties":{"id":"1597_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.35065,39.464994]}},{"type":"Feature","properties":{"id":"443_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.39541,39.474567]}},{"type":"Feature","properties":{"id":"2158_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.373555,39.44546]}},{"type":"Feature","properties":{"id":"1385_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.334427,39.468347]}},{"type":"Feature","properties":{"id":"1587_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.329395,39.46378]}},{"type":"Feature","properties":{"id":"631_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.367063,39.445841]}},{"type":"Feature","properties":{"id":"226_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.354153,39.47199]}},{"type":"Feature","properties":{"id":"2292_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.363644,39.457029]}},{"type":"Feature","properties":{"id":"1761_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.352685,39.459469]}},{"type":"Feature","properties":{"id":"1847_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.383571,39.493145]}},{"type":"Feature","properties":{"id":"1687_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.385684,39.460743]}},{"type":"Feature","properties":{"id":"1489_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.347134,39.480235]}},{"type":"Feature","properties":{"id":"1965_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.38082,39.445782]}},{"type":"Feature","properties":{"id":"983_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.379723,39.4632]}},{"type":"Feature","properties":{"id":"746_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.388096,39.469757]}},{"type":"Feature","properties":{"id":"1353_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.371788,39.453185]}},{"type":"Feature","properties":{"id":"979_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.389131,39.45031]}},{"type":"Feature","properties":{"id":"1515_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.3397,39.467289]}},{"type":"Feature","properties":{"id":"803_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.384861,39.475611]}},{"type":"Feature","properties":{"id":"113_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.348756,39.474316]}},{"type":"Feature","properties":{"id":"1354_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.374477,39.451736]}},{"type":"Feature","properties":{"id":"965_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.357071,39.485816]}},{"type":"Feature","properties":{"id":"967_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.359187,39.481701]}},{"type":"Feature","properties":{"id":"511_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.396892,39.463957]}},{"type":"Feature","properties":{"id":"533_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.388922,39.464214]}},{"type":"Feature","properties":{"id":"163_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.365646,39.478891]}},{"type":"Feature","properties":{"id":"1211_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.33733,39.471163]}},{"type":"Feature","properties":{"id":"508_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.395674,39.467983]}},{"type":"Feature","properties":{"id":"2305_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.400252,39.473452]}},{"type":"Feature","properties":{"id":"1816_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.37291,39.485323]}},{"type":"Feature","properties":{"id":"2287_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.380519,39.472737]}},{"type":"Feature","properties":{"id":"703_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.38513,39.470408]}},{"type":"Feature","properties":{"id":"1840_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.365673,39.490862]}},{"type":"Feature","properties":{"id":"46_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.331691,39.472297]}},{"type":"Feature","properties":{"id":"1535_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.352361,39.460447]}},{"type":"Feature","properties":{"id":"974_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.388621,39.45267]}},{"type":"Feature","properties":{"id":"2094_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.367049,39.484872]}},{"type":"Feature","properties":{"id":"434_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.383818,39.45805]}},{"type":"Feature","properties":{"id":"1759_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.345934,39.457327]}},{"type":"Feature","properties":{"id":"718_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.371788,39.459274]}},{"type":"Feature","properties":{"id":"206_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.371462,39.490175]}},{"type":"Feature","properties":{"id":"307_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.390398,39.48942]}},{"type":"Feature","properties":{"id":"686_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.365787,39.468445]}},{"type":"Feature","properties":{"id":"1091_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.37918,39.45047]}},{"type":"Feature","properties":{"id":"750_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.394233,39.47435]}},{"type":"Feature","properties":{"id":"666_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.363497,39.429911]}},{"type":"Feature","properties":{"id":"1822_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.371307,39.450147]}},{"type":"Feature","properties":{"id":"2256_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.369487,39.472152]}},{"type":"Feature","properties":{"id":"1331_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.395912,39.493841]}},{"type":"Feature","properties":{"id":"47_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.331816,39.472321]}},{"type":"Feature","properties":{"id":"1461_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.356572,39.461416]}},{"type":"Feature","properties":{"id":"1362_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.353204,39.461093]}},{"type":"Feature","properties":{"id":"1590_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.333621,39.459161]}},{"type":"Feature","properties":{"id":"1744_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.35278,39.45936]}},{"type":"Feature","properties":{"id":"361_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.38977,39.482726]}},{"type":"Feature","properties":{"id":"1027_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.36265,39.432418]}},{"type":"Feature","properties":{"id":"1050_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.33231,39.467892]}},{"type":"Feature","properties":{"id":"60_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.330566,39.454443]}},{"type":"Feature","properties":{"id":"2306_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.4028,39.472678]}},{"type":"Feature","properties":{"id":"543_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.401427,39.4589]}},{"type":"Feature","properties":{"id":"215_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.367974,39.487019]}},{"type":"Feature","properties":{"id":"1716_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.387717,39.473813]}},{"type":"Feature","properties":{"id":"350_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.38149,39.482686]}},{"type":"Feature","properties":{"id":"1968_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.382049,39.466408]}},{"type":"Feature","properties":{"id":"1815_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.376459,39.48538]}},{"type":"Feature","properties":{"id":"628_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.370672,39.451703]}},{"type":"Feature","properties":{"id":"1932_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.390719,39.455899]}},{"type":"Feature","properties":{"id":"544_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.399175,39.460986]}},{"type":"Feature","properties":{"id":"620_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.373905,39.449697]}},{"type":"Feature","properties":{"id":"2238_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.367777,39.446778]}},{"type":"Feature","properties":{"id":"689_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.373472,39.465181]}},{"type":"Feature","properties":{"id":"595_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.383749,39.456751]}},{"type":"Feature","properties":{"id":"1419_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.356762,39.456114]}},{"type":"Feature","properties":{"id":"548_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.388664,39.460189]}},{"type":"Feature","properties":{"id":"1805_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.367848,39.469221]}},{"type":"Feature","properties":{"id":"1278_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.384505,39.470345]}},{"type":"Feature","properties":{"id":"171_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.364134,39.483968]}},{"type":"Feature","properties":{"id":"764_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.364333,39.469317]}},{"type":"Feature","properties":{"id":"225_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.353088,39.474161]}},{"type":"Feature","properties":{"id":"1845_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.370183,39.494313]}},{"type":"Feature","properties":{"id":"603_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.366399,39.462069]}},{"type":"Feature","properties":{"id":"1424_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.390773,39.477243]}},{"type":"Feature","properties":{"id":"1660_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.402151,39.483726]}},{"type":"Feature","properties":{"id":"978_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.38958,39.448192]}},{"type":"Feature","properties":{"id":"1745_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.350191,39.457573]}},{"type":"Feature","properties":{"id":"2219_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.375906,39.470094]}},{"type":"Feature","properties":{"id":"1757_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.336142,39.464513]}},{"type":"Feature","properties":{"id":"2048_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.336266,39.449699]}},{"type":"Feature","properties":{"id":"976_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.389602,39.448087]}},{"type":"Feature","properties":{"id":"2340_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.384798,39.42792]}},{"type":"Feature","properties":{"id":"7_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.332531,39.46038]}},{"type":"Feature","properties":{"id":"2064_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.403769,39.481161]}},{"type":"Feature","properties":{"id":"154_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.353888,39.475823]}},{"type":"Feature","properties":{"id":"1041_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.382113,39.46599]}},{"type":"Feature","properties":{"id":"1266_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.391478,39.484373]}},{"type":"Feature","properties":{"id":"12_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.32772,39.471671]}},{"type":"Feature","properties":{"id":"192_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.357962,39.480293]}},{"type":"Feature","properties":{"id":"2060_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.339715,39.461175]}},{"type":"Feature","properties":{"id":"20_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.327786,39.483801]}},{"type":"Feature","properties":{"id":"622_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.376965,39.454046]}},{"type":"Feature","properties":{"id":"2080_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.377391,39.463221]}},{"type":"Feature","properties":{"id":"441_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.391834,39.469592]}},{"type":"Feature","properties":{"id":"1175_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.402699,39.458658]}},{"type":"Feature","properties":{"id":"2244_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.402206,39.457293]}},{"type":"Feature","properties":{"id":"1321_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.403685,39.493978]}},{"type":"Feature","properties":{"id":"348_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.387812,39.479921]}},{"type":"Feature","properties":{"id":"1753_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.333676,39.475235]}},{"type":"Feature","properties":{"id":"581_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.390934,39.434793]}},{"type":"Feature","properties":{"id":"2049_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.340526,39.45072]}},{"type":"Feature","properties":{"id":"1500_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.3389,39.466962]}},{"type":"Feature","properties":{"id":"1540_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.345663,39.45878]}},{"type":"Feature","properties":{"id":"1741_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.39477,39.483449]}},{"type":"Feature","properties":{"id":"1492_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.347678,39.478267]}},{"type":"Feature","properties":{"id":"696_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.389962,39.476946]}},{"type":"Feature","properties":{"id":"2258_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.369158,39.471441]}},{"type":"Feature","properties":{"id":"1438_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.394586,39.449462]}},{"type":"Feature","properties":{"id":"1980_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.334586,39.448535]}},{"type":"Feature","properties":{"id":"207_bus","hub":true},"geometry":{"type":"Point","coordinates":[-0.368941,39.488305]}},{"type":"Feature","properties":{"id":"371_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.391437,39.479466]}},{"type":"Feature","properties":{"id":"2337_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.385078,39.427923]}},{"type":"Feature","properties":{"id":"2051_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.347986,39.452249]}},{"type":"Feature","properties":{"id":"1282_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.345607,39.479416]}},{"type":"Feature","properties":{"id":"308_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.393386,39.492345]}},{"type":"Feature","properties":{"id":"709_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.372408,39.465327]}},{"type":"Feature","properties":{"id":"1843_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.366032,39.491256]}},{"type":"Feature","properties":{"id":"650_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.36577,39.452463]}},{"type":"Feature","properties":{"id":"1943_bus","hub":true},"geometry":{"type":"Point","coordinates":[-0.386431,39.44627]}},{"type":"Feature","properties":{"id":"546_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.387245,39.46177]}},{"type":"Feature","properties":{"id":"1765_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.358394,39.459077]}},{"type":"Feature","properties":{"id":"1541_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.342858,39.459091]}},{"type":"Feature","properties":{"id":"158_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.360081,39.477877]}},{"type":"Feature","properties":{"id":"1386_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.335036,39.468099]}},{"type":"Feature","properties":{"id":"1991_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.364082,39.490712]}},{"type":"Feature","properties":{"id":"403_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.402336,39.493853]}},{"type":"Feature","properties":{"id":"1807_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.372982,39.485403]}},{"type":"Feature","properties":{"id":"540_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.403206,39.457521]}},{"type":"Feature","properties":{"id":"1352_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.369091,39.454298]}},{"type":"Feature","properties":{"id":"534_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.389547,39.464254]}},{"type":"Feature","properties":{"id":"1766_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.383691,39.47089]}},{"type":"Feature","properties":{"id":"1387_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.336985,39.466496]}},{"type":"Feature","properties":{"id":"961_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.38798,39.456655]}},{"type":"Feature","properties":{"id":"432_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.387209,39.462894]}},{"type":"Feature","properties":{"id":"1361_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.344643,39.479798]}},{"type":"Feature","properties":{"id":"2255_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.368803,39.472141]}},{"type":"Feature","properties":{"id":"1944_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.381268,39.445493]}},{"type":"Feature","properties":{"id":"2339_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.380964,39.426316]}},{"type":"Feature","properties":{"id":"1131_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.377287,39.496555]}},{"type":"Feature","properties":{"id":"2098_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.400408,39.478453]}},{"type":"Feature","properties":{"id":"1627_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.32888,39.463753]}},{"type":"Feature","properties":{"id":"1332_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.393843,39.491908]}},{"type":"Feature","properties":{"id":"823_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.372407,39.465985]}},{"type":"Feature","properties":{"id":"1630_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.340701,39.460424]}},{"type":"Feature","properties":{"id":"1692_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.390317,39.467448]}},{"type":"Feature","properties":{"id":"1143_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.368095,39.442519]}},{"type":"Feature","properties":{"id":"1039_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.357008,39.472282]}},{"type":"Feature","properties":{"id":"1127_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.37736,39.498051]}},{"type":"Feature","properties":{"id":"481_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.392262,39.468892]}},{"type":"Feature","properties":{"id":"372_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.393477,39.482285]}},{"type":"Feature","properties":{"id":"1518_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.328065,39.481103]}},{"type":"Feature","properties":{"id":"697_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.388842,39.47537]}},{"type":"Feature","properties":{"id":"2387_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.341952,39.440014]}},{"type":"Feature","properties":{"id":"364_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.390753,39.48591]}},{"type":"Feature","properties":{"id":"1691_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.387555,39.463564]}},{"type":"Feature","properties":{"id":"66_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.335213,39.44486]}},{"type":"Feature","properties":{"id":"2309_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.37776,39.467258]}},{"type":"Feature","properties":{"id":"530_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.399854,39.46377]}},{"type":"Feature","properties":{"id":"1955_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.347441,39.456867]}},{"type":"Feature","properties":{"id":"722_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.373032,39.464786]}},{"type":"Feature","properties":{"id":"535_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.393352,39.464101]}},{"type":"Feature","properties":{"id":"1673_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.329104,39.465706]}},{"type":"Feature","properties":{"id":"1306_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.330059,39.455042]}},{"type":"Feature","properties":{"id":"368_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.394727,39.477765]}},{"type":"Feature","properties":{"id":"1440_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.390938,39.447431]}},{"type":"Feature","properties":{"id":"1618_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.350717,39.465327]}},{"type":"Feature","properties":{"id":"1501_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.336979,39.466391]}},{"type":"Feature","properties":{"id":"2208_bus","hub":true},"geometry":{"type":"Point","coordinates":[-0.338672,39.429831]}},{"type":"Feature","properties":{"id":"259_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.370235,39.499304]}},{"type":"Feature","properties":{"id":"2072_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.405425,39.472452]}},{"type":"Feature","properties":{"id":"1532_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.34351,39.458848]}},{"type":"Feature","properties":{"id":"929_bus","hub":true},"geometry":{"type":"Point","coordinates":[-0.341085,39.424035]}},{"type":"Feature","properties":{"id":"2410_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.382545,39.439789]}},{"type":"Feature","properties":{"id":"114_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.351187,39.475036]}},{"type":"Feature","properties":{"id":"1120_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.352226,39.463472]}},{"type":"Feature","properties":{"id":"328_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.37863,39.485205]}},{"type":"Feature","properties":{"id":"1432_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.396322,39.476737]}},{"type":"Feature","properties":{"id":"575_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.383988,39.455783]}},{"type":"Feature","properties":{"id":"1821_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.372706,39.452142]}},{"type":"Feature","properties":{"id":"1333_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.392414,39.490411]}},{"type":"Feature","properties":{"id":"724_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.363781,39.462775]}},{"type":"Feature","properties":{"id":"1624_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.333265,39.460145]}},{"type":"Feature","properties":{"id":"1254_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.391871,39.467327]}},{"type":"Feature","properties":{"id":"1844_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.368412,39.492966]}},{"type":"Feature","properties":{"id":"2293_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.362584,39.455512]}},{"type":"Feature","properties":{"id":"2093_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.404299,39.474923]}},{"type":"Feature","properties":{"id":"1441_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.386956,39.446504]}},{"type":"Feature","properties":{"id":"1755_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.334722,39.470851]}},{"type":"Feature","properties":{"id":"173_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.366162,39.47988]}},{"type":"Feature","properties":{"id":"1683_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.379058,39.490985]}},{"type":"Feature","properties":{"id":"1929_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.394394,39.450423]}},{"type":"Feature","properties":{"id":"1613_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.3286,39.462946]}},{"type":"Feature","properties":{"id":"649_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.363223,39.453542]}},{"type":"Feature","properties":{"id":"1746_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.345112,39.457672]}},{"type":"Feature","properties":{"id":"777_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.364803,39.469593]}},{"type":"Feature","properties":{"id":"2273_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.376659,39.452616]}},{"type":"Feature","properties":{"id":"1622_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.339153,39.461891]}},{"type":"Feature","properties":{"id":"1866_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.397605,39.462567]}},{"type":"Feature","properties":{"id":"1055_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.357042,39.472833]}},{"type":"Feature","properties":{"id":"1763_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.361382,39.464677]}},{"type":"Feature","properties":{"id":"473_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.40023,39.47241]}},{"type":"Feature","properties":{"id":"1490_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.347684,39.48066]}},{"type":"Feature","properties":{"id":"172_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.365139,39.481941]}},{"type":"Feature","properties":{"id":"1825_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.383982,39.495048]}},{"type":"Feature","properties":{"id":"2288_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.379757,39.472593]}},{"type":"Feature","properties":{"id":"1772_bus","hub":true},"geometry":{"type":"Point","coordinates":[-0.378102,39.425153]}},{"type":"Feature","properties":{"id":"1462_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.356642,39.461033]}},{"type":"Feature","properties":{"id":"711_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.367311,39.467459]}},{"type":"Feature","properties":{"id":"2267_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.400752,39.46336]}},{"type":"Feature","properties":{"id":"2291_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.365556,39.459739]}},{"type":"Feature","properties":{"id":"1239_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.356514,39.47907]}},{"type":"Feature","properties":{"id":"326_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.375969,39.489301]}},{"type":"Feature","properties":{"id":"346_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.387653,39.480136]}},{"type":"Feature","properties":{"id":"1028_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.363573,39.429493]}},{"type":"Feature","properties":{"id":"1602_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.337565,39.462743]}},{"type":"Feature","properties":{"id":"2373_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.335456,39.442895]}},{"type":"Feature","properties":{"id":"1990_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.361626,39.492106]}},{"type":"Feature","properties":{"id":"2221_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.375918,39.469952]}},{"type":"Feature","properties":{"id":"1133_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.372207,39.496124]}},{"type":"Feature","properties":{"id":"422_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.39765,39.47742]}},{"type":"Feature","properties":{"id":"2114_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.328208,39.485153]}},{"type":"Feature","properties":{"id":"2359_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.378895,39.464628]}},{"type":"Feature","properties":{"id":"1665_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.358776,39.459834]}},{"type":"Feature","properties":{"id":"1443_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.390486,39.447471]}},{"type":"Feature","properties":{"id":"1096_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.346445,39.477028]}},{"type":"Feature","properties":{"id":"2229_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.334736,39.470602]}},{"type":"Feature","properties":{"id":"224_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.367519,39.477373]}},{"type":"Feature","properties":{"id":"1686_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.388455,39.464639]}},{"type":"Feature","properties":{"id":"1296_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.395269,39.478742]}},{"type":"Feature","properties":{"id":"1110_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.350996,39.465983]}},{"type":"Feature","properties":{"id":"2239_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.36772,39.44646]}},{"type":"Feature","properties":{"id":"428_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.39193,39.46844]}},{"type":"Feature","properties":{"id":"2261_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.37652,39.467454]}},{"type":"Feature","properties":{"id":"2044_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.34795,39.452238]}},{"type":"Feature","properties":{"id":"815_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.381325,39.465983]}},{"type":"Feature","properties":{"id":"1547_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.386872,39.457987]}},{"type":"Feature","properties":{"id":"1839_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.36856,39.493077]}},{"type":"Feature","properties":{"id":"577_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.385738,39.448227]}},{"type":"Feature","properties":{"id":"2223_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.36965,39.473805]}},{"type":"Feature","properties":{"id":"427_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.392384,39.470037]}},{"type":"Feature","properties":{"id":"1785_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.386938,39.458265]}},{"type":"Feature","properties":{"id":"654_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.363063,39.453487]}},{"type":"Feature","properties":{"id":"1663_bus","hub":false},"geometry":{"type":"Point","coordinates":[-0.360223,39.461774]}}]};
const FALLBACK_EDGES_GEOJSON = {"type":"FeatureCollection","name":"network-edges","features":[{"type":"Feature","properties":{"from":"227_bus","to":"226_bus"},"geometry":{"type":"LineString","coordinates":[[-0.354523,39.471018],[-0.354386,39.471281]]}},{"type":"Feature","properties":{"from":"592_bus","to":"577_bus"},"geometry":{"type":"LineString","coordinates":[[-0.385993,39.447303],[-0.385576,39.448525]]}},{"type":"Feature","properties":{"from":"2223_bus","to":"2255_bus"},"geometry":{"type":"LineString","coordinates":[[-0.369522,39.473585],[-0.368669,39.472288]]}},{"type":"Feature","properties":{"from":"368_bus","to":"1432_bus"},"geometry":{"type":"LineString","coordinates":[[-0.394641,39.477417],[-0.395851,39.47689]]}},{"type":"Feature","properties":{"from":"2256_bus","to":"2223_bus"},"geometry":{"type":"LineString","coordinates":[[-0.370055,39.472647],[-0.36984,39.473445],[-0.369522,39.473585]]}},{"type":"Feature","properties":{"from":"1464_bus","to":"1091_bus"},"geometry":{"type":"LineString","coordinates":[[-0.379444,39.449412],[-0.37918,39.45047]]}},{"type":"Feature","properties":{"from":"1540_bus","to":"1532_bus"},"geometry":{"type":"LineString","coordinates":[[-0.345663,39.45878],[-0.34414,39.458452]]}},{"type":"Feature","properties":{"from":"1854_bus","to":"2291_bus"},"geometry":{"type":"LineString","coordinates":[[-0.366353,39.46085],[-0.365556,39.459739]]}},{"type":"Feature","properties":{"from":"1387_bus","to":"1515_bus"},"geometry":{"type":"LineString","coordinates":[[-0.337305,39.466589],[-0.3397,39.467289]]}},{"type":"Feature","properties":{"from":"1744_bus","to":"1745_bus"},"geometry":{"type":"LineString","coordinates":[[-0.35278,39.45936],[-0.350191,39.457573]]}},{"type":"Feature","properties":{"from":"1131_bus","to":"1127_bus"},"geometry":{"type":"LineString","coordinates":[[-0.377,39.496619],[-0.37736,39.498051]]}},{"type":"Feature","properties":{"from":"346_bus","to":"348_bus"},"geometry":{"type":"LineString","coordinates":[[-0.386745,39.480461],[-0.388498,39.479687]]}},{"type":"Feature","properties":{"from":"1038_bus","to":"1866_bus"},"geometry":{"type":"LineString","coordinates":[[-0.396145,39.463903],[-0.397605,39.462567]]}},{"type":"Feature","properties":{"from":"722_bus","to":"689_bus"},"geometry":{"type":"LineString","coordinates":[[-0.372897,39.465127],[-0.373066,39.465358]]}},{"type":"Feature","properties":{"from":"2239_bus","to":"2238_bus"},"geometry":{"type":"LineString","coordinates":[[-0.36772,39.44646],[-0.367178,39.446687]]}},{"type":"Feature","properties":{"from":"974_bus","to":"979_bus"},"geometry":{"type":"LineString","coordinates":[[-0.388621,39.45267],[-0.389131,39.45031]]}},{"type":"Feature","properties":{"from":"173_bus","to":"163_bus"},"geometry":{"type":"LineString","coordinates":[[-0.366378,39.479411],[-0.366027,39.479004]]}},{"type":"Feature","properties":{"from":"113_bus","to":"114_bus"},"geometry":{"type":"LineString","coordinates":[[-0.348756,39.474316],[-0.351187,39.475036]]}},{"type":"Feature","properties":{"from":"2041_bus","to":"1419_bus"},"geometry":{"type":"LineString","coordinates":[[-0.35645,39.456486],[-0.356427,39.456388]]}},{"type":"Feature","properties":{"from":"1756_bus","to":"1501_bus"},"geometry":{"type":"LineString","coordinates":[[-0.335411,39.466127],[-0.336239,39.466267]]}},{"type":"Feature","properties":{"from":"20_bus","to":"1518_bus"},"geometry":{"type":"LineString","coordinates":[[-0.327786,39.483801],[-0.328065,39.481103]]}},{"type":"Feature","properties":{"from":"1940_bus","to":"1143_bus"},"geometry":{"type":"LineString","coordinates":[[-0.369064,39.44188],[-0.368784,39.442518]]}},{"type":"Feature","properties":{"from":"764_bus","to":"686_bus"},"geometry":{"type":"LineString","coordinates":[[-0.364441,39.468995],[-0.365787,39.468445]]}},{"type":"Feature","properties":{"from":"2404_bus","to":"2223_bus"},"geometry":{"type":"LineString","coordinates":[[-0.369796,39.474223],[-0.369848,39.473737]]}},{"type":"Feature","properties":{"from":"20_bus","to":"2114_bus"},"geometry":{"type":"LineString","coordinates":[[-0.328195,39.484417],[-0.328269,39.484564]]}},{"type":"Feature","properties":{"from":"422_bus","to":"1296_bus"},"geometry":{"type":"LineString","coordinates":[[-0.397664,39.477749],[-0.395269,39.478742]]}},{"type":"Feature","properties":{"from":"1110_bus","to":"1118_bus"},"geometry":{"type":"LineString","coordinates":[[-0.350996,39.465983],[-0.350253,39.467815]]}},{"type":"Feature","properties":{"from":"1761_bus","to":"1535_bus"},"geometry":{"type":"LineString","coordinates":[[-0.352991,39.459784],[-0.35274,39.460242]]}},{"type":"Feature","properties":{"from":"1688_bus","to":"1854_bus"},"geometry":{"type":"LineString","coordinates":[[-0.364178,39.461852],[-0.365723,39.461202]]}},{"type":"Feature","properties":{"from":"2048_bus","to":"2049_bus"},"geometry":{"type":"LineString","coordinates":[[-0.336266,39.449699],[-0.340526,39.45072]]}},{"type":"Feature","properties":{"from":"1500_bus","to":"1501_bus"},"geometry":{"type":"LineString","coordinates":[[-0.3389,39.466962],[-0.336979,39.466391]]}},{"type":"Feature","properties":{"from":"1665_bus","to":"1663_bus"},"geometry":{"type":"LineString","coordinates":[[-0.358776,39.459834],[-0.360223,39.461774]]}},{"type":"Feature","properties":{"from":"2050_bus","to":"2044_bus"},"geometry":{"type":"LineString","coordinates":[[-0.347289,39.452065],[-0.34795,39.452238]]}},{"type":"Feature","properties":{"from":"1741_bus","to":"373_bus"},"geometry":{"type":"LineString","coordinates":[[-0.394184,39.483253],[-0.39447,39.483964]]}},{"type":"Feature","properties":{"from":"1096_bus","to":"1283_bus"},"geometry":{"type":"LineString","coordinates":[[-0.346032,39.478028],[-0.34536,39.479418]]}},{"type":"Feature","properties":{"from":"1766_bus","to":"1278_bus"},"geometry":{"type":"LineString","coordinates":[[-0.383482,39.470368],[-0.384505,39.470345]]}},{"type":"Feature","properties":{"from":"1602_bus","to":"1622_bus"},"geometry":{"type":"LineString","coordinates":[[-0.337696,39.462615],[-0.33875,39.461775]]}},{"type":"Feature","properties":{"from":"169_bus","to":"154_bus"},"geometry":{"type":"LineString","coordinates":[[-0.354496,39.475819],[-0.354317,39.475766]]}},{"type":"Feature","properties":{"from":"426_bus","to":"748_bus"},"geometry":{"type":"LineString","coordinates":[[-0.39419,39.472851],[-0.391952,39.473818]]}},{"type":"Feature","properties":{"from":"1210_bus","to":"1211_bus"},"geometry":{"type":"LineString","coordinates":[[-0.336221,39.470849],[-0.33733,39.471163]]}},{"type":"Feature","properties":{"from":"979_bus","to":"975_bus"},"geometry":{"type":"LineString","coordinates":[[-0.389131,39.45031],[-0.389185,39.450061]]}},{"type":"Feature","properties":{"from":"695_bus","to":"1716_bus"},"geometry":{"type":"LineString","coordinates":[[-0.388239,39.474508],[-0.388049,39.474273]]}},{"type":"Feature","properties":{"from":"328_bus","to":"1815_bus"},"geometry":{"type":"LineString","coordinates":[[-0.378542,39.485528],[-0.376459,39.48538]]}},{"type":"Feature","properties":{"from":"2340_bus","to":"2337_bus"},"geometry":{"type":"LineString","coordinates":[[-0.384798,39.42792],[-0.386951,39.428477]]}},{"type":"Feature","properties":{"from":"1430_bus","to":"1775_bus"},"geometry":{"type":"LineString","coordinates":[[-0.360746,39.467877],[-0.360412,39.467213]]}},{"type":"Feature","properties":{"from":"734_bus","to":"711_bus"},"geometry":{"type":"LineString","coordinates":[[-0.366396,39.467122],[-0.366775,39.467685]]}},{"type":"Feature","properties":{"from":"1361_bus","to":"1283_bus"},"geometry":{"type":"LineString","coordinates":[[-0.345181,39.479945],[-0.345445,39.47975]]}},{"type":"Feature","properties":{"from":"1443_bus","to":"1441_bus"},"geometry":{"type":"LineString","coordinates":[[-0.39025,39.447276],[-0.386956,39.446504]]}},{"type":"Feature","properties":{"from":"1765_bus","to":"2041_bus"},"geometry":{"type":"LineString","coordinates":[[-0.357876,39.458378],[-0.356505,39.456772]]}},{"type":"Feature","properties":{"from":"622_bus","to":"623_bus"},"geometry":{"type":"LineString","coordinates":[[-0.377136,39.45425],[-0.375158,39.455064]]}},{"type":"Feature","properties":{"from":"1968_bus","to":"705_bus"},"geometry":{"type":"LineString","coordinates":[[-0.382263,39.466713],[-0.382564,39.467172]]}},{"type":"Feature","properties":{"from":"2305_bus","to":"2306_bus"},"geometry":{"type":"LineString","coordinates":[[-0.400252,39.473452],[-0.401561,39.472856]]}},{"type":"Feature","properties":{"from":"621_bus","to":"620_bus"},"geometry":{"type":"LineString","coordinates":[[-0.375949,39.452496],[-0.373765,39.449371],[-0.37377,39.448979]]}},{"type":"Feature","properties":{"from":"1844_bus","to":"1839_bus"},"geometry":{"type":"LineString","coordinates":[[-0.368412,39.492966],[-0.36856,39.493077]]}},{"type":"Feature","properties":{"from":"2229_bus","to":"1755_bus"},"geometry":{"type":"LineString","coordinates":[[-0.334736,39.470602],[-0.33424,39.471463]]}},{"type":"Feature","properties":{"from":"2072_bus","to":"2093_bus"},"geometry":{"type":"LineString","coordinates":[[-0.405471,39.473212],[-0.405742,39.474488]]}},{"type":"Feature","properties":{"from":"1624_bus","to":"7_bus"},"geometry":{"type":"LineString","coordinates":[[-0.332837,39.459965],[-0.332798,39.460116]]}},{"type":"Feature","properties":{"from":"1225_bus","to":"540_bus"},"geometry":{"type":"LineString","coordinates":[[-0.403878,39.456911],[-0.402796,39.457707]]}},{"type":"Feature","properties":{"from":"1461_bus","to":"1462_bus"},"geometry":{"type":"LineString","coordinates":[[-0.357534,39.461346],[-0.357271,39.461106],[-0.356941,39.461148]]}},{"type":"Feature","properties":{"from":"2292_bus","to":"1646_bus"},"geometry":{"type":"LineString","coordinates":[[-0.364115,39.456239],[-0.363386,39.456446]]}},{"type":"Feature","properties":{"from":"546_bus","to":"548_bus"},"geometry":{"type":"LineString","coordinates":[[-0.387245,39.46177],[-0.38839,39.460406]]}},{"type":"Feature","properties":{"from":"1352_bus","to":"1353_bus"},"geometry":{"type":"LineString","coordinates":[[-0.369091,39.454298],[-0.371788,39.453185]]}},{"type":"Feature","properties":{"from":"2066_bus","to":"2098_bus"},"geometry":{"type":"LineString","coordinates":[[-0.40282,39.478455],[-0.400072,39.478352]]}},{"type":"Feature","properties":{"from":"215_bus","to":"207_bus"},"geometry":{"type":"LineString","coordinates":[[-0.367769,39.487579],[-0.368194,39.487894]]}},{"type":"Feature","properties":{"from":"2094_bus","to":"171_bus"},"geometry":{"type":"LineString","coordinates":[[-0.367049,39.484872],[-0.364233,39.484801]]}},{"type":"Feature","properties":{"from":"621_bus","to":"2273_bus"},"geometry":{"type":"LineString","coordinates":[[-0.375864,39.45249],[-0.376043,39.452723]]}},{"type":"Feature","properties":{"from":"1591_bus","to":"1592_bus"},"geometry":{"type":"LineString","coordinates":[[-0.336111,39.458817],[-0.337231,39.458741],[-0.3395,39.458999]]}},{"type":"Feature","properties":{"from":"533_bus","to":"534_bus"},"geometry":{"type":"LineString","coordinates":[[-0.388548,39.464296],[-0.389547,39.464254]]}},{"type":"Feature","properties":{"from":"171_bus","to":"194_bus"},"geometry":{"type":"LineString","coordinates":[[-0.364233,39.484801],[-0.363877,39.484537]]}},{"type":"Feature","properties":{"from":"1168_bus","to":"1627_bus"},"geometry":{"type":"LineString","coordinates":[[-0.328975,39.463069],[-0.328908,39.463566]]}},{"type":"Feature","properties":{"from":"439_bus","to":"1692_bus"},"geometry":{"type":"LineString","coordinates":[[-0.388592,39.465014],[-0.389953,39.466833]]}},{"type":"Feature","properties":{"from":"650_bus","to":"654_bus"},"geometry":{"type":"LineString","coordinates":[[-0.365268,39.452549],[-0.363063,39.453487]]}},{"type":"Feature","properties":{"from":"1438_bus","to":"1440_bus"},"geometry":{"type":"LineString","coordinates":[[-0.394586,39.449462],[-0.392082,39.447694]]}},{"type":"Feature","properties":{"from":"2080_bus","to":"983_bus"},"geometry":{"type":"LineString","coordinates":[[-0.378049,39.463163],[-0.379151,39.463246]]}},{"type":"Feature","properties":{"from":"581_bus","to":"588_bus"},"geometry":{"type":"LineString","coordinates":[[-0.390934,39.434793],[-0.391246,39.433988]]}},{"type":"Feature","properties":{"from":"1630_bus","to":"2060_bus"},"geometry":{"type":"LineString","coordinates":[[-0.340084,39.460445],[-0.339903,39.460922]]}},{"type":"Feature","properties":{"from":"1687_bus","to":"436_bus"},"geometry":{"type":"LineString","coordinates":[[-0.385422,39.460378],[-0.384691,39.459341]]}},{"type":"Feature","properties":{"from":"575_bus","to":"595_bus"},"geometry":{"type":"LineString","coordinates":[[-0.382068,39.455965],[-0.382345,39.456318]]}},{"type":"Feature","properties":{"from":"1821_bus","to":"1354_bus"},"geometry":{"type":"LineString","coordinates":[[-0.372908,39.452418],[-0.374477,39.451736]]}},{"type":"Feature","properties":{"from":"155_bus","to":"2213_bus"},"geometry":{"type":"LineString","coordinates":[[-0.356109,39.476083],[-0.356463,39.475373]]}},{"type":"Feature","properties":{"from":"961_bus","to":"1547_bus"},"geometry":{"type":"LineString","coordinates":[[-0.38798,39.456655],[-0.387362,39.456967],[-0.386911,39.457554]]}},{"type":"Feature","properties":{"from":"1537_bus","to":"1461_bus"},"geometry":{"type":"LineString","coordinates":[[-0.358566,39.463026],[-0.357656,39.461575]]}},{"type":"Feature","properties":{"from":"2291_bus","to":"1854_bus"},"geometry":{"type":"LineString","coordinates":[[-0.36567,39.460121],[-0.365846,39.460526]]}},{"type":"Feature","properties":{"from":"2224_bus","to":"1980_bus"},"geometry":{"type":"LineString","coordinates":[[-0.335662,39.44839],[-0.335331,39.448319]]}},{"type":"Feature","properties":{"from":"2229_bus","to":"1210_bus"},"geometry":{"type":"LineString","coordinates":[[-0.335008,39.470275],[-0.335274,39.470526]]}},{"type":"Feature","properties":{"from":"358_bus","to":"361_bus"},"geometry":{"type":"LineString","coordinates":[[-0.389646,39.482951],[-0.390518,39.482507]]}},{"type":"Feature","properties":{"from":"1618_bus","to":"1120_bus"},"geometry":{"type":"LineString","coordinates":[[-0.351503,39.465252],[-0.352226,39.463472]]}},{"type":"Feature","properties":{"from":"2387_bus","to":"1012_bus"},"geometry":{"type":"LineString","coordinates":[[-0.338152,39.437868],[-0.33805,39.438384]]}},{"type":"Feature","properties":{"from":"793_bus","to":"803_bus"},"geometry":{"type":"LineString","coordinates":[[-0.384102,39.475338],[-0.384156,39.47571]]}},{"type":"Feature","properties":{"from":"1861_bus","to":"1151_bus"},"geometry":{"type":"LineString","coordinates":[[-0.373253,39.493237],[-0.372624,39.494166]]}},{"type":"Feature","properties":{"from":"1673_bus","to":"1587_bus"},"geometry":{"type":"LineString","coordinates":[[-0.329104,39.465706],[-0.329395,39.46378]]}},{"type":"Feature","properties":{"from":"966_bus","to":"967_bus"},"geometry":{"type":"LineString","coordinates":[[-0.357782,39.483406],[-0.358227,39.482486],[-0.359187,39.481701]]}},{"type":"Feature","properties":{"from":"886_bus","to":"645_bus"},"geometry":{"type":"LineString","coordinates":[[-0.368301,39.46012],[-0.369315,39.459695]]}},{"type":"Feature","properties":{"from":"544_bus","to":"1038_bus"},"geometry":{"type":"LineString","coordinates":[[-0.399175,39.460986],[-0.396416,39.463549]]}},{"type":"Feature","properties":{"from":"823_bus","to":"709_bus"},"geometry":{"type":"LineString","coordinates":[[-0.37222,39.465726],[-0.372385,39.465654]]}},{"type":"Feature","properties":{"from":"1282_bus","to":"1492_bus"},"geometry":{"type":"LineString","coordinates":[[-0.345607,39.479416],[-0.346172,39.47823]]}},{"type":"Feature","properties":{"from":"695_bus","to":"697_bus"},"geometry":{"type":"LineString","coordinates":[[-0.387917,39.475135],[-0.388339,39.475269]]}},{"type":"Feature","properties":{"from":"2378_bus","to":"66_bus"},"geometry":{"type":"LineString","coordinates":[[-0.335703,39.444933],[-0.335641,39.445633]]}},{"type":"Feature","properties":{"from":"1627_bus","to":"9_bus"},"geometry":{"type":"LineString","coordinates":[[-0.32888,39.463753],[-0.328598,39.465628]]}},{"type":"Feature","properties":{"from":"1361_bus","to":"1490_bus"},"geometry":{"type":"LineString","coordinates":[[-0.345181,39.479945],[-0.347684,39.48066]]}},{"type":"Feature","properties":{"from":"1785_bus","to":"1783_bus"},"geometry":{"type":"LineString","coordinates":[[-0.386628,39.458975],[-0.38642,39.458981]]}},{"type":"Feature","properties":{"from":"1120_bus","to":"1362_bus"},"geometry":{"type":"LineString","coordinates":[[-0.352226,39.463472],[-0.353204,39.461093]]}},{"type":"Feature","properties":{"from":"2051_bus","to":"2052_bus"},"geometry":{"type":"LineString","coordinates":[[-0.349109,39.452594],[-0.350418,39.453057]]}},{"type":"Feature","properties":{"from":"976_bus","to":"1443_bus"},"geometry":{"type":"LineString","coordinates":[[-0.389708,39.447583],[-0.390128,39.447494]]}},{"type":"Feature","properties":{"from":"2208_bus","to":"929_bus"},"geometry":{"type":"LineString","coordinates":[[-0.339208,39.428594],[-0.340446,39.426229]]}},{"type":"Feature","properties":{"from":"1784_bus","to":"1687_bus"},"geometry":{"type":"LineString","coordinates":[[-0.385871,39.461009],[-0.385855,39.460984]]}},{"type":"Feature","properties":{"from":"224_bus","to":"338_bus"},"geometry":{"type":"LineString","coordinates":[[-0.36809,39.477166],[-0.371386,39.478985]]}},{"type":"Feature","properties":{"from":"168_bus","to":"155_bus"},"geometry":{"type":"LineString","coordinates":[[-0.3569,39.476319],[-0.35611,39.476091]]}},{"type":"Feature","properties":{"from":"1384_bus","to":"1386_bus"},"geometry":{"type":"LineString","coordinates":[[-0.335122,39.466689],[-0.334842,39.468377]]}},{"type":"Feature","properties":{"from":"2267_bus","to":"530_bus"},"geometry":{"type":"LineString","coordinates":[[-0.400957,39.463727],[-0.399854,39.46377]]}},{"type":"Feature","properties":{"from":"1027_bus","to":"666_bus"},"geometry":{"type":"LineString","coordinates":[[-0.36265,39.432418],[-0.363133,39.431564],[-0.363449,39.430177]]}},{"type":"Feature","properties":{"from":"1772_bus","to":"2339_bus"},"geometry":{"type":"LineString","coordinates":[[-0.379578,39.425446],[-0.379881,39.425563]]}},{"type":"Feature","properties":{"from":"359_bus","to":"1266_bus"},"geometry":{"type":"LineString","coordinates":[[-0.392689,39.481708],[-0.391478,39.484373]]}},{"type":"Feature","properties":{"from":"1686_bus","to":"439_bus"},"geometry":{"type":"LineString","coordinates":[[-0.388192,39.464464],[-0.388482,39.464863]]}},{"type":"Feature","properties":{"from":"163_bus","to":"164_bus"},"geometry":{"type":"LineString","coordinates":[[-0.365333,39.478798],[-0.365188,39.479095]]}},{"type":"Feature","properties":{"from":"47_bus","to":"46_bus"},"geometry":{"type":"LineString","coordinates":[[-0.331816,39.472321],[-0.331691,39.472297]]}},{"type":"Feature","properties":{"from":"324_bus","to":"325_bus"},"geometry":{"type":"LineString","coordinates":[[-0.37409,39.491945],[-0.374294,39.491651]]}},{"type":"Feature","properties":{"from":"508_bus","to":"1254_bus"},"geometry":{"type":"LineString","coordinates":[[-0.395292,39.467938],[-0.392593,39.467457]]}},{"type":"Feature","properties":{"from":"703_bus","to":"746_bus"},"geometry":{"type":"LineString","coordinates":[[-0.385568,39.470244],[-0.387167,39.469948]]}},{"type":"Feature","properties":{"from":"1836_bus","to":"1825_bus"},"geometry":{"type":"LineString","coordinates":[[-0.384289,39.495246],[-0.383921,39.495324]]}},{"type":"Feature","properties":{"from":"1240_bus","to":"965_bus"},"geometry":{"type":"LineString","coordinates":[[-0.356876,39.487018],[-0.357035,39.48602]]}},{"type":"Feature","properties":{"from":"1955_bus","to":"1746_bus"},"geometry":{"type":"LineString","coordinates":[[-0.346817,39.456548],[-0.345112,39.457672]]}},{"type":"Feature","properties":{"from":"2404_bus","to":"2223_bus"},"geometry":{"type":"LineString","coordinates":[[-0.369861,39.473989],[-0.369848,39.473737]]}},{"type":"Feature","properties":{"from":"588_bus","to":"582_bus"},"geometry":{"type":"LineString","coordinates":[[-0.391365,39.433679],[-0.391526,39.433275]]}},{"type":"Feature","properties":{"from":"361_bus","to":"359_bus"},"geometry":{"type":"LineString","coordinates":[[-0.390499,39.482665],[-0.391905,39.482053]]}},{"type":"Feature","properties":{"from":"1624_bus","to":"1590_bus"},"geometry":{"type":"LineString","coordinates":[[-0.33294,39.460006],[-0.33284,39.459425]]}},{"type":"Feature","properties":{"from":"1990_bus","to":"1991_bus"},"geometry":{"type":"LineString","coordinates":[[-0.361626,39.492106],[-0.364082,39.490712]]}},{"type":"Feature","properties":{"from":"1756_bus","to":"1757_bus"},"geometry":{"type":"LineString","coordinates":[[-0.335477,39.465945],[-0.336142,39.464513]]}},{"type":"Feature","properties":{"from":"815_bus","to":"816_bus"},"geometry":{"type":"LineString","coordinates":[[-0.381367,39.466136],[-0.381224,39.466315]]}},{"type":"Feature","properties":{"from":"555_bus","to":"1691_bus"},"geometry":{"type":"LineString","coordinates":[[-0.38832,39.463961],[-0.387875,39.463818]]}},{"type":"Feature","properties":{"from":"666_bus","to":"1028_bus"},"geometry":{"type":"LineString","coordinates":[[-0.363497,39.429911],[-0.363573,39.429493]]}},{"type":"Feature","properties":{"from":"511_bus","to":"1038_bus"},"geometry":{"type":"LineString","coordinates":[[-0.396522,39.463908],[-0.396399,39.463676]]}},{"type":"Feature","properties":{"from":"1535_bus","to":"1538_bus"},"geometry":{"type":"LineString","coordinates":[[-0.35274,39.460242],[-0.35206,39.460173]]}},{"type":"Feature","properties":{"from":"1839_bus","to":"1845_bus"},"geometry":{"type":"LineString","coordinates":[[-0.36856,39.493077],[-0.369371,39.493701]]}},{"type":"Feature","properties":{"from":"635_bus","to":"631_bus"},"geometry":{"type":"LineString","coordinates":[[-0.367031,39.446145],[-0.367063,39.445841]]}},{"type":"Feature","properties":{"from":"1753_bus","to":"1754_bus"},"geometry":{"type":"LineString","coordinates":[[-0.333844,39.474354],[-0.334071,39.473177]]}},{"type":"Feature","properties":{"from":"705_bus","to":"1041_bus"},"geometry":{"type":"LineString","coordinates":[[-0.382784,39.466917],[-0.382113,39.46599]]}},{"type":"Feature","properties":{"from":"1843_bus","to":"1844_bus"},"geometry":{"type":"LineString","coordinates":[[-0.36711,39.492112],[-0.367917,39.492702]]}},{"type":"Feature","properties":{"from":"1759_bus","to":"1955_bus"},"geometry":{"type":"LineString","coordinates":[[-0.345934,39.457327],[-0.34697,39.456698]]}},{"type":"Feature","properties":{"from":"2064_bus","to":"1660_bus"},"geometry":{"type":"LineString","coordinates":[[-0.404458,39.482124],[-0.403369,39.4826]]}},{"type":"Feature","properties":{"from":"833_bus","to":"407_bus"},"geometry":{"type":"LineString","coordinates":[[-0.392714,39.481225],[-0.393075,39.481733]]}},{"type":"Feature","properties":{"from":"1682_bus","to":"206_bus"},"geometry":{"type":"LineString","coordinates":[[-0.37331,39.491569],[-0.37178,39.490414]]}},{"type":"Feature","properties":{"from":"1132_bus","to":"1133_bus"},"geometry":{"type":"LineString","coordinates":[[-0.373763,39.496913],[-0.372083,39.496455]]}},{"type":"Feature","properties":{"from":"194_bus","to":"171_bus"},"geometry":{"type":"LineString","coordinates":[[-0.363877,39.484537],[-0.364134,39.483968]]}},{"type":"Feature","properties":{"from":"1646_bus","to":"2293_bus"},"geometry":{"type":"LineString","coordinates":[[-0.36333,39.456437],[-0.362584,39.455512]]}},{"type":"Feature","properties":{"from":"1619_bus","to":"1597_bus"},"geometry":{"type":"LineString","coordinates":[[-0.34887,39.46448],[-0.35065,39.464994]]}},{"type":"Feature","properties":{"from":"717_bus","to":"718_bus"},"geometry":{"type":"LineString","coordinates":[[-0.372945,39.460917],[-0.372068,39.459669]]}},{"type":"Feature","properties":{"from":"1821_bus","to":"1822_bus"},"geometry":{"type":"LineString","coordinates":[[-0.372706,39.452142],[-0.371307,39.450147]]}},{"type":"Feature","properties":{"from":"1263_bus","to":"2258_bus"},"geometry":{"type":"LineString","coordinates":[[-0.369257,39.471196],[-0.369317,39.4713]]}},{"type":"Feature","properties":{"from":"443_bus","to":"1432_bus"},"geometry":{"type":"LineString","coordinates":[[-0.395874,39.475207],[-0.396504,39.476094]]}},{"type":"Feature","properties":{"from":"533_bus","to":"555_bus"},"geometry":{"type":"LineString","coordinates":[[-0.388535,39.464205],[-0.388388,39.464116]]}},{"type":"Feature","properties":{"from":"595_bus","to":"575_bus"},"geometry":{"type":"LineString","coordinates":[[-0.383877,39.456284],[-0.383988,39.455783]]}},{"type":"Feature","properties":{"from":"1584_bus","to":"354_bus"},"geometry":{"type":"LineString","coordinates":[[-0.386104,39.484601],[-0.385921,39.4846]]}},{"type":"Feature","properties":{"from":"978_bus","to":"976_bus"},"geometry":{"type":"LineString","coordinates":[[-0.38958,39.448192],[-0.389602,39.448087]]}},{"type":"Feature","properties":{"from":"749_bus","to":"750_bus"},"geometry":{"type":"LineString","coordinates":[[-0.391978,39.474506],[-0.394233,39.47435]]}},{"type":"Feature","properties":{"from":"1353_bus","to":"628_bus"},"geometry":{"type":"LineString","coordinates":[[-0.371491,39.453128],[-0.370672,39.451703]]}},{"type":"Feature","properties":{"from":"543_bus","to":"1175_bus"},"geometry":{"type":"LineString","coordinates":[[-0.401843,39.458323],[-0.402119,39.458532]]}},{"type":"Feature","properties":{"from":"1541_bus","to":"1630_bus"},"geometry":{"type":"LineString","coordinates":[[-0.341892,39.459689],[-0.340701,39.460424]]}},{"type":"Feature","properties":{"from":"325_bus","to":"326_bus"},"geometry":{"type":"LineString","coordinates":[[-0.374399,39.491506],[-0.375969,39.489301]]}},{"type":"Feature","properties":{"from":"1239_bus","to":"192_bus"},"geometry":{"type":"LineString","coordinates":[[-0.356929,39.479526],[-0.357962,39.480293]]}},{"type":"Feature","properties":{"from":"2221_bus","to":"2219_bus"},"geometry":{"type":"LineString","coordinates":[[-0.375911,39.46929],[-0.375906,39.470094]]}},{"type":"Feature","properties":{"from":"1754_bus","to":"1753_bus"},"geometry":{"type":"LineString","coordinates":[[-0.333944,39.473059],[-0.333705,39.474305]]}},{"type":"Feature","properties":{"from":"248_bus","to":"259_bus"},"geometry":{"type":"LineString","coordinates":[[-0.370315,39.498886],[-0.370235,39.499304]]}},{"type":"Feature","properties":{"from":"1055_bus","to":"1057_bus"},"geometry":{"type":"LineString","coordinates":[[-0.357042,39.472833],[-0.356003,39.474961]]}},{"type":"Feature","properties":{"from":"2373_bus","to":"2378_bus"},"geometry":{"type":"LineString","coordinates":[[-0.33589,39.443176],[-0.335726,39.444719]]}},{"type":"Feature","properties":{"from":"1321_bus","to":"403_bus"},"geometry":{"type":"LineString","coordinates":[[-0.403685,39.493978],[-0.402796,39.494307]]}},{"type":"Feature","properties":{"from":"2261_bus","to":"2309_bus"},"geometry":{"type":"LineString","coordinates":[[-0.377121,39.467601],[-0.377307,39.467651]]}},{"type":"Feature","properties":{"from":"2359_bus","to":"2309_bus"},"geometry":{"type":"LineString","coordinates":[[-0.378757,39.464898],[-0.37776,39.467258]]}},{"type":"Feature","properties":{"from":"1330_bus","to":"1331_bus"},"geometry":{"type":"LineString","coordinates":[[-0.397597,39.495411],[-0.395912,39.493841]]}},{"type":"Feature","properties":{"from":"1741_bus","to":"372_bus"},"geometry":{"type":"LineString","coordinates":[[-0.39477,39.483449],[-0.394033,39.482424]]}},{"type":"Feature","properties":{"from":"481_bus","to":"428_bus"},"geometry":{"type":"LineString","coordinates":[[-0.39163,39.468924],[-0.391905,39.468477]]}},{"type":"Feature","properties":{"from":"705_bus","to":"739_bus"},"geometry":{"type":"LineString","coordinates":[[-0.382784,39.466917],[-0.383476,39.466117]]}},{"type":"Feature","properties":{"from":"2206_bus","to":"777_bus"},"geometry":{"type":"LineString","coordinates":[[-0.365253,39.470214],[-0.36505,39.469969]]}},{"type":"Feature","properties":{"from":"1266_bus","to":"364_bus"},"geometry":{"type":"LineString","coordinates":[[-0.391478,39.484373],[-0.390753,39.48591]]}},{"type":"Feature","properties":{"from":"441_bus","to":"427_bus"},"geometry":{"type":"LineString","coordinates":[[-0.391648,39.469203],[-0.392897,39.471062]]}},{"type":"Feature","properties":{"from":"157_bus","to":"158_bus"},"geometry":{"type":"LineString","coordinates":[[-0.357973,39.477253],[-0.359342,39.47766]]}},{"type":"Feature","properties":{"from":"724_bus","to":"603_bus"},"geometry":{"type":"LineString","coordinates":[[-0.364788,39.462759],[-0.366399,39.462069]]}},{"type":"Feature","properties":{"from":"1944_bus","to":"1965_bus"},"geometry":{"type":"LineString","coordinates":[[-0.382174,39.445677],[-0.380445,39.445495]]}},{"type":"Feature","properties":{"from":"1306_bus","to":"60_bus"},"geometry":{"type":"LineString","coordinates":[[-0.33026,39.45478],[-0.330491,39.454524]]}},{"type":"Feature","properties":{"from":"1424_bus","to":"696_bus"},"geometry":{"type":"LineString","coordinates":[[-0.390212,39.47738],[-0.389962,39.476946]]}},{"type":"Feature","properties":{"from":"1332_bus","to":"1333_bus"},"geometry":{"type":"LineString","coordinates":[[-0.393843,39.491908],[-0.392254,39.490647]]}},{"type":"Feature","properties":{"from":"1943_bus","to":"1944_bus"},"geometry":{"type":"LineString","coordinates":[[-0.384511,39.445939],[-0.383232,39.445788]]}},{"type":"Feature","properties":{"from":"1843_bus","to":"1840_bus"},"geometry":{"type":"LineString","coordinates":[[-0.366808,39.491634],[-0.365673,39.490862]]}},{"type":"Feature","properties":{"from":"2158_bus","to":"2343_bus"},"geometry":{"type":"LineString","coordinates":[[-0.374136,39.445518],[-0.373876,39.447757]]}},{"type":"Feature","properties":{"from":"409_bus","to":"371_bus"},"geometry":{"type":"LineString","coordinates":[[-0.391088,39.478965],[-0.391437,39.479466]]}},{"type":"Feature","properties":{"from":"344_bus","to":"350_bus"},"geometry":{"type":"LineString","coordinates":[[-0.381175,39.482865],[-0.38171,39.482752]]}},{"type":"Feature","properties":{"from":"1807_bus","to":"1816_bus"},"geometry":{"type":"LineString","coordinates":[[-0.37321,39.485365],[-0.37291,39.485323]]}},{"type":"Feature","properties":{"from":"649_bus","to":"650_bus"},"geometry":{"type":"LineString","coordinates":[[-0.363223,39.453542],[-0.365323,39.452644]]}},{"type":"Feature","properties":{"from":"307_bus","to":"308_bus"},"geometry":{"type":"LineString","coordinates":[[-0.390398,39.48942],[-0.393386,39.492345]]}},{"type":"Feature","properties":{"from":"153_bus","to":"225_bus"},"geometry":{"type":"LineString","coordinates":[[-0.352673,39.475038],[-0.353088,39.474161]]}},{"type":"Feature","properties":{"from":"268_bus","to":"1847_bus"},"geometry":{"type":"LineString","coordinates":[[-0.382467,39.49136],[-0.383159,39.493235]]}},{"type":"Feature","properties":{"from":"227_bus","to":"226_bus"},"geometry":{"type":"LineString","coordinates":[[-0.354507,39.471267],[-0.354386,39.471281]]}},{"type":"Feature","properties":{"from":"1895_bus","to":"1489_bus"},"geometry":{"type":"LineString","coordinates":[[-0.350501,39.481195],[-0.347134,39.480235]]}},{"type":"Feature","properties":{"from":"1819_bus","to":"623_bus"},"geometry":{"type":"LineString","coordinates":[[-0.37484,39.455392],[-0.374743,39.455254]]}},{"type":"Feature","properties":{"from":"227_bus","to":"1039_bus"},"geometry":{"type":"LineString","coordinates":[[-0.355236,39.471768],[-0.356477,39.47213]]}},{"type":"Feature","properties":{"from":"703_bus","to":"694_bus"},"geometry":{"type":"LineString","coordinates":[[-0.384864,39.470391],[-0.386019,39.471984]]}},{"type":"Feature","properties":{"from":"1691_bus","to":"432_bus"},"geometry":{"type":"LineString","coordinates":[[-0.387758,39.463662],[-0.387209,39.462894]]}},{"type":"Feature","properties":{"from":"1385_bus","to":"1050_bus"},"geometry":{"type":"LineString","coordinates":[[-0.334427,39.468347],[-0.332877,39.468245],[-0.332538,39.467907]]}},{"type":"Feature","properties":{"from":"2287_bus","to":"2288_bus"},"geometry":{"type":"LineString","coordinates":[[-0.380519,39.472737],[-0.379762,39.47271]]}},{"type":"Feature","properties":{"from":"592_bus","to":"1442_bus"},"geometry":{"type":"LineString","coordinates":[[-0.386438,39.446922],[-0.386467,39.446864]]}},{"type":"Feature","properties":{"from":"668_bus","to":"1027_bus"},"geometry":{"type":"LineString","coordinates":[[-0.362505,39.432682],[-0.36265,39.432418]]}},{"type":"Feature","properties":{"from":"243_bus","to":"1683_bus"},"geometry":{"type":"LineString","coordinates":[[-0.37853,39.491101],[-0.379058,39.490985]]}},{"type":"Feature","properties":{"from":"1805_bus","to":"1263_bus"},"geometry":{"type":"LineString","coordinates":[[-0.367848,39.469221],[-0.368581,39.470257]]}},{"type":"Feature","properties":{"from":"540_bus","to":"1225_bus"},"geometry":{"type":"LineString","coordinates":[[-0.403206,39.457521],[-0.403976,39.456813]]}},{"type":"Feature","properties":{"from":"172_bus","to":"173_bus"},"geometry":{"type":"LineString","coordinates":[[-0.365139,39.481941],[-0.366162,39.47988]]}},{"type":"Feature","properties":{"from":"2098_bus","to":"2067_bus"},"geometry":{"type":"LineString","coordinates":[[-0.400072,39.478352],[-0.398906,39.478674]]}},{"type":"Feature","properties":{"from":"7_bus","to":"1613_bus"},"geometry":{"type":"LineString","coordinates":[[-0.332531,39.46038],[-0.330427,39.462214],[-0.329492,39.46266]]}},{"type":"Feature","properties":{"from":"535_bus","to":"1038_bus"},"geometry":{"type":"LineString","coordinates":[[-0.394015,39.464142],[-0.396052,39.463998]]}},{"type":"Feature","properties":{"from":"157_bus","to":"1239_bus"},"geometry":{"type":"LineString","coordinates":[[-0.357973,39.477253],[-0.357015,39.479264]]}},{"type":"Feature","properties":{"from":"2305_bus","to":"473_bus"},"geometry":{"type":"LineString","coordinates":[[-0.401147,39.472948],[-0.401055,39.472674]]}},{"type":"Feature","properties":{"from":"732_bus","to":"1042_bus"},"geometry":{"type":"LineString","coordinates":[[-0.363697,39.463197],[-0.363436,39.462841]]}},{"type":"Feature","properties":{"from":"1763_bus","to":"1428_bus"},"geometry":{"type":"LineString","coordinates":[[-0.361421,39.464144],[-0.361174,39.463472]]}},{"type":"Feature","properties":{"from":"2244_bus","to":"1175_bus"},"geometry":{"type":"LineString","coordinates":[[-0.401989,39.457903],[-0.402569,39.45845]]}},{"type":"Feature","properties":{"from":"1696_bus","to":"434_bus"},"geometry":{"type":"LineString","coordinates":[[-0.384442,39.458996],[-0.384087,39.458471]]}},{"type":"Feature","properties":{"from":"1943_bus","to":"1441_bus"},"geometry":{"type":"LineString","coordinates":[[-0.386067,39.446453],[-0.38658,39.446567]]}},{"type":"Feature","properties":{"from":"2409_bus","to":"2410_bus"},"geometry":{"type":"LineString","coordinates":[[-0.382441,39.439851],[-0.385098,39.440132]]}},{"type":"Feature","properties":{"from":"11_bus","to":"12_bus"},"geometry":{"type":"LineString","coordinates":[[-0.32805,39.469407],[-0.32772,39.471671]]}},{"type":"Feature","properties":{"from":"114_bus","to":"867_bus"},"geometry":{"type":"LineString","coordinates":[[-0.352023,39.476204],[-0.351931,39.476434]]}},{"type":"Feature","properties":{"from":"559_bus","to":"1932_bus"},"geometry":{"type":"LineString","coordinates":[[-0.390413,39.45641],[-0.390719,39.455899]]}},{"type":"Feature","properties":{"from":"1733_bus","to":"1929_bus"},"geometry":{"type":"LineString","coordinates":[[-0.393192,39.452218],[-0.394341,39.450501]]}}]};
const heroNetwork = document.querySelector(".hero__network");

if (heroNetwork) {

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

    // Shortest distance from a point to a full multi-point polyline —
    // the minimum distance across each of its individual segments.
    const distanceToPolyline = (px, py, points) => {
        let min = Infinity;
        for (let i = 0; i < points.length - 1; i++) {
            const [x1, y1] = points[i];
            const [x2, y2] = points[i + 1];
            const d = distanceToSegment(px, py, x1, y1, x2, y2);
            if (d < min) min = d;
        }
        return min;
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
            console.warn(`Background network: couldn't fetch ${url}, using built-in fallback data (${err.message}).`);
            return fallback;
        }
    }

    // Loads both GeoJSON files and draws the network into the SVG.
    // Returns the list of {element, points} pairs for edges so the
    // highlight logic below doesn't need to re-parse SVG attributes.
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

        // Look up each node's own projected position by id, so every edge
        // can be snapped exactly onto the nodes it connects. Real-world
        // GeoJSON route geometry is rarely perfectly aligned with the stop
        // coordinates it starts/ends at (simplification, different source,
        // rounding…), which is what produced edges that visually floated
        // free of their nodes. Snapping the endpoints — while keeping any
        // intermediate waypoints untouched — preserves the original route
        // shape and the original from/to topology, it just guarantees the
        // line always touches the two circles it belongs to.
        const nodePositionById = new Map();
        nodesGeoJSON.features.forEach(feature => {
            const id = feature.properties && feature.properties.id;
            if (id !== undefined) nodePositionById.set(id, project(feature.geometry.coordinates));
        });

        const edgePolylines = [];

        edgesGeoJSON.features.forEach(feature => {

            const props = feature.properties || {};
            const fromPos = nodePositionById.get(props.from);
            const toPos = nodePositionById.get(props.to);

            // Skip edges whose endpoints don't correspond to a known node —
            // drawing them would always leave a dangling, nodeless line.
            if (!fromPos || !toPos) return;

            // Full polyline (any number of points), not just the first two —
            // real route/street geometry is rarely a single straight segment.
            const points = feature.geometry.coordinates.map(project);

            // Force the first and last point to sit exactly on the from/to
            // nodes; keep any intermediate waypoints as-is for the route shape.
            points[0] = fromPos;
            points[points.length - 1] = toPos;

            const polyline = document.createElementNS(SVG_NS, "polyline");
            polyline.setAttribute(
                "points",
                points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ")
            );
            edgeGroup.appendChild(polyline);
            edgePolylines.push({ element: polyline, points });

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

        return edgePolylines;

    }

    function enableNetworkHighlight(edgePolylines) {

        const networkNodes = Array.from(nodeGroup.querySelectorAll("circle"));

        const clearHighlight = () => {
            networkNodes.forEach(node => node.style.setProperty("--p", 0));
            edgePolylines.forEach(({ element }) => element.style.setProperty("--p", 0));
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

            edgePolylines.forEach(({ element, points }) => {
                const dist = distanceToPolyline(loc.x, loc.y, points);
                const p = Math.max(0, 1 - dist / HOVER_RADIUS);
                element.style.setProperty("--p", p.toFixed(2));
            });

        };

        window.addEventListener("pointermove", (e) => updateHighlight(e.clientX, e.clientY));
        document.documentElement.addEventListener("mouseleave", clearHighlight);

    }

    loadNetworkFromGeoJSON()
        .then(enableNetworkHighlight)
        .catch(err => {
            // Fails quietly (e.g. opened as a local file:// page, or the
            // GeoJSON files were removed) — the hero still looks fine
            // without the decorative network.
            console.warn("Background network not loaded:", err);
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
   Carrusel de proyectos
--------------------------------------------------------- */

const projectsGrid = document.querySelector(".projects-grid");
const prevBtn = document.querySelector(".carousel-btn--prev");
const nextBtn = document.querySelector(".carousel-btn--next");

if (projectsGrid && prevBtn && nextBtn) {

    const scrollByCard = (direction) => {
        const card = projectsGrid.querySelector(".project-card");
        const gap = parseFloat(getComputedStyle(projectsGrid).columnGap || 0);
        const amount = card ? card.getBoundingClientRect().width + gap : 320;
        projectsGrid.scrollBy({ left: amount * direction, behavior: "smooth" });
    };

    prevBtn.addEventListener("click", () => scrollByCard(-1));
    nextBtn.addEventListener("click", () => scrollByCard(1));

    const toggleArrows = () => {
        const canScroll = projectsGrid.scrollWidth > projectsGrid.clientWidth + 4;
        prevBtn.style.display = canScroll ? "" : "none";
        nextBtn.style.display = canScroll ? "" : "none";
    };

    toggleArrows();
    window.addEventListener("resize", toggleArrows);

}

/* ---------------------------------------------------------
   Trabajos de Fin de Grado/Máster: mostrar solo 4 por defecto
--------------------------------------------------------- */

const thesisGrid = document.querySelector(".thesis-grid");

if (thesisGrid) {

    const thesisCards = Array.from(thesisGrid.querySelectorAll(".thesis-card"));
    const VISIBLE_COUNT = 2;

    if (thesisCards.length > VISIBLE_COUNT) {

        thesisGrid.classList.add("thesis-grid--collapsed");

        const toggleBtn = document.createElement("button");
        toggleBtn.type = "button";
        toggleBtn.className = "btn btn--small thesis-grid__toggle";
        toggleBtn.setAttribute("data-i18n", "teaching.showAllTheses");
        toggleBtn.textContent = "Show all theses";

        thesisGrid.insertAdjacentElement("afterend", toggleBtn);

        toggleBtn.addEventListener("click", () => {

            const collapsed = thesisGrid.classList.toggle("thesis-grid--collapsed");
            toggleBtn.setAttribute("data-i18n", collapsed ? "teaching.showAllTheses" : "teaching.showLessTheses");

            const dict = translations[document.documentElement.lang] || translations.en;
            toggleBtn.textContent = collapsed ? dict["teaching.showAllTheses"] : dict["teaching.showLessTheses"];

            if (!collapsed) {
                toggleBtn.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }

        });

    }

}

/* ---------------------------------------------------------
   Cursos: selector desplegable de documentos para descargar
--------------------------------------------------------- */

document.querySelectorAll(".syllabus-picker").forEach(picker => {

    const select = picker.querySelector(".syllabus-picker__select");
    const download = picker.querySelector(".syllabus-picker__download");

    if (!select || !download) return;

    const syncDownloadLink = () => {
        const option = select.selectedOptions[0];
        if (!option) return;
        download.setAttribute("href", option.value);
        download.setAttribute("download", "");
    };

    select.addEventListener("change", syncDownloadLink);
    syncDownloadLink();

});

/* ---------------------------------------------------------
   Filtro publicaciones
--------------------------------------------------------- */

const tabs=document.querySelectorAll(".tab");

const cards=document.querySelectorAll(".biblio-card");

const applyResearchFilter=(tab)=>{

tabs.forEach(t=>{
t.classList.remove("is-active");
t.setAttribute("aria-selected","false");
});

tab.classList.add("is-active");
tab.setAttribute("aria-selected","true");

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

};

// Apply whichever tab is marked active in the HTML (Selected, by default)
// as soon as the page loads, so it's a real filtered view from the start
// and not just a highlighted button with every card showing underneath.
const initialTab = document.querySelector(".tab.is-active") || tabs[0];
if (initialTab) applyResearchFilter(initialTab);

tabs.forEach(tab=>{

tab.addEventListener("click",()=>{

applyResearchFilter(tab);

});

});


/* ---------------------------------------------------------
   Selector de idioma (EN / ES)
--------------------------------------------------------- */

const translations = {
    en: {
        "nav.mark": "About me",
        "nav.experience": "Experience",
        "nav.research": "Research",
        "nav.projects": "Projects",
        "nav.teaching": "Teaching",

        "hero.eyebrow": "Statistics & Optimization · Universitat Politècnica de València",
        "hero.intro": "I'm a PhD student researching accessibility, spatial statistics, and sustainable cities through quantitative methods, GIS, and network science.",
        "hero.cv": "Download CV",

        "experience.title": "Experience",
        "experience.professional": "Professional Experience",
        "experience.education": "Education",
        "experience.viewCourses": "View my courses →",
        "experience.thesisLabel": "Thesis:",
        "experience.job1.role": "Temporary University Lecturer",
        "experience.job1.desc": "Statistics Teacher in the Higher Technical School of Industrial Engineering.",
        "experience.job2.role": "Senior Research Technician",
        "experience.job2.desc": "Researcher in Spatial Statistics and developing the Nearcity project.",
        "experience.job3.role": "Spatial Data Analyst",
        "experience.job3.desc": "Development of the pipeline for image processing and spatial flows analysis.",
        "experience.edu1.role": "PhD in Statistics and Optimization",
        "experience.edu1.thesis": "Socio-economic analysis of complex urban networks.",
        "experience.edu2.role": "MSc in Smart and Sustainable Cities",
        "experience.edu2.thesis": "Co-Evolutionary Multi-Agent System for the metro network of the city of València (VCCoEMAS)",
        "experience.edu3.role": "BSc in Data Science",
        "experience.edu3.thesis": "Valencia in 15 minutes: geospatial modelling of the city.",
        "experience.edu3.awardsLabel": "Awards",
        "experience.edu3.award1.name": "1st Prize for Innovation at Valencia Missions 2030.",
        "experience.edu3.award1.meta": "Ajuntament de València · 2023",

        "tag.statistics": "Statistics",
        "tag.engineering": "Engineering",
        "tag.nearcity": "Nearcity",
        "tag.accessibility": "Accessibility",
        "tag.visualization": "Visualization",
        "tag.education": "Education",
        "tag.compositeIndicators": "Composite indicators",
        "tag.gis": "GIS",
        "tag.spatialStatistics": "Spatial Statistics",
        "tag.urbanAnalytics": "Urban Analytics",

        "research.title": "Research",
        "research.tabSelected": "Selected",
        "research.tabAll": "All",
        "research.tabPapers": "Papers",
        "research.tabConferences": "Conferences",
        "paper.viewJournal": "View journal",
        "paper1.summary": "A gravity-based index comparing how easily students reach schools across València's neighborhoods.",
        "paper2.summary": "A composite-indicator framework to measure how well urban areas meet the \"15-minute city\" standard.",

        "projects.title": "Projects",
        "projects.subtitle": "Platforms and tools built around spatial accessibility research.",
        "projects.badgeResearch": "Research Project",
        "projects.nearcity.desc": "Nearcity is a spatial accessibility platform developed to analyse sustainable mobility, public services and urban accessibility using GIS, network science and spatial statistics.",
        "projects.visitWebsite": "Visit website",

        "teaching.title": "Teaching",
        "teaching.subtitle": "Courses taught and theses supervised at the Universitat Politècnica de València.",
        "teaching.courses": "Courses",
        "teaching.thesis": "Degree and Master Thesis",
        "teaching.bachelor": "Bachelor's",
        "teaching.course1.name": "Statistics",
        "teaching.course1.desc": "Higher Technical School of Industrial Engineering, UPV.",
        "teaching.viewSyllabus": "View syllabus →",
        "teaching.selectDocument": "Select a document",
        "teaching.downloadDoc": "Download PDF",
        "teaching.course1.doc0": "Syllabus (English)",
        "teaching.showRepo": "Show repository",
        "teaching.showAllTheses": "Show all theses",
        "teaching.showLessTheses": "Show less",

        "footer.rights": "All rights reserved."
    },
    es: {
        "nav.mark": "Sobre mí",
        "nav.experience": "Experiencia",
        "nav.research": "Investigación",
        "nav.projects": "Proyectos",
        "nav.teaching": "Docencia",

        "hero.eyebrow": "Estadística y Optimización · Universitat Politècnica de València",
        "hero.intro": "Soy estudiante de doctorado investigando accesibilidad, estadística espacial y ciudades sostenibles mediante métodos cuantitativos, GIS y ciencia de redes.",
        "hero.cv": "Descargar CV",

        "experience.title": "Experiencia",
        "experience.professional": "Experiencia Profesional",
        "experience.education": "Educación",
        "experience.viewCourses": "Ver mis cursos →",
        "experience.thesisLabel": "Tesis:",
        "experience.job1.role": "Profesora Sustituta de Universidad",
        "experience.job1.desc": "Profesora de Estadística en la Escuela Técnica Superior de Ingeniería Industrial.",
        "experience.job2.role": "Técnica Superior de Investigación",
        "experience.job2.desc": "Investigadora en Estadística Espacial y desarrollo del proyecto Nearcity.",
        "experience.job3.role": "Analista de Datos Espaciales",
        "experience.job3.desc": "Desarrollo del pipeline de procesamiento de imágenes y análisis de flujos espaciales.",
        "experience.edu1.role": "Doctorado en Estadística y Optimización",
        "experience.edu1.thesis": "Análisis socioeconómico de redes urbanas complejas.",
        "experience.edu2.role": "Máster en Ciudades Inteligentes y Sostenibles",
        "experience.edu2.thesis": "Sistema Basado en Agentes Co-Evolucionario para la red de metro de la ciudad de València",
        "experience.edu3.role": "Grado en Ciencia de Datos",
        "experience.edu3.thesis": "Valencia en 15 minutos: modelización geoespacial de la ciudad.",
        "experience.edu3.awardsLabel": "Premios",
        "experience.edu3.award1.name": "1º Premio a la Innovación Valencia Missions 2030",
        "experience.edu3.award1.meta": "Ajuntament de València · 2023",

        "tag.statistics": "Estadística",
        "tag.engineering": "Ingeniería",
        "tag.nearcity": "Nearcity",
        "tag.accessibility": "Accesibilidad",
        "tag.visualization": "Visualización",
        "tag.education": "Educación",
        "tag.compositeIndicators": "Indicadores compuestos",
        "tag.gis": "GIS",
        "tag.spatialStatistics": "Estadística Espacial",
        "tag.urbanAnalytics": "Analítica Urbana",

        "research.title": "Investigación",
        "research.tabSelected": "Selección",
        "research.tabAll": "Todo",
        "research.tabPapers": "Artículos",
        "research.tabConferences": "Congresos",
        "paper.viewJournal": "Ver revista",
        "paper1.summary": "Un índice gravitacional que compara la facilidad de acceso a los colegios en los barrios de València.",
        "paper2.summary": "Un marco de indicadores compuestos para medir el cumplimiento del estándar de \"ciudad de 15 minutos\".",

        "projects.title": "Proyectos",
        "projects.subtitle": "Plataformas y herramientas construidas en torno a la investigación en accesibilidad espacial.",
        "projects.badgeResearch": "Proyecto de Investigación",
        "projects.nearcity.desc": "Nearcity es una plataforma de accesibilidad espacial desarrollada para analizar la movilidad sostenible, los servicios públicos y la accesibilidad urbana mediante GIS, ciencia de redes y estadística espacial.",
        "projects.visitWebsite": "Visitar sitio web",

        "teaching.title": "Docencia",
        "teaching.subtitle": "Cursos impartidos y tesis dirigidas en la Universitat Politècnica de València.",
        "teaching.courses": "Cursos",
        "teaching.thesis": "Trabajos de Fin de Grado y Máster",
        "teaching.bachelor": "Grado",
        "teaching.course1.name": "Estadística",
        "teaching.course1.desc": "Escuela Técnica Superior de Ingeniería Industrial, UPV.",
        "teaching.viewSyllabus": "Ver programa →",
        "teaching.selectDocument": "Selecciona un documento",
        "teaching.downloadDoc": "Descargar PDF",

        "teaching.showRepo": "Ver repositorio",
        "teaching.showAllTheses": "Ver todos los trabajos",
        "teaching.showLessTheses": "Ver menos",

        "footer.rights": "Todos los derechos reservados."
    }
};

const langToggle = document.getElementById("lang-toggle");

function applyLanguage(lang) {

    const dict = translations[lang];
    if (!dict) return;

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key] !== undefined) el.textContent = dict[key];
    });

    if (langToggle) langToggle.textContent = lang === "en" ? "ES" : "EN";

    try {
        localStorage.setItem("lang", lang);
    } catch (err) {
        // Storage may be unavailable (privacy mode, etc.) — the toggle
        // still works for the current visit, it just won't persist.
    }

}

if (langToggle) {

    let storedLang = null;
    try {
        storedLang = localStorage.getItem("lang");
    } catch (err) {
        storedLang = null;
    }

    const browserLang = (navigator.language || "en").toLowerCase().startsWith("es") ? "es" : "en";
    let currentLang = storedLang || browserLang;

    applyLanguage(currentLang);

    langToggle.addEventListener("click", () => {
        currentLang = currentLang === "en" ? "es" : "en";
        applyLanguage(currentLang);
    });

}


