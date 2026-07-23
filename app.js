const STORAGE_KEY = "icom-publication-tracker-v5";
const STORAGE_BACKUP_KEY = `${STORAGE_KEY}-backup`;
const STORAGE_META_KEY = `${STORAGE_KEY}-meta`;
const ACCESS_ROLE_KEY = "icom-publication-tracker-access-role";
const PUBLIC_STATIC_EXPORT = Boolean(window.ICOM_PUBLIC_STATIC_EXPORT);

const accessRoles = PUBLIC_STATIC_EXPORT
  ? [{ value: "public", label: "Public repository" }]
  : [
      { value: "public", label: "Public repository" },
      { value: "pi", label: "PI workspace" },
      { value: "admin", label: "Admin workspace" },
    ];

const visibilityStates = ["Public", "Project team", "Admin only"];

const statuses = [
  { value: "Drafting", color: "#007c83" },
  { value: "Submitted / In review", color: "#b8652b" },
  { value: "Accepted / In press", color: "#2f7c55" },
  { value: "Published / Indexed", color: "#365f91" },
];

const lifecycleStages = [
  "Drafting",
  "Submitted / In review",
  "Accepted / In press",
  "Published / Indexed",
];

const unpublishedLifecycleStages = [
  "Drafting",
  "Submitted / In review",
  "Accepted / In press",
];

const annualReportStatusOptions = [
  "Submitted / In review",
  "Accepted / In press",
  "Published / Indexed",
];

const lifecycleStatusAliases = new Map([
  ["idea", "Drafting"],
  ["draft", "Drafting"],
  ["drafting", "Drafting"],
  ["writing", "Drafting"],
  ["internal review", "Drafting"],
  ["in progress", "Drafting"],
  ["submitted", "Submitted / In review"],
  ["submitted / in review", "Submitted / In review"],
  ["submitted/in review", "Submitted / In review"],
  ["under journal review", "Submitted / In review"],
  ["journal review", "Submitted / In review"],
  ["in review", "Submitted / In review"],
  ["revision requested", "Submitted / In review"],
  ["revise and resubmit", "Submitted / In review"],
  ["revision", "Submitted / In review"],
  ["accepted", "Accepted / In press"],
  ["accepted / in press", "Accepted / In press"],
  ["accepted/in press", "Accepted / In press"],
  ["in press", "Accepted / In press"],
  ["online first", "Accepted / In press"],
  ["online first / in press", "Accepted / In press"],
  ["online first/in press", "Accepted / In press"],
  ["published", "Published / Indexed"],
  ["indexed", "Published / Indexed"],
  ["published / indexed", "Published / Indexed"],
  ["published/indexed", "Published / Indexed"],
]);

const verificationStates = [
  { value: "Stale source", color: "#c85543" },
  { value: "Needs verification", color: "#b0831f" },
  { value: "Candidate", color: "#71568d" },
  { value: "Verified current", color: "#2f7c55" },
];

const staleWebsiteSource = "ICoM website seed (known stale)";
const staleWebsiteNote = "Website-derived seed; verify against PNNL records, author lists, ORCID, Crossref, or internal project records.";
const OSTI_API_BASE = "https://www.osti.gov/api/v1/records";
const CROSSREF_API_BASE = "https://api.crossref.org/works";
const REVIEWER_NAME = "Melinda Muro";
const LEGACY_REVIEWER_NAMES = new Set(["Codex automated metadata audit"]);
const KNOWN_CORRECTION_IDS = new Set([
  "inbox-2026-applying-a-multisector-scenario-framework-to-evaluate-past-and-future-pu",
  "inbox-2025-a-comparative-study-of-physics-informed-and-data-driven-machine-learning",
  "inbox-2025-unsafe-an-uncertain-structure-and-fragility-ensemble-framework-for-prope",
  "inbox-2025-evaluation-of-flow-routing-james",
  "inbox-2025-fast-and-accurate-simulations-of-river-flow-depth-and-velocity",
  "workbook-icom-pub-0018",
  "workbook-icom-pub-0088",
  "workbook-icom-pub-0091",
  "workbook-icom-pub-0095",
  "workbook-icom-pub-0098",
  "workbook-icom-pub-0099",
  "workbook-icom-pub-0101",
  "workbook-icom-pub-0102",
  "workbook-icom-pub-0106",
  "workbook-icom-pub-0108",
  "workbook-icom-pub-0109",
  "workbook-icom-pub-0112",
  "workbook-icom-pub-0113",
  "workbook-icom-pub-0115",
  "workbook-icom-pub-0116",
  "workbook-icom-pub-0120",
  "workbook-icom-pub-0121",
  "workbook-icom-pub-0122",
  "workbook-icom-pub-0123",
  "workbook-icom-pub-0124",
]);
const KNOWN_CORRECTION_FIELDS = [
  "title",
  "year",
  "status",
  "verification",
  "visibility",
  "lead",
  "authors",
  "venue",
  "publicationRole",
  "topic",
  "topics",
  "programAreas",
  "accepted",
  "onlineFirst",
  "published",
  "indexed",
  "annualReports",
  "verified",
  "verifiedBy",
  "doi",
  "url",
  "pdfUrl",
  "linkStatus",
  "linkChecked",
  "reviewFlag",
  "authorAudit",
  "acknowledgementStatus",
  "acknowledgementText",
  "ostiId",
  "ostiUrl",
  "doePagesUrl",
  "crossrefUrl",
  "updated",
];
const SOURCE_ENRICHMENT_FIELDS = [
  "title",
  "year",
  "status",
  "verification",
  "visibility",
  "lead",
  "authors",
  "venue",
  "type",
  "publicationRole",
  "topic",
  "topics",
  "programAreas",
  "submitted",
  "accepted",
  "onlineFirst",
  "published",
  "indexed",
  "annualReports",
  "verified",
  "verifiedBy",
  "doi",
  "url",
  "pdfUrl",
  "linkStatus",
  "linkChecked",
  "source",
  "metadataStatus",
  "reviewFlag",
  "authorAudit",
  "acknowledgementStatus",
  "acknowledgementText",
  "action",
  "excludeFromReports",
  "exclusionReason",
  "sourceRecord",
  "ostiId",
  "ostiUrl",
  "doePagesUrl",
  "crossrefUrl",
  "updated",
];

const topics = [
  "Unassigned / Needs topic review",
  "Coastal flooding",
  "Climate extremes",
  "Human mobility",
  "Equity and exposure",
  "Energy-water systems",
  "Model integration",
  "Urban adaptation",
  "Operations impact",
];

const programAreaBuckets = ["RGMA", "MSD", "ESMD", "CC"];
const programAreaFilterValues = [...programAreaBuckets, "Unassigned"];
const publicationRoleOptions = ["Primary", "Secondary", "Unassigned"];

const publicationTypes = [
  "Journal Article",
  "Journal article",
  "Conference paper",
  "Report",
  "Preprint",
  "Dataset",
  "Data Paper",
  "Software Paper",
  "Book Chapter",
  "Newsletter/Commentary",
  "Fact sheet",
  "Brief",
  "Publication",
];

const seedRecords = [
  {
    id: "seed-2026-urban-growth",
    title: "Is India's Urban Growth Climate-Adaptive? A Multiproxy Study of Population, Economic, and Infrastructure Exposure to Flood Hazard",
    year: 2026,
    status: "Indexed",
    lead: "ICoM team",
    venue: "Official ICoM publication list",
    type: "Journal article",
    topic: "Urban adaptation",
    due: "",
    url: "https://icom.pnnl.gov/publications.stm",
    tags: ["flood hazard", "urban growth", "exposure"],
    action: "Confirm DOI, authors, and journal metadata for the canonical citation.",
    notes: "Seeded from the official ICoM publications page.",
    updated: "2026-06-08T19:00:00.000Z",
  },
  {
    id: "seed-2025-pakistan-migration",
    title: "Evaluating spatial implications of climate-induced hydrological shocks on human migration: Non-parametric evidence from Pakistan",
    year: 2025,
    status: "Indexed",
    lead: "ICoM team",
    venue: "Official ICoM publication list",
    type: "Journal article",
    topic: "Human mobility",
    due: "",
    url: "https://icom.pnnl.gov/publications.stm",
    tags: ["migration", "hydrology", "Pakistan"],
    action: "Add author list and DOI once the bibliography export is available.",
    notes: "Seeded from the official ICoM publications page.",
    updated: "2026-06-08T19:00:00.000Z",
  },
  {
    id: "seed-2025-business-processes",
    title: "Modeling and Assessing the Effects of Coastal Flooding on Business Processes",
    year: 2025,
    status: "Published",
    lead: "ICoM team",
    venue: "Official ICoM publication list",
    type: "Journal article",
    topic: "Operations impact",
    due: "",
    url: "https://icom.pnnl.gov/publications.stm",
    tags: ["business processes", "coastal flooding", "disruption"],
    action: "Map related project outputs and attach any PNNL record URL.",
    notes: "Seeded from the official ICoM publications page.",
    updated: "2026-06-08T19:00:00.000Z",
  },
  {
    id: "seed-2025-human-mobility-slr",
    title: "Climate-induced human mobility impacts of sea-level rise",
    year: 2025,
    status: "Published",
    lead: "ICoM team",
    venue: "Official ICoM publication list",
    type: "Journal article",
    topic: "Human mobility",
    due: "",
    url: "https://icom.pnnl.gov/publications.stm",
    tags: ["sea-level rise", "mobility", "adaptation"],
    action: "Connect to migration and relocation model lineage.",
    notes: "Seeded from the official ICoM publications page.",
    updated: "2026-06-08T19:00:00.000Z",
  },
  {
    id: "seed-2025-human-earth",
    title: "Exploring co-evolution of integrated human-Earth systems under climate change",
    year: 2025,
    status: "Published",
    lead: "ICoM team",
    venue: "Official ICoM publication list",
    type: "Journal article",
    topic: "Model integration",
    due: "",
    url: "https://icom.pnnl.gov/publications.stm",
    tags: ["human-Earth systems", "co-evolution", "climate change"],
    action: "Link model components and related ICoM tasks.",
    notes: "Seeded from the official ICoM publications page.",
    updated: "2026-06-08T19:00:00.000Z",
  },
  {
    id: "seed-2025-energy-resilience",
    title: "Power System Resilience to Extreme Weather: Fragility Modeling Under Insufficient Data Scenarios",
    year: 2025,
    status: "Published",
    lead: "ICoM team",
    venue: "Official ICoM publication list",
    type: "Journal article",
    topic: "Energy-water systems",
    due: "",
    url: "https://icom.pnnl.gov/publications.stm",
    tags: ["resilience", "extreme weather", "fragility"],
    action: "Add related infrastructure exposure tags.",
    notes: "Seeded from the official ICoM publications page.",
    updated: "2026-06-08T19:00:00.000Z",
  },
  {
    id: "seed-2024-equity-flood",
    title: "Flooded Futures: Characterizing Equity in Coastal Flood Risk Projections",
    year: 2024,
    status: "Indexed",
    lead: "ICoM team",
    venue: "Official ICoM publication list",
    type: "Journal article",
    topic: "Equity and exposure",
    due: "",
    url: "https://icom.pnnl.gov/publications.stm",
    tags: ["equity", "risk projections", "coastal flood"],
    action: "Confirm citation metadata and related project milestone.",
    notes: "Seeded from the official ICoM publications page.",
    updated: "2026-06-08T19:00:00.000Z",
  },
  {
    id: "seed-2024-bangladesh-flood",
    title: "Spatially explicit delineation of flood prone areas in Bangladesh: an impacts modeling framework of river flooding and sea level rise",
    year: 2024,
    status: "Indexed",
    lead: "ICoM team",
    venue: "Official ICoM publication list",
    type: "Journal article",
    topic: "Coastal flooding",
    due: "",
    url: "https://icom.pnnl.gov/publications.stm",
    tags: ["Bangladesh", "river flooding", "sea level rise"],
    action: "Attach DOI and any model workflow documentation.",
    notes: "Seeded from the official ICoM publications page.",
    updated: "2026-06-08T19:00:00.000Z",
  },
];

const eesmRecords = [
  ["Amplified threat of tropical cyclones to US offshore wind energy in a changing climate", 2024, "Journal article", "Lipari, Serena", "Pacific Northwest National Laboratory", "Energy-water systems", "2024-12"],
  ["Large disagreements in estimates of urban land across scales and their implications", 2024, "Journal article", "Chakraborty, TC", "Pacific Northwest National Laboratory", "Urban adaptation", "2024-10"],
  ["Estuarine hurricane wind can intensify surge-dominated extreme water level in shallow and converging coastal systems", 2024, "Journal article", "Deb, Mithun", "Pacific Northwest National Laboratory", "Coastal flooding", "2024-07"],
  ["Amplified Extreme Floods and Shifting Flood Mechanisms in the Delaware River Basin in Future Climates", 2024, "Journal article", "Sun, Ning", "Pacific Northwest National Laboratory", "Coastal flooding", "2024-03"],
  ["A North Atlantic synthetic tropical cyclone track, intensity, and rainfall dataset", 2024, "Journal article", "Xu, Wenwei", "Pacific Northwest National Laboratory", "Coastal flooding", "2024-01"],
  ["On the Sensitivity of Coastal Hypoxia to Its External Physical Forcings", 2024, "Journal article", "St-Laurent, P.", "Virginia Institute of Marine Science", "Model integration", "2024-01"],
  ["Topological Relationship-Based Flow Direction Modeling: Stream Burning and Depression Filling", 2023, "Journal article", "Liao, Chang", "Pacific Northwest National Laboratory", "Model integration", "2023-11"],
  ["Structural model choices regularly overshadow parametric uncertainty in agent-based simulations of household flood risk outcomes", 2023, "Journal article", "Yoon, Jim", "Pacific Northwest National Laboratory", "Coastal flooding", "2023-07"],
  ["Inland Flooding and Rainfall from Hurricane Irene and Tropical Storm Lee (2011): Coupled Atmosphere-Wave-Ocean Model Simulations and Remote Sensing and In Situ Observations with a Machine Learning Tool", 2023, "Journal article", "Kerns, Brandon W.", "University of Washington", "Coastal flooding", "2023-05"],
  ["Increased U.S. coastal hurricane risk under climate change", 2023, "Journal article", "Balaguru, Karthik", "Pacific Northwest National Laboratory", "Coastal flooding", "2023-04"],
  ["Quantification of Physical and Numerical Mixing in a Coastal Ocean Model Using Salinity Variance Budgets", 2023, "Journal article", "Schlichting, Dylan", "Texas A&M University", "Model integration", "2023-04"],
  ["Interacting Effects of Watershed and Coastal Processes on the Evolution of Compound Flooding During Hurricane Irene", 2023, "Journal article", "Deb, Mithun", "Pacific Northwest National Laboratory", "Coastal flooding", "2023-03"],
  ["Extremely rapid, Lagrangian modeling of 2D flooding: A rivulet-based approach", 2023, "Journal article", "Brent Daniel, W.", "Pacific Northwest National Laboratory", "Coastal flooding", "2023-03"],
  ["Landscape metrics regularly outperform other traditionally-used ancillary datasets in dasymetric mapping of population", 2023, "Journal article", "Wan, Heng", "Pacific Northwest National Laboratory", "Human mobility", "2023-01"],
  ["The hazard components of representative key risks. The physical climate perspective", 2023, "Journal article", "Tebaldi, Claudia", "Pacific Northwest National Laboratory", "Coastal flooding", "2023-01"],
  ["Geographically aware estimates of remotely sensed water properties for Chesapeake Bay", 2022, "Journal article", "Stachelek, Jemma", "Los Alamos National Laboratory", "Model integration", "2022-12"],
  ["Toward More Actionable Flood-Risk Information", 2022, "Journal article", "Cooper, C. M.", "Pennsylvania State University", "Coastal flooding", "2022-11"],
  ["Mixing Pathways in Simple Box Models", 2022, "Journal article", "Qu, Lixin", "Pacific Northwest National Laboratory", "Model integration", "2022-11"],
  ["Rapid vertical exchange at fronts in the Northern Gulf of Mexico", 2022, "Journal article", "Qu, Lixin", "Pacific Northwest National Laboratory", "Model integration", "2022-09"],
  ["Uncertainty Analysis in Multi-Sector Systems: Considerations for Risk Analysis, Projection, and Planning for Complex Systems", 2022, "Journal article", "Srikrishnan, Vivek", "Cornell University", "Model integration", "2022-08"],
  ["Impact of Coastal Marsh Eco-Geomorphologic Change on Saltwater Intrusion Under Future Sea Level Rise", 2022, "Journal article", "Zhang, Yu", "Los Alamos National Laboratory", "Coastal flooding", "2022-05"],
  ["Impacts of Large-Scale Urbanization and Irrigation on Summer Precipitation in the Mid-Atlantic Region of the United States", 2022, "Journal article", "Li, Jianfeng", "Pacific Northwest National Laboratory (PNNL)", "Urban adaptation", "2022-04"],
  ["Attribution of 2020 hurricane season extreme rainfall to human-induced climate change", 2022, "Journal article", "Reed, Kevin A.", "Stony Brook University", "Coastal flooding", "2022-04"],
  ["Urbanization Impact on Regional Climate and Extreme Weather: Current Understanding, Uncertainties, and Future Research Directions", 2022, "Journal article", "Qian, Yun", "Pacific Northwest National Laboratory (PNNL)", "Urban adaptation", "2022-01"],
  ["Population downscaling using high-resolution, temporally-rich U.S. property data", 2021, "Journal article", "Wan, Heng", "Pacific Northwest National Laboratory (PNNL)", "Human mobility", "2021-11"],
  ["Climatological analysis of tropical cyclone impacts on hydrological extremes in the Mid-Atlantic region of the United States", 2021, "Journal article", "Sun, Ning", "Pacific Northwest National Laboratory (PNNL)", "Coastal flooding", "2021-10"],
  ["Integrated Coastal Modeling (ICoM): Predictive Understanding of Coastal Interactions and Risks", 2021, "Fact sheet", "ICoM team", "DOE EESM", "Model integration", "2021-10"],
  ["Extreme sea levels at different global warming levels", 2021, "Journal article", "Tebaldi, Claudia", "Pacific Northwest National Laboratory (PNNL)", "Coastal flooding", "2021-08"],
  ["Characterizing the Non-linear Interactions Between Tide, Storm Surge, and River Flow in the Delaware Bay Estuary, United States", 2021, "Journal article", "Xiao, Ziyu", "Pacific Northwest National Laboratory (PNNL)", "Coastal flooding", "2021-07"],
  ["A Comprehensive Intermediate-Term Drought Evaluation System and Evaluation of Climate Data Products over the Conterminous United States", 2021, "Journal article", "Xue, Zeyu", "University of California Davis (UC Davis)", "Model integration", "2021-07"],
  ["A Retrospective and Prospective Examination of the 1960s U.S. Northeast Drought", 2021, "Journal article", "Xue, Zeyu", "University of California Davis (UC Davis)", "Model integration", "2021-07"],
  ["Deep Learning Experiments for Tropical Cyclone Intensity Forecasts", 2021, "Journal article", "Wenwei, Xu", "Pacific Northwest National Laboratory (PNNL)", "Coastal flooding", "2021-06"],
  ["Attributable human-induced changes in the magnitude of flooding in the Houston, Texas region during Hurricane Harvey", 2021, "Journal article", "Wehner, Michael", "Lawrence Berkeley National Laboratory (LBNL)", "Coastal flooding", "2021-05"],
].map(makeEesmRecord);

const workbookRecords = (window.ICOM_WORKBOOK_RECORDS || []).map(normaliseRecord);
const inboxRecords = (window.ICOM_INBOX_RECORDS || []).map(normaliseRecord);
const drupalRecords = (window.ICOM_DRUPAL_PUBLICATION_RECORDS || []).map(normaliseRecord);

const fallbackRecords = dedupeRecords([
  ...eesmRecords,
  ...seedRecords.map((record) =>
    normaliseRecord({
      ...record,
      source: staleWebsiteSource,
      verification: "Stale source",
      verified: "",
      notes: `${record.notes} ${staleWebsiteNote}`,
    })
  ),
]);

const defaultRecords = workbookRecords.length ? dedupeRecords([...inboxRecords, ...workbookRecords]) : dedupeRecords([...inboxRecords, ...fallbackRecords]);

let persistenceNotice = {
  tone: "info",
  message: "Static site: edits save only in this browser until exported.",
};
let records = loadRecords();
let currentView = "cards";
let intakeDrafts = [];
let databaseCheckRunning = false;

const els = {
  todayStamp: document.querySelector("#todayStamp"),
  metricGrid: document.querySelector("#metricGrid"),
  accessRoleSelect: document.querySelector("#accessRoleSelect"),
  accessBanner: document.querySelector("#accessBanner"),
  saveStatus: document.querySelector("#saveStatus"),
  searchInput: document.querySelector("#searchInput"),
  statusFilter: document.querySelector("#statusFilter"),
  topicFilter: document.querySelector("#topicFilter"),
  programAreaFilter: document.querySelector("#programAreaFilter"),
  publicationRoleFilter: document.querySelector("#publicationRoleFilter"),
  yearFilter: document.querySelector("#yearFilter"),
  fiscalYearFilter: document.querySelector("#fiscalYearFilter"),
  sortSelect: document.querySelector("#sortSelect"),
  reportGroupSelect: document.querySelector("#reportGroupSelect"),
  reportFocusSelect: document.querySelector("#reportFocusSelect"),
  exportReportButton: document.querySelector("#exportReportButton"),
  exportReportExcelButton: document.querySelector("#exportReportExcelButton"),
  exportReportPdfButton: document.querySelector("#exportReportPdfButton"),
  checkDatabasesButton: document.querySelector("#checkDatabasesButton"),
  checkLinksButton: document.querySelector("#checkLinksButton"),
  clearDatabaseStatusButton: document.querySelector("#clearDatabaseStatusButton"),
  databaseSourceSelect: document.querySelector("#databaseSourceSelect"),
  databaseLimitSelect: document.querySelector("#databaseLimitSelect"),
  databaseStatus: document.querySelector("#databaseStatus"),
  resetFiltersButton: document.querySelector("#resetFiltersButton"),
  exportCsvButton: document.querySelector("#exportCsvButton"),
  exportJsonButton: document.querySelector("#exportJsonButton"),
  auditDrupalButton: document.querySelector("#auditDrupalButton"),
  importButton: document.querySelector("#importButton"),
  newRecordButton: document.querySelector("#newRecordButton"),
  intakePanel: document.querySelector("#intakePanel"),
  reportsPanel: document.querySelector("#reportsPanel"),
  databasePanel: document.querySelector("#databasePanel"),
  choosePdfButton: document.querySelector("#choosePdfButton"),
  clearIntakeButton: document.querySelector("#clearIntakeButton"),
  pdfDropZone: document.querySelector("#pdfDropZone"),
  pdfFileInput: document.querySelector("#pdfFileInput"),
  visibleCount: document.querySelector("#visibleCount"),
  pipeline: document.querySelector("#pipeline"),
  topicMap: document.querySelector("#topicMap"),
  recordsMount: document.querySelector("#recordsMount"),
  reportMount: document.querySelector("#reportMount"),
  intakeMount: document.querySelector("#intakeMount"),
  recordDialog: document.querySelector("#recordDialog"),
  recordForm: document.querySelector("#recordForm"),
  fileInput: document.querySelector("#fileInput"),
  dialogTitle: document.querySelector("#dialogTitle"),
  deleteButton: document.querySelector("#deleteButton"),
  duplicateWarning: document.querySelector("#duplicateWarning"),
  duplicateWarningText: document.querySelector("#duplicateWarningText"),
  openDuplicateButton: document.querySelector("#openDuplicateButton"),
  readinessStatus: document.querySelector("#readinessStatus"),
  readinessSummary: document.querySelector("#readinessSummary"),
  readinessChecklist: document.querySelector("#readinessChecklist"),
  annualReportsList: document.querySelector("#annualReportsList"),
  addAnnualReportButton: document.querySelector("#addAnnualReportButton"),
  fields: {
    id: document.querySelector("#recordId"),
    title: document.querySelector("#titleField"),
    year: document.querySelector("#yearField"),
    status: document.querySelector("#statusField"),
    verification: document.querySelector("#verificationField"),
    visibility: document.querySelector("#visibilityField"),
    lead: document.querySelector("#leadField"),
    authors: document.querySelector("#authorsField"),
    venue: document.querySelector("#venueField"),
    type: document.querySelector("#typeField"),
    publicationRole: document.querySelector("#publicationRoleField"),
    programAreas: document.querySelector("#programAreasField"),
    topic: document.querySelector("#topicField"),
    annualReports: document.querySelector("#annualReportsField"),
    due: document.querySelector("#dueField"),
    submitted: document.querySelector("#submittedField"),
    accepted: document.querySelector("#acceptedField"),
    onlineFirst: document.querySelector("#onlineFirstField"),
    published: document.querySelector("#publishedField"),
    indexed: document.querySelector("#indexedField"),
    doi: document.querySelector("#doiField"),
    url: document.querySelector("#urlField"),
    pdfUrl: document.querySelector("#pdfUrlField"),
    verified: document.querySelector("#verifiedField"),
    verifiedBy: document.querySelector("#verifiedByField"),
    source: document.querySelector("#sourceField"),
    tags: document.querySelector("#tagsField"),
    action: document.querySelector("#actionField"),
    notes: document.querySelector("#notesField"),
    excludeFromReports: document.querySelector("#excludeFromReportsField"),
    exclusionReason: document.querySelector("#exclusionReasonField"),
  },
  reportProgramAreaSelect: document.querySelector("#reportProgramAreaSelect"),
  reportPublicationRoleSelect: document.querySelector("#reportPublicationRoleSelect"),
};

initialise();

function initialise() {
  els.todayStamp.textContent = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  hydrateOptionObjects(els.accessRoleSelect, accessRoles);
  els.accessRoleSelect.value = initialAccessRole();
  hydrateSelect(els.statusFilter, ["All statuses", ...statuses.map((item) => item.value)]);
  hydrateSelect(els.topicFilter, ["All topics", ...topicVocabulary()]);
  hydrateSelect(els.programAreaFilter, ["All program areas", ...programAreaFilterValues]);
  hydrateSelect(els.reportProgramAreaSelect, ["All program areas", ...programAreaFilterValues]);
  hydrateSelect(els.publicationRoleFilter, ["All roles", ...publicationRoleOptions]);
  hydrateSelect(els.reportPublicationRoleSelect, ["All roles", ...publicationRoleOptions]);
  hydrateSelect(els.fields.status, statuses.map((item) => item.value));
  hydrateSelect(els.fields.verification, verificationStates.map((item) => item.value));
  hydrateSelect(els.fields.visibility, visibilityStates);
  hydrateSelect(els.fields.type, publicationTypes);
  hydrateSelect(els.fields.publicationRole, publicationRoleOptions);
  hydrateSelect(els.fields.topic, topicVocabulary());

  bindEvents();
  render();
}

function bindEvents() {
  els.accessRoleSelect.addEventListener("change", () => {
    try {
      storageSet(ACCESS_ROLE_KEY, els.accessRoleSelect.value);
    } catch {}
    render();
  });

  els.searchInput.addEventListener("input", render);
  [els.statusFilter, els.topicFilter, els.programAreaFilter, els.publicationRoleFilter, els.yearFilter, els.fiscalYearFilter, els.sortSelect].forEach((el) => {
    el.addEventListener("change", render);
  });
  [els.reportProgramAreaSelect, els.reportPublicationRoleSelect, els.reportGroupSelect, els.reportFocusSelect].forEach((el) => {
    el.addEventListener("change", () => {
      safeRenderSection("Reports", els.reportMount, () => renderReport(getFilteredRecords()));
    });
  });

  els.resetFiltersButton.addEventListener("click", resetFilters);
  els.newRecordButton.addEventListener("click", () => openRecordDialog());
  els.exportCsvButton.addEventListener("click", () => downloadCsv(getFilteredRecords()));
  els.exportReportButton.addEventListener("click", () => downloadReportCsv(buildReportRows(getReportRecords(getFilteredRecords()))));
  els.exportReportExcelButton.addEventListener("click", () => downloadReportExcel(buildReportRows(getReportRecords(getFilteredRecords()))));
  els.exportReportPdfButton.addEventListener("click", () => downloadPublicationListPdf(getReportRecords(getFilteredRecords())));
  els.checkDatabasesButton.addEventListener("click", () => checkVisibleRecords());
  els.checkLinksButton.addEventListener("click", () => checkVisibleLinks());
  els.clearDatabaseStatusButton.addEventListener("click", () => {
    els.databaseStatus.textContent = "Ready";
  });
  els.exportJsonButton.addEventListener("click", () => downloadJson(records));
  els.auditDrupalButton.addEventListener("click", () => downloadDrupalAudit());
  els.importButton.addEventListener("click", () => els.fileInput.click());
  els.fileInput.addEventListener("change", importFile);
  els.choosePdfButton.addEventListener("click", () => els.pdfFileInput.click());
  els.pdfFileInput.addEventListener("change", (event) => handlePdfFiles(event.target.files));
  els.clearIntakeButton.addEventListener("click", () => {
    intakeDrafts = [];
    setPdfDropStatus("Candidate repository records appear below");
    renderIntakeDrafts();
  });
  els.pdfDropZone.addEventListener("click", () => els.pdfFileInput.click());
  els.pdfDropZone.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      els.pdfFileInput.click();
    }
  });
  ["dragenter", "dragover"].forEach((eventName) => {
    els.pdfDropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      els.pdfDropZone.classList.add("is-dragging");
    });
  });
  ["dragleave", "drop"].forEach((eventName) => {
    els.pdfDropZone.addEventListener(eventName, (event) => {
      event.preventDefault();
      els.pdfDropZone.classList.remove("is-dragging");
    });
  });
  els.pdfDropZone.addEventListener("drop", (event) => handlePdfFiles(event.dataTransfer.files));
  els.addAnnualReportButton.addEventListener("click", () => {
    addAnnualReportRow();
    updateFormGuidance();
  });
  els.annualReportsList.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-annual-report]");
    if (!removeButton) return;
    removeButton.closest(".annual-report-row")?.remove();
    updateFormGuidance();
  });
  els.annualReportsList.addEventListener("input", updateFormGuidance);
  els.annualReportsList.addEventListener("change", updateFormGuidance);

  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      currentView = button.dataset.view;
      document.querySelectorAll(".tab").forEach((tab) => {
        tab.classList.toggle("is-active", tab === button);
        tab.setAttribute("aria-selected", String(tab === button));
      });
      renderRecords(getFilteredRecords());
    });
  });

  els.recordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveRecordFromForm();
  });
  [els.fields.title, els.fields.doi, els.fields.url, els.fields.pdfUrl].forEach((input) => {
    input.addEventListener("input", updateDuplicateWarning);
  });
  Object.values(els.fields).forEach((field) => {
    field.addEventListener("input", updateFormGuidance);
    field.addEventListener("change", updateFormGuidance);
  });
  els.openDuplicateButton.addEventListener("click", () => {
    const duplicate = records.find((record) => record.id === els.openDuplicateButton.dataset.duplicateId);
    if (!duplicate) return;
    els.recordDialog.close();
    window.setTimeout(() => openRecordDialog(duplicate), 0);
  });

  els.deleteButton.addEventListener("click", () => {
    if (!canManageAccess()) return;
    const id = els.fields.id.value;
    if (!id) return;
    records = records.filter((record) => record.id !== id);
    if (!persist()) return;
    els.recordDialog.close();
    render();
  });
}

function loadRecords() {
  try {
    const saved = storageGet(STORAGE_KEY);
    if (!saved) {
      setPersistenceNotice("info", githubPagesMode()
        ? "Static GitHub Pages mode: edits save only in this browser. Export JSON to update the deployed tracker."
        : "No browser-saved edits found; showing deployed tracker data.");
      return defaultRecords;
    }
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length) {
      const meta = readStorageMeta();
      setPersistenceNotice("success", `Loaded browser-saved edits${meta?.savedAt ? ` from ${formatStorageDate(meta.savedAt)}` : ""}.`);
      return mergeRecords(defaultRecords, parsed.map(normaliseRecord));
    }
    return defaultRecords;
  } catch (error) {
    const backup = loadBackupRecords();
    if (backup.length) {
      setPersistenceNotice("warning", `Primary browser save could not load; recovered ${backup.length} records from backup.`);
      return mergeRecords(defaultRecords, backup.map(normaliseRecord));
    }
    setPersistenceNotice("error", `Browser-saved data could not load: ${errorMessage(error)}. Showing deployed tracker data.`);
    return defaultRecords;
  }
}

function persist() {
  try {
    const payload = JSON.stringify(records, null, 2);
    const existing = storageGet(STORAGE_KEY);
    if (existing) storageSet(STORAGE_BACKUP_KEY, existing);
    storageSet(STORAGE_KEY, payload);
    storageSet(STORAGE_META_KEY, JSON.stringify({
      savedAt: new Date().toISOString(),
      recordCount: records.length,
      origin: window.location.origin,
      path: window.location.pathname,
      browserOnly: true,
    }));
    const confirmed = storageGet(STORAGE_KEY);
    if (confirmed !== payload) throw new Error("Browser storage did not confirm the saved data.");
    setPersistenceNotice(
      "success",
      githubPagesMode()
        ? `Saved ${records.length} records in this browser only. Export JSON to update GitHub.`
        : `Saved ${records.length} records in this browser.`
    );
    return true;
  } catch (error) {
    setPersistenceNotice("error", `Save failed: ${errorMessage(error)}. Use Export JSON before closing this page.`);
    window.alert(`The tracker could not save this change in browser storage.\n\n${errorMessage(error)}\n\nUse Export JSON before closing this page so the work is not lost.`);
    return false;
  }
}

function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    setPersistenceNotice("error", `Browser storage is unavailable: ${errorMessage(error)}.`);
    return "";
  }
}

function storageSet(key, value) {
  localStorage.setItem(key, value);
}

function readStorageMeta() {
  try {
    const meta = storageGet(STORAGE_META_KEY);
    return meta ? JSON.parse(meta) : null;
  } catch {
    return null;
  }
}

function loadBackupRecords() {
  try {
    const backup = storageGet(STORAGE_BACKUP_KEY);
    const parsed = backup ? JSON.parse(backup) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setPersistenceNotice(tone, message) {
  persistenceNotice = { tone, message };
  renderSaveStatus();
}

function renderSaveStatus() {
  if (!safeEls("saveStatus")) return;
  if (isPublicRole()) {
    els.saveStatus.hidden = true;
    return;
  }
  els.saveStatus.hidden = false;
  els.saveStatus.dataset.tone = persistenceNotice.tone || "info";
  els.saveStatus.textContent = persistenceNotice.message || "";
}

function safeEls(key) {
  try {
    return Boolean(els?.[key]);
  } catch {
    return false;
  }
}

function githubPagesMode() {
  return /github\.io$/i.test(window.location.hostname);
}

function formatStorageDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function hydrateSelect(select, values) {
  select.innerHTML = values
    .map((value) => {
      const optionValue = value.startsWith("All ") ? "" : value;
      return `<option value="${escapeHtml(optionValue)}">${escapeHtml(value)}</option>`;
    })
    .join("");
}

function hydrateOptionObjects(select, options) {
  select.innerHTML = options
    .map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`)
    .join("");
}

function initialAccessRole() {
  if (PUBLIC_STATIC_EXPORT) return "public";
  const queryRole = new URLSearchParams(window.location.search).get("view");
  if (accessRoles.some((role) => role.value === queryRole)) return queryRole;
  const savedRole = storageGet(ACCESS_ROLE_KEY);
  return accessRoles.some((role) => role.value === savedRole) ? savedRole : "admin";
}

function currentAccessRole() {
  if (PUBLIC_STATIC_EXPORT) return "public";
  return els.accessRoleSelect?.value || "admin";
}

function isPublicRole() {
  return currentAccessRole() === "public";
}

function isPiRole() {
  return currentAccessRole() === "pi";
}

function isAdminRole() {
  return currentAccessRole() === "admin";
}

function canEditRecords() {
  return !isPublicRole();
}

function canManageAccess() {
  return isAdminRole();
}

function canRunDatabaseChecks() {
  return isAdminRole();
}

function hydrateFiscalYearSelect(select, fiscalYears) {
  select.innerHTML = [
    `<option value="">All fiscal years</option>`,
    ...fiscalYears.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(formatFiscalYear(value))}</option>`),
  ].join("");
}

function refreshProgramAreaFilter() {
  const selected = els.programAreaFilter.value;
  const roleRecords = roleVisibleRecords(records);
  const discovered = roleRecords.flatMap((record) => programAreaLabels(record));
  const values = [...new Set([...programAreaFilterValues, ...discovered])].sort((a, b) => programAreaOrder(a) - programAreaOrder(b) || a.localeCompare(b));
  hydrateSelect(els.programAreaFilter, ["All program areas", ...values]);
  els.programAreaFilter.value = values.includes(selected) ? selected : "";
}

function refreshYearFilter() {
  const selected = els.yearFilter.value;
  const roleRecords = roleVisibleRecords(records);
  const years = [...new Set(roleRecords.map((record) => Number(record.year)).filter(Boolean))]
    .sort((a, b) => b - a)
    .map(String);
  hydrateSelect(els.yearFilter, ["All years", ...years]);
  els.yearFilter.value = years.includes(selected) ? selected : "";

  const selectedFiscalYear = els.fiscalYearFilter.value;
  const fiscalYears = [...new Set(roleRecords.map(fiscalYearForRecord).filter(Boolean))]
    .sort((a, b) => Number(b) - Number(a));
  hydrateFiscalYearSelect(els.fiscalYearFilter, fiscalYears);
  els.fiscalYearFilter.value = fiscalYears.includes(selectedFiscalYear) ? selectedFiscalYear : "";
}

function render() {
  try {
    applyAccessMode();
    refreshProgramAreaFilter();
    refreshYearFilter();
    const filtered = getFilteredRecords();
    safeRenderSection("Access banner", els.accessBanner, () => renderAccessBanner(filtered));
    safeRenderSection("Metrics", els.metricGrid, () => renderMetrics(filtered));
    safeRenderSection("Pipeline", els.pipeline, () => renderPipeline(filtered));
    safeRenderSection("Topics", els.topicMap, () => renderTopics(filtered));
    safeRenderSection("Records", els.recordsMount, () => renderRecords(filtered));
    safeRenderSection("Reports", els.reportMount, () => renderReport(filtered));
    els.visibleCount.textContent = `${filtered.length} shown`;
  } catch (error) {
    showRenderError(els.recordsMount, "Tracker render", error);
    console.error("Tracker render failed", error);
  }
}

function safeRenderSection(label, mount, callback) {
  try {
    return callback();
  } catch (error) {
    showRenderError(mount, label, error);
    console.error(`${label} render failed`, error);
    return null;
  }
}

function showRenderError(mount, label, error) {
  if (!mount) return;
  mount.innerHTML = renderPanelError(label, error);
}

function renderPanelError(label, error) {
  return `
    <div class="render-error-panel">
      <strong>${escapeHtml(label)} could not render</strong>
      <span>${escapeHtml(errorMessage(error))}</span>
    </div>
  `;
}

function applyAccessMode() {
  const publicMode = isPublicRole();
  const adminMode = isAdminRole();
  document.body.dataset.accessRole = currentAccessRole();
  els.accessRoleSelect.closest("label").hidden = PUBLIC_STATIC_EXPORT;
  els.newRecordButton.hidden = publicMode;
  els.exportCsvButton.hidden = publicMode;
  els.intakePanel.hidden = publicMode;
  els.reportsPanel.hidden = publicMode;
  els.databasePanel.hidden = !adminMode;
  els.importButton.hidden = !adminMode;
  els.exportJsonButton.hidden = !adminMode;
  els.auditDrupalButton.hidden = !adminMode;
  renderSaveStatus();
}

function renderAccessBanner(filtered) {
  const role = currentAccessRole();
  const totalVisible = roleVisibleRecords(records).length;
  const messages = {
    public: {
      title: "Public repository view",
      body: "Published public records only. Manuscripts, notes, review fields, uploads, and editing controls are hidden.",
    },
    pi: {
      title: "PI workspace view",
      body: "Project-team records and manuscript pipeline are visible. Admin-only records and controls are hidden.",
    },
    admin: {
      title: "Admin workspace view",
      body: "Full repository control, including visibility, imports, database checks, exclusions, and private records.",
    },
  };
  const message = messages[role] || messages.admin;
  els.accessBanner.innerHTML = `
    <strong>${escapeHtml(message.title)}</strong>
    <span>${escapeHtml(message.body)}</span>
    <small>${filtered.length} shown of ${totalVisible} available in this view.</small>
  `;
}

function getFilteredRecords() {
  const query = normalise(els.searchInput.value);
  const status = els.statusFilter.value;
  const topic = els.topicFilter.value;
  const programArea = els.programAreaFilter.value;
  const publicationRoleValue = els.publicationRoleFilter.value;
  const year = els.yearFilter.value;
  const fiscalYear = els.fiscalYearFilter.value;

  const filtered = roleVisibleRecords(records).filter((record) => {
    const haystack = normalise([
      record.title,
      record.lead,
      formatAuthors(record.authors),
      record.venue,
      record.type,
      record.topic,
      formatTopics(record),
      record.status,
      record.verification,
      record.source,
      record.verified,
      record.doi,
      record.url,
      record.pdfUrl,
      record.ostiId,
      record.ostiUrl,
      record.crossrefUrl,
      record.submitted,
      record.accepted,
      record.onlineFirst,
      record.published,
      record.indexed,
      lifecycleStage(record),
      formatFiscalYear(fiscalYearForRecord(record)),
      formatProgramAreas(record),
      publicationRole(record),
      annualReportSummary(record),
      record.workbookId,
      record.programAreas,
      record.metadataStatus,
      record.reviewFlag,
      record.authorAudit,
      ...(record.tags || []),
      record.action,
      record.notes,
    ].join(" "));
    return (
      (!query || haystack.includes(query)) &&
      (!status || lifecycleStage(record) === status) &&
      (!topic || topicLabels(record).includes(topic)) &&
      (!programArea || programAreaLabels(record).includes(programArea)) &&
      (!publicationRoleValue || publicationRole(record) === publicationRoleValue) &&
      (!year || String(record.year) === year) &&
      (!fiscalYear || fiscalYearForRecord(record) === fiscalYear)
    );
  });

  return sortRecords(filtered, els.sortSelect.value);
}

function sortRecords(list, sortMode) {
  return [...list].sort((a, b) => {
    if (sortMode === "year-desc") return Number(b.year) - Number(a.year) || a.title.localeCompare(b.title);
    if (sortMode === "publication-date-desc") return dateSortValue(b.published) - dateSortValue(a.published) || Number(b.year) - Number(a.year) || a.title.localeCompare(b.title);
    if (sortMode === "publication-date-asc") return dateSortValue(a.published) - dateSortValue(b.published) || Number(b.year) - Number(a.year) || a.title.localeCompare(b.title);
    if (sortMode === "due-asc") return dueRank(a) - dueRank(b) || Number(b.year) - Number(a.year);
    if (sortMode === "program-asc") return programSortValue(a).localeCompare(programSortValue(b)) || Number(b.year) - Number(a.year) || a.title.localeCompare(b.title);
    if (sortMode === "role-asc") return publicationRole(a).localeCompare(publicationRole(b)) || Number(b.year) - Number(a.year) || a.title.localeCompare(b.title);
    if (sortMode === "title-asc") return a.title.localeCompare(b.title);
    return new Date(b.updated || 0) - new Date(a.updated || 0);
  });
}

function dueRank(record) {
  return record.due ? new Date(record.due).getTime() : Number.MAX_SAFE_INTEGER;
}

function dateSortValue(value) {
  const date = isoDate(value);
  return date ? new Date(date).getTime() : 0;
}

function roleVisibleRecords(list) {
  const role = currentAccessRole();
  return list.filter((record) => roleCanSeeRecord(record, role));
}

function roleCanSeeRecord(record, role) {
  if (role === "admin") return true;
  if (record.visibility === "Admin only") return false;
  if (role === "pi") return true;
  return isPublicFacingRecord(record);
}

function isPublicFacingRecord(record) {
  const lifecycle = lifecycleStage(record);
  return (
    record.visibility === "Public" &&
    !record.excludeFromReports &&
    lifecycle === "Published / Indexed" &&
    Boolean(publicationHref(record))
  );
}

function recordReadiness(record) {
  if (record.excludeFromReports) {
    return {
      status: "Excluded",
      ready: false,
      excluded: true,
      issues: [],
      checks: [
        { label: "Record intentionally excluded from formal reports", ok: true },
        { label: record.exclusionReason || "Exclusion reason not entered", ok: Boolean(record.exclusionReason) },
      ],
    };
  }

  const lifecycle = lifecycleStage(record);
  const finalLike = lifecycle === "Published / Indexed";
  const inPipeline = lifecycle === "Accepted / In press";
  const activeManuscript = isManuscriptPipelineRecord(record) && !finalLike;
  const submittedForReview = lifecycle === "Submitted / In review";
  const doiOptional = isDoiOptional(record);
  const checks = [
    { label: "Final title entered", ok: Boolean(record.title) },
    { label: "Lead author entered", ok: Boolean(record.lead) },
    { label: "Author list entered", ok: Boolean(record.authors?.length) },
    { label: activeManuscript ? "Target journal or venue entered" : "Journal or venue entered", ok: Boolean(record.venue) },
    { label: "Program area assigned", ok: programAreaLabels(record).some((label) => label !== "Unassigned") },
    { label: "Primary/secondary role assigned", ok: publicationRole(record) !== "Unassigned" },
    { label: "Topic assigned", ok: topicLabels(record).some((label) => label !== "Unassigned / Needs topic review") },
    { label: "Acknowledgement checked for ICoM primary support", ok: acknowledgementReview(record).ok },
    { label: "Lifecycle status is current", ok: lifecycleStages.includes(lifecycle) },
    { label: "Submitted date entered for journal-review records", ok: !submittedForReview || Boolean(record.submitted) },
    { label: "Accepted date entered for accepted/in-press records", ok: !inPipeline || Boolean(record.accepted || record.onlineFirst || record.published) },
    { label: "Publication date entered for Published/Indexed records", ok: !finalLike || Boolean(record.published) },
    { label: "DOI entered", ok: activeManuscript || doiOptional || Boolean(cleanDoi(record.doi)) },
    { label: "Publisher article or DOI link available", ok: activeManuscript || Boolean(publicationHref(record)) },
    { label: doiOptional ? "Publisher PDF link entered or exception noted" : "Publisher PDF link entered", ok: !finalLike || doiOptional || Boolean(ensureHttpUrl(record.pdfUrl)) },
    { label: activeManuscript ? "Record marked as candidate or verified" : "Verification status is current", ok: activeManuscript ? ["Candidate", "Verified current"].includes(record.verification) : record.verification === "Verified current" },
    { label: "Last reviewed date entered", ok: Boolean(record.verified) },
    { label: "Reviewed by entered", ok: Boolean(record.verifiedBy) },
    { label: "Author check passed", ok: !needsAuthorReview(record) },
  ];
  const duplicate = findDuplicateRecord(record, record.id);
  if (duplicate) checks.push({ label: `Duplicate check: ${duplicate.reason}`, ok: false });

  const issues = checks.filter((check) => !check.ok).map((check) => check.label);
  return {
    status: issues.length ? "Needs work" : activeManuscript ? "In pipeline" : "Report ready",
    ready: !issues.length && !activeManuscript,
    pending: !issues.length && activeManuscript,
    excluded: false,
    issues,
    checks,
  };
}

function readinessStatusText(readiness) {
  if (readiness.status === "Needs work") {
    return `Needs work: ${readiness.issues.length} reason${readiness.issues.length === 1 ? "" : "s"}`;
  }
  return readiness.status;
}

function readinessReasonsText(record) {
  const readiness = recordReadiness(record);
  return readiness.issues.length ? readiness.issues.join("; ") : "";
}

function isDoiOptional(record) {
  const text = normalise([record.type, record.venue, record.title, record.notes].join(" "));
  return /book chapter|fact sheet|brief|report|newsletter|commentary/.test(text) && Boolean(ensureHttpUrl(record.url));
}

function isMissingDoi(record) {
  return !cleanDoi(record.doi) && !isDoiOptional(record);
}

function uniqueRecords(list) {
  const seen = new Set();
  return (list || []).filter((record) => {
    const key = record.id ? `id:${record.id}` : recordKey(record);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function emptyLifecycleCounts() {
  return Object.fromEntries(lifecycleStages.map((stage) => [stage, 0]));
}

function emptyRoleCounts() {
  return {
    primary: 0,
    secondary: 0,
    unassignedRole: 0,
  };
}

function publicationCounts(list) {
  const unique = uniqueRecords(list);
  const lifecycle = emptyLifecycleCounts();
  const roles = emptyRoleCounts();
  const readiness = unique.map(recordReadiness);

  unique.forEach((record) => {
    const stage = lifecycleStage(record);
    lifecycle[stage] = (lifecycle[stage] || 0) + 1;
    const role = publicationRole(record);
    if (role === "Primary") roles.primary += 1;
    else if (role === "Secondary") roles.secondary += 1;
    else roles.unassignedRole += 1;
  });

  return {
    total: unique.length,
    lifecycle,
    unpublishedPipeline: unpublishedLifecycleStages.reduce((sum, stage) => sum + (lifecycle[stage] || 0), 0),
    ...roles,
    needsVerification: unique.filter((record) => ["Stale source", "Needs verification", "Candidate"].includes(record.verification)).length,
    missingDoi: unique.filter(isMissingDoi).length,
    missingPublicationDate: unique.filter((record) => lifecycleStage(record) === "Published / Indexed" && !record.published).length,
    reportReady: readiness.filter((item) => item.ready).length,
    needsWork: readiness.filter((item) => !item.ready && !item.pending && !item.excluded).length,
    excluded: unique.filter((record) => record.excludeFromReports).length,
  };
}

function renderMetrics(list) {
  const counts = publicationCounts(list);

  const metrics = [
    ["Total", counts.total],
    ["Published / Indexed", counts.lifecycle["Published / Indexed"]],
    ["Unpublished pipeline", counts.unpublishedPipeline, "Drafting + Submitted / In review + Accepted / In press"],
    ["Report ready", counts.reportReady],
  ];

  els.metricGrid.innerHTML = metrics
    .map(([label, value, help]) => `<div class="metric" ${help ? `title="${escapeAttribute(help)}"` : ""}><strong>${value}</strong><span>${escapeHtml(label)}</span>${help ? `<small>${escapeHtml(help)}</small>` : ""}</div>`)
    .join("");
}

function renderPipeline(list) {
  const counts = publicationCounts(list);
  const max = Math.max(1, ...statuses.map((status) => counts.lifecycle[status.value] || 0));
  els.pipeline.innerHTML = statuses
    .map((status) => {
      const count = counts.lifecycle[status.value] || 0;
      const width = Math.round((count / max) * 100);
      return `
        <div class="pipeline-row">
          <span>${escapeHtml(status.value)}</span>
          <div class="pipeline-bar" aria-hidden="true">
            <div class="pipeline-fill" style="--width:${width}%;--bar:${status.color}"></div>
          </div>
          <strong>${count}</strong>
        </div>
      `;
    })
    .join("");
}

function renderTopics(list) {
  const allTopics = new Set(topics);
  list.flatMap(topicLabels).forEach((topic) => allTopics.add(topic));
  const counts = topics
    .concat([...allTopics].filter((topic) => !topics.includes(topic)).sort())
    .map((topic) => [topic, uniqueRecords(list).filter((record) => topicLabels(record).includes(topic)).length])
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  els.topicMap.innerHTML = counts.length
    ? counts
        .map(([topic, count]) => `<button class="topic-pill" data-topic="${escapeHtml(topic)}"><span>${escapeHtml(topic)}</span><strong>${count}</strong></button>`)
        .join("")
    : `<div class="topic-pill"><span>No topics</span><strong>0</strong></div>`;

  els.topicMap.querySelectorAll("[data-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      els.topicFilter.value = button.dataset.topic;
      render();
    });
  });
}

function renderRecords(list) {
  if (!list.length) {
    const template = document.querySelector("#emptyTemplate");
    els.recordsMount.innerHTML = "";
    els.recordsMount.append(template.content.cloneNode(true));
    document.querySelector("#emptyResetButton").addEventListener("click", resetFilters);
    return;
  }

  if (currentView === "table") {
    renderTable(list);
    return;
  }

  els.recordsMount.innerHTML = `<div class="record-grid">${list.map(safeRenderCard).join("")}</div>`;
  bindRecordButtons();
}

function safeRenderCard(record) {
  try {
    return renderCard(record);
  } catch (error) {
    console.error("Record card render failed", { id: record?.id, title: record?.title, error });
    return renderRecordErrorCard(record, error);
  }
}

function renderRecordErrorCard(record, error) {
  return `
    <article class="record-card render-error-card">
      <div>
        <div class="record-meta">
          <span class="status-badge">Needs review</span>
          <span class="verification-badge">Render issue</span>
        </div>
        <h4>${escapeHtml(record?.title || "Untitled record")}</h4>
      </div>
      <div class="record-detail">
        <span><b>Issue:</b> ${escapeHtml(errorMessage(error))}</span>
        <span><b>Record ID:</b> ${escapeHtml(record?.id || "Missing")}</span>
        <span><b>Lead:</b> ${escapeHtml(record?.lead || "Unassigned")}</span>
      </div>
      <div class="record-actions">
        <div class="mini-actions" ${canEditRecords() ? "" : "hidden"}>
          <button class="mini-button" data-edit="${escapeAttribute(record?.id || "")}" title="Edit record" aria-label="Edit record">Edit</button>
        </div>
      </div>
    </article>
  `;
}

function doiHref(record) {
  const doi = cleanDoi(record.doi);
  return doi ? `https://doi.org/${doi}` : "";
}

function publicationHref(record) {
  return ensureHttpUrl(record.pdfUrl) || ensureHttpUrl(record.url) || doiHref(record);
}

function renderInlineLink(label, href) {
  return href
    ? `<a class="inline-link" href="${escapeAttribute(href)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`
    : escapeHtml(label || "");
}

function renderActionLink(label, href) {
  return href
    ? `<a class="link-action" href="${escapeAttribute(href)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`
    : "";
}

function renderCard(record) {
  const status = statuses.find((item) => item.value === record.status) || statuses[0];
  const verification = verificationStates.find((item) => item.value === record.verification) || verificationStates[1];
  const readiness = recordReadiness(record);
  const publicMode = isPublicRole();
  const tags = (record.tags || []).slice(0, 4).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
  const doiLink = doiHref(record);
  const publicationLink = publicationHref(record);
  return `
    <article class="record-card" style="--status:${status.color}">
      <div>
        <div class="record-meta">
          <span class="status-badge">${escapeHtml(record.status)}</span>
          ${publicMode ? "" : `<span class="verification-badge" style="--verify:${verification.color}">${escapeHtml(record.verification)}</span>`}
          ${publicMode ? "" : `<span class="readiness-badge ${readinessClass(readiness)}" title="${escapeAttribute(readiness.issues.join("; "))}">${escapeHtml(readinessStatusText(readiness))}</span>`}
          <span class="year-badge">${escapeHtml(String(record.year))}</span>
          <span class="year-badge">${escapeHtml(formatFiscalYear(fiscalYearForRecord(record)))}</span>
          <span class="type-badge">${escapeHtml(record.type || "Publication")}</span>
        </div>
        <h4>${escapeHtml(record.title)}</h4>
      </div>
      <div class="record-detail">
        <span><b>Lead:</b> ${escapeHtml(record.lead || "Unassigned")}</span>
        ${record.authors?.length ? `<span><b>Authors:</b> ${escapeHtml(formatAuthors(record.authors))}</span>` : ""}
        <span><b>Journal:</b> ${escapeHtml(record.venue || "TBD")}</span>
        <span><b>Topic:</b> ${escapeHtml(formatTopics(record))}</span>
        <span><b>Publication role:</b> ${escapeHtml(publicationRole(record))}</span>
        ${!publicMode ? `<span><b>Acknowledgement:</b> ${escapeHtml(acknowledgementReview(record).status)}</span>` : ""}
        <span><b>Lifecycle:</b> ${escapeHtml(lifecycleStage(record))}</span>
        <span><b>Publication date:</b> ${escapeHtml(record.published ? formatDate(record.published) : lifecycleStage(record) === "Published / Indexed" ? "Missing" : "Not yet published")}</span>
        ${record.doi ? `<span><b>DOI:</b> ${renderInlineLink(record.doi, doiLink)}</span>` : ""}
        ${publicationLink ? `<span><b>Publisher link:</b> ${renderInlineLink(linkHost(publicationLink), publicationLink)}</span>` : ""}
        ${record.ostiId ? `<span><b>OSTI:</b> ${renderInlineLink(record.ostiId, record.ostiUrl)}</span>` : ""}
        ${formatProgramAreas(record) !== "Unassigned" ? `<span><b>Program area:</b> ${escapeHtml(formatProgramAreas(record))}</span>` : ""}
        ${!publicMode && record.visibility ? `<span><b>Visibility:</b> ${escapeHtml(record.visibility)}</span>` : ""}
        ${!publicMode && record.authorAudit ? `<span><b>Author check:</b> ${escapeHtml(record.authorAudit)}</span>` : ""}
        ${!publicMode && annualReportSummary(record) ? `<span><b>Annual reports:</b> ${escapeHtml(annualReportSummary(record))}</span>` : ""}
        ${!publicMode && (record.verified || record.verifiedBy) ? `<span><b>Reviewed:</b> ${record.verified ? formatDate(record.verified) : "Date missing"}${record.verifiedBy ? ` by ${escapeHtml(record.verifiedBy)}` : ""}</span>` : ""}
        ${!publicMode && record.excludeFromReports ? `<span><b>Report exclusion:</b> ${escapeHtml(record.exclusionReason || "Excluded from formal reports")}</span>` : ""}
        ${!publicMode && record.linkStatus ? `<span><b>Link check:</b> ${escapeHtml(record.linkStatus)}${record.linkChecked ? ` (${formatDate(record.linkChecked)})` : ""}</span>` : ""}
        ${!publicMode && readiness.issues.length ? renderReadinessIssues(readiness.issues) : ""}
        ${renderLifecycleDates(record)}
        ${record.due ? `<span><b>Due:</b> ${formatDate(record.due)}</span>` : ""}
        <div class="tag-row">${tags}</div>
      </div>
      <div class="record-actions">
        <div class="record-links">
          ${renderActionLink("Publisher link", publicationLink)}
          ${doiLink && doiLink !== publicationLink ? renderActionLink("DOI", doiLink) : ""}
          ${record.ostiUrl ? renderActionLink("OSTI", record.ostiUrl) : ""}
        </div>
        <div class="mini-actions" ${canEditRecords() ? "" : "hidden"}>
          <button class="mini-button" data-check="${escapeAttribute(record.id)}" title="Check databases" aria-label="Check databases" ${canRunDatabaseChecks() ? "" : "hidden"}>DB</button>
          <button class="mini-button" data-copy="${escapeAttribute(record.id)}" title="Copy citation stub" aria-label="Copy citation stub">⧉</button>
          <button class="mini-button" data-edit="${escapeAttribute(record.id)}" title="Edit record" aria-label="Edit record">✎</button>
        </div>
      </div>
    </article>
  `;
}

function readinessClass(readiness) {
  if (readiness.excluded) return "excluded";
  if (readiness.pending) return "pipeline";
  return readiness.ready ? "" : "needs-work";
}

function renderReadinessIssues(issues) {
  return `
    <ul class="readiness-list">
      ${issues.slice(0, 5).map((issue) => `<li>${escapeHtml(issue)}</li>`).join("")}
      ${issues.length > 5 ? `<li>${issues.length - 5} more checks needed</li>` : ""}
    </ul>
  `;
}

function renderTableDirectRowsDeprecated(list) {
  const publicMode = isPublicRole();
  const editable = canEditRecords();
  els.recordsMount.innerHTML = `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th class="col-title">Title</th>
            <th class="col-year">Year</th>
            <th class="col-fy">FY</th>
            <th class="col-status">Status</th>
            <th class="col-date">Publication date</th>
            ${publicMode ? "" : "<th class=\"col-verification\">Verification</th>"}
            ${publicMode ? "" : "<th class=\"col-readiness\">Report readiness</th>"}
            ${publicMode ? "" : "<th class=\"col-reasons\">Needs work reasons</th>"}
            <th class="col-doi">DOI</th>
            <th class="col-link">Publisher link</th>
            ${publicMode ? "" : "<th class=\"col-link-check\">Link check</th>"}
            <th class="col-lifecycle">Lifecycle</th>
            <th class="col-lead">Lead</th>
            <th class="col-authors">Authors</th>
            ${publicMode ? "" : "<th class=\"col-author-check\">Author check</th>"}
            <th class="col-topic">Topic</th>
            <th class="col-program">Program area</th>
            <th class="col-role">Role</th>
            ${publicMode ? "" : "<th class=\"col-annual\">Annual reports</th>"}
            ${editable ? "<th class=\"col-actions\"></th>" : ""}
          </tr>
        </thead>
        <tbody>
          ${list
            .map(
              (record) => `
              <tr>
                <td>${escapeHtml(record.title)}</td>
                <td>${escapeHtml(String(record.year))}</td>
                <td>${escapeHtml(formatFiscalYear(fiscalYearForRecord(record)))}</td>
                <td>${escapeHtml(record.status)}</td>
                ${publicMode ? "" : `<td>${escapeHtml(record.verification || "")}</td>`}
                ${publicMode ? "" : `<td>${escapeHtml(recordReadiness(record).status)}</td>`}
                <td>${renderInlineLink(record.doi || "", doiHref(record))}</td>
                <td>${renderInlineLink(publicationHref(record) ? linkHost(publicationHref(record)) : "", publicationHref(record))}</td>
                ${publicMode ? "" : `<td>${escapeHtml(record.linkStatus || "")}</td>`}
                <td>${escapeHtml(lifecycleStage(record))}</td>
                <td>${escapeHtml(record.lead || "")}</td>
                <td>${escapeHtml(formatAuthors(record.authors))}</td>
                ${publicMode ? "" : `<td>${escapeHtml(record.authorAudit || "")}</td>`}
                <td>${escapeHtml(record.topic || "")}</td>
                <td>${escapeHtml(formatProgramAreas(record))}</td>
                <td>${escapeHtml(publicationRole(record))}</td>
                ${editable ? `<td><button class="mini-button" data-edit="${escapeAttribute(record.id)}" title="Edit record" aria-label="Edit record">✎</button></td>` : ""}
              </tr>
            `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
  bindRecordButtons();
}

function renderTable(list) {
  const publicMode = isPublicRole();
  const editable = canEditRecords();
  els.recordsMount.innerHTML = `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th class="col-title">Title</th>
            <th class="col-year">Year</th>
            <th class="col-fy">FY</th>
            <th class="col-status">Status</th>
            <th class="col-date">Publication date</th>
            ${publicMode ? "" : "<th class=\"col-verification\">Verification</th>"}
            ${publicMode ? "" : "<th class=\"col-readiness\">Report readiness</th>"}
            ${publicMode ? "" : "<th class=\"col-reasons\">Needs work reasons</th>"}
            <th class="col-doi">DOI</th>
            <th class="col-link">Publisher link</th>
            ${publicMode ? "" : "<th class=\"col-link-check\">Link check</th>"}
            <th class="col-lifecycle">Lifecycle</th>
            <th class="col-lead">Lead</th>
            <th class="col-authors">Authors</th>
            ${publicMode ? "" : "<th class=\"col-author-check\">Author check</th>"}
            <th class="col-topic">Topic</th>
            <th class="col-program">Program area</th>
            <th class="col-role">Role</th>
            ${publicMode ? "" : "<th class=\"col-annual\">Annual reports</th>"}
            ${editable ? "<th class=\"col-actions\"></th>" : ""}
          </tr>
        </thead>
        <tbody>
          ${list.map(safeRenderTableRow).join("")}
        </tbody>
      </table>
    </div>
  `;
  bindRecordButtons();
}

function safeRenderTableRow(record) {
  try {
    return renderTableRow(record);
  } catch (error) {
    console.error("Record table row render failed", { id: record?.id, title: record?.title, error });
    return `
      <tr class="render-error-row">
        <td colspan="24">
          <strong>${escapeHtml(record?.title || "Untitled record")}</strong>
          <span>${escapeHtml(errorMessage(error))}</span>
          ${canEditRecords() ? `<button class="mini-button" data-edit="${escapeAttribute(record?.id || "")}" title="Edit record" aria-label="Edit record">Edit</button>` : ""}
        </td>
      </tr>
    `;
  }
}

function renderTableRow(record) {
  const publicMode = isPublicRole();
  const editable = canEditRecords();
  const readiness = recordReadiness(record);
  const publishedMissing = lifecycleStage(record) === "Published / Indexed" && !record.published;
  return `
    <tr>
      <td class="col-title">${escapeHtml(record.title)}</td>
      <td class="col-year">${escapeHtml(String(record.year))}</td>
      <td class="col-fy">${escapeHtml(formatFiscalYear(fiscalYearForRecord(record)))}</td>
      <td class="col-status">${escapeHtml(record.status)}</td>
      <td class="col-date ${publishedMissing ? "is-missing" : ""}">${escapeHtml(record.published ? formatDate(record.published) : publishedMissing ? "Missing" : "")}</td>
      ${publicMode ? "" : `<td class="col-verification">${escapeHtml(record.verification || "")}</td>`}
      ${publicMode ? "" : `<td class="col-readiness"><span title="${escapeAttribute(readiness.issues.join("; "))}">${escapeHtml(readinessStatusText(readiness))}</span></td>`}
      ${publicMode ? "" : `<td class="col-reasons">${escapeHtml(readinessReasonsText(record) || "OK")}</td>`}
      <td class="col-doi">${renderInlineLink(record.doi || "", doiHref(record))}</td>
      <td class="col-link">${renderInlineLink(publicationHref(record) ? linkHost(publicationHref(record)) : "", publicationHref(record))}</td>
      ${publicMode ? "" : `<td class="col-link-check">${escapeHtml(record.linkStatus || "")}</td>`}
      <td class="col-lifecycle">${escapeHtml(lifecycleStage(record))}</td>
      <td class="col-lead">${escapeHtml(record.lead || "")}</td>
      <td class="col-authors">${escapeHtml(formatAuthors(record.authors))}</td>
      ${publicMode ? "" : `<td class="col-author-check">${escapeHtml(record.authorAudit || "")}</td>`}
      <td class="col-topic">${escapeHtml(formatTopics(record))}</td>
      <td class="col-program">${escapeHtml(formatProgramAreas(record))}</td>
      <td class="col-role">${escapeHtml(publicationRole(record))}</td>
      ${publicMode ? "" : `<td class="col-annual">${escapeHtml(annualReportSummary(record) || "")}</td>`}
      ${editable ? `<td class="col-actions"><button class="mini-button" data-edit="${escapeAttribute(record.id)}" title="Edit record" aria-label="Edit record">Edit</button></td>` : ""}
    </tr>
  `;
}

function bindRecordButtons() {
  els.recordsMount.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!canRunDatabaseChecks()) return;
      const record = records.find((item) => item.id === button.dataset.check);
      if (!record) return;
      await checkRecordDatabases(record, { updateStatus: true });
    });
  });

  els.recordsMount.querySelectorAll("[data-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!canEditRecords()) return;
      const record = records.find((item) => item.id === button.dataset.edit);
      openRecordDialog(record);
    });
  });

  els.recordsMount.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const record = records.find((item) => item.id === button.dataset.copy);
      if (!record) return;
      await copyText(`${record.title}. ${record.year}. ${record.venue || ""}`.trim());
      button.textContent = "✓";
      window.setTimeout(() => (button.textContent = "⧉"), 1000);
    });
  });
}

async function checkVisibleRecords() {
  if (!canRunDatabaseChecks()) return;
  if (databaseCheckRunning) return;
  const visible = getFilteredRecords().filter((record) => record.title || record.doi);
  const limitValue = els.databaseLimitSelect.value;
  const limit = limitValue === "all" ? visible.length : Number(limitValue);
  const toCheck = visible.slice(0, limit);

  if (!toCheck.length) {
    els.databaseStatus.textContent = "No matching records to check.";
    return;
  }

  databaseCheckRunning = true;
  els.checkDatabasesButton.disabled = true;
  const stats = { checked: 0, matched: 0, updated: 0, errors: 0 };

  try {
    for (const record of toCheck) {
      stats.checked += 1;
      els.databaseStatus.textContent = `Checking ${stats.checked} of ${toCheck.length}: ${truncate(record.title, 76)}`;
      const result = await checkRecordDatabases(record, { persistEach: false });
      if (result.matched) stats.matched += 1;
      if (result.updated) stats.updated += 1;
      if (result.error) stats.errors += 1;
      await wait(250);
    }
    if (!persist()) return;
    render();
    els.databaseStatus.textContent = `Checked ${stats.checked}. Matched ${stats.matched}. Updated ${stats.updated}. Errors ${stats.errors}.`;
  } finally {
    databaseCheckRunning = false;
    els.checkDatabasesButton.disabled = false;
  }
}

async function checkVisibleLinks() {
  if (!canRunDatabaseChecks()) return;
  if (databaseCheckRunning) return;
  const visible = getFilteredRecords();
  const limitValue = els.databaseLimitSelect.value;
  const limit = limitValue === "all" ? visible.length : Number(limitValue);
  const toCheck = visible.slice(0, limit);

  if (!toCheck.length) {
    els.databaseStatus.textContent = "No matching records to check.";
    return;
  }

  databaseCheckRunning = true;
  els.checkLinksButton.disabled = true;
  const stats = { checked: 0, ok: 0, review: 0 };
  try {
    for (const record of toCheck) {
      stats.checked += 1;
      els.databaseStatus.textContent = `Checking links ${stats.checked} of ${toCheck.length}: ${truncate(record.title, 76)}`;
      const patch = await checkRecordLinks(record);
      applyRecordPatch(record.id, patch);
      if (/^Links checked/i.test(patch.linkStatus)) stats.ok += 1;
      else stats.review += 1;
      await wait(180);
    }
    if (!persist()) return;
    render();
    els.databaseStatus.textContent = `Link check complete. Checked ${stats.checked}. OK ${stats.ok}. Review ${stats.review}.`;
  } finally {
    databaseCheckRunning = false;
    els.checkLinksButton.disabled = false;
  }
}

async function checkRecordLinks(record) {
  const issues = [];
  const checks = [];
  const doi = cleanDoi(record.doi);
  const finalLike = lifecycleStage(record) === "Published / Indexed";

  if (doi) {
    const doiResult = await verifyDoiMetadata(doi);
    if (doiResult.ok) checks.push(`DOI verified by ${doiResult.source}`);
    else issues.push(`DOI metadata lookup failed (${doiResult.status})`);
  } else if (!isDoiOptional(record)) {
    issues.push("DOI missing");
  }

  if (publicationHref(record)) checks.push("Publisher/DOI link present");
  else issues.push("Publisher article or DOI link missing");

  if (finalLike && !ensureHttpUrl(record.pdfUrl)) issues.push("Publisher PDF link missing");
  else if (ensureHttpUrl(record.pdfUrl)) checks.push("Publisher PDF link present");

  if (record.ostiId || record.ostiUrl || record.doePagesUrl) {
    const ostiResult = await verifyOstiMetadata(record);
    if (ostiResult.ok) checks.push("OSTI/DOE record verified");
    else issues.push(`OSTI/DOE link needs review (${ostiResult.status})`);
  }

  return compactPatch({
    linkStatus: issues.length ? `Needs link review: ${issues.join("; ")}` : `Links checked: ${checks.join("; ") || "required links present"}`,
    linkChecked: dateSlug(),
    reviewFlag: issues.length ? appendUnique(record.reviewFlag, "Link check") : record.reviewFlag,
    updated: new Date().toISOString(),
  });
}

async function verifyDoiMetadata(doi) {
  const crossref = await fetchJsonStatus(`${CROSSREF_API_BASE}/${encodeURIComponent(doi)}`);
  if (crossref.ok) return { ok: true, source: "Crossref", status: crossref.status };
  const datacite = await fetchJsonStatus(`https://api.datacite.org/dois/${encodeURIComponent(doi)}`);
  if (datacite.ok) return { ok: true, source: "DataCite", status: datacite.status };
  return { ok: false, source: "metadata APIs", status: `${crossref.status || "Crossref issue"}; ${datacite.status || "DataCite issue"}` };
}

async function verifyOstiMetadata(record) {
  try {
    const doi = cleanDoi(record.doi);
    const search = record.ostiId || doi || record.title;
    const payload = await fetchOsti(`${OSTI_API_BASE}?search=${encodeURIComponent(search)}&rows=3`);
    return { ok: Array.isArray(payload) && payload.length > 0, status: Array.isArray(payload) ? payload.length : "No response" };
  } catch (error) {
    return { ok: false, status: error.message || String(error) };
  }
}

async function fetchJsonStatus(url) {
  try {
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    return { ok: response.ok, status: response.status };
  } catch (error) {
    return { ok: false, status: error.message || String(error) };
  }
}

async function checkRecordDatabases(record, options = {}) {
  const { persistEach = true, updateStatus = false } = options;
  const sources = selectedDatabaseSources();
  const patches = [];
  const errors = [];

  if (updateStatus) els.databaseStatus.textContent = `Checking: ${truncate(record.title, 76)}`;

  if (sources.includes("crossref")) {
    try {
      const crossrefPatch = await lookupCrossrefRecord(record);
      if (crossrefPatch) patches.push(crossrefPatch);
    } catch (lookupError) {
      errors.push(lookupError.message || String(lookupError));
    }
  }
  if (sources.includes("osti")) {
    try {
      const ostiPatch = await lookupOstiRecord({ ...record, ...Object.assign({}, ...patches) });
      if (ostiPatch) patches.push(ostiPatch);
    } catch (lookupError) {
      errors.push(lookupError.message || String(lookupError));
    }
  }

  const patch = Object.assign({}, ...patches);
  const updated = Boolean(Object.keys(patch).length);

  if (updated) {
    patch.updated = new Date().toISOString();
    applyRecordPatch(record.id, patch);
    if (persistEach) {
      if (!persist()) return { matched: patches.length > 0, updated: false, error: "Save failed" };
      render();
    }
  }

  if (updateStatus) {
    if (updated) els.databaseStatus.textContent = `Updated: ${truncate(record.title, 82)}`;
    else if (errors.length) els.databaseStatus.textContent = `Lookup issue: ${errors.join("; ")}`;
    else els.databaseStatus.textContent = `No database match: ${truncate(record.title, 82)}`;
  }

  return { matched: patches.length > 0, updated, error: errors.join("; ") };
}

function selectedDatabaseSources() {
  const value = els.databaseSourceSelect.value;
  if (value === "crossref") return ["crossref"];
  if (value === "osti") return ["osti"];
  return ["crossref", "osti"];
}

function applyRecordPatch(id, patch) {
  const index = records.findIndex((item) => item.id === id);
  if (index < 0) return;
  records[index] = normaliseRecord({ ...records[index], ...patch });
}

async function lookupCrossrefRecord(record) {
  const doi = cleanDoi(record.doi);
  const url = doi
    ? `${CROSSREF_API_BASE}/${encodeURIComponent(doi)}`
    : `${CROSSREF_API_BASE}?query.title=${encodeURIComponent(record.title)}&rows=3`;
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Crossref ${response.status}`);
  const payload = await response.json();
  const item = doi ? payload.message : chooseBestCrossrefItem(payload.message?.items || [], record);
  if (!item) return null;

  const itemDoi = cleanDoi(item.DOI);
  const publicationDate = crossrefDate(item["published-online"]) || crossrefDate(item.published) || crossrefDate(item.issued);
  const acceptedDate = crossrefAcceptedDate(item);
  const pdfLink = crossrefPdfLink(item);
  const articleLink = ensureHttpUrl(item.resource?.primary?.URL) || ensureHttpUrl(item.URL) || (itemDoi ? `https://doi.org/${itemDoi}` : "");
  const itemTitle = Array.isArray(item.title) ? item.title[0] : "";
  const journal = Array.isArray(item["container-title"]) ? item["container-title"][0] : "";
  const authors = crossrefAuthors(item);
  const lead = record.lead || authors[0] || "";
  const authorAudit = authorAuditStatus(lead, authors);

  return compactPatch({
    title: shouldReplaceWeakTitle(record.title) ? itemTitle : record.title,
    doi: record.doi || itemDoi,
    venue: record.venue || journal,
    lead,
    authors: authors.length ? authors : record.authors,
    published: record.published || publicationDate,
    accepted: record.accepted || acceptedDate,
    status: isManuscriptPipelineRecord(record) && publicationDate ? "Published / Indexed" : record.status,
    verification: "Verified current",
    verified: dateSlug(),
    verifiedBy: record.verifiedBy || REVIEWER_NAME,
    url: record.url || articleLink,
    pdfUrl: record.pdfUrl || pdfLink,
    crossrefUrl: item.URL || (itemDoi ? `https://doi.org/${itemDoi}` : ""),
    authorAudit,
    reviewFlag: authorAudit.startsWith("Review") ? appendUnique(record.reviewFlag, "Author check") : record.reviewFlag,
    metadataStatus: appendUnique(record.metadataStatus, "Crossref match"),
    source: appendUnique(record.source, "Crossref"),
    notes: appendUnique(record.notes, authorAudit.startsWith("Review") ? `Crossref metadata checked; listed lead does not match returned authors: ${authors.join("; ")}.` : "Crossref metadata checked."),
  });
}

async function lookupOstiRecord(record) {
  const doi = cleanDoi(record.doi);
  const primaryUrl = doi
    ? `${OSTI_API_BASE}?doi=${encodeURIComponent(doi)}&rows=3`
    : `${OSTI_API_BASE}?search=${encodeURIComponent(record.title)}&rows=3`;
  let payload = await fetchOsti(primaryUrl);

  if ((!Array.isArray(payload) || !payload.length) && (doi || record.title)) {
    const searchText = doi || record.title;
    payload = await fetchOsti(`${OSTI_API_BASE}?search=${encodeURIComponent(searchText)}&rows=3`);
  }

  const item = chooseBestOstiItem(Array.isArray(payload) ? payload : [], record);
  if (!item) return null;

  const itemDoi = cleanDoi(item.doi);
  const fullText = ostiLink(item, "fulltext");
  const citation = ostiLink(item, "citation") || (item.osti_id ? `https://www.osti.gov/biblio/${item.osti_id}` : "");
  const doePages = ostiLink(item, "citation_doe_pages");
  const publicationDate = isoDate(item.publication_date);
  const authors = ostiAuthors(item);
  const lead = record.lead || authors[0] || "";
  const authorAudit = authorAuditStatus(lead, authors);

  return compactPatch({
    title: shouldReplaceWeakTitle(record.title) ? item.title : record.title,
    doi: record.doi || itemDoi,
    venue: record.venue || item.journal_name,
    lead,
    authors: authors.length ? authors : record.authors,
    type: record.type || item.product_type,
    published: record.published || publicationDate,
    status: isManuscriptPipelineRecord(record) && publicationDate ? "Published / Indexed" : record.status,
    verification: "Verified current",
    verified: dateSlug(),
    verifiedBy: record.verifiedBy || REVIEWER_NAME,
    url: record.url || citation || doePages,
    pdfUrl: record.pdfUrl || fullText,
    ostiId: item.osti_id,
    ostiUrl: citation,
    doePagesUrl: doePages,
    authorAudit,
    reviewFlag: authorAudit.startsWith("Review") ? appendUnique(record.reviewFlag, "Author check") : record.reviewFlag,
    metadataStatus: appendUnique(record.metadataStatus, "OSTI match"),
    source: appendUnique(record.source, "OSTI"),
    notes: appendUnique(record.notes, item.osti_id ? `OSTI record ${item.osti_id} checked.` : "OSTI metadata checked."),
  });
}

async function fetchOsti(url) {
  const response = await fetch(url, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`OSTI ${response.status}`);
  return response.json();
}

function chooseBestCrossrefItem(items, record) {
  const doi = cleanDoi(record.doi);
  if (doi) {
    const exact = items.find((item) => cleanDoi(item.DOI) === doi);
    if (exact) return exact;
  }
  return items
    .map((item) => ({ item, score: titleScore(record.title, Array.isArray(item.title) ? item.title[0] : "") }))
    .filter(({ score }) => score >= 0.45)
    .sort((a, b) => b.score - a.score)[0]?.item || null;
}

function chooseBestOstiItem(items, record) {
  const doi = cleanDoi(record.doi);
  if (doi) {
    const exact = items.find((item) => cleanDoi(item.doi) === doi);
    if (exact) return exact;
  }
  return items
    .map((item) => ({ item, score: titleScore(record.title, item.title) }))
    .filter(({ score }) => score >= 0.45)
    .sort((a, b) => b.score - a.score)[0]?.item || null;
}

function titleScore(left, right) {
  const leftTokens = tokenSet(left);
  const rightTokens = tokenSet(right);
  if (!leftTokens.size || !rightTokens.size) return 0;
  let overlap = 0;
  leftTokens.forEach((token) => {
    if (rightTokens.has(token)) overlap += 1;
  });
  return overlap / Math.max(leftTokens.size, rightTokens.size);
}

function tokenSet(value) {
  return new Set(
    normalise(value)
      .replace(/[^a-z0-9 ]+/g, " ")
      .split(/\s+/)
      .filter((token) => token.length > 3)
  );
}

function crossrefDate(value) {
  const parts = value?.["date-parts"]?.[0];
  if (!parts?.length) return "";
  const [year, month = 1, day = 1] = parts;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function crossrefAcceptedDate(item) {
  const accepted = (item.assertion || []).find((entry) =>
    /accepted/i.test([entry.name, entry.label, entry.group?.name, entry.group?.label].filter(Boolean).join(" "))
  );
  return isoDate(accepted?.value);
}

function crossrefPdfLink(item) {
  const pdfUrlPattern = /\.pdf($|\?)|\/pdf($|\?)|\/doi\/pdf\/|\/downloadpdf\/|\/Download\?/i;
  const pdfLinks = (item.link || []).filter((link) => /pdf/i.test(link["content-type"] || "") || pdfUrlPattern.test(link.URL || ""));
  const itemDoi = cleanDoi(item.DOI);
  const fallback = publisherPdfFallback(itemDoi, item);
  const preferred = pdfLinks.find((link) => /\/doi\/pdf\/|\/downloadpdf\/|\/pdf($|\?)|\/Download\?/i.test(link.URL || ""))?.URL ||
      pdfLinks.find((link) => !/api\.|\/tdm\//i.test(link.URL || ""))?.URL ||
      pdfLinks[0]?.URL;
  const shouldUseFallback = /journals\.ametsoc\.org\/downloadpdf\/journals\/.+\.xml$/i.test(preferred || "") && fallback;
  return ensureHttpUrl(
    shouldUseFallback ? "" : preferred
  ) || fallback;
}

function publisherPdfFallback(doi, item = {}) {
  const clean = cleanDoi(doi);
  const primary = ensureHttpUrl(item.resource?.primary?.URL);
  if (primary) {
    const ametsoc = primary.match(/^(https:\/\/journals\.ametsoc\.org)\/view\/(journals\/.+?)\.xml$/i);
    if (ametsoc) return `${ametsoc[1]}/downloadpdf/view/${ametsoc[2]}.pdf`;
    const elsevier = primary.match(/\/retrieve\/pii\/([A-Z0-9]+)/i);
    if (elsevier) return `https://www.sciencedirect.com/science/article/pii/${elsevier[1]}/pdfft?isDTMRedir=true&download=true`;
    if (/frontiersin\.org\//i.test(primary) && /\/full$/i.test(primary)) return primary.replace(/\/full$/i, "/pdf");
  }
  if (!clean) return "";
  if (/^10\.1371\//i.test(clean)) return `https://journals.plos.org/climate/article/file?id=${clean}&type=printable`;
  if (/^10\.3389\//i.test(clean)) return `https://www.frontiersin.org/articles/${clean}/pdf`;
  return "";
}

function crossrefAuthors(item) {
  return (item.author || [])
    .map((author) => [author.given, author.family].filter(Boolean).join(" ").trim())
    .filter(Boolean);
}

function shouldReplaceWeakTitle(value) {
  const text = String(value || "").trim();
  if (!text) return true;
  if (text.length < 12) return true;
  if (/^https?:\/\//i.test(text)) return true;
  return /^(reportlab pdf library|microsoft word|untitled|document|pdf)\b/i.test(text);
}

function authorAuditStatus(lead, authors) {
  if (!authors?.length) return "";
  if (!String(lead || "").trim()) return "Review: lead missing";
  return authorMatchesList(lead, authors) ? "Verified" : "Review: lead not in author list";
}

function authorMatchesList(lead, authors) {
  const leadTokens = authorTokens(lead);
  if (!leadTokens.length) return false;
  return authors.some((author) => {
    const tokens = authorTokens(author);
    return leadTokens.every((token) => tokens.includes(token)) || tokens.every((token) => leadTokens.includes(token));
  });
}

function authorTokens(value) {
  return normalise(value)
    .replace(/[^a-z0-9 ]+/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1 && !["and", "team"].includes(token));
}

function ostiLink(item, rel) {
  return ensureHttpUrl((item.links || []).find((link) => link.rel === rel)?.href);
}

function ostiAuthors(item) {
  return (item.authors || [])
    .map((author) => cleanAuthorName(String(author || "").split("[")[0]))
    .filter(Boolean);
}

function appendUnique(existing, addition) {
  const current = String(existing || "").trim();
  const next = String(addition || "").trim();
  if (!next) return current;
  return normalise(current).includes(normalise(next)) ? current : [current, next].filter(Boolean).join("; ");
}

function appendDelimitedUnique(existing, addition) {
  return String(addition || "")
    .split(/\s*[;|]\s*/)
    .filter(Boolean)
    .reduce((current, part) => appendUnique(current, part), String(existing || "").trim());
}

function compactPatch(patch) {
  return Object.fromEntries(Object.entries(patch).filter(([, value]) => value !== undefined && value !== null && value !== ""));
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function renderReport(list) {
  const scoped = getReportRecords(list);
  const rows = buildReportRows(scoped);
  const total = scoped.length || 1;
  const headline = `${scoped.length} records by ${reportLabel(els.reportGroupSelect.value)}`;
  const scope = reportScopeLabel();
  const stageColumns = reportStageColumns();

  els.reportMount.innerHTML = `
    <div class="report-summary">
      <strong>${escapeHtml(headline)}</strong>
      <span>${escapeHtml([scope, reportFocusLabel(els.reportFocusSelect.value)].filter(Boolean).join(" | "))}</span>
    </div>
    <div class="report-table-wrap">
      <table class="report-table">
        <thead>
          <tr>
            <th>${escapeHtml(reportLabel(els.reportGroupSelect.value))}</th>
            <th>Records</th>
            <th>Primary</th>
            <th>Secondary</th>
            <th>Unassigned role</th>
            ${stageColumns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}
            <th>Needs verification</th>
            <th>Missing DOI</th>
            <th>Missing publication date</th>
            <th>Ready</th>
            <th>Needs work</th>
            <th>Excluded</th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (row) => `
              <tr>
                <td>${escapeHtml(row.label)}</td>
                <td>
                  <div class="report-count">
                    <strong>${row.count}</strong>
                    <span style="--width:${Math.round((row.count / total) * 100)}%"></span>
                  </div>
                </td>
                <td>${row.primary}</td>
                <td>${row.secondary}</td>
                <td>${row.unassignedRole}</td>
                ${stageColumns.map((column) => `<td>${row[column.key]}</td>`).join("")}
                <td>${row.needsVerification}</td>
                <td>${row.missingDoi}</td>
                <td>${row.missingPublicationDate}</td>
                <td>${row.reportReady}</td>
                <td>${row.needsWork}</td>
                <td>${row.excluded}</td>
              </tr>
            `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function getReportRecords(list) {
  const programArea = els.reportProgramAreaSelect.value;
  const reportRole = els.reportPublicationRoleSelect.value;
  let scoped = programArea ? list.filter((record) => programAreaLabels(record).includes(programArea)) : list;
  scoped = reportRole ? scoped.filter((record) => publicationRole(record) === reportRole) : scoped;
  const focus = els.reportFocusSelect.value;
  if (focus === "journalPipeline") return scoped.filter(isManuscriptPipelineRecord);
  if (focus === "needsVerification") {
    return scoped.filter((record) => ["Stale source", "Needs verification", "Candidate"].includes(record.verification));
  }
  if (focus === "reportReady") {
    return scoped.filter((record) => recordReadiness(record).ready);
  }
  if (focus === "notReportReady") {
    return scoped.filter((record) => {
      const readiness = recordReadiness(record);
      return !readiness.ready && !readiness.pending && !readiness.excluded;
    });
  }
  if (focus === "missingDoi") {
    return scoped.filter(isMissingDoi);
  }
  if (focus === "authorAudit") {
    return scoped.filter((record) => needsAuthorReview(record));
  }
  if (focus === "reviewFlag") {
    return scoped.filter((record) => record.reviewFlag);
  }
  if (focus === "excludedReports") {
    return scoped.filter((record) => record.excludeFromReports);
  }
  return scoped;
}

function buildReportRows(list) {
  const group = els.reportGroupSelect.value;
  const buckets = new Map();
  list.forEach((record) => {
    groupValues(record, group).forEach((value) => {
      const label = value || "Unassigned";
      if (!buckets.has(label)) buckets.set(label, []);
      buckets.get(label).push(record);
    });
  });

  return [...buckets.entries()]
    .map(([label, groupRecords]) => {
      const counts = publicationCounts(groupRecords);
      return {
        label,
        count: counts.total,
        primary: counts.primary,
        secondary: counts.secondary,
        unassignedRole: counts.unassignedRole,
        ...reportStageCounts(groupRecords),
        needsVerification: counts.needsVerification,
        missingDoi: counts.missingDoi,
        missingPublicationDate: counts.missingPublicationDate,
        reportReady: counts.reportReady,
        needsWork: counts.needsWork,
        excluded: counts.excluded,
      };
    })
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function reportStageColumns() {
  return [
    { key: "published", label: "Published / Indexed" },
    { key: "pipelineTotal", label: "Unpublished pipeline" },
    { key: "drafting", label: "Drafting" },
    { key: "submittedInReview", label: "Submitted / In review" },
    { key: "acceptedInPress", label: "Accepted / In press" },
  ];
}

function reportRoleCounts(groupRecords) {
  return {
    primary: groupRecords.filter((record) => publicationRole(record) === "Primary").length,
    secondary: groupRecords.filter((record) => publicationRole(record) === "Secondary").length,
    unassignedRole: groupRecords.filter((record) => publicationRole(record) === "Unassigned").length,
  };
}

function reportStageCounts(groupRecords) {
  const counts = publicationCounts(groupRecords);
  return {
    published: counts.lifecycle["Published / Indexed"] || 0,
    pipelineTotal: counts.unpublishedPipeline,
    drafting: counts.lifecycle.Drafting || 0,
    submittedInReview: counts.lifecycle["Submitted / In review"] || 0,
    acceptedInPress: counts.lifecycle["Accepted / In press"] || 0,
  };
}

function groupValues(record, group) {
  if (group === "programAreas") return programAreaLabels(record);
  if (group === "publicationRole") return [publicationRole(record)];
  if (group === "lifecycle") return [lifecycleStage(record)];
  if (group === "topic") return topicLabels(record);
  if (group === "year") return [String(record.year || "Unknown")];
  if (group === "fiscalYear") return [formatFiscalYear(fiscalYearForRecord(record))];
  return splitMultiValue(record[group]);
}

function splitMultiValue(value) {
  const values = String(value || "")
    .split(/[,;/]/)
    .map((item) => item.trim())
    .filter(Boolean);
  return values.length ? values : ["Unassigned"];
}

function topicLabels(record) {
  return normaliseTopics(record.topics || record.topic);
}

function topicVocabulary() {
  const preserved = records
    .flatMap((record) => {
      if (Array.isArray(record.topics)) return record.topics;
      return String(record.topic || "").split(/[;,|]/);
    })
    .map((topic) => fixText(topic || "").trim())
    .filter(Boolean);
  const vocabulary = [...new Set([...topics, ...preserved])];
  return [
    "Unassigned / Needs topic review",
    ...vocabulary
      .filter((topic) => topic !== "Unassigned / Needs topic review")
      .sort((a, b) => a.localeCompare(b)),
  ];
}

function selectedTopics() {
  const selected = [...els.fields.topic.selectedOptions].map((option) => option.value).filter(Boolean);
  return normaliseTopics(selected);
}

function setTopicSelection(record) {
  const selected = new Set(topicLabels(record));
  [...els.fields.topic.options].forEach((option) => {
    option.selected = selected.has(option.value);
  });
  if (![...els.fields.topic.options].some((option) => option.selected)) {
    els.fields.topic.value = "Unassigned / Needs topic review";
  }
}

function normaliseTopics(value) {
  const raw = Array.isArray(value)
    ? value
    : String(value || "").split(/[;,|]/);
  const cleaned = raw
    .map((item) => fixText(item || "").trim())
    .filter(Boolean)
    .map((item) => {
      const known = topics.find((topic) => normalise(topic) === normalise(item));
      return known || item;
    });
  const unique = [...new Set(cleaned)];
  return unique.length ? unique : ["Unassigned / Needs topic review"];
}

function formatTopics(record) {
  return topicLabels(record).join(", ");
}

function needsTopicReview(item, resolvedTopics = normaliseTopics(item?.topics || item?.topic)) {
  if (resolvedTopics.includes("Unassigned / Needs topic review")) return true;
  if (resolvedTopics.some((topic) => !topics.includes(topic))) return true;
  const sourceText = normalise([
    item?.source,
    item?.metadataStatus,
    item?.notes,
    ...(Array.isArray(item?.tags) ? item.tags : String(item?.tags || "").split(/[;,]/)),
  ].join(" "));
  return resolvedTopics.includes("Model integration") && /pdf intake|pdf upload|inferred|keyword|manual entry/.test(sourceText);
}

function normaliseAnnualReports(value) {
  const rows = Array.isArray(value) ? value : [];
  return rows
    .map((row) => ({
      fiscalYear: normaliseFiscalYearLabel(row?.fiscalYear),
      statusAtReport: normaliseAnnualReportStatus(row?.statusAtReport || row?.status),
      notes: fixText(row?.notes || ""),
    }))
    .filter((row) => row.fiscalYear || row.statusAtReport || row.notes);
}

function normaliseFiscalYearLabel(value) {
  const text = String(value || "").trim().toUpperCase();
  if (!text) return "";
  const year = text.match(/\d{2,4}/)?.[0] || "";
  if (!year) return text;
  return `FY${year.length === 2 ? year : year.slice(-2)}`;
}

function normaliseAnnualReportStatus(value) {
  const status = normaliseStatus(value);
  return annualReportStatusOptions.includes(status) ? status : "Submitted / In review";
}

function annualReportSummary(record) {
  const rows = normaliseAnnualReports(record.annualReports);
  if (!rows.length) return "";
  return rows
    .map((row) => `${row.fiscalYear || "FY?"}-${shortAnnualReportStatus(row.statusAtReport)}`)
    .join("; ");
}

function formatAnnualReports(record) {
  const rows = normaliseAnnualReports(record.annualReports);
  return rows
    .map((row) => [row.fiscalYear, row.statusAtReport, row.notes].filter(Boolean).join(": "))
    .join(" | ");
}

function shortAnnualReportStatus(status) {
  return {
    "Submitted / In review": "Submitted",
    "Accepted / In press": "Accepted",
    "Published / Indexed": "Published",
  }[status] || status || "Status?";
}

function programAreaLabels(record) {
  const source = [record.programAreas, ...(record.tags || [])].join(", ");
  return programAreaTokens(source);
}

function formatProgramAreas(record) {
  return programAreaLabels(record).join(", ");
}

function selectedProgramAreas() {
  return [...els.fields.programAreas.querySelectorAll("input[type='checkbox']:checked")]
    .map((input) => input.value)
    .filter((value) => programAreaBuckets.includes(value))
    .join(", ");
}

function setProgramAreaSelection(record) {
  const selected = new Set(programAreaLabels(record).filter((value) => value !== "Unassigned"));
  els.fields.programAreas.querySelectorAll("input[type='checkbox']").forEach((input) => {
    input.checked = selected.has(input.value);
  });
}

function programAreaTokens(value) {
  const text = String(value || "");
  const tokens = [];
  const add = (label) => {
    if (!tokens.includes(label)) tokens.push(label);
  };
  if (/\b(RGMA|RMGA)\b/i.test(text)) add("RGMA");
  if (/\bMSD\b/i.test(text)) add("MSD");
  if (/\bESMD\b/i.test(text)) add("ESMD");
  if (/\bCC\b|\(CC\)/i.test(text)) add("CC");
  return tokens.length ? tokens.sort((a, b) => programAreaOrder(a) - programAreaOrder(b) || a.localeCompare(b)) : ["Unassigned"];
}

function programAreaOrder(value) {
  const index = programAreaBuckets.indexOf(value);
  return index === -1 ? programAreaBuckets.length : index;
}

function programSortValue(record) {
  const labels = programAreaLabels(record);
  const first = labels[0] || "Unassigned";
  return `${String(programAreaOrder(first)).padStart(2, "0")} ${first}`;
}

function publicationRole(record) {
  const explicit = normalisePublicationRole(record.publicationRole);
  return explicit !== "Unassigned" ? explicit : inferPublicationRole(record);
}

function inferPublicationRole(record) {
  const tags = Array.isArray(record.tags)
    ? record.tags
    : String(record.tags || "").split(/[;,]/).map((tag) => tag.trim()).filter(Boolean);
  for (const tag of tags) {
    const text = String(tag || "").trim();
    if (/^(publication\s+role:\s*)?primary(:\s*yes)?$/i.test(text)) return "Primary";
    if (/^(publication\s+role:\s*)?secondary(:\s*yes)?$/i.test(text)) return "Secondary";
  }
  return "Unassigned";
}

function normalisePublicationRole(value) {
  const text = String(value || "").trim();
  if (/^primary$/i.test(text)) return "Primary";
  if (/^secondary$/i.test(text)) return "Secondary";
  return "Unassigned";
}

function tagsWithPublicationRole(tags, role) {
  const nextRole = normalisePublicationRole(role);
  const cleaned = (tags || []).filter((tag) => !/^(publication\s+role:\s*)?(primary|secondary)(:\s*yes)?$/i.test(String(tag).trim()));
  return nextRole === "Unassigned" ? cleaned : [...cleaned, `Publication role: ${nextRole}`];
}

function acknowledgementReview(record) {
  const text = acknowledgementSourceText(record);
  const stored = normaliseAcknowledgementStatus(record.acknowledgementStatus);
  const primarySupported = acknowledgementPrimarySupport(text);
  const hasAckText = /\backnowledg(e)?ments?\b|\bfunding\b|\bsupport(ed|s)?\b/i.test(text);
  const reviewed = primarySupported || stored.reviewed || acknowledgementReviewed(text);
  const status = primarySupported
    ? "ICoM primary support found"
    : stored.status || (reviewed ? "Acknowledgement reviewed" : hasAckText ? "Acknowledgement text present" : "Needs acknowledgement check");
  return {
    status,
    ok: primarySupported || reviewed || publicationRoleAssignedWithoutAck(record),
    needsReview: !(primarySupported || reviewed || publicationRoleAssignedWithoutAck(record)),
    primarySupported,
    excerpt: acknowledgementExcerpt(text),
  };
}

function publicationRoleAssignedWithoutAck(record) {
  const role = publicationRole(record);
  const tags = Array.isArray(record.tags) ? record.tags : String(record.tags || "").split(/[;,]/).map((tag) => tag.trim()).filter(Boolean);
  return role !== "Unassigned" && !/pdf upload|pdf intake/i.test([record.source, ...tags].join(" "));
}

function acknowledgementSourceText(record) {
  const tags = Array.isArray(record.tags) ? record.tags : String(record.tags || "").split(/[;,]/).map((tag) => tag.trim()).filter(Boolean);
  return [
    record.acknowledgementText,
    record.acknowledgementStatus,
    record.notes,
    record.metadataStatus,
    record.action,
    record.source,
    ...tags,
  ].filter(Boolean).join("\n");
}

function acknowledgementPrimarySupport(text) {
  const value = String(text || "");
  return /primar(?:y|ily)\s+(?:supported|funded|funding)\s+(?:by|through|from)\s+(?:the\s+)?(?:AI-enabled\s+)?(?:Integrated Coastal Modeling|ICoM)\b/i.test(value) ||
    /(?:AI-enabled\s+)?(?:Integrated Coastal Modeling|ICoM)\b[\s\S]{0,120}\b(?:primary|primarily|principal|main)\s+(?:support|funding|funded)/i.test(value) ||
    /\b(?:primary|primarily|principal|main)\s+(?:support|funding|funded)[\s\S]{0,120}\b(?:AI-enabled\s+)?(?:Integrated Coastal Modeling|ICoM)\b/i.test(value);
}

function acknowledgementReviewed(text) {
  const value = String(text || "");
  return /acknowledg(e)?ments?[^.]{0,100}\b(reviewed|checked|vetted|confirmed)\b/i.test(value) ||
    /\b(reviewed|checked|vetted|confirmed)\b[^.]{0,100}acknowledg(e)?ments?/i.test(value) ||
    /ICoM not acknowledged|not acknowledged|acknowledg(e)?ments? (?:do|does) not mention/i.test(value);
}

function normaliseAcknowledgementStatus(value) {
  const text = String(value || "").trim();
  if (!text) return { status: "", reviewed: false };
  return {
    status: text,
    reviewed: !/needs acknowledgement check|acknowledgement text present/i.test(text),
  };
}

function acknowledgementExcerpt(text) {
  const value = String(text || "").replace(/\s+/g, " ").trim();
  const match = value.match(/(?:acknowledg(e)?ments?|funding|support(ed)?)[\s\S]{0,260}/i);
  return match ? match[0].trim() : "";
}

function reportLabel(group) {
  return {
    programAreas: "Program area",
    publicationRole: "Publication role",
    topic: "Topic",
    lead: "Lead author",
    venue: "Journal",
    lifecycle: "Lifecycle stage",
    status: "Status",
    type: "Publication type",
    year: "Year",
    fiscalYear: "Fiscal year",
    verification: "Verification",
    reviewFlag: "Review flag",
    metadataStatus: "Metadata status",
  }[group] || group;
}

function reportFocusLabel(focus) {
  return {
    all: "All records matching the current filters",
    journalPipeline: "Unpublished pipeline: Drafting + Submitted / In review + Accepted / In press",
    needsVerification: "Records that need source or metadata verification",
    reportReady: "Records that pass the report-ready checklist",
    notReportReady: "Records with missing report-ready checklist items",
    missingDoi: "Records without a DOI",
    authorAudit: "Records where the listed lead author needs checking",
    reviewFlag: "Records marked with a review flag",
    excludedReports: "Records excluded from formal reports",
  }[focus] || "";
}

function reportScopeLabel() {
  const programArea = els.reportProgramAreaSelect.value;
  const role = els.reportPublicationRoleSelect.value;
  const parts = [
    programArea ? `Program area: ${programArea}` : "All program areas",
    role ? `Role: ${role}` : "All roles",
  ];
  return parts.join(" | ");
}

function reportFileScopeSlug() {
  const programArea = els.reportProgramAreaSelect.value;
  const role = els.reportPublicationRoleSelect.value;
  return [programArea, role].filter(Boolean).map((value) => `-${slugify(value)}`).join("");
}

function downloadReportCsv(rows) {
  const stageColumns = reportStageColumns();
  const columns = [
    "group",
    "records",
    "primary",
    "secondary",
    "unassigned_role",
    ...stageColumns.map((column) => column.key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)),
    "needs_verification",
    "missing_doi",
    "missing_publication_date",
    "report_ready",
    "needs_work",
    "excluded",
  ];
  const lines = [
    columns.join(","),
    ...rows.map((row) =>
      [row.label, row.count, row.primary, row.secondary, row.unassignedRole, ...stageColumns.map((column) => row[column.key]), row.needsVerification, row.missingDoi, row.missingPublicationDate, row.reportReady, row.needsWork, row.excluded]
        .map((value) => `"${String(value).replaceAll('"', '""')}"`)
        .join(",")
    ),
  ];
  downloadFile(`icom-report${reportFileScopeSlug()}-${els.reportGroupSelect.value}-${dateSlug()}.csv`, lines.join("\n"), "text/csv");
}

function downloadReportExcel(rows) {
  const title = reportTitleText();
  const stageColumns = reportStageColumns();
  const scopedRecords = uniqueRecords(getReportRecords(getFilteredRecords()));
  const xmlRows = [
    ["Report", title],
    ["Generated", new Date().toLocaleString()],
    ["Scope", reportScopeLabel()],
    ["Focus", reportFocusLabel(els.reportFocusSelect.value)],
    [],
    ["Group", "Records", "Primary", "Secondary", "Unassigned role", ...stageColumns.map((column) => column.label), "Needs verification", "Missing DOI", "Missing publication date", "Report ready", "Needs work", "Excluded"],
    ...rows.map((row) => [row.label, row.count, row.primary, row.secondary, row.unassignedRole, ...stageColumns.map((column) => row[column.key]), row.needsVerification, row.missingDoi, row.missingPublicationDate, row.reportReady, row.needsWork, row.excluded]),
  ];
  const publicationRows = [
    ["Record ID", "Title", "Authors", "Journal", "Program area", "Publication role", "Topics", "Lifecycle", "Publication date", "DOI", "Annual-report history", "Report readiness", "Needs work reasons"],
    ...scopedRecords.map((record) => {
      const readiness = recordReadiness(record);
      return [
        record.id,
        record.title,
        formatAuthors(record.authors),
        record.venue,
        formatProgramAreas(record),
        publicationRole(record),
        formatTopics(record),
        lifecycleStage(record),
        record.published || "",
        cleanDoi(record.doi),
        formatAnnualReports(record),
        readinessStatusText(readiness),
        readiness.issues.join("; "),
      ];
    }),
  ];
  const worksheetXml = (name, worksheetRows) => `
  <Worksheet ss:Name="${excelXmlEscape(name)}">
    <Table>
      ${worksheetRows
        .map(
          (row) => `<Row>${row
            .map((cell) => {
              const numeric = typeof cell === "number";
              return `<Cell><Data ss:Type="${numeric ? "Number" : "String"}">${excelXmlEscape(cell)}</Data></Cell>`;
            })
            .join("")}</Row>`
        )
        .join("")}
    </Table>
  </Worksheet>`;
  const xml = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  ${worksheetXml("ICoM Report", xmlRows)}
  ${worksheetXml("Publications", publicationRows)}
</Workbook>`;
  downloadFile(`icom-report${reportFileScopeSlug()}-${els.reportGroupSelect.value}-${dateSlug()}.xls`, xml, "application/vnd.ms-excel");
}

function downloadReportPdf(rows) {
  const blob = buildPdfReport(rows);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `icom-report${reportFileScopeSlug()}-${els.reportGroupSelect.value}-${dateSlug()}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadPublicationListPdf(list) {
  const scoped = sortRecords(list, "year-desc");
  const blob = buildPublicationListPdf(scoped);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `icom-publication-list${reportFileScopeSlug()}-${dateSlug()}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}

function reportTitleText() {
  return `${buildReportRows(getReportRecords(getFilteredRecords())).length} groups: ${reportLabel(els.reportGroupSelect.value)} (${reportScopeLabel()})`;
}

function buildPublicationListPdf(list) {
  const objects = [];
  const addObject = (content) => {
    objects.push(content);
    return objects.length;
  };

  const catalogId = addObject("");
  const pagesId = addObject("");
  const fontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const boldFontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  const pageIds = [];

  let lines = [];
  let annotations = [];
  let y = 0;
  let pageNumber = 0;

  const addText = (x, textY, text, size = 9, font = "F1", color = "0 0 0") => {
    lines.push(`BT ${color} rg /${font} ${size} Tf ${x} ${textY} Td (${pdfText(text)}) Tj ET`);
  };

  const addLinkText = (x, textY, label, href, maxWidth = 492) => {
    const safeLabel = truncate(label, Math.floor(maxWidth / 4.8));
    addText(x, textY, safeLabel, 8, "F1", "0 0.31 0.38");
    const width = Math.min(maxWidth, Math.max(28, safeLabel.length * 4.6));
    const annotationId = addObject(`<< /Type /Annot /Subtype /Link /Rect [${x} ${textY - 2} ${x + width} ${textY + 10}] /Border [0 0 0] /A << /S /URI /URI (${pdfText(href)}) >> >>`);
    annotations.push(`${annotationId} 0 R`);
  };

  const startPage = () => {
    pageNumber += 1;
    lines = [];
    annotations = [];
    y = 704;
    addText(48, 760, "ICoM Publication List", 16, "F2");
    addText(48, 742, `${list.length} records | ${reportScopeLabel()} | ${reportFocusLabel(els.reportFocusSelect.value)}`, 9);
    addText(48, 727, "DOI and publisher/journal links are clickable.", 9, "F1", "0 0.31 0.38");
    addText(430, 760, new Date().toLocaleDateString(), 9);
  };

  const finishPage = () => {
    addText(520, 28, `Page ${pageNumber}`, 8);
    const stream = lines.join("\n");
    const contentId = addObject(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
    const annots = annotations.length ? `/Annots [${annotations.join(" ")}]` : "";
    const pageId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 612 792] ${annots} /Resources << /Font << /F1 ${fontId} 0 R /F2 ${boldFontId} 0 R >> >> /Contents ${contentId} 0 R >>`);
    pageIds.push(pageId);
  };

  startPage();

  if (!list.length) {
    addText(48, y, "No records match the current filters.", 10);
  }

  list.forEach((record, index) => {
    const titleLines = wrapPdfText(`${index + 1}. ${record.title || "Untitled publication"}`, 92).slice(0, 4);
    const readiness = recordReadiness(record);
    const publicationDateText = record.published
      ? formatDate(record.published)
      : lifecycleStage(record) === "Published / Indexed"
        ? "Missing publication date"
        : "Not yet published";
    const annualReportLines = normaliseAnnualReports(record.annualReports)
      .flatMap((row) => wrapPdfText(`Annual report ${row.fiscalYear || "FY?"}: ${row.statusAtReport}${row.notes ? `; ${row.notes}` : ""}`, 116));
    const readinessLines = readiness.issues.length
      ? wrapPdfText(`Needs work: ${readiness.issues.join("; ")}`, 116)
      : [];
    const detailLines = [
      `Publication date: ${publicationDateText}`,
      `Topic: ${formatTopics(record)}`,
    ].flatMap((line) => wrapPdfText(line, 116))
      .concat(annualReportLines, readinessLines);
    const linkLines = [
      cleanDoi(record.doi) ? "doi" : "",
      publicationHref(record) ? "publication" : "",
      record.ostiUrl ? "osti" : "",
    ].filter(Boolean).length;
    const blockHeight = titleLines.length * 12 + detailLines.length * 10 + 39 + linkLines * 12;

    if (y - blockHeight < 62) {
      finishPage();
      startPage();
    }

    titleLines.forEach((line) => {
      addText(48, y, line, 9.5, "F2");
      y -= 12;
    });

    const meta = [
      record.year || "Unknown year",
      formatProgramAreas(record),
      lifecycleStage(record),
      publicationRole(record),
      record.authors?.length ? formatAuthors(record.authors) : record.lead || "Lead TBD",
      record.venue || "Journal TBD",
    ].join(" | ");
    addText(60, y, truncate(meta, 118), 8);
    y -= 12;

    detailLines.forEach((line) => {
      addText(60, y, truncate(line, 124), 8);
      y -= 10;
    });

    const doi = cleanDoi(record.doi);
    if (doi) {
      addLinkText(60, y, `DOI: ${doi}`, `https://doi.org/${doi}`);
      y -= 12;
    }

    const publicationLink = publicationHref(record);
    if (publicationLink) {
      addLinkText(60, y, `${record.pdfUrl ? "Publisher PDF" : "Publisher article/DOI"}: ${publicationLink}`, publicationLink);
      y -= 12;
    }

    if (record.ostiUrl) {
      addLinkText(60, y, `OSTI: ${record.ostiId || record.ostiUrl}`, record.ostiUrl);
      y -= 12;
    }

    y -= 9;
  });

  finishPage();

  objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
  objects[pagesId - 1] = `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((content, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${content}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new Blob([pdf], { type: "application/pdf" });
}

function buildPdfReport(rows) {
  const columns = [
    ["Group", 48],
    ["Rec", 205],
    ["Pri", 232],
    ["Sec", 258],
    ["Un", 284],
    ["Pub", 315],
    ["Pipe", 344],
    ["Draft", 378],
    ["Review", 415],
    ["Press", 462],
    ["No DOI", 505],
    ["No date", 538],
    ["Work", 575],
  ];
  const rowHeight = 15;
  const firstY = 690;
  const bottomY = 54;
  const rowsPerPage = Math.max(1, Math.floor((firstY - bottomY) / rowHeight));
  const pages = [];
  for (let index = 0; index < rows.length || index === 0; index += rowsPerPage) {
    pages.push(rows.slice(index, index + rowsPerPage));
  }

  const objects = [];
  const addObject = (content) => {
    objects.push(content);
    return objects.length;
  };

  const catalogId = addObject("");
  const pagesId = addObject("");
  const fontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const pageIds = [];

  pages.forEach((pageRows, pageIndex) => {
    const lines = [];
    const addText = (x, y, text, size = 9) => {
      lines.push(`BT /F1 ${size} Tf ${x} ${y} Td (${pdfText(text)}) Tj ET`);
    };
    addText(48, 760, "ICoM Publication Report", 16);
    addText(48, 742, reportLabel(els.reportGroupSelect.value), 10);
    addText(48, 727, `${reportScopeLabel()} | ${reportFocusLabel(els.reportFocusSelect.value)}`, 9);
    addText(430, 760, new Date().toLocaleDateString(), 9);
    columns.forEach(([label, x]) => addText(x, 705, label, 8));
    pageRows.forEach((row, rowIndex) => {
      const y = firstY - rowIndex * rowHeight;
      const values = [
        truncate(row.label, 34),
        row.count,
        row.primary,
        row.secondary,
        row.unassignedRole,
        row.published,
        row.pipelineTotal,
        row.drafting,
        row.submittedInReview,
        row.acceptedInPress,
        row.missingDoi,
        row.missingPublicationDate,
        row.needsWork,
      ];
      columns.forEach(([, x], colIndex) => addText(x, y, values[colIndex], 8));
    });
    addText(520, 28, `Page ${pageIndex + 1} of ${pages.length}`, 8);
    const stream = lines.join("\n");
    const contentId = addObject(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
    const pageId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`);
    pageIds.push(pageId);
  });

  objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
  objects[pagesId - 1] = `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>`;

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((content, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${content}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new Blob([pdf], { type: "application/pdf" });
}

function excelXmlEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function pdfText(value) {
  return String(value ?? "")
    .replace(/[^\x20-\x7E]/g, "-")
    .replaceAll("\\", "\\\\")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)");
}

function truncate(value, limit) {
  const text = String(value ?? "");
  return text.length > limit ? `${text.slice(0, limit - 1)}...` : text;
}

function lifecycleStage(record) {
  const status = normaliseStatus(record.status);
  if (status === "Published / Indexed" || record.published || record.indexed) return "Published / Indexed";
  if (status === "Accepted / In press" || record.onlineFirst || record.accepted) return "Accepted / In press";
  if (status === "Submitted / In review" || record.submitted) return "Submitted / In review";
  return "Drafting";
}

function isManuscriptPipelineRecord(record) {
  return unpublishedLifecycleStages.includes(lifecycleStage(record));
}

function fiscalYearForRecord(record) {
  const dateValue = primaryFiscalDate(record);
  if (dateValue) return fiscalYearFromDate(dateValue);
  return record.year ? String(record.year) : "";
}

function primaryFiscalDate(record) {
  return [record.published, record.onlineFirst, record.accepted, record.submitted, record.due]
    .map(isoDate)
    .find(Boolean) || (record.year ? `${record.year}-01-01` : "");
}

function fiscalYearFromDate(value) {
  const date = isoDate(value);
  if (!date) return "";
  const [year, month] = date.split("-").map(Number);
  return String(month >= 10 ? year + 1 : year);
}

function formatFiscalYear(value) {
  return value ? `FY${value}` : "Unknown";
}

function renderLifecycleDates(record) {
  const dates = [
    ["Submitted", record.submitted],
    ["Accepted", record.accepted],
    ["Online first", record.onlineFirst],
    ["Published", record.published],
    ["Indexed", record.indexed],
  ].filter(([, value]) => value);
  if (!dates.length) return "";
  const text = dates.map(([label, value]) => `${escapeHtml(label)} ${formatDate(value)}`).join(" | ");
  return `<span><b>Dates:</b> ${text}</span>`;
}

async function handlePdfFiles(fileList) {
  const selectedFiles = [...(fileList || [])];
  if (!selectedFiles.length) {
    setPdfDropStatus("No file was detected. Use Choose PDFs if dragging from email or Teams does not work.");
    return;
  }

  const files = selectedFiles.filter((file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"));
  const skipped = selectedFiles.length - files.length;
  if (!files.length) {
    setPdfDropStatus(`No PDF was detected in ${selectedFiles.length} selected file${selectedFiles.length === 1 ? "" : "s"}.`);
    return;
  }

  setPdfDropStatus(`Reading ${files.length} PDF${files.length === 1 ? "" : "s"}`);
  let failed = 0;
  for (const file of files) {
    try {
      intakeDrafts.unshift(await extractPdfDraft(file));
    } catch (error) {
      failed += 1;
      intakeDrafts.unshift(makePdfErrorDraft(file, error));
    }
  }
  els.pdfFileInput.value = "";
  const parts = [
    `${files.length} candidate record${files.length === 1 ? "" : "s"} created`,
    failed ? `${failed} with extraction warnings` : "",
    skipped ? `${skipped} non-PDF file${skipped === 1 ? "" : "s"} skipped` : "",
    "review before adding",
  ].filter(Boolean);
  setPdfDropStatus(parts.join("; "));
  renderIntakeDrafts();
}

function setPdfDropStatus(message) {
  const status = els.pdfDropZone?.querySelector("span");
  if (status) status.textContent = message;
}

function renderIntakeDrafts() {
  if (!intakeDrafts.length) {
    els.intakeMount.innerHTML = "";
    return;
  }

  els.intakeMount.innerHTML = intakeDrafts
    .map((draft, index) => {
      const duplicate = findDuplicateRecord(draft);
      return `
        <article class="intake-card">
          <h4>${escapeHtml(draft.title || "Untitled PDF")}</h4>
          <dl>
            <dt>File</dt><dd>${escapeHtml(draft.fileName || "PDF")}</dd>
            <dt>Status</dt><dd>${escapeHtml(draft.status || "Drafting")}</dd>
            <dt>Journal</dt><dd>${escapeHtml(draft.venue || "TBD")}</dd>
            <dt>Role</dt><dd>${escapeHtml(publicationRole(draft))}</dd>
            <dt>Acknowledgement</dt><dd>${escapeHtml(acknowledgementReview(draft).status)}</dd>
            <dt>Lead</dt><dd>${escapeHtml(draft.lead || "Unassigned")}</dd>
            <dt>Authors</dt><dd>${escapeHtml(formatAuthors(draft.authors) || "Missing")}</dd>
            <dt>Check</dt><dd>${escapeHtml(draft.authorAudit || "Pending")}</dd>
            <dt>DOI</dt><dd>${escapeHtml(draft.doi || "Missing")}</dd>
            ${draft.notes ? `<dt>Extraction</dt><dd>${escapeHtml(truncate(draft.notes, 360))}</dd>` : ""}
          </dl>
          ${duplicate ? renderDuplicateIntakeWarning(duplicate) : ""}
          <div class="intake-actions">
            <button class="ghost-button" data-review-draft="${index}">Review</button>
            <button class="command-button" data-add-draft="${index}">Add record</button>
            <button class="ghost-button danger" data-remove-draft="${index}">Remove</button>
          </div>
        </article>
      `;
    })
    .join("");

  els.intakeMount.querySelectorAll("[data-review-draft]").forEach((button) => {
    button.addEventListener("click", () => openRecordDialog({ ...intakeDrafts[Number(button.dataset.reviewDraft)], id: "" }));
  });
  els.intakeMount.querySelectorAll("[data-add-draft]").forEach((button) => {
    button.addEventListener("click", () => addPdfDraft(Number(button.dataset.addDraft)));
  });
  els.intakeMount.querySelectorAll("[data-remove-draft]").forEach((button) => {
    button.addEventListener("click", () => {
      intakeDrafts.splice(Number(button.dataset.removeDraft), 1);
      renderIntakeDrafts();
    });
  });
}

function renderDuplicateIntakeWarning(duplicate) {
  return `
    <div class="duplicate-warning compact">
      <div>
        <strong>Potential duplicate</strong>
        <span>${escapeHtml(duplicateSummary(duplicate))}</span>
      </div>
    </div>
  `;
}

function addPdfDraft(index) {
  const draft = intakeDrafts[index];
  if (!draft) return;
  const record = normaliseRecord({
    ...draft,
    id: `pdf-${crypto.randomUUID()}`,
    updated: new Date().toISOString(),
  });
  const duplicate = findDuplicateRecord(record);
  if (duplicate && !confirmDuplicateSave(duplicate)) return;
  records = mergeRecords(records, [record]);
  if (!persist()) return;
  intakeDrafts.splice(index, 1);
  renderIntakeDrafts();
  render();
}

function findMatchingRecord(candidate) {
  const doi = cleanDoi(candidate.doi);
  if (doi) {
    const byDoi = records.find((record) => cleanDoi(record.doi).toLowerCase() === doi.toLowerCase());
    if (byDoi) return byDoi;
  }
  const title = candidate.title || "";
  if (!title) return null;
  return records
    .map((record) => ({ record, score: titleScore(record.title, title) }))
    .filter(({ score }) => score >= 0.62)
    .sort((a, b) => b.score - a.score)[0]?.record || null;
}

function findDuplicateRecord(candidate, excludeId = "") {
  const candidateDoi = duplicateDoi(candidate);
  const pool = records.filter((record) => record.id !== excludeId);
  if (candidateDoi) {
    const byDoi = pool.find((record) => duplicateDoi(record).toLowerCase() === candidateDoi.toLowerCase());
    if (byDoi) return { record: byDoi, reason: `DOI ${candidateDoi} already exists`, confidence: "exact" };
  }

  const title = normaliseDuplicateTitle(candidate.title);
  if (title.length < 18) return null;
  const exactTitle = pool.find((record) => normaliseDuplicateTitle(record.title) === title);
  if (exactTitle) return { record: exactTitle, reason: "Title already exists", confidence: "exact" };

  const likelyTitle = pool
    .map((record) => ({ record, score: titleScore(record.title, candidate.title) }))
    .filter(({ score }) => score >= 0.9)
    .sort((a, b) => b.score - a.score)[0];
  return likelyTitle
    ? { record: likelyTitle.record, reason: `Title is ${Math.round(likelyTitle.score * 100)}% similar`, confidence: "likely" }
    : null;
}

function duplicateDoi(record) {
  return cleanDoi(record?.doi) || cleanDoi(findDoi([record?.url, record?.pdfUrl].filter(Boolean).join(" ")));
}

function normaliseDuplicateTitle(value) {
  return normalise(value).replace(/[^a-z0-9]+/g, " ").trim();
}

function duplicateSummary(duplicate) {
  if (!duplicate?.record) return "";
  const record = duplicate.record;
  const bits = [
    duplicate.reason,
    record.title ? `"${record.title}"` : "",
    record.doi ? `DOI ${record.doi}` : "",
    record.year ? String(record.year) : "",
  ].filter(Boolean);
  return bits.join(" · ");
}

function confirmDuplicateSave(duplicate) {
  return window.confirm(
    `This looks like a duplicate publication.\n\n${duplicateSummary(duplicate)}\n\nCancel to review the existing record, or OK to save this as a separate record.`
  );
}

async function extractPdfDraft(file) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const raw = bytesToBinaryString(bytes);
  const metadata = {
    title: readPdfInfo(raw, "Title"),
    author: readPdfInfo(raw, "Author"),
  };
  const streamText = await extractPdfStreamText(bytes, raw);
  const literalText = extractPdfLiteralText(raw);
  const text = cleanExtractedText([metadata.title, metadata.author, streamText, literalText].filter(Boolean).join("\n"));
  const lines = meaningfulLines(text);
  const doi = findDoi(text) || findDoi(raw);
  const title = choosePdfTitle(metadata.title, lines, file.name);
  const authors = choosePdfAuthors(metadata.author, lines, title);
  const lead = authors[0] || choosePdfLead(metadata.author, lines, title);
  const journal = choosePdfJournal(lines, title);
  const submitted = findContextDate(text, ["submitted", "received"]);
  const accepted = findContextDate(text, ["accepted"]);
  const onlineFirst = findContextDate(text, ["published online", "online first"]);
  const published = onlineFirst || findContextDate(text, ["published", "publication date"]);
  const status = inferPdfStatus({ doi, submitted, accepted, onlineFirst, published, text });
  const year = yearFromDates([published, onlineFirst, accepted, submitted]) || findYear(text) || new Date().getFullYear();
  const acknowledgement = acknowledgementReview({
    acknowledgementText: text,
    source: `PDF upload: ${file.name}`,
    tags: ["PDF intake"],
  });
  const role = "Unassigned";
  const missing = [
    !title && "title",
    !doi && "DOI",
    !journal && "journal",
    !lead && "lead author",
    !authors.length && "authors",
  ].filter(Boolean);
  const matchingRecord = findMatchingRecord({ doi, title });
  const authorAudit = matchingRecord ? authorAuditStatus(matchingRecord.lead, authors) : authorAuditStatus(lead, authors);
  const matchNote = matchingRecord && authorAudit.startsWith("Review")
    ? `Existing tracker lead "${matchingRecord.lead || "Unassigned"}" does not match extracted document authors: ${authors.join("; ")}. `
    : "";

  let draft = normaliseRecord({
    id: "",
    title: title || file.name.replace(/\.pdf$/i, ""),
    year,
    status,
    verification: "Candidate",
    visibility: "Project team",
    lead,
    authors,
    venue: journal,
    type: "Journal Article",
    publicationRole: role,
    topic: inferPdfTopic(title || text),
    due: "",
    submitted,
    accepted,
    onlineFirst,
    published,
    indexed: "",
    doi,
    url: doi ? `https://doi.org/${doi}` : "",
    verified: dateSlug(),
    source: `PDF upload: ${file.name}`,
    tags: tagsWithPublicationRole(["PDF intake", `Acknowledgement: ${acknowledgement.status}`], role),
    action: "Review extracted PDF metadata and complete journal lifecycle dates.",
    authorAudit,
    acknowledgementStatus: acknowledgement.status,
    acknowledgementText: acknowledgement.excerpt,
    metadataStatus: appendUnique("PDF intake extraction", `Acknowledgement: ${acknowledgement.status}`),
    reviewFlag: acknowledgement.primarySupported ? "Confirm primary publication role" : acknowledgement.needsReview ? "Acknowledgement check" : "",
    notes: `Extracted from PDF intake. ${matchNote}${acknowledgement.primarySupported ? "Acknowledgement suggests ICoM primary support; confirm the publication role before reporting. " : ""}${acknowledgement.needsReview ? "Review acknowledgement section for ICoM primary support. " : ""}${missing.length ? `Missing: ${missing.join(", ")}. ` : ""}Text-based extraction may miss scanned or heavily encoded PDFs.`,
    fileName: file.name,
  });

  if (doi) {
    try {
      const crossrefPatch = await lookupCrossrefRecord(draft);
      if (crossrefPatch) {
        draft = normaliseRecord({
          ...draft,
          ...crossrefPatch,
          id: "",
          verification: "Candidate",
          visibility: "Project team",
          source: appendUnique(draft.source, "Crossref DOI lookup"),
          metadataStatus: appendUnique(crossrefPatch.metadataStatus || draft.metadataStatus, "Crossref DOI lookup during PDF intake"),
          notes: appendUnique(
            crossrefPatch.notes || draft.notes,
            "Crossref metadata was applied from the DOI found in the PDF; review before adding."
          ),
          fileName: file.name,
        });
      }
    } catch (error) {
      draft = normaliseRecord({
        ...draft,
        id: "",
        verification: "Candidate",
        notes: appendUnique(draft.notes, `Crossref DOI lookup did not complete: ${error.message || error}.`),
        fileName: file.name,
      });
    }
  }

  return draft;
}

function makePdfErrorDraft(file, error) {
  return normaliseRecord({
    id: "",
    title: file.name.replace(/\.pdf$/i, ""),
    year: new Date().getFullYear(),
    status: "Drafting",
    verification: "Candidate",
    visibility: "Project team",
    lead: "",
    authors: [],
    venue: "",
    type: "Journal Article",
    topic: "Unassigned / Needs topic review",
    source: `PDF upload: ${file.name}`,
    publicationRole: "Unassigned",
    tags: ["PDF intake", "Acknowledgement: Needs acknowledgement check"],
    action: "Enter publication metadata manually after PDF extraction failed.",
    authorAudit: "Review: document text unreadable",
    acknowledgementStatus: "Needs acknowledgement check",
    reviewFlag: "Acknowledgement check",
    notes: `PDF extraction failed: ${error.message || error}`,
    fileName: file.name,
  });
}

function bytesToBinaryString(bytes) {
  const chunks = [];
  for (let index = 0; index < bytes.length; index += 8192) {
    chunks.push(String.fromCharCode(...bytes.subarray(index, index + 8192)));
  }
  return chunks.join("");
}

function readPdfInfo(raw, key) {
  const match = raw.match(new RegExp(`/${key}\\s*(\\((?:\\\\.|[^\\\\)])*\\)|<([0-9A-Fa-f\\s]+)>)`));
  if (!match) return "";
  return cleanPdfString(match[1] || match[2] || "");
}

function extractPdfLiteralText(raw) {
  const values = [];
  const regex = /\((?:\\.|[^\\()]){2,500}\)/g;
  let match;
  while ((match = regex.exec(raw)) && values.length < 1200) {
    const text = cleanPdfString(match[0]);
    if (isUsefulText(text)) values.push(text);
  }
  return values.join("\n");
}

async function extractPdfStreamText(bytes, raw) {
  const values = [];
  let cursor = 0;
  let streamCount = 0;
  while (streamCount < 80) {
    const streamIndex = raw.indexOf("stream", cursor);
    if (streamIndex < 0) break;
    const endIndex = raw.indexOf("endstream", streamIndex);
    if (endIndex < 0) break;
    const headerStart = Math.max(0, raw.lastIndexOf("<<", streamIndex));
    const header = raw.slice(headerStart, streamIndex);
    let dataStart = streamIndex + 6;
    if (raw[dataStart] === "\r" && raw[dataStart + 1] === "\n") dataStart += 2;
    else if (raw[dataStart] === "\n") dataStart += 1;
    let dataEnd = endIndex;
    if (raw[dataEnd - 2] === "\r" && raw[dataEnd - 1] === "\n") dataEnd -= 2;
    else if (raw[dataEnd - 1] === "\n") dataEnd -= 1;
    const streamBytes = bytes.slice(dataStart, dataEnd);
    const decoded = header.includes("/FlateDecode") ? await inflatePdfStream(streamBytes) : streamBytes;
    if (decoded) values.push(extractPdfLiteralText(bytesToBinaryString(decoded)));
    cursor = endIndex + 9;
    streamCount += 1;
  }
  return values.join("\n");
}

async function inflatePdfStream(streamBytes) {
  if (!("DecompressionStream" in window)) return null;
  for (const format of ["deflate", "deflate-raw"]) {
    try {
      const ds = new DecompressionStream(format);
      const decompressed = await new Response(new Blob([streamBytes]).stream().pipeThrough(ds)).arrayBuffer();
      return new Uint8Array(decompressed);
    } catch {}
  }
  return null;
}

function cleanPdfString(value) {
  const raw = String(value || "");
  if (raw.startsWith("<")) return decodePdfHex(raw);
  return raw
    .replace(/^\(|\)$/g, "")
    .replace(/\\([nrtbf()\\])/g, (_, char) => ({ n: "\n", r: "\r", t: "\t", b: "", f: "", "(": "(", ")": ")", "\\": "\\" }[char] || char))
    .replace(/\\([0-7]{1,3})/g, (_, octal) => String.fromCharCode(parseInt(octal, 8)))
    .trim();
}

function decodePdfHex(value) {
  const hex = String(value || "").replace(/[<>\s]/g, "");
  const bytes = [];
  for (let index = 0; index < hex.length - 1; index += 2) {
    bytes.push(parseInt(hex.slice(index, index + 2), 16));
  }
  if (bytes[0] === 0xfe && bytes[1] === 0xff) {
    let text = "";
    for (let index = 2; index < bytes.length - 1; index += 2) text += String.fromCharCode((bytes[index] << 8) + bytes[index + 1]);
    return text.trim();
  }
  return String.fromCharCode(...bytes).trim();
}

function cleanExtractedText(text) {
  return String(text || "")
    .replace(/\u0000/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .trim();
}

function meaningfulLines(text) {
  const seen = new Set();
  return String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => isUsefulText(line))
    .filter((line) => {
      const key = normalise(line);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function isUsefulText(text) {
  const value = String(text || "").trim();
  if (value.length < 3 || value.length > 260) return false;
  const printable = value.replace(/[^\x20-\x7E]/g, "").length / value.length;
  return printable > 0.68 && !/^(cid:|http:\/\/|https:\/\/)$/i.test(value);
}

function findDoi(text) {
  const match = String(text || "").match(/\b10\.\d{4,9}\/[-._;()/:A-Z0-9]+\b/i);
  return match ? match[0].replace(/[).,;:]+$/, "") : "";
}

function choosePdfTitle(metadataTitle, lines, fileName) {
  const meta = String(metadataTitle || "").trim();
  if (meta && !/^(microsoft word|untitled|document)$/i.test(meta) && !meta.toLowerCase().includes(fileName.toLowerCase())) {
    return meta;
  }
  return (
    lines.find((line) =>
      line.length > 24 &&
      line.length < 190 &&
      !looksLikeUrlLine(line) &&
      !/doi|abstract|copyright|downloaded|journal|volume|issue|accepted|published/i.test(line)
    ) || ""
  );
}

function choosePdfLead(metadataAuthor, lines, title) {
  const meta = String(metadataAuthor || "").trim();
  if (meta && !/^(author|anonymous)$/i.test(meta)) return firstAuthor(meta);
  const candidate = lines
    .slice(0, 30)
    .find((line) => line !== title && /[,;]/.test(line) && !/doi|abstract|journal|published|accepted|copyright/i.test(line));
  return candidate ? firstAuthor(candidate) : "";
}

function choosePdfAuthors(metadataAuthor, lines, title) {
  const meta = String(metadataAuthor || "").trim();
  if (meta && !/^(author|anonymous)$/i.test(meta)) return splitAuthorLine(meta);
  const candidate = lines
    .slice(0, 35)
    .find((line) => line !== title && /[,;]|\band\b/i.test(line) && !/doi|abstract|journal|published|accepted|copyright|volume|issue/i.test(line));
  return candidate ? splitAuthorLine(candidate) : [];
}

function splitAuthorLine(value) {
  const text = String(value || "")
    .replace(/\d+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return [];
  if (text.includes(";")) return text.split(";").map(cleanAuthorName).filter(Boolean).slice(0, 20);
  const andParts = text.split(/\s+\band\b\s+/i).map(cleanAuthorName).filter(Boolean);
  if (andParts.length > 1) return andParts.slice(0, 20);
  return text.split(/\s*,\s*(?=[A-Z][a-z]+(?:\s+[A-Z]\.?)?(?:\s|$))/).map(cleanAuthorName).filter(Boolean).slice(0, 20);
}

function cleanAuthorName(value) {
  return String(value || "")
    .replace(/\([^)]*\)/g, "")
    .replace(/\[[^\]]*\]/g, "")
    .replace(/[*†‡§]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function firstAuthor(value) {
  return splitAuthorLine(value)[0] || "";
}

function choosePdfJournal(lines, title) {
  return (
    lines
      .slice(0, 100)
      .find((line) =>
        line !== title &&
        line.length < 110 &&
        !looksLikeUrlLine(line) &&
        /journal|letters|nature|science|proceedings|transactions|research|hydrology|water resources|earth system|climatic|geophysical|environment|frontiers|communications/i.test(line)
      ) || ""
  );
}

function looksLikeUrlLine(value) {
  return /^https?:\/\//i.test(String(value || "").trim());
}

function findContextDate(text, labels) {
  const datePattern = "([A-Z][a-z]+\\s+\\d{1,2},?\\s+\\d{4}|\\d{4}-\\d{1,2}-\\d{1,2}|\\d{1,2}/\\d{1,2}/\\d{2,4})";
  for (const label of labels) {
    const match = String(text || "").match(new RegExp(`${escapeRegex(label)}[\\s\\S]{0,100}?${datePattern}`, "i"));
    if (match) return parseLooseDate(match[1]);
  }
  return "";
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseLooseDate(value) {
  const text = String(value || "").trim();
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(text)) {
    const [year, month, day] = text.split("-");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

function inferPdfStatus({ doi, submitted, accepted, onlineFirst, published, text }) {
  const lower = normalise(text);
  const mentionsAccepted = Boolean(accepted) || /\baccepted\b/.test(lower);
  const mentionsPublished = /\bpublished\b|\bpublication date\b/.test(lower);
  if (published && !mentionsAccepted) return "Published / Indexed";
  if (onlineFirst) return "Accepted / In press";
  if (/in press/.test(lower)) return "Accepted / In press";
  if (mentionsAccepted && !mentionsPublished) return "Accepted / In press";
  if (accepted) return "Accepted / In press";
  if (published) return "Published / Indexed";
  if (/revision requested|revise and resubmit|major revision|minor revision|revisions? requested/.test(lower)) return "Submitted / In review";
  if (/under review|peer review/.test(lower)) return "Submitted / In review";
  if (submitted) return "Submitted / In review";
  if (doi) return "Published / Indexed";
  return "Drafting";
}

function yearFromDates(values) {
  const value = values.find(Boolean);
  return value ? Number(value.slice(0, 4)) : 0;
}

function findYear(text) {
  const match = String(text || "").match(/\b(20[0-3]\d|19[8-9]\d)\b/);
  return match ? Number(match[1]) : 0;
}

function inferPdfTopic(text) {
  const lower = normalise(text);
  if (/flood|surge|hurricane|cyclone|sea level|coastal|estuar|inundat/.test(lower)) return "Coastal flooding";
  if (/urban|heat stress|irrigation|land/.test(lower)) return "Urban adaptation";
  if (/population|mobility|migration|household/.test(lower)) return "Human mobility";
  if (/equity|exposure/.test(lower)) return "Equity and exposure";
  if (/power|energy|wind/.test(lower)) return "Energy-water systems";
  if (/precipitation|drought|extreme|climate/.test(lower)) return "Climate extremes";
  return "Unassigned / Needs topic review";
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {}
  }

  const input = document.createElement("textarea");
  input.value = text;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.append(input);
  input.select();
  document.execCommand("copy");
  input.remove();
}

function openRecordDialog(record = null) {
  if (!canEditRecords()) return;
  els.dialogTitle.textContent = record ? "Edit record" : "New record";
  els.deleteButton.hidden = !record || !canManageAccess();

  const draft = record || {
    id: "",
    title: "",
    year: new Date().getFullYear(),
    status: "Drafting",
    verification: "Candidate",
    lead: "",
    venue: "",
    type: "Journal article",
    programAreas: "",
    topic: "Unassigned / Needs topic review",
    topics: ["Unassigned / Needs topic review"],
    due: "",
    submitted: "",
    accepted: "",
    onlineFirst: "",
    published: "",
    indexed: "",
    annualReports: [],
    doi: "",
    url: "",
    pdfUrl: "",
    verified: "",
    verifiedBy: REVIEWER_NAME,
    source: "Manual entry",
    tags: [],
    action: "",
    notes: "",
    excludeFromReports: false,
    exclusionReason: "",
  };

  els.fields.id.value = draft.id;
  els.fields.title.value = draft.title;
  els.fields.year.value = draft.year;
  els.fields.status.value = draft.status;
  els.fields.verification.value = draft.verification || "Needs verification";
  els.fields.visibility.value = draft.visibility || inferDefaultVisibility(draft);
  els.fields.lead.value = draft.lead || "";
  els.fields.authors.value = formatAuthors(draft.authors);
  els.fields.venue.value = draft.venue || "";
  els.fields.type.value = draft.type || publicationTypes[0];
  els.fields.publicationRole.value = publicationRole(draft);
  setProgramAreaSelection(draft);
  setTopicSelection(draft);
  els.fields.due.value = draft.due || "";
  els.fields.submitted.value = draft.submitted || "";
  els.fields.accepted.value = draft.accepted || "";
  els.fields.onlineFirst.value = draft.onlineFirst || "";
  els.fields.published.value = draft.published || "";
  els.fields.indexed.value = draft.indexed || "";
  els.fields.doi.value = draft.doi || "";
  els.fields.url.value = draft.url || "";
  els.fields.pdfUrl.value = draft.pdfUrl || "";
  els.fields.verified.value = draft.verified || "";
  els.fields.verifiedBy.value = draft.verifiedBy || "";
  els.fields.source.value = draft.source || "";
  els.fields.tags.value = (draft.tags || []).join(", ");
  els.fields.action.value = draft.action || "";
  els.fields.notes.value = draft.notes || "";
  els.fields.excludeFromReports.checked = Boolean(draft.excludeFromReports);
  els.fields.exclusionReason.value = draft.exclusionReason || "";
  renderAnnualReportRows(draft.annualReports || []);
  els.fields.visibility.closest("label").hidden = !canManageAccess();
  els.fields.excludeFromReports.closest("label").hidden = !canManageAccess();
  els.fields.exclusionReason.closest("label").hidden = !canManageAccess();

  updateFormGuidance();
  els.recordDialog.showModal();
  els.fields.title.focus();
}

function renderAnnualReportRows(reports) {
  els.annualReportsList.innerHTML = "";
  normaliseAnnualReports(reports).forEach((report) => addAnnualReportRow(report));
}

function addAnnualReportRow(report = {}) {
  const row = document.createElement("div");
  row.className = "annual-report-row";
  row.innerHTML = `
    <label>
      <span>Fiscal year</span>
      <input data-annual-report-field="fiscalYear" maxlength="8" placeholder="FY25" value="${escapeAttribute(report.fiscalYear || "")}" />
    </label>
    <label>
      <span>Status at report</span>
      <select data-annual-report-field="statusAtReport">
        ${annualReportStatusOptions.map((status) => `<option value="${escapeAttribute(status)}" ${normaliseAnnualReportStatus(report.statusAtReport) === status ? "selected" : ""}>${escapeHtml(status)}</option>`).join("")}
      </select>
    </label>
    <label>
      <span>Notes</span>
      <input data-annual-report-field="notes" maxlength="180" value="${escapeAttribute(report.notes || "")}" />
    </label>
    <button class="mini-button" type="button" data-remove-annual-report title="Remove annual-report entry" aria-label="Remove annual-report entry">X</button>
  `;
  els.annualReportsList.append(row);
}

function annualReportsFromForm() {
  return [...els.annualReportsList.querySelectorAll(".annual-report-row")]
    .map((row) => ({
      fiscalYear: row.querySelector('[data-annual-report-field="fiscalYear"]')?.value || "",
      statusAtReport: row.querySelector('[data-annual-report-field="statusAtReport"]')?.value || "",
      notes: row.querySelector('[data-annual-report-field="notes"]')?.value || "",
    }))
    .map((row) => ({
      fiscalYear: normaliseFiscalYearLabel(row.fiscalYear),
      statusAtReport: normaliseAnnualReportStatus(row.statusAtReport),
      notes: row.notes.trim(),
    }))
    .filter((row) => row.fiscalYear || row.notes);
}

function formDuplicateCandidate() {
  return {
    id: els.fields.id.value,
    title: els.fields.title.value.trim(),
    doi: els.fields.doi.value.trim(),
    url: els.fields.url.value.trim(),
    pdfUrl: els.fields.pdfUrl.value.trim(),
  };
}

function updateDuplicateWarning() {
  const duplicate = findDuplicateRecord(formDuplicateCandidate(), els.fields.id.value);
  renderDuplicateWarning(duplicate);
  return duplicate;
}

function formRecordDraft() {
  const formTopics = selectedTopics();
  return normaliseRecord({
    id: els.fields.id.value || "form-draft",
    title: els.fields.title.value.trim(),
    year: Number(els.fields.year.value) || new Date().getFullYear(),
    status: els.fields.status.value,
    verification: els.fields.verification.value,
    visibility: canManageAccess() ? els.fields.visibility.value : "Project team",
    lead: els.fields.lead.value.trim(),
    authors: parseAuthors(els.fields.authors.value),
    venue: els.fields.venue.value.trim(),
    type: els.fields.type.value,
    publicationRole: els.fields.publicationRole.value,
    programAreas: selectedProgramAreas(),
    topic: formTopics[0],
    topics: formTopics,
    due: els.fields.due.value,
    submitted: els.fields.submitted.value,
    accepted: els.fields.accepted.value,
    onlineFirst: els.fields.onlineFirst.value,
    published: els.fields.published.value,
    indexed: els.fields.indexed.value,
    annualReports: annualReportsFromForm(),
    doi: els.fields.doi.value.trim(),
    url: els.fields.url.value.trim(),
    pdfUrl: els.fields.pdfUrl.value.trim(),
    verified: els.fields.verified.value,
    verifiedBy: els.fields.verifiedBy.value.trim(),
    source: els.fields.source.value.trim() || "Manual entry",
    tags: tagsWithPublicationRole(
      els.fields.tags.value.split(",").map((tag) => tag.trim()).filter(Boolean),
      els.fields.publicationRole.value
    ),
    notes: els.fields.notes.value.trim(),
    excludeFromReports: canManageAccess() && els.fields.excludeFromReports.checked,
    exclusionReason: canManageAccess() ? els.fields.exclusionReason.value.trim() : "",
  });
}

function updateFormGuidance() {
  updateDuplicateWarning();
  const readiness = recordReadiness(formRecordDraft());
  els.readinessStatus.textContent = readiness.status;
  els.readinessSummary.textContent = readiness.excluded
    ? "Excluded from formal reports"
    : readiness.ready
      ? "All required checks pass"
      : `${readiness.issues.length} check${readiness.issues.length === 1 ? "" : "s"} need attention`;
  els.readinessChecklist.innerHTML = readiness.checks
    .map((check) => `<li class="${check.ok ? "is-ok" : "is-issue"}">${escapeHtml(check.label)}</li>`)
    .join("");
}

function renderDuplicateWarning(duplicate) {
  if (!duplicate) {
    els.duplicateWarning.hidden = true;
    els.openDuplicateButton.dataset.duplicateId = "";
    els.duplicateWarningText.textContent = "";
    return;
  }
  els.duplicateWarning.hidden = false;
  els.openDuplicateButton.dataset.duplicateId = duplicate.record.id;
  els.duplicateWarningText.textContent = duplicateSummary(duplicate);
}

function saveRecordFromForm() {
  if (!canEditRecords()) return;
  const now = new Date().toISOString();
  const id = els.fields.id.value || `record-${crypto.randomUUID()}`;
  const existing = records.find((record) => record.id === id) || {};
  const canAdmin = canManageAccess();
  const formTopics = selectedTopics();
  const nextRecord = normaliseRecord({
    ...existing,
    id,
    title: els.fields.title.value.trim(),
    year: Number(els.fields.year.value),
    status: els.fields.status.value,
    verification: els.fields.verification.value,
    visibility: canAdmin ? els.fields.visibility.value : existing.visibility || "Project team",
    lead: els.fields.lead.value.trim(),
    authors: parseAuthors(els.fields.authors.value),
    venue: els.fields.venue.value.trim(),
    type: els.fields.type.value,
    publicationRole: els.fields.publicationRole.value,
    programAreas: selectedProgramAreas(),
    topic: formTopics[0],
    topics: formTopics,
    due: els.fields.due.value,
    submitted: els.fields.submitted.value,
    accepted: els.fields.accepted.value,
    onlineFirst: els.fields.onlineFirst.value,
    published: els.fields.published.value,
    indexed: els.fields.indexed.value,
    annualReports: annualReportsFromForm(),
    doi: els.fields.doi.value.trim().replace(/^https?:\/\/doi.org\//i, ""),
    url: els.fields.url.value.trim(),
    pdfUrl: els.fields.pdfUrl.value.trim(),
    verified: els.fields.verified.value,
    verifiedBy: els.fields.verifiedBy.value.trim(),
    source: els.fields.source.value.trim() || "Manual entry",
    tags: tagsWithPublicationRole(
      els.fields.tags.value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      els.fields.publicationRole.value
    ),
    action: els.fields.action.value.trim(),
    notes: els.fields.notes.value.trim(),
    excludeFromReports: canAdmin ? els.fields.excludeFromReports.checked : Boolean(existing.excludeFromReports),
    exclusionReason: canAdmin ? els.fields.exclusionReason.value.trim() : existing.exclusionReason || "",
    localEdited: true,
    localEditedAt: now,
    localEditedBy: REVIEWER_NAME,
    updated: now,
  });

  const duplicate = findDuplicateRecord(nextRecord, id);
  if (duplicate && !confirmDuplicateSave(duplicate)) {
    renderDuplicateWarning(duplicate);
    return;
  }

  const index = records.findIndex((record) => record.id === id);
  if (index >= 0) records.splice(index, 1, nextRecord);
  else records.unshift(nextRecord);
  records = dedupeRecords(records);

  if (!persist()) return;
  els.recordDialog.close();
  render();
}

function resetFilters() {
  els.searchInput.value = "";
  els.statusFilter.value = "";
  els.topicFilter.value = "";
  els.programAreaFilter.value = "";
  els.publicationRoleFilter.value = "";
  els.yearFilter.value = "";
  els.fiscalYearFilter.value = "";
  els.sortSelect.value = "updated-desc";
  els.reportProgramAreaSelect.value = "";
  els.reportPublicationRoleSelect.value = "";
  els.reportGroupSelect.value = "programAreas";
  els.reportFocusSelect.value = "all";
  render();
}

function downloadJson(list) {
  downloadFile(`icom-publications-${dateSlug()}.json`, JSON.stringify(list, null, 2), "application/json");
  setPersistenceNotice("success", `Exported ${list.length} records. Use this JSON to update the deployed tracker data.`);
}

function downloadDrupalAudit() {
  const rows = buildDrupalAuditRows(records);
  const columns = [
    "auditStatus",
    "title",
    "year",
    "status",
    "visibility",
    "lead",
    "authors",
    "journal",
    "doi",
    "url",
    "pdfUrl",
    "source",
    "notes",
  ];
  const lines = [
    columns.join(","),
    ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(",")),
  ];
  const suffix = rows.length ? `${rows.length}-missing` : "none-missing";
  downloadFile(`icom-drupal-audit-${suffix}-${dateSlug()}.csv`, lines.join("\n"), "text/csv");
  if (els.databaseStatus) {
    els.databaseStatus.textContent = rows.length
      ? `${rows.length} current tracker record${rows.length === 1 ? "" : "s"} not found on the Drupal reference.`
      : "Drupal audit complete: no current tracker records are missing from the Drupal reference.";
  }
}

function buildDrupalAuditRows(list) {
  const drupalKeys = new Set(drupalRecords.map(recordKey));
  const sourceKeys = new Set(defaultRecords.map(recordKey));
  return dedupeRecords(list)
    .filter((record) => !drupalKeys.has(recordKey(record)))
    .map((record) => {
      const localOnly = !sourceKeys.has(recordKey(record));
      return {
        auditStatus: localOnly ? "Local-only record not found on Drupal" : "Source record not found on Drupal",
        title: record.title,
        year: record.year,
        status: record.status,
        visibility: record.visibility,
        lead: record.lead,
        authors: formatAuthors(record.authors),
        journal: record.venue,
        doi: record.doi,
        url: publicationHref(record) || record.url,
        pdfUrl: record.pdfUrl,
        source: record.source,
        notes: record.notes,
      };
    });
}

function downloadCsv(list) {
  const columns = [
    "title",
    "year",
    "fiscalYear",
    "status",
    "lifecycle",
    "verification",
    "visibility",
    "lead",
    "authors",
    "journal",
    "type",
    "publicationRole",
    "acknowledgementStatus",
    "topic",
    "topics",
    "due",
    "publicationDate",
    "submitted",
    "accepted",
    "onlineFirst",
    "published",
    "indexed",
    "verified",
    "verifiedBy",
    "reportReadiness",
    "readinessIssues",
    "annualReports",
    "excludeFromReports",
    "exclusionReason",
    "doi",
    "url",
    "pdfUrl",
    "linkStatus",
    "linkChecked",
    "ostiId",
    "ostiUrl",
    "doePagesUrl",
    "crossrefUrl",
    "programAreas",
    "authorAudit",
    "tags",
    "notes",
  ];
  const lines = [
    columns.join(","),
    ...list.map((record) =>
      columns
        .map((column) => {
          const value = columnValue(record, column);
          return `"${String(value).replaceAll('"', '""')}"`;
        })
        .join(",")
    ),
  ];
  downloadFile(`icom-publications-${dateSlug()}.csv`, lines.join("\n"), "text/csv");
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function columnValue(record, column) {
  if (column === "journal") return record.venue || "";
  if (column === "fiscalYear") return formatFiscalYear(fiscalYearForRecord(record));
  if (column === "lifecycle") return lifecycleStage(record);
  if (column === "publicationRole") return publicationRole(record);
  if (column === "acknowledgementStatus") return acknowledgementReview(record).status;
  if (column === "topic") return topicLabels(record)[0] || "";
  if (column === "topics") return formatTopics(record);
  if (column === "publicationDate") return record.published || "";
  if (column === "reportReadiness") return readinessStatusText(recordReadiness(record));
  if (column === "readinessIssues") return recordReadiness(record).issues.join("; ");
  if (column === "annualReports") return formatAnnualReports(record);
  const value = record[column];
  return Array.isArray(value) ? value.join("; ") : value || "";
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function importFile(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;

  const text = await file.text();
  let imported = [];
  if (file.name.toLowerCase().endsWith(".json")) {
    imported = JSON.parse(text);
  } else {
    imported = parseCsv(text);
  }

  const normalised = imported.map(normaliseRecord);

  records = mergeRecords(records, normalised);
  if (!persist()) return;
  render();
}

function parseCsv(text) {
  const [head, ...rows] = text.trim().split(/\r?\n/);
  const columns = splitCsvRow(head);
  return rows.map((row) => {
    const values = splitCsvRow(row);
    return Object.fromEntries(columns.map((column, index) => [column, values[index] || ""]));
  });
}

function splitCsvRow(row) {
  const values = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < row.length; index += 1) {
    const char = row[index];
    const next = row[index + 1];
    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current);
  return values;
}

function mergeRecords(existing, incoming) {
  return dedupeRecords([...existing, ...incoming]);
}

function dedupeRecords(list) {
  const map = new Map();
  const idToKey = new Map();
  list.forEach((record) => {
    const key = recordKey(record);
    const id = String(record.id || "").trim();
    const existingIdKey = id ? idToKey.get(id) : "";
    const effectiveKey = existingIdKey || key;
    const current = map.get(effectiveKey);
    if (!current || recordScore(record) >= recordScore(current)) {
      if (existingIdKey && existingIdKey !== key) map.delete(key);
      map.set(effectiveKey, record);
      if (id) idToKey.set(id, effectiveKey);
    }
  });
  return [...map.values()].sort((a, b) => Number(b.year) - Number(a.year) || a.title.localeCompare(b.title));
}

function recordKey(record) {
  if (record.doi) return `doi:${normalise(record.doi).replace(/^https?:\/\/doi.org\//, "")}`;
  return `title:${normalise(record.title).replace(/[^a-z0-9]+/g, "")}`;
}

function recordScore(record) {
  if (booleanValue(record.localEdited)) return 60;
  const source = normalise(record.source);
  if (source.includes("manual entry")) return 50;
  if (source.includes("inbox workbook")) return 45;
  if (source.includes("automation-ready workbook")) return 40;
  if (source.includes("eesm")) return 25;
  if (source.includes("stale")) return 10;
  return 20;
}

function makeEesmRecord([title, year, type, lead, venue, topic, date]) {
  return normaliseRecord({
    id: `eesm-${date}-${slugify(title)}`,
    title,
    year,
    status: "Indexed",
    verification: "Verified current",
    lead,
    venue,
    type,
    topic,
    due: "",
    verified: "2026-06-09",
    url: "https://eesm.science.energy.gov/publications?program=2&project=203852",
    source: "DOE EESM project publication list",
    tags: ["EESM", "ICoM", date],
    action: "Confirm DOI and final citation details before formal reporting.",
    notes: "Imported from DOE EESM ICoM project publication listing.",
    updated: "2026-06-09T12:00:00.000Z",
  });
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 72);
}

function normaliseRecord(item) {
  item = applyKnownCorrections(item || {});
  item = applySourceEnrichment(item);
  const looksLikeStaleWebsiteSeed =
    String(item.id || "").startsWith("seed-") ||
    String(item.url || "").includes("icom.pnnl.gov/publications");
  const parsedTags = Array.isArray(item.tags)
    ? item.tags.map((tag) => String(tag || "").trim()).filter(Boolean)
    : String(item.tags || "").split(/[;,]/).map((tag) => tag.trim()).filter(Boolean);
  const acknowledgement = acknowledgementReview({ ...item, tags: parsedTags });
  const resolvedPublicationRole = publicationRole({ ...item, tags: parsedTags });
  const metadataStatus = acknowledgement.primarySupported
    ? appendUnique(fixText(item.metadataStatus || ""), "Acknowledgement suggests ICoM primary support; publication role requires confirmation")
    : fixText(item.metadataStatus || "");
  let reviewFlag = acknowledgement.needsReview
    ? appendUnique(item.reviewFlag || "", "Acknowledgement check")
    : item.reviewFlag || "";
  if (acknowledgement.primarySupported && resolvedPublicationRole !== "Primary") {
    reviewFlag = appendUnique(reviewFlag, "Confirm primary publication role");
  }
  const resolvedTopics = normaliseTopics(item.topics || item.topic);
  if (needsTopicReview(item, resolvedTopics)) {
    reviewFlag = appendUnique(reviewFlag, "Topic review");
  }

  return {
    id: item.id || `record-${crypto.randomUUID()}`,
    title: fixText(item.title || ""),
    year: Number(item.year) || new Date().getFullYear(),
    status: normaliseStatus(item.status),
    verification: verificationStates.some((state) => state.value === item.verification)
      ? item.verification
      : looksLikeStaleWebsiteSeed
        ? "Stale source"
        : "Needs verification",
    visibility: normaliseVisibility(item.visibility, item),
    lead: fixText(item.lead || ""),
    authors: parseAuthors(item.authors),
    venue: fixText(item.venue || item.journal || ""),
    type: publicationTypes.includes(item.type) ? item.type : "Journal article",
    publicationRole: resolvedPublicationRole,
    topic: resolvedTopics[0] || "Unassigned / Needs topic review",
    topics: resolvedTopics,
    due: item.due || "",
    submitted: item.submitted || "",
    accepted: item.accepted || "",
    onlineFirst: item.onlineFirst || "",
    published: item.published || item.publicationDate || "",
    indexed: item.indexed || "",
    annualReports: normaliseAnnualReports(item.annualReports),
    verified: item.verified || "",
    verifiedBy: normaliseReviewerName(item.verifiedBy || ""),
    doi: String(item.doi || "").trim().replace(/^https?:\/\/doi.org\//i, ""),
    url: item.url || "",
    pdfUrl: item.pdfUrl || "",
    linkStatus: fixText(item.linkStatus || ""),
    linkChecked: item.linkChecked || "",
    source: fixText(item.source || (looksLikeStaleWebsiteSeed ? staleWebsiteSource : "Manual entry")),
    tags: tagsWithPublicationRole(parsedTags, resolvedPublicationRole),
    action: fixText(item.action || ""),
    notes: fixText(item.notes || ""),
    updated: item.updated || new Date().toISOString(),
    workbookId: item.workbookId || "",
    metadataStatus,
    reviewFlag: fixText(reviewFlag || ""),
    authorAudit: fixText(item.authorAudit || authorAuditStatus(item.lead, parseAuthors(item.authors))),
    programAreas: fixText(item.programAreas || ""),
    acknowledgementStatus: fixText(item.acknowledgementStatus || acknowledgement.status),
    acknowledgementText: fixText(item.acknowledgementText || acknowledgement.excerpt),
    excludeFromReports: booleanValue(item.excludeFromReports),
    exclusionReason: fixText(item.exclusionReason || ""),
    sourceRecord: fixText(item.sourceRecord || ""),
    localEdited: booleanValue(item.localEdited),
    localEditedAt: item.localEditedAt || "",
    localEditedBy: fixText(item.localEditedBy || ""),
    ostiId: item.ostiId || "",
    ostiUrl: item.ostiUrl || "",
    doePagesUrl: item.doePagesUrl || "",
    crossrefUrl: item.crossrefUrl || "",
  };
}

function applyKnownCorrections(item) {
  const correction = findKnownCorrection(item.id);
  if (!correction) return item;

  const merged = { ...item };
  for (const field of KNOWN_CORRECTION_FIELDS) {
    if (!(field in correction)) continue;
    const value = correction[field];
    if (field === "reviewFlag") {
      merged[field] = value || "";
    } else if (Array.isArray(value)) {
      merged[field] = value;
    } else if (String(value || "").trim()) {
      merged[field] = value;
    }
  }

  if (correction.metadataStatus) {
    merged.metadataStatus = appendDelimitedUnique(item.metadataStatus, correction.metadataStatus);
  }
  if (correction.notes) {
    merged.notes = appendDelimitedUnique(item.notes, correction.notes);
  }
  return merged;
}

function applySourceEnrichment(item) {
  const source = findSourceRecord(item.id);
  if (!source || source === item) return item;

  const merged = { ...item };
  const localEdited = booleanValue(item.localEdited);
  for (const field of SOURCE_ENRICHMENT_FIELDS) {
    if (field === "reviewFlag" && field in source && !hasRecordValue(source[field]) && source.verification === "Verified current") {
      if (localEdited && hasRecordValue(merged.reviewFlag)) continue;
      merged.reviewFlag = "";
      continue;
    }
    if (!(field in source) || !hasRecordValue(source[field])) continue;
    const sourceValue = source[field];

    if (field === "authors") {
      if (!parseAuthors(merged.authors).length && parseAuthors(sourceValue).length) merged.authors = sourceValue;
      continue;
    }

    if (field === "lead") {
      const mergedAuthors = parseAuthors(merged.authors);
      const currentAudit = authorAuditStatus(merged.lead, mergedAuthors);
      if (!hasRecordValue(merged.lead) || (!localEdited && (currentAudit.startsWith("Review") || /,/.test(String(merged.lead || ""))))) {
        merged.lead = sourceValue;
      }
      continue;
    }

    if (field === "verification") {
      if (!localEdited && sourceValue === "Verified current" && merged.verification !== "Verified current") merged.verification = sourceValue;
      continue;
    }

    if (field === "authorAudit") {
      if (!hasRecordValue(merged.authorAudit) || (!localEdited && String(merged.authorAudit).startsWith("Review"))) merged.authorAudit = sourceValue;
      continue;
    }

    if (field === "linkStatus") {
      if (!hasRecordValue(merged.linkStatus) || (!localEdited && /^Needs link review/i.test(String(merged.linkStatus || "")))) merged.linkStatus = sourceValue;
      continue;
    }

    if (field === "metadataStatus" || field === "source" || field === "reviewFlag") {
      merged[field] = appendDelimitedUnique(merged[field], sourceValue);
      continue;
    }

    if (field === "action") {
      if (/^Ready for reporting/i.test(String(sourceValue || "")) || !hasRecordValue(merged.action)) merged.action = sourceValue;
      continue;
    }

    if (field === "excludeFromReports") {
      if (!merged.excludeFromReports && sourceValue) merged.excludeFromReports = sourceValue;
      continue;
    }

    if (!hasRecordValue(merged[field]) || (!localEdited && shouldPreferSourceValue(field, merged[field], sourceValue, source))) {
      merged[field] = sourceValue;
    }
  }
  return merged;
}

function shouldPreferSourceValue(field, currentValue, sourceValue, source) {
  const sourceVerified = source.verification === "Verified current";
  if (!sourceVerified) return false;
  if (field === "title" && !/manual entry/i.test(String(source.source || ""))) return String(sourceValue).length > String(currentValue || "").length;
  if (field === "pdfUrl" && /journals\.ametsoc\.org\/downloadpdf\/journals\/.+\.xml$/i.test(String(currentValue || ""))) return true;
  if (field === "verified" || field === "linkChecked" || field === "updated") return String(sourceValue || "") > String(currentValue || "");
  if (field === "status") return lifecycleStages.indexOf(normaliseStatus(sourceValue)) > lifecycleStages.indexOf(normaliseStatus(currentValue));
  return false;
}

function hasRecordValue(value) {
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "boolean") return value;
  return String(value ?? "").trim().length > 0;
}

function findSourceRecord(id) {
  const sources = [
    ...(window.ICOM_INBOX_RECORDS || []),
    ...(window.ICOM_WORKBOOK_RECORDS || []),
  ];
  return sources.find((record) => record.id === id) || null;
}

function findKnownCorrection(id) {
  if (!KNOWN_CORRECTION_IDS.has(id)) return null;
  return findSourceRecord(id);
}

function normaliseStatus(value) {
  const text = String(value || "").trim();
  if (!text) return "Drafting";
  const key = normalise(text);
  if (lifecycleStatusAliases.has(key)) return lifecycleStatusAliases.get(key);
  if (/^revise|revision|revise\s+and\s+resubmit/i.test(text)) return "Submitted / In review";
  return statuses.some((status) => status.value === text) ? text : "Drafting";
}

function normaliseVisibility(value, item = {}) {
  const text = fixText(value || "").trim();
  if (visibilityStates.includes(text)) return text;
  return inferDefaultVisibility(item);
}

function inferDefaultVisibility(item = {}) {
  const status = normaliseStatus(item.status);
  const publicLifecycle =
    Boolean(item.published || item.indexed) ||
    status === "Published / Indexed";
  return publicLifecycle && !booleanValue(item.excludeFromReports) ? "Public" : "Project team";
}

function booleanValue(value) {
  if (typeof value === "boolean") return value;
  return /^(true|yes|1|y)$/i.test(String(value || "").trim());
}

function cleanDoi(value) {
  return String(value || "")
    .trim()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")
    .replace(/^doi:\s*/i, "")
    .replace(/[)\].,;]+$/g, "");
}

function parseAuthors(value) {
  if (Array.isArray(value)) return value.map((author) => String(author || "").trim()).filter(Boolean);
  return String(value || "")
    .split(/;|\n/)
    .map((author) => author.trim())
    .filter(Boolean);
}

function formatAuthors(value) {
  return parseAuthors(value).join("; ");
}

function needsAuthorReview(record) {
  return /^review/i.test(record.authorAudit || "");
}

function fixText(value) {
  return String(value || "")
    .replaceAll("â€™", "'")
    .replaceAll("â€“", "-")
    .replaceAll("â€”", "-")
    .replaceAll("â€œ", '"')
    .replaceAll("â€�", '"');
}

function normaliseReviewerName(value) {
  const text = fixText(value || "").trim();
  return LEGACY_REVIEWER_NAMES.has(text) ? REVIEWER_NAME : text;
}

function ensureHttpUrl(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (/^https?:\/\//i.test(text)) return text;
  if (/^doi:/i.test(text)) return `https://doi.org/${cleanDoi(text)}`;
  if (/^10\.\d{4,9}\//i.test(text)) return `https://doi.org/${cleanDoi(text)}`;
  return "";
}

function linkHost(value) {
  try {
    const url = new URL(value);
    if (/doi\.org$/i.test(url.hostname)) return "doi.org";
    if (/osti\.gov$/i.test(url.hostname)) return "osti.gov";
    return url.hostname.replace(/^www\./i, "");
  } catch {
    return value;
  }
}

function isoDate(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) return `${match[1]}-${match[2]}-${match[3]}`;
  const yearOnly = text.match(/^(\d{4})$/);
  if (yearOnly) return `${yearOnly[1]}-01-01`;
  return "";
}

function wrapPdfText(value, limit) {
  const words = String(value || "").replace(/[^\x20-\x7E]/g, "-").split(/\s+/);
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (next.length > limit && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function normalise(value) {
  return String(value || "").toLowerCase().trim();
}

function errorMessage(error) {
  return error?.message || String(error || "Unknown render issue");
}

function formatDate(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const iso = isoDate(text);
  const parsed = iso ? new Date(`${iso}T00:00:00`) : new Date(text);
  if (Number.isNaN(parsed.getTime())) return text;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

function dateSlug() {
  return new Date().toISOString().slice(0, 10);
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}
